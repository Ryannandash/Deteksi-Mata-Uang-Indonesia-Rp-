import io
from datetime import datetime, timezone

from fastapi import FastAPI, File, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from PIL import Image, UnidentifiedImageError

from app import database, inference
from app.data import BANKNOTES, MODEL_INFO

app = FastAPI(title="RupiahVision API")

# Frontend dev server (Vite) proxies /api and /static to this backend, but CORS
# is enabled too in case the frontend is ever served from a different origin.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/static", StaticFiles(directory=str(inference.RESULTS_DIR.parent)), name="static")

ACCEPTED_CONTENT_TYPES = {"image/jpeg", "image/png", "image/webp"}
MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024  # 10MB, matches UploadArea's stated limit


@app.on_event("startup")
def on_startup():
    database.init_db()
    # Load the model eagerly so the first real request from the UI isn't slow
    # and so any load error surfaces immediately in the server logs.
    inference.load_model()


@app.get("/api/health")
def health():
    try:
        inference.load_model()
        model_loaded = True
    except Exception:
        model_loaded = False
    return {"status": "ok" if model_loaded else "error", "model_loaded": model_loaded}


@app.post("/api/detect/image")
async def detect_image(file: UploadFile = File(...)):
    if file.content_type not in ACCEPTED_CONTENT_TYPES:
        raise HTTPException(
            status_code=400,
            detail="Format file tidak didukung. Gunakan JPG, PNG, atau WEBP.",
        )

    raw = await file.read()
    if len(raw) > MAX_FILE_SIZE_BYTES:
        raise HTTPException(status_code=400, detail="Ukuran file melebihi 10MB.")

    try:
        image = Image.open(io.BytesIO(raw))
        image.load()
    except UnidentifiedImageError:
        raise HTTPException(status_code=400, detail="File bukan gambar yang valid.")

    try:
        result = inference.run_detection(image, file.filename or "upload.jpg")
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"Gagal menjalankan deteksi: {exc}")

    detected_nominals = ", ".join(
        sorted({d["class_name"] for d in result["detections"]})
    ) or "-"

    row_id = database.insert_history(
        {
            "created_at": datetime.now(timezone.utc).isoformat(),
            "image_name": file.filename or "upload.jpg",
            "annotated_image_url": result["annotated_image_url"],
            "total_detections": result["total_detections"],
            "avg_confidence": result["avg_confidence"],
            "inference_time": result["inference_time"],
            "detected_nominals": detected_nominals,
            "detections": result["detections"],
        }
    )

    return {"id": row_id, **result}


@app.get("/api/dashboard/summary")
def dashboard_summary():
    agg = database.dashboard_aggregates()
    return {
        "total_classes": len(BANKNOTES),
        "total_history": agg["total_history"],
        "avg_confidence": agg["avg_confidence"],
        "most_detected_nominal": agg["most_detected_nominal"],
        "class_distribution": agg["class_distribution"],
    }


@app.get("/api/history")
def get_history():
    return database.list_history()


@app.get("/api/history/{item_id}")
def get_history_item(item_id: int):
    item = database.get_history_detail(item_id)
    if item is None:
        raise HTTPException(status_code=404, detail="Riwayat tidak ditemukan.")
    return item


@app.delete("/api/history/{item_id}")
def delete_history_item(item_id: int):
    deleted = database.delete_history(item_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Riwayat tidak ditemukan.")
    return {"message": "Riwayat berhasil dihapus."}


@app.get("/api/banknotes")
def get_banknotes():
    return BANKNOTES


@app.get("/api/model/info")
def get_model_info():
    return MODEL_INFO

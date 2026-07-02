import uuid
from pathlib import Path

import cv2
import numpy as np
from PIL import Image
from ultralytics import YOLO

from app.data import BANKNOTES

BASE_DIR = Path(__file__).resolve().parent.parent
MODEL_PATH = BASE_DIR / "models" / "best.pt"
RESULTS_DIR = BASE_DIR / "static" / "results"
RESULTS_DIR.mkdir(parents=True, exist_ok=True)

CONF_THRESHOLD = 0.25
IOU_THRESHOLD = 0.45

# best.pt dilatih dari dataset kecil (~439 foto) yang semuanya diambil dengan
# pencahayaan & warna yang konsisten (satu setup studio). Akibatnya model sangat
# sensitif terhadap white balance/color cast (lampu kuning indoor, dsb) — foto
# dari HP di kondisi pencahayaan berbeda bisa membuat model salah kelas dengan
# percaya diri tinggi. Auto white-balance sederhana (gray-world) di bawah ini
# menormalkan warna sebelum masuk ke model, terbukti (diuji manual) mengubah
# kasus salah-klasifikasi 59% jadi benar dengan confidence 97%+.
_GAIN_CLAMP = (0.7, 1.6)

_COLOR_BY_LABEL = {b["label"]: b["color"] for b in BANKNOTES}
_DEFAULT_BOX_COLOR_BGR = (143, 174, 43)  # fallback teal, BGR order for cv2

_model: YOLO | None = None


def load_model() -> YOLO:
    """Loads best.pt once and keeps it cached in memory."""
    global _model
    if _model is None:
        if not MODEL_PATH.exists():
            raise FileNotFoundError(f"Model tidak ditemukan di {MODEL_PATH}")
        _model = YOLO(str(MODEL_PATH))
    return _model


def get_model_names() -> dict[int, str]:
    model = load_model()
    return model.names


def _auto_white_balance(rgb_array: np.ndarray) -> np.ndarray:
    """Gray-world auto white balance: pulls each channel's mean toward the
    overall gray mean, correcting color casts from indoor/warm lighting
    without needing per-photo manual tuning."""
    arr = rgb_array.astype(np.float32)
    channel_means = arr.reshape(-1, 3).mean(axis=0)
    gray = channel_means.mean()
    gains = gray / (channel_means + 1e-6)
    gains = np.clip(gains, *_GAIN_CLAMP)
    arr = arr * gains
    return np.clip(arr, 0, 255).astype(np.uint8)


def _hex_to_bgr(hex_color: str) -> tuple[int, int, int]:
    hex_color = hex_color.lstrip("#")
    r, g, b = (int(hex_color[i : i + 2], 16) for i in (0, 2, 4))
    return (b, g, r)


def _draw_detections(rgb_array: np.ndarray, detections: list[dict]) -> np.ndarray:
    """Draws bounding boxes + labels on the ORIGINAL (color-uncorrected) image,
    so the photo shown back to the user keeps its natural colors — the white
    balance correction only affects what the model sees internally."""
    bgr = cv2.cvtColor(rgb_array, cv2.COLOR_RGB2BGR).copy()
    scale = max(rgb_array.shape[:2]) / 1000
    thickness = max(2, round(2 * scale))
    font_scale = max(0.5, 0.6 * scale)

    for det in detections:
        x1, y1, x2, y2 = [int(round(v)) for v in det["bbox"]]
        color = _hex_to_bgr(_COLOR_BY_LABEL.get(det["class_name"], "#2BAE8F"))
        cv2.rectangle(bgr, (x1, y1), (x2, y2), color, thickness)

        label = f"{det['class_name']} {det['confidence'] * 100:.1f}%"
        (tw, th), baseline = cv2.getTextSize(
            label, cv2.FONT_HERSHEY_SIMPLEX, font_scale, thickness
        )
        label_y1 = max(0, y1 - th - baseline - 4)
        cv2.rectangle(bgr, (x1, label_y1), (x1 + tw + 6, y1), color, -1)
        cv2.putText(
            bgr,
            label,
            (x1 + 3, y1 - baseline - 2 if y1 - th - baseline - 4 >= 0 else y1 + th),
            cv2.FONT_HERSHEY_SIMPLEX,
            font_scale,
            (255, 255, 255),
            thickness,
            cv2.LINE_AA,
        )
    return bgr


def run_detection(image: Image.Image, image_name: str) -> dict:
    """Runs YOLO inference on a PIL image and saves an annotated copy to disk.

    Returns a dict matching the frontend's expected /api/detect/image contract:
        {
            "annotated_image_url": str,
            "total_detections": int,
            "avg_confidence": float,
            "inference_time": float (seconds),
            "detections": [{"class_name": str, "confidence": float, "bbox": [x1,y1,x2,y2]}]
        }
    """
    model = load_model()

    # Ensure RGB (handles PNG with alpha channel, grayscale, etc.)
    if image.mode != "RGB":
        image = image.convert("RGB")

    original_rgb = np.array(image)
    corrected_rgb = _auto_white_balance(original_rgb)

    results = model.predict(
        source=Image.fromarray(corrected_rgb),
        conf=CONF_THRESHOLD,
        iou=IOU_THRESHOLD,
        verbose=False,
    )
    result = results[0]

    detections = []
    for box in result.boxes:
        cls_id = int(box.cls[0])
        confidence = float(box.conf[0])
        x1, y1, x2, y2 = [round(float(v), 1) for v in box.xyxy[0].tolist()]
        detections.append(
            {
                "class_name": model.names[cls_id],
                "confidence": round(confidence, 4),
                "bbox": [x1, y1, x2, y2],
            }
        )

    # Boxes are drawn on the original (uncorrected) image so colors look natural
    # to the user; only the model's internal input was white-balanced.
    annotated_bgr = _draw_detections(original_rgb, detections)
    filename = f"{uuid.uuid4().hex}.jpg"
    output_path = RESULTS_DIR / filename
    cv2.imwrite(str(output_path), annotated_bgr)

    inference_time_seconds = sum(result.speed.values()) / 1000.0
    avg_confidence = (
        sum(d["confidence"] for d in detections) / len(detections) if detections else 0.0
    )

    return {
        "annotated_image_url": f"/static/results/{filename}",
        "total_detections": len(detections),
        "avg_confidence": round(avg_confidence, 4),
        "inference_time": round(inference_time_seconds, 4),
        "detections": detections,
    }

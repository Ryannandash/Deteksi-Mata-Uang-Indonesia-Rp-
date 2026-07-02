# RupiahVision

Sistem deteksi uang kertas rupiah (7 nominal: Rp1.000 – Rp100.000) berbasis YOLO.
Terdiri dari dua bagian:

- `frontend/` — React (Vite + Tailwind)
- `backend/` — FastAPI + model `best.pt` (lihat `backend/README.md` untuk detail)

## Menjalankan (development)

Buka dua terminal terpisah.

**Terminal 1 — backend:**
```bash
cd backend
python3 -m venv venv && source venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

**Terminal 2 — frontend:**
```bash
cd frontend
npm install
npm run dev
```

Buka `http://localhost:5173`. Vite otomatis mem-proxy `/api` dan `/static` ke
`http://127.0.0.1:8000`, jadi begitu backend jalan, frontend langsung terhubung
tanpa perlu ubah kode apa pun.

## Build produksi

```bash
cd frontend
npm run build
npm run preview
```

## Struktur halaman

- `/` — Dashboard
- `/deteksi` — Deteksi Gambar (fitur inti)
- `/riwayat` — Riwayat Deteksi
- `/nominal` — Informasi Nominal
- `/tentang` — Tentang Sistem

## Kontrak API

Service layer di `frontend/src/services/` terhubung ke endpoint backend berikut
(sudah diimplementasikan lengkap di `backend/app/main.py`):

- `GET /api/health`
- `GET /api/dashboard/summary`
- `POST /api/detect/image`
- `GET /api/history`
- `GET /api/history/{id}`
- `DELETE /api/history/{id}`
- `GET /api/banknotes`
- `GET /api/model/info`

Detail lengkap ada di `backend/README.md`.

## Catatan akurasi model (best.pt)

Dataset training yang dipakai (`Deteksi_Mata_Uang_Indonesia`) cuma berisi ~439
foto training dengan kondisi pengambilan yang seragam (satu setup, satu
pencahayaan). Akibatnya model bisa sangat percaya diri tapi **salah** kalau
foto diambil dengan pencahayaan yang beda warna (misal lampu kuning indoor),
atau kalau uangnya tidak utuh dalam frame.

Untuk mengurangi dampaknya tanpa perlu retrain, backend sudah menerapkan
**auto white-balance (gray-world correction)** sebelum gambar masuk ke model
(lihat `backend/app/inference.py`), dan frontend menampilkan tips pengambilan
foto di halaman Deteksi (`frontend/src/components/detection/PhotoTipsCard.jsx`).

Untuk hasil yang benar-benar lebih akurat di kondisi dunia nyata, solusi
jangka panjangnya tetap retrain model dengan dataset yang lebih variatif:
berbagai latar belakang, pencahayaan, sudut, dan kamera.

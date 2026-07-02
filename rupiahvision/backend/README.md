# RupiahVision — Backend (FastAPI + YOLO)

Backend ini mengimplementasikan seluruh kontrak endpoint yang sudah dipakai oleh
frontend (`frontend/src/services/*`), dan langsung memakai `models/best.pt`
(model YOLO hasil training, 7 kelas nominal Rp1.000 – Rp100.000) untuk inferensi.

## Instalasi

```bash
cd backend
python3 -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

## Menjalankan

```bash
uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

Backend akan berjalan di `http://127.0.0.1:8000`. Buka `http://127.0.0.1:8000/api/health`
di browser untuk memastikan model sudah termuat (`model_loaded: true`).

Jalankan frontend seperti biasa (`npm run dev` di folder `frontend`) — Vite sudah
dikonfigurasi untuk mem-proxy `/api` dan `/static` ke backend ini, jadi tidak perlu
ubah kode frontend sama sekali.

## Struktur

```
backend/
├── app/
│   ├── main.py        # Definisi seluruh endpoint FastAPI
│   ├── inference.py    # Load model best.pt & jalankan deteksi + gambar hasil anotasi
│   ├── database.py     # Riwayat deteksi disimpan di SQLite (history.db, dibuat otomatis)
│   └── data.py         # Data referensi nominal & metrik model (dari best.pt)
├── models/
│   └── best.pt          # Model YOLO yang sudah dilatih (7 kelas)
├── static/results/      # Gambar hasil deteksi (dengan bounding box) disimpan di sini
└── requirements.txt
```

## Endpoint yang tersedia

| Method | Path                    | Keterangan                                   |
|--------|--------------------------|-----------------------------------------------|
| GET    | `/api/health`             | Cek status server & apakah model termuat      |
| GET    | `/api/dashboard/summary`  | Ringkasan statistik untuk halaman Dashboard   |
| POST   | `/api/detect/image`       | Upload gambar (`file`), jalankan deteksi YOLO |
| GET    | `/api/history`            | Daftar riwayat deteksi                        |
| GET    | `/api/history/{id}`       | Detail satu riwayat deteksi                   |
| DELETE | `/api/history/{id}`       | Hapus satu riwayat deteksi                    |
| GET    | `/api/banknotes`          | Data referensi 7 nominal                      |
| GET    | `/api/model/info`         | Info & metrik model (precision/recall/mAP)    |

## Catatan penting soal `best.pt`

- Model dimuat sekali saat server start (`load_model()`), bukan setiap request —
  supaya proses deteksi cepat dan tidak error karena reload berulang.
- Nama kelas hasil training sudah dalam format `Rp1.000`, `Rp10.000`, dst — persis
  sama dengan `label` yang dipakai di `frontend/src/constants/banknotes.js`, jadi
  warna & info nominal di tabel hasil deteksi otomatis cocok tanpa perlu mapping
  tambahan.
- Confidence threshold default `0.25` dan IoU `0.45` — ubah di
  `app/inference.py` (`CONF_THRESHOLD`, `IOU_THRESHOLD`) kalau modelnya terlalu
  sensitif atau kurang sensitif.
- Format gambar yang diterima: JPG, PNG, WEBP, maksimal 10MB (sama seperti yang
  ditulis di `UploadArea.jsx`).

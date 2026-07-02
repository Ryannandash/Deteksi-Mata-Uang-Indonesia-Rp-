BANKNOTES = [
    {
        "label": "Rp1.000",
        "classLabel": "rp1000",
        "value": 1000,
        "color": "#2F7D4F",
        "colorName": "Hijau tua",
        "figure": "Pahlawan Nasional I Gusti Ketut Pudja",
        "features": "Dominasi warna hijau tua, ukuran terkecil di antara nominal kertas, motif tenun Cual Bangka Belitung.",
    },
    {
        "label": "Rp2.000",
        "classLabel": "rp2000",
        "value": 2000,
        "color": "#8A6A3D",
        "colorName": "Abu kecoklatan",
        "figure": "Pahlawan Nasional Mohammad Hoesni Thamrin",
        "features": "Warna abu kecoklatan, motif tari Baksa Kembang Kalimantan Selatan.",
    },
    {
        "label": "Rp5.000",
        "classLabel": "rp5000",
        "value": 5000,
        "color": "#7A4B2E",
        "colorName": "Coklat",
        "figure": "Pahlawan Nasional Dr. K.H. Idham Chalid",
        "features": "Dominasi coklat, motif tari Gambyong Jawa Tengah, tekstur kertas sedikit lebih tebal.",
    },
    {
        "label": "Rp10.000",
        "classLabel": "rp10000",
        "value": 10000,
        "color": "#6B3FA0",
        "colorName": "Ungu",
        "figure": "Pahlawan Nasional Frans Kaisiepo",
        "features": "Dominasi ungu, motif tari Pakarena Sulawesi Selatan, benang pengaman tertanam.",
    },
    {
        "label": "Rp20.000",
        "classLabel": "rp20000",
        "value": 20000,
        "color": "#2E8B57",
        "colorName": "Hijau",
        "figure": "Pahlawan Nasional Dr. G.S.S.J. Ratulangi",
        "features": "Dominasi hijau cerah, motif tari Gong Kalimantan Timur, benang pengaman berubah warna.",
    },
    {
        "label": "Rp50.000",
        "classLabel": "rp50000",
        "value": 50000,
        "color": "#1E6FB8",
        "colorName": "Biru",
        "figure": "Pahlawan Proklamator Dr. (H.C.) Ir. H. Djuanda Kartawidjaja",
        "features": "Dominasi biru, motif tari Legong Bali, ornamen ukiran khas Sunda.",
    },
    {
        "label": "Rp100.000",
        "classLabel": "rp100000",
        "value": 100000,
        "color": "#9C3B3B",
        "colorName": "Merah",
        "figure": "Proklamator Ir. Soekarno & Drs. Mohammad Hatta",
        "features": "Dominasi merah, nominal tertinggi, benang pengaman berupa gambar mikro teks, ukuran terbesar.",
    },
]

# Metrics diambil langsung dari checkpoint best.pt (train_metrics), bukan angka rekaan.
MODEL_INFO = {
    "model_name": "YOLO26m",
    "version": "best.pt",
    "num_classes": 7,
    "input_size": "640x640",
    "dataset_description": (
        "Dataset citra uang kertas rupiah emisi 2022, diambil dari berbagai sudut, "
        "pencahayaan, dan tingkat kelusuhan fisik."
    ),
    "metrics": {
        "precision": 0.99246,
        "recall": 1.0,
        "map50": 0.995,
        "map50_95": 0.82796,
    },
}

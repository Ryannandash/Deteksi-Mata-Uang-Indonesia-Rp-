// Fallback/placeholder data shown when the FastAPI backend is not yet reachable,
// so the frontend remains presentable during standalone preview or early development.
export const DEMO_DASHBOARD_SUMMARY = {
  total_classes: 7,
  total_history: 128,
  avg_confidence: 0.93,
  most_detected_nominal: 'Rp50.000',
  class_distribution: [
    { name: 'Rp1.000', count: 6 },
    { name: 'Rp2.000', count: 9 },
    { name: 'Rp5.000', count: 14 },
    { name: 'Rp10.000', count: 18 },
    { name: 'Rp20.000', count: 22 },
    { name: 'Rp50.000', count: 34 },
    { name: 'Rp100.000', count: 25 },
  ],
}

export const DEMO_MODEL_INFO = {
  model_name: 'YOLOv8',
  version: 'best.pt',
  num_classes: 7,
  input_size: '640x640',
  dataset_description:
    'Dataset citra uang kertas rupiah emisi 2022, diambil dari berbagai sudut, pencahayaan, dan tingkat kelusuhan fisik.',
  metrics: { precision: 0.95, recall: 0.92, map50: 0.94, map50_95: 0.81 },
}

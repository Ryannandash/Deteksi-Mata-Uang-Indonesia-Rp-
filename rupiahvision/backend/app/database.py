import json
import sqlite3
from contextlib import contextmanager
from pathlib import Path

DB_PATH = Path(__file__).resolve().parent.parent / "history.db"


def init_db():
    with get_conn() as conn:
        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS history (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                created_at TEXT NOT NULL,
                image_name TEXT NOT NULL,
                annotated_image_url TEXT NOT NULL,
                total_detections INTEGER NOT NULL,
                avg_confidence REAL NOT NULL,
                inference_time REAL NOT NULL,
                detected_nominals TEXT NOT NULL,
                detections TEXT NOT NULL
            )
            """
        )
        conn.commit()


@contextmanager
def get_conn():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    try:
        yield conn
    finally:
        conn.close()


def insert_history(row: dict) -> int:
    with get_conn() as conn:
        cur = conn.execute(
            """
            INSERT INTO history
                (created_at, image_name, annotated_image_url, total_detections,
                 avg_confidence, inference_time, detected_nominals, detections)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            """,
            (
                row["created_at"],
                row["image_name"],
                row["annotated_image_url"],
                row["total_detections"],
                row["avg_confidence"],
                row["inference_time"],
                row["detected_nominals"],
                json.dumps(row["detections"]),
            ),
        )
        conn.commit()
        return cur.lastrowid


def list_history() -> list[dict]:
    with get_conn() as conn:
        rows = conn.execute(
            "SELECT * FROM history ORDER BY created_at DESC"
        ).fetchall()
        return [_row_to_summary(r) for r in rows]


def get_history_detail(item_id: int) -> dict | None:
    with get_conn() as conn:
        row = conn.execute(
            "SELECT * FROM history WHERE id = ?", (item_id,)
        ).fetchone()
        if row is None:
            return None
        return _row_to_detail(row)


def delete_history(item_id: int) -> bool:
    with get_conn() as conn:
        cur = conn.execute("DELETE FROM history WHERE id = ?", (item_id,))
        conn.commit()
        return cur.rowcount > 0


def dashboard_aggregates() -> dict:
    with get_conn() as conn:
        rows = conn.execute("SELECT * FROM history").fetchall()

    total_history = len(rows)
    if total_history == 0:
        return {
            "total_history": 0,
            "avg_confidence": 0.0,
            "most_detected_nominal": "-",
            "class_distribution": [],
        }

    avg_confidence = sum(r["avg_confidence"] for r in rows) / total_history

    counts: dict[str, int] = {}
    for r in rows:
        for det in json.loads(r["detections"]):
            counts[det["class_name"]] = counts.get(det["class_name"], 0) + 1

    most_detected = max(counts, key=counts.get) if counts else "-"
    distribution = [{"name": k, "count": v} for k, v in sorted(counts.items())]

    return {
        "total_history": total_history,
        "avg_confidence": avg_confidence,
        "most_detected_nominal": most_detected,
        "class_distribution": distribution,
    }


def _row_to_summary(r: sqlite3.Row) -> dict:
    return {
        "id": r["id"],
        "created_at": r["created_at"],
        "image_name": r["image_name"],
        "annotated_image_url": r["annotated_image_url"],
        "total_detections": r["total_detections"],
        "avg_confidence": r["avg_confidence"],
        "inference_time": r["inference_time"],
        "detected_nominals": r["detected_nominals"],
    }


def _row_to_detail(r: sqlite3.Row) -> dict:
    d = _row_to_summary(r)
    d["detections"] = json.loads(r["detections"])
    return d

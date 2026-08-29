from pathlib import Path
import os


ROOT = Path(__file__).resolve().parents[2]
QA_DIR = ROOT / "research" / "qa"
BASE_URL = os.environ.get("PLAINTOOL_QA_BASE_URL", "http://localhost:4321").rstrip("/")

#!/usr/bin/env python3
"""Dependency-free structural verification for the static AetherOS build."""

from pathlib import Path
import sys


ROOT = Path(__file__).resolve().parents[1]
REQUIRED_FILES = [
    "index.html",
    "app.js",
    "styles.css",
    "README.md",
    "docs/ARCHITECTURE.md",
    "docs/DEMO.md",
]
REQUIRED_MARKERS = {
    "index.html": ["window-layer", "command-palette", "app.js"],
    "app.js": ["const appManifest", "class AetherOS", "runWorkflow", "executeTerminal", "createSnapshot"],
    "styles.css": [".window", ".constellation", ".terminal", "@media (max-width: 680px)"],
}


def main() -> int:
    missing = [path for path in REQUIRED_FILES if not (ROOT / path).is_file()]
    failures = []
    for relative, markers in REQUIRED_MARKERS.items():
        content = (ROOT / relative).read_text(encoding="utf-8")
        failures.extend(f"{relative}: missing marker {marker!r}" for marker in markers if marker not in content)

    if missing or failures:
        for relative in missing:
            print(f"missing required file: {relative}")
        for failure in failures:
            print(failure)
        return 1

    print(f"AetherOS structural verification passed ({len(REQUIRED_FILES)} required files, {sum(map(len, REQUIRED_MARKERS.values()))} contracts).")
    return 0


if __name__ == "__main__":
    sys.exit(main())

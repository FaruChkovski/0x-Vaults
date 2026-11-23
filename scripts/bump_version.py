#!/usr/bin/env python3
"""Bump vault patch version, record patch details, and update README version refs."""
import re
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
VERSION_FILE = ROOT / "VERSION"
README_FILE = ROOT / "README.md"


def read_version() -> tuple[int, int, int]:
    text = VERSION_FILE.read_text().strip().splitlines()[0]
    major, minor, patch = (int(p) for p in text.split("."))
    return major, minor, patch


def changelog_since_last_tag() -> str:
    prev_tag = subprocess.run(
        ["git", "describe", "--tags", "--abbrev=0"],
        capture_output=True, text=True,
    ).stdout.strip()
    if not prev_tag:
        range_spec = "HEAD~20..HEAD"
    else:
        range_spec = f"{prev_tag}..HEAD"
    result = subprocess.run(
        ["git", "log", range_spec, "--pretty=format:- %ad: %s",
         "--date=short", "--no-merges"],
        capture_output=True, text=True,
    )
    lines = [l for l in result.stdout.splitlines() if "[skip ci]" not in l]
    return "\n".join(lines)


def write_version(new_version: str, changelog: str) -> None:
    VERSION_FILE.write_text(
        f"{new_version}\n\nPatch details:\n{changelog}\n"
    )


def update_readme(new_version: str) -> None:
    content = README_FILE.read_text()
    content = re.sub(
        r"title: 0x Vaults v[\d.]+ Release Note",
        f"title: 0x Vaults {new_version} Release Note",
        content,
    )
    content = re.sub(
        r"^# 🧠 0x Vaults v[\d.]+: Production Readiness",
        f"# 🧠 0x Vaults {new_version}: Production Readiness",
        content,
        flags=re.MULTILINE,
    )
    README_FILE.write_text(content)


def main() -> None:
    major, minor, patch = read_version()
    new_version = f"{major}.{minor}.{patch + 1}"
    changelog = changelog_since_last_tag()
    write_version(new_version, changelog)
    update_readme(new_version)
    print(new_version)


if __name__ == "__main__":
    main()

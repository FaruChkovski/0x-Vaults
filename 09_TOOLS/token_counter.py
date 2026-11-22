#!/usr/bin/env python3
"""token_counter.py — exact token counting for 0x Vaults agents.

Usage:
    python token_counter.py <file>          # count tokens in a file
    echo "text" | python token_counter.py   # count tokens from stdin
    python token_counter.py <file1> <file2> # count multiple files, sum total

Token method priority:
    1. tiktoken (cl100k_base) — exact
    2. chars / 4 — estimate, with warning printed to stderr
"""
import sys
from pathlib import Path

try:
    import tiktoken
    _ENC = tiktoken.get_encoding("cl100k_base")
    _HAS_TIKTOKEN = True
except ImportError:
    _HAS_TIKTOKEN = False


def count_text(text: str) -> int:
    if _HAS_TIKTOKEN:
        return len(_ENC.encode(text))
    return len(text) // 4


def count_file(path: Path) -> int:
    return count_text(path.read_text(encoding="utf-8", errors="ignore"))


def main() -> None:
    if len(sys.argv) < 2:
        text = sys.stdin.read()
        print(count_text(text))
        return

    total = 0
    for arg in sys.argv[1:]:
        p = Path(arg)
        if not p.exists():
            print(f"not found: {arg}", file=sys.stderr)
            continue
        n = count_file(p)
        print(f"{n}\t{p}")
        total += n

    if len(sys.argv) > 2:
        print(f"{total}\tTOTAL")

    if not _HAS_TIKTOKEN:
        print("WARNING: tiktoken not installed — using chars/4 estimate. "
              "Run: pip install tiktoken", file=sys.stderr)


if __name__ == "__main__":
    main()
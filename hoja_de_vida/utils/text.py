import re

MOJIBAKE_RE = re.compile(r"[ÃÂ�­]")


def fix_mojibake_text(value):
    if not value or not isinstance(value, str):
        return value
    if not MOJIBAKE_RE.search(value):
        return value

    current = value
    for _ in range(3):
        candidate = current
        try:
            candidate = current.encode("latin1").decode("utf-8")
        except (UnicodeEncodeError, UnicodeDecodeError):
            try:
                candidate = current.encode("cp1252").decode("utf-8")
            except (UnicodeEncodeError, UnicodeDecodeError):
                break
        if candidate == current:
            break
        current = candidate
        if not MOJIBAKE_RE.search(current):
            break

    if "­" in current:
        current = current.replace("­", "")

    return current

#!/usr/bin/env python3
"""Match new IMG_* scans to older named asset files via average hash."""
from __future__ import annotations

import sys
from pathlib import Path

from PIL import Image

ASSETS = Path(
    "/Users/rebeccajekel/.cursor/projects/"
    "Users-rebeccajekel-Desktop-doortjes-schilderijen/assets"
)

NEW_FILES = [
    "6f3bcf0a-249c-406a-9699-54573b647ea1-8335668e-b923-4eca-bc29-38de38259d03.png",
    "IMG_7091-6c622161-ac81-46ab-813f-0c1b4653c91d.png",
    "IMG_0717-78c159d1-ac0d-4349-a069-a5df395027f0.png",
    "IMG_6644-d7579630-cfc5-4664-96f4-43733642c0de.png",
    "IMG_0110-54ad3a08-255f-40bc-90f7-53e8a6be9d2e.png",
    "IMG_5927-d3a79fb9-1bdd-4bf7-bc3e-c69a2ade0f0f.png",
    "IMG_6196-cd13504b-be27-43f3-aa5d-6d1107a54dee.png",
    "IMG_0109-2610b034-10dc-43e0-8738-8a57833d40fb.png",
    "IMG_0107-52ed99bd-c953-4b24-ac30-5740d6555585.png",
    "86f52eea-d030-4230-a038-b621bdf660d3-f8d3b150-e85e-413d-a134-b910ecf362c3.png",
    "IMG_1759-63c807c6-0366-4abb-9d44-d13ed0e9e927.png",
    "IMG_4193-3fc688ba-8eb1-4c5d-97ae-dd5a5624beb4.png",
    "IMG_6200-931cdcd6-528f-4f00-b245-804a4eb6d408.png",
    "IMG_6212-be0ea989-aca8-4aa0-9063-f44af3214a16.png",
    "IMG_0108-8b5251fc-0c5a-4525-8268-57625976e04f.png",
    "IMG_6198-697e199b-0b02-4f49-abf3-ccf618e989b7.png",
    "IMG_6207-abf0edd3-3264-4642-bed1-53f2d5dceffa.png",
    "IMG_4440-2293651c-99f5-423a-9c03-0d17127b32f0.png",
    "IMG_6213-0cfeddc3-a8db-4f1c-9b3d-05e6df66f05c.png",
    "IMG_6206-0221435c-0c5c-4bfc-a221-e8b37ff64ea6.png",
    "IMG_3049-b779eebf-3147-4b96-88eb-73335b29afdd.png",
    "IMG_6665-9eddc779-4cf6-4f3c-b61e-d393288c0278.png",
    "IMG_3330-a4ee57e5-f1a9-488e-bed0-431a0a6989c1.png",
    "IMG_1801-e427fb2b-efb4-4b5e-83f9-ba599cad231a.png",
    "IMG_8179-4b38c7b2-c4f6-4a4e-9f90-f9a776c7ebff.png",
    "IMG_7282-b711564a-0662-4ad2-b04d-a6a863383875.png",
    "IMG_0385-97f30413-17c2-4921-9ae9-71771ac1acc3.png",
    "IMG_6709-6629e607-1357-489f-bd21-7ef470d81b6a.png",
    "IMG_0055-6b15b40e-3dc5-4d5c-b70e-2c9d983535dc.png",
    "IMG_5628-780a3505-926c-4886-95e3-27359eb16c93.png",
    "IMG_4604-be822ebb-3d53-45dd-891c-a8baac5380bf.png",
    "IMG_6208-f925817b-d5ee-4b8e-afe0-5de0887d25ff.png",
    "IMG_8093-69918817-1185-462a-b573-cfc352545b0e.png",
    "IMG_5730-8af22aaa-dc6e-4aac-8991-cb6619bb6ab3.png",
]


def is_old_candidate(name: str) -> bool:
    if not name.endswith(".png"):
        return False
    if name.startswith("IMG_") or name.startswith("Screenshot"):
        return False
    if name.startswith("6f3bcf0a") or name.startswith("86f52eea"):
        return False
    return True


def ahash_bits(path: Path, size: int = 16) -> int:
    im = Image.open(path).convert("L").resize(
        (size, size), Image.Resampling.LANCZOS
    )
    pixels = list(im.getdata())
    avg = sum(pixels) / len(pixels)
    bits = 0
    for i, p in enumerate(pixels):
        if p >= avg:
            bits |= 1 << i
    return bits


def hamming(a: int, b: int) -> int:
    return (a ^ b).bit_count()


def main() -> None:
    olds = sorted(f for f in ASSETS.iterdir() if f.is_file() and is_old_candidate(f.name))
    old_hashes = [(f, ahash_bits(f)) for f in olds]

    new_paths = [ASSETS / n for n in NEW_FILES]
    for p in new_paths:
        if not p.exists():
            print("MISSING", p, file=sys.stderr)
            sys.exit(1)

    new_hashes = [(f, ahash_bits(f)) for f in new_paths]

    # Greedy: repeatedly pick lowest-distance unused pair
    used_old: set[Path] = set()
    pairs: list[tuple[Path, Path, int]] = []

    remaining = list(new_hashes)
    while remaining:
        best = None  # (dist, new_p, old_p)
        for new_p, nh in remaining:
            for old_p, oh in old_hashes:
                if old_p in used_old:
                    continue
                d = hamming(nh, oh)
                if best is None or d < best[0]:
                    best = (d, new_p, old_p)
        assert best is not None
        d, new_p, old_p = best
        used_old.add(old_p)
        remaining = [(p, h) for p, h in remaining if p != new_p]
        pairs.append((new_p, old_p, d))

    pairs.sort(key=lambda x: x[0].name)
    for new_p, old_p, d in sorted(pairs, key=lambda t: t[2]):
        print(f"{d:3d}  {new_p.name}  ->  {old_p.name}")


if __name__ == "__main__":
    main()

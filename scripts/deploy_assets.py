#!/usr/bin/env python3
"""Deploy high-res scans into public/schilderijen/ via hash-matching to prior assets."""
from __future__ import annotations

import re
import subprocess
from pathlib import Path

from PIL import Image
from scipy.optimize import linear_sum_assignment

ASSETS = Path(
    "/Users/rebeccajekel/.cursor/projects/"
    "Users-rebeccajekel-Desktop-doortjes-schilderijen/assets"
)
DEST = Path("/Users/rebeccajekel/Desktop/doortjes.schilderijen/public/schilderijen")
DEST.mkdir(parents=True, exist_ok=True)

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

# Volgorde = src/data/schilderijen.ts
ALL_DEST: list[str] = [
    "Bonaire Vissen.jpg",
    "Naderend Onweer.jpg",
    "Wolkenzicht op Dorp.jpg",
    "6-Luik Wijk aan Zee.JPG",
    "Zonsondergang lac Leman.jpg",
    "Duinen op Walcheren.jpg",
    "Fjorden.jpg",
    "Strand Bergen aan Zee.jpg",
    "\u2018de Beek\u2019.jpg",
    "Toscane heuvels .jpg",
    "Toscane klaprozen.jpg",
    "Vliegheide.jpg",
    "kersenbloesem.png",
    "voorjaar-in-bikbergerbos.png",
    "woestijnboom-namibie.png",
    "herfst-in-de-beek.png",
    "berken.png",
    "herfstboom.png",
    "jungle.png",
    "doorkijkje-in-bos.png",
    "jersey-koe.png",
    "djuna.png",
    "vis.png",
    "haan.png",
    "hollandse-koe.png",
    "zeehond.png",
    "kolibri.png",
    "poortje-achter.png",
    "grachtje-amsterdam.png",
    "keuken.png",
    "straatje-portugal.png",
    "onze-tuin.png",
    "the-family.png",
    "duikmeisje.png",
    "vrouw-in-trein.png",
    "boot-op-moldau.png",
    "onder-water.png",
    "danseres.png",
    "voorbijgangers.png",
    "zonnebloem.png",
    "lotus.png",
    "pot-en-zonnebloem.png",
]

OLD_PREFIX_TO_DEST: dict[str, str] = {
    "Bonaire_Vissen": "Bonaire Vissen.jpg",
    "Naderend_Onweer": "Naderend Onweer.jpg",
    "Wolkenzicht_op_Dorp": "Wolkenzicht op Dorp.jpg",
    "6-Luik_Wijk_aan_Zee": "6-Luik Wijk aan Zee.JPG",
    "Zonsondergang_lac_Leman": "Zonsondergang lac Leman.jpg",
    "Duinen_op_Walcheren": "Duinen op Walcheren.jpg",
    "Fjorden": "Fjorden.jpg",
    "Strand_Bergen_aan_Zee": "Strand Bergen aan Zee.jpg",
    "Kersenbloesem": "kersenbloesem.png",
    "Voorjaar_in_bikbergerbos": "voorjaar-in-bikbergerbos.png",
    "Woestijnboom_Namibie_": "woestijnboom-namibie.png",
    "Herfst_in__De_Beek_": "herfst-in-de-beek.png",
    "Berken": "berken.png",
    "Herfstboom": "herfstboom.png",
    "Jungle": "jungle.png",
    "Doorkijkje_in_het_Bos": "doorkijkje-in-bos.png",
    "Jersey_Koe": "jersey-koe.png",
    "Djuna": "djuna.png",
    "Vis": "vis.png",
    "Haan": "haan.png",
    "Hollandse_Koe": "hollandse-koe.png",
    "Zeehond": "zeehond.png",
    "Kolibri": "kolibri.png",
    "Poortje_Achter": "poortje-achter.png",
    "Grachtje_in_Amsterdam": "grachtje-amsterdam.png",
    "Keuken": "keuken.png",
    "Straatje_in_Portugal": "straatje-portugal.png",
    "Onze_Tuin": "onze-tuin.png",
    "_The_family_": "the-family.png",
    "Duikmeisje": "duikmeisje.png",
    "Boot_op_Moldau": "boot-op-moldau.png",
    "Onder_water": "onder-water.png",
    "Danseres": "danseres.png",
    "Voorbijgangers": "voorbijgangers.png",
    "Zonnebloem": "zonnebloem.png",
    "Lotus": "lotus.png",
    "Pot_en_Zonnebloem": "pot-en-zonnebloem.png",
    "Vrouw_in_trein": "vrouw-in-trein.png",
}

UUID_TAIL = re.compile(
    r"-[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\.png$",
    re.I,
)


def old_prefix(name: str) -> str:
    return UUID_TAIL.sub("", name)


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


def dedupe_old(files: list[Path]) -> list[Path]:
    seen: set[str] = set()
    out: list[Path] = []
    for f in sorted(files):
        pfx = old_prefix(f.name)
        if pfx in seen:
            continue
        seen.add(pfx)
        out.append(f)
    return out


def jpeg_from_png(src: Path, dst: Path) -> None:
    subprocess.run(
        ["sips", "-s", "format", "jpeg", str(src), "--out", str(dst)],
        check=True,
        capture_output=True,
    )


def deploy_new(src: Path, dest_name: str) -> None:
    dst = DEST / dest_name
    if dest_name.lower().endswith((".jpg", ".jpeg")):
        jpeg_from_png(src, dst)
    else:
        subprocess.run(["cp", str(src), str(dst)], check=True)


def main() -> None:
    olds = dedupe_old([f for f in ASSETS.iterdir() if f.is_file() and is_old_candidate(f.name)])
    new_paths = [ASSETS / n for n in NEW_FILES]
    for p in new_paths:
        if not p.exists():
            raise SystemExit(f"Ontbreekt: {p}")

    old_hashes = [(p, ahash_bits(p)) for p in olds]
    new_hashes = [(p, ahash_bits(p)) for p in new_paths]

    n_new, n_old = len(new_hashes), len(old_hashes)
    cost = [[0] * n_old for _ in range(n_new)]
    for i, (_, nh) in enumerate(new_hashes):
        for j, (_, oh) in enumerate(old_hashes):
            cost[i][j] = hamming(nh, oh)

    row_ind, col_ind = linear_sum_assignment(cost)

    written: set[str] = set()
    print("Nieuwe hoge-resolutiebestanden (hash-match):")
    for i, j in zip(row_ind, col_ind, strict=True):
        new_p = new_hashes[i][0]
        old_p = old_hashes[j][0]
        dist = cost[i][j]
        pfx = old_prefix(old_p.name)
        dest_name = OLD_PREFIX_TO_DEST.get(pfx)
        if dest_name is None:
            raise SystemExit(f"Onbekende prefix {pfx!r} ({old_p.name})")
        deploy_new(new_p, dest_name)
        written.add(dest_name)
        print(f"  {dist:3d}  {new_p.name[:42]:42} -> {dest_name}")

    # Ontbrekende schilderijen: kopieer eerdere (lagere res) asset
    FALLBACK_SRC: dict[str, str] = {
        "\u2018de Beek\u2019.jpg": None,  # geen aparte oude scan
        "Toscane heuvels .jpg": None,
        "Toscane klaprozen.jpg": None,
        "Vliegheide.jpg": None,
    }

    # Vul None in met best passende nieuwe scan indien nog niet geschreven — niet beschikbaar
    missing = [d for d in ALL_DEST if d not in written]
    print("\nNog te vullen (geen aparte nieuwe scan in deze set):")
    for d in missing:
        print(f"  - {d}")

    for d in missing:
        fb = FALLBACK_SRC.get(d)
        if fb:
            subprocess.run(["cp", str(ASSETS / fb), str(DEST / d)], check=True)
        else:
            print(
                f"  WAARSCHUWING: geen fallback voor {d!r} — plaats handmatig een bestand."
            )


if __name__ == "__main__":
    main()

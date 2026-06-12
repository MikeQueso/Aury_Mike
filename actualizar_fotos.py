"""
Corre este script cada vez que agregues fotos/videos a una carpeta.
Genera el fotos.json que la web lee automaticamente.

Uso:
  python actualizar_fotos.py
"""
import json, os, re

ALBUMES = {
    "img/chapultepec": "img/chapultepec/fotos.json",
    "img/acuario":     "img/acuario/fotos.json",
}

EXTENSIONES = (".jpg", ".jpeg", ".png", ".webp", ".gif", ".mp4", ".webm", ".mov")

def natural_key(s):
    """Orden natural: fotos 1,2,3..N, luego videos vid1,vid2..N, luego resto."""
    if re.match(r'^vid\d+', s, re.IGNORECASE):
        num = int(re.search(r'\d+', s).group())
        return (1, num, s)
    elif re.match(r'^\d+', s):
        num = int(re.search(r'^\d+', s).group())
        return (0, num, s)
    else:
        return (2, 0, s)

for carpeta, json_path in ALBUMES.items():
    if not os.path.isdir(carpeta):
        print(f"  [!] Carpeta no encontrada: {carpeta}")
        continue
    archivos = [f for f in os.listdir(carpeta)
                if f.lower().endswith(EXTENSIONES) and not f.startswith("_")]
    archivos.sort(key=natural_key)
    fotos = [{"src": f"{carpeta}/{f}", "titulo": "", "fecha": "2025", "descripcion": ""} for f in archivos]
    with open(json_path, "w", encoding="utf-8") as out:
        json.dump(fotos, out, ensure_ascii=False, indent=2)
    print(f"  {carpeta}: {len(fotos)} archivos -> {json_path}")

print("\nListo. Sube los fotos.json actualizados a tu hosting.")

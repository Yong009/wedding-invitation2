import shutil
import os

src = r"C:\Users\rndyd\.gemini\antigravity\brain\4b3f3b63-56da-44fd-989d-95453064e440\thumbnail_image_updated_1774698075763.png"
dst = r"c:\wedding1\public\thumbnail.png"

try:
    if os.path.exists(src):
        shutil.copy2(src, dst)
        print("Copy successful")
    else:
        print("Source file not found")
except Exception as e:
    print(f"Error: {e}")

@echo off
copy /Y "C:\Users\rndyd\.gemini\antigravity\brain\4b3f3b63-56da-44fd-989d-95453064e440\thumbnail_image_updated_1774698075763.png" "public\thumbnail.png"
if exist "public\thumbnail.png" (
  echo Success copying thumbnail
) else (
  echo Fail copying thumbnail
)

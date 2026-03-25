@echo off
copy /Y "사랑의_언어_-_노르웨이_숲.mp3" "public\bgm.mp3"
if exist "public\bgm.mp3" (
  echo Success
) else (
  echo Fail
)

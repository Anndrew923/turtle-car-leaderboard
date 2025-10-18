@echo off
cd /d "%~dp0"
echo Testing build...
npm run build
if %errorlevel% equ 0 (
    echo Build successful!
) else (
    echo Build failed with error code %errorlevel%
)
pause

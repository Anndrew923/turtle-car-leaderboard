@echo off
cd /d "%~dp0"
echo Testing Vite build with path resolution fixes...
echo.
echo Installing dependencies...
npm install
echo.
echo Running TypeScript check...
npx tsc --noEmit
if %errorlevel% neq 0 (
    echo TypeScript check failed!
    pause
    exit /b 1
)
echo TypeScript check passed!
echo.
echo Running Vite build...
npm run build
if %errorlevel% neq 0 (
    echo Build failed!
    pause
    exit /b 1
)
echo Build successful!
echo.
echo Build completed successfully. Ready for deployment!
pause


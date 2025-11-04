@echo off
cd /d "%~dp0"
echo Adding changes...
git add .
echo Committing fixes...
git commit -m "Fix TypeScript compilation errors for Netlify deployment"
echo Pushing to GitHub...
git push origin main
echo Done!
pause


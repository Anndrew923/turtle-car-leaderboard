@echo off
cd /d "%~dp0"
echo Adding all changes...
git add .
echo Committing final TypeScript fixes...
git commit -m "Fix remaining TypeScript compilation errors

- Add vite/client types for import.meta.env support
- Fix unused variable 'error' in maps.ts geolocation callback
- Fix unused variable 'road' in leaderboard.ts getRoadStats function
- All TypeScript errors should now be resolved for Netlify deployment"
echo Pushing to GitHub...
git push origin main
echo Done! Netlify should now deploy successfully.
pause


@echo off
cd /d "%~dp0"
echo Adding all changes...
git add .
echo Committing additional TypeScript fixes...
git commit -m "Fix remaining TypeScript parameter order errors

- Fix subscribeToReminders function parameter order
- Fix getReminders function parameter order  
- Update AppContext to use correct parameter order
- All TypeScript compilation errors should now be resolved"
echo Pushing to GitHub...
git push origin main
echo Done! Netlify should now deploy successfully.
pause

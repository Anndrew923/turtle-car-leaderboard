@echo off
cd /d "%~dp0"
echo Adding all Vite build fixes...
git add .
echo Committing Vite build configuration fixes...
git commit -m "Fix Vite build errors for Netlify deployment

- Add resolve.alias configuration for @/ path resolution
- Fix PWA plugin workbox configuration to resolve file matching warnings
- Add build optimization with manual chunks for better performance
- All path aliases now properly resolved during build process
- PWA functionality maintained with proper file patterns"
echo Pushing to GitHub...
git push origin main
echo Done! Netlify should now deploy successfully.
echo.
echo The following issues have been fixed:
echo - Rollup path resolution errors (@/ imports)
echo - PWA plugin file matching warnings
echo - Build optimization for better performance
echo.
pause


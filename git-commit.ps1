# Git commit script for TypeScript fixes
Set-Location -Path $PSScriptRoot

Write-Host "Adding all changes..." -ForegroundColor Green
git add .

Write-Host "Committing TypeScript fixes..." -ForegroundColor Green
git commit -m "Fix TypeScript compilation errors for Netlify deployment

- Add @types/google.maps dependency
- Fix Google Maps type references
- Resolve unused variable warnings
- Update tsconfig.json with Google Maps types"

Write-Host "Pushing to GitHub..." -ForegroundColor Green
git push origin main

Write-Host "Done! Netlify should automatically redeploy." -ForegroundColor Yellow

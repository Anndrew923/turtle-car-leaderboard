@echo off
cd /d "%~dp0"
echo Adding all changes...
git add .
echo Committing ultimate TypeScript fixes...
git commit -m "Fix final TypeScript unused variable errors

- Remove unused React import from App.tsx (React 17+ JSX transform)
- Comment out unused LeaderboardItem import in LeaderboardPage.tsx
- Use startDate variable in leaderboard.ts getLeaderboardByPeriod function
- All TypeScript compilation errors should now be completely resolved"
echo Pushing to GitHub...
git push origin main
echo Done! Netlify should now deploy successfully.
pause


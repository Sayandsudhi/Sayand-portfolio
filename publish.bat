@echo off
echo Publishing updates to GitHub and Vercel...
git add .
git diff --cached --quiet && (echo No changes to publish. && pause && exit /b 0)
git commit -m "Update: %date% %time%"
git push origin main
echo.
echo =======================================================
echo Done! Vercel will auto-deploy your changes shortly.
echo =======================================================
pause

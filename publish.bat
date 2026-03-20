@echo off
echo Publishing updates to GitHub and Vercel...
git add .
git commit -m "Auto-deploy update: %date% %time%"
git push origin main
echo.
echo =======================================================
echo Success! Vercel is now automatically building your site.
echo =======================================================
pause

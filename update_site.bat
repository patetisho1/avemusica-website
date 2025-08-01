@echo off
echo ========================================
echo    Update and Deploy Site Changes
echo ========================================
echo.

REM Check if git is initialized
if not exist ".git" (
    echo ❌ Git repository not found!
    echo Please follow the GitHub setup guide first.
    pause
    exit /b 1
)

echo 🔍 Checking for changes...
git status

echo.
echo 📝 Enter a commit message describing your changes:
set /p commit_message="Commit message: "

if "%commit_message%"=="" (
    echo ❌ Commit message cannot be empty!
    pause
    exit /b 1
)

echo.
echo 📦 Adding all changes to git...
git add .

echo.
echo 💾 Committing changes...
git commit -m "%commit_message%"

echo.
echo 🚀 Pushing to GitHub...
git push origin main

echo.
echo ========================================
echo ✅ Changes pushed to GitHub!
echo ========================================
echo.
echo Your hosting platform will automatically:
echo - Detect the changes
echo - Start a new deployment
echo - Update your live site in 2-5 minutes
echo.
echo 🌐 Check your hosting platform dashboard
echo to monitor the deployment progress.
echo.
pause 
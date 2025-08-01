@echo off
echo ========================================
echo    Second Flask Application
echo ========================================
echo.
echo Starting the second Flask app...
echo.

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Python is not installed or not in PATH
    echo Please install Python from https://python.org
    pause
    exit /b 1
)

echo.
echo ========================================
echo    Second App is starting...
echo ========================================
echo.
echo   Second App: http://localhost:5001
echo.
echo   Main Store: http://localhost:5000 (if running)
echo.
echo ========================================
echo Press Ctrl+C to stop the server
echo ========================================
echo.

python app2.py

pause 
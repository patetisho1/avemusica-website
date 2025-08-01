@echo off
echo ========================================
echo    Artisan Woodworks E-commerce
echo ========================================
echo.
echo Starting the woodworking e-commerce site...
echo.

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Python is not installed or not in PATH
    echo Please install Python from https://python.org
    pause
    exit /b 1
)

REM Install requirements if needed
echo Installing required packages...
pip install -r requirements.txt

echo.
echo ========================================
echo    Site is starting...
echo ========================================
echo.
echo   Main store: http://localhost:5000
echo.
echo   Admin panel: http://localhost:5000/admin/login
echo   Username: admin
echo   Password: admin123
echo.
echo ========================================
echo Press Ctrl+C to stop the server
echo ========================================
echo.

python app.py

pause 
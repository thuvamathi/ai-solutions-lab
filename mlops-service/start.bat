@echo off
REM MLOps Service Startup Script for Windows with Prometheus
REM Lab 2: AI Lifecycle & MLOps Integration

echo 🚀 Starting MLOps Service with Prometheus
echo =========================================

REM Get the directory where this script is located
cd /d "%~dp0"

echo 📁 Working directory: %CD%

REM Check if we're in the right directory
if not exist "app.py" (
    echo ❌ app.py not found in current directory.
    echo 💡 Make sure you're running this from the mlops-service folder.
    pause
    exit /b 1
)

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Python is not installed or not in PATH.
    echo 💡 Please install Python 3.8 or higher from python.org
    pause
    exit /b 1
)

REM Create virtual environment if it doesn't exist
if not exist "venv" (
    echo 📦 Creating Python virtual environment...
    python -m venv venv
)

REM Activate virtual environment
echo 🔧 Activating virtual environment...
call venv\Scripts\activate.bat

REM Upgrade pip first
echo ⬆️  Upgrading pip...
python -m pip install --upgrade pip

REM Install dependencies
echo 📚 Installing Python dependencies...
pip install -r requirements.txt

REM Load environment variables
if exist ".env" (
    echo 🔑 Environment file found (.env)
    echo ⚠️  Note: Windows batch doesn't auto-load .env files
    echo 💡 Make sure your DATABASE_URL is set correctly in .env
) else (
    echo ⚠️  No .env file found. Using default configuration.
)

echo.
echo ✅ Setup complete!
echo.
echo 🎯 MLOps Service will track:
echo    • Conversation metrics (response time, success rate)
echo    • AI performance (token usage, API costs)
echo    • Business metrics (appointment conversion rate)
echo.
REM Set default ports (can be overridden by environment variables)
if not defined SERVICE_PORT set SERVICE_PORT=5001
if not defined PROMETHEUS_PORT set PROMETHEUS_PORT=8001

echo 🌐 Service endpoints:
echo    • Flask API: http://localhost:%SERVICE_PORT%
echo    • Health check: http://localhost:%SERVICE_PORT%/health
echo    • Prometheus metrics: http://localhost:%SERVICE_PORT%/metrics
echo    • Analytics: http://localhost:%SERVICE_PORT%/analytics/^<business_id^>
echo.
echo 📊 Prometheus monitoring:
echo    • Metrics server: http://localhost:%PROMETHEUS_PORT%/metrics
echo    • Real-time dashboards available
echo    • Industry-standard monitoring
echo.
echo 🔄 Press Ctrl+C to stop the service
echo.

REM Start Flask application
python app.py

pause
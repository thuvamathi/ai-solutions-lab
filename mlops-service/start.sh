#!/bin/bash

# MLOps Service Startup Script with Prometheus
# Lab 2: AI Lifecycle & MLOps Integration

echo "🚀 Starting MLOps Service with Prometheus"
echo "========================================="

# Get the directory where this script is located
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

echo "📁 Working directory: $SCRIPT_DIR"

# Check if we're in the right directory
if [ ! -f "app.py" ]; then
    echo "❌ app.py not found in current directory. Please run this script from the mlops-service folder."
    exit 1
fi

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install Python 3.8 or higher."
    exit 1
fi

# Create virtual environment if it doesn't exist
if [ ! -d "venv" ]; then
    echo "📦 Creating Python virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
echo "🔧 Activating virtual environment..."
source venv/bin/activate

# Verify virtual environment is active
if [[ "$VIRTUAL_ENV" != "" ]]; then
    echo "✅ Virtual environment activated: $VIRTUAL_ENV"
else
    echo "❌ Failed to activate virtual environment"
    exit 1
fi

# Upgrade pip first
echo "⬆️  Upgrading pip..."
pip install --upgrade pip

# Install dependencies
echo "📚 Installing Python dependencies..."
pip install -r requirements.txt

# Load environment variables
if [ -f ".env" ]; then
    echo "🔑 Loading environment variables..."
    set -a  # automatically export all variables
    source .env
    set +a  # stop automatically exporting
else
    echo "⚠️  No .env file found. Using default configuration."
fi

echo ""
echo "✅ Setup complete!"
echo ""
echo "🎯 MLOps Service will track:"
echo "   • Conversation metrics (response time, success rate)"
echo "   • AI performance (token usage, API costs)"
echo "   • Business metrics (appointment conversion rate)"
echo ""
SERVICE_PORT=${SERVICE_PORT:-5001}
PROMETHEUS_PORT=${PROMETHEUS_PORT:-8001}

echo "🌐 Service endpoints:"
echo "   • Flask API: http://localhost:$SERVICE_PORT"
echo "   • Health check: http://localhost:$SERVICE_PORT/health"
echo "   • Prometheus metrics: http://localhost:$SERVICE_PORT/metrics"
echo "   • Analytics: http://localhost:$SERVICE_PORT/analytics/<business_id>"
echo ""
echo "📊 Prometheus monitoring:"
echo "   • Metrics server: http://localhost:$PROMETHEUS_PORT/metrics"
echo "   • Real-time dashboards available"
echo "   • Industry-standard monitoring"
echo ""
echo "🔄 Press Ctrl+C to stop the service"
echo ""

# Start Flask application
python app.py
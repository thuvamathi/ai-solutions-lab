import Link from 'next/link'
import { CodeBlock } from '@/components/labs/code-block'

export default function Lab2Page() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4 space-y-2">
            <Link href="/labs" className="inline-block text-sm text-gray-600 hover:text-gray-900">
              ← Labs
            </Link>
            <h1 className="text-lg sm:text-xl font-semibold text-gray-900">Lab 2: AI Lifecycle & MLOps Integration</h1>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Lab Header */}
        <div className="mb-8">
          <div className="grid grid-cols-3 gap-4 p-4 bg-blue-50 border border-blue-200 rounded-lg mb-6">
            <div className="text-center">
              <div className="text-lg font-semibold text-blue-900">3-4 hours</div>
              <div className="text-sm text-blue-700">Duration</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-blue-900">Intermediate</div>
              <div className="text-sm text-blue-700">Level</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-blue-900">Flask + Prometheus</div>
              <div className="text-sm text-blue-700">Technology</div>
            </div>
          </div>
          
          <p className="text-lg text-gray-600">
            Build a Flask MLOps service to track AI performance, integrate Prometheus for metrics monitoring, and implement comprehensive metrics collection for your AI receptionist.
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-gray max-w-none">
          <h2 className="text-2xl font-bold mt-8 mb-6 text-gray-900">Lab Overview</h2>
          
          <p className="mb-4 text-gray-700 leading-relaxed">
            <strong>Time Required:</strong> 3-4 hours<br/>
            <strong>What You'll Do:</strong> Build a Flask MLOps service to track AI performance, integrate Prometheus for metrics monitoring, and implement comprehensive metrics collection for your AI receptionist
          </p>

          <p className="mb-4 text-gray-700 leading-relaxed">
            <strong>Lab Collaborators:</strong>
          </p>
          <ul className="mb-6 ml-6 space-y-2">
            <li className="text-gray-700">Edward Lampoh - Software Developer & Collaborator</li>
            <li className="text-gray-700">Oluwafemi Adebayo, PhD - Academic Professor & Collaborator</li>
          </ul>   
       <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-red-800 mb-2">🚨 Prerequisites Required</h3>
            <p className="text-red-700">
              You must complete Lab 1 and have a working Next.js application before starting Lab 2.
            </p>
          </div>

          <h2 className="text-2xl font-bold mt-10 mb-6 text-gray-900">Prerequisites from Lab 1</h2>
          
          <p className="mb-4 text-gray-700 leading-relaxed">
            <strong>Before starting Lab 2, ensure you completed Lab 1 and have:</strong>
          </p>

          <ul className="mb-6 ml-6 space-y-2">
            <li className="text-gray-700">Working Next.js app running at http://localhost:3000</li>
            <li className="text-gray-700">Environment file (.env) with these keys configured:</li>
          </ul>

          <CodeBlock language="env">{`DATABASE_URL="your_neon_connection_string"
GOOGLE_GENERATIVE_AI_API_KEY="your_gemini_api_key"`}</CodeBlock>

          <ul className="mb-6 ml-6 space-y-2">
            <li className="text-gray-700">Neon database connected and working (test by creating a business in the app)</li>
            <li className="text-gray-700">Chat functionality working (you can ask questions and get AI responses)</li>
            <li className="text-gray-700">Appointment booking working (AI can transition to booking mode)</li>
          </ul>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <h4 className="font-semibold text-blue-800 mb-2">🔍 Quick Test</h4>
            <ol className="text-blue-700 space-y-1">
              <li>1. Go to http://localhost:3000</li>
              <li>2. Create a test business</li>
              <li>3. Chat with the AI and try booking an appointment</li>
              <li>4. If this works, you're ready for Lab 2!</li>
            </ol>
          </div>

          <h2 className="text-2xl font-bold mt-10 mb-6 text-gray-900">Complete Database Setup</h2>
          
          <p className="mb-4 text-gray-700 leading-relaxed">
            If you haven't set up Neon database yet, follow these steps:
          </p>

          <h3 className="text-xl font-semibold mt-8 mb-4 text-gray-900">Step 1: Create Neon Database (If Not Done)</h3>
          
          <ol className="mb-6 ml-6 space-y-2">
            <li className="text-gray-700"><strong>Go to <a href="https://neon.tech" className="text-blue-600 hover:text-blue-800 underline" target="_blank">neon.tech</a></strong> and sign up for free</li>
            <li className="text-gray-700"><strong>Create a new project</strong> called "ai-appointment-setter"</li>
            <li className="text-gray-700"><strong>Copy your connection string</strong> from the dashboard</li>
            <li className="text-gray-700"><strong>Add to your .env file:</strong></li>
          </ol>

          <CodeBlock language="env">{`DATABASE_URL="postgresql://username:password@host/database?sslmode=require"`}</CodeBlock>

          <h3 className="text-xl font-semibold mt-8 mb-4 text-gray-900">Step 2: Create Required Tables</h3>
          
          <p className="mb-4 text-gray-700 leading-relaxed">
            <strong>You need BOTH tables for Lab 2 to work:</strong>
          </p>

          <h4 className="text-lg font-semibold mt-6 mb-3 text-gray-900">Option A: Use the SQL files (Recommended)</h4>
          
          <CodeBlock language="bash">{`# Check if you have the SQL files
ls scripts/
# You should see: create-tables.sql and create-metrics-table.sql

# View the main tables SQL
cat scripts/create-tables.sql

# View the metrics table SQL  
cat scripts/create-metrics-table.sql`}</CodeBlock>

          <h4 className="text-lg font-semibold mt-6 mb-3 text-gray-900">Option B: Copy-paste this SQL</h4>
          
          <p className="mb-4 text-gray-700 leading-relaxed">
            <strong>Go to your Neon database console and run BOTH scripts:</strong>
          </p>

          <p className="mb-2 text-gray-700 leading-relaxed">
            <strong>First, create the main tables (if not done in Lab 1):</strong>
          </p>
          <CodeBlock language="sql">{`-- Main application tables (from Lab 1) - Copy from scripts/create-tables.sql
-- This creates: businesses, documents, conversations, messages, appointments, business_settings
-- Run the entire contents of scripts/create-tables.sql in your Neon console`}</CodeBlock>

          <p className="mb-2 text-gray-700 leading-relaxed">
            <strong>Then, create the metrics table for Lab 2:</strong>
          </p>          <
CodeBlock language="sql">{`-- Create AI Metrics table for MLOps tracking
CREATE TABLE IF NOT EXISTS ai_metrics (
    id SERIAL PRIMARY KEY,
    business_id VARCHAR(255) NOT NULL,
    conversation_id VARCHAR(255),
    session_id VARCHAR(255) NOT NULL,
    
    -- Performance metrics
    response_time_ms INTEGER NOT NULL,
    success_rate DECIMAL(5,4) NOT NULL,
    
    -- AI performance metrics
    tokens_used INTEGER NOT NULL,
    prompt_tokens INTEGER,
    completion_tokens INTEGER,
    api_cost_usd DECIMAL(10,6) NOT NULL,
    model_name VARCHAR(100) NOT NULL,
    
    -- Business metrics
    intent_detected VARCHAR(50) NOT NULL,
    appointment_requested BOOLEAN DEFAULT FALSE,
    human_handoff_requested BOOLEAN DEFAULT FALSE,
    appointment_booked BOOLEAN DEFAULT FALSE,
    
    -- Message metrics
    user_message_length INTEGER NOT NULL,
    ai_response_length INTEGER NOT NULL,
    response_type VARCHAR(50) NOT NULL,
    
    -- Timestamp
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_ai_metrics_business_id ON ai_metrics(business_id);
CREATE INDEX IF NOT EXISTS idx_ai_metrics_created_at ON ai_metrics(created_at);`}</CodeBlock>

          <h3 className="text-xl font-semibold mt-8 mb-4 text-gray-900">Step 3: Verify Database Setup</h3>
          
          <p className="mb-2 text-gray-700 leading-relaxed">
            <strong>Test your database connection:</strong>
          </p>

          <CodeBlock language="sql">{`-- Check if all tables exist
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;

-- You should see: appointments, ai_metrics, businesses`}</CodeBlock>

          <p className="mb-2 text-gray-700 leading-relaxed">
            <strong>Test inserting data:</strong>
          </p>
          <CodeBlock language="sql">{`-- Test businesses table
INSERT INTO businesses (name, industry, description) 
VALUES ('Test Business', 'Healthcare', 'Test description');

-- Check it worked
SELECT * FROM businesses WHERE name = 'Test Business';

-- Test ai_metrics table structure
SELECT column_name, data_type FROM information_schema.columns 
WHERE table_name = 'ai_metrics' 
ORDER BY ordinal_position;`}</CodeBlock>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <h4 className="font-semibold text-green-800 mb-2">✅ Success indicators:</h4>
            <ul className="text-green-700 space-y-1">
              <li>• All 3 tables exist (businesses, appointments, ai_metrics)</li>
              <li>• You can insert and select from businesses table</li>
              <li>• ai_metrics table has all required columns</li>
            </ul>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <h4 className="font-semibold text-yellow-800 mb-2">❌ Still having issues?</h4>
            <ul className="text-yellow-700 space-y-1">
              <li>• Check your DATABASE_URL format includes <code className="bg-white px-1 py-0.5 rounded text-sm font-mono">?sslmode=require</code></li>
              <li>• Ensure you're using the correct database name from Neon</li>
              <li>• Try refreshing your Neon console and running SQL again</li>
            </ul>
          </div>

          <h3 className="text-xl font-semibold mt-8 mb-4 text-gray-900">Step 4: Environment Configuration Check</h3>
          
          <p className="mb-2 text-gray-700 leading-relaxed">
            <strong>Ensure your main .env file has:</strong>
          </p>
          <CodeBlock language="env">{`# Required for Lab 2
DATABASE_URL="postgresql://username:password@host/database?sslmode=require"
GOOGLE_GENERATIVE_AI_API_KEY="your_gemini_api_key"

# Optional but recommended
NEXTAUTH_SECRET="your_secret_here"
NEXTAUTH_URL="http://localhost:3000"`}</CodeBlock>

          <p className="mb-2 text-gray-700 leading-relaxed">
            <strong>Test your Next.js app works:</strong>
          </p>
          <CodeBlock language="bash">{`# Start your Next.js app
npm run dev

# Go to http://localhost:3000
# Create a test business
# Try chatting with the AI
# Try booking an appointment`}</CodeBlock>    
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <h4 className="font-semibold text-blue-800 mb-2">🎯 Pre-Lab 2 Checklist</h4>
            <p className="text-blue-700 mb-2">Before starting Part A, verify you have:</p>
            <ul className="text-blue-700 space-y-1 text-sm">
              <li>✓ Neon database created and accessible</li>
              <li>✓ All tables created (businesses, appointments, ai_metrics, etc.)</li>
              <li>✓ DATABASE_URL in your .env file working</li>
              <li>✓ Next.js app running at http://localhost:3000</li>
              <li>✓ AI chat responding to messages</li>
              <li>✓ Appointment booking working in the chat</li>
            </ul>
          </div>

          <p className="mb-2 text-gray-700 leading-relaxed">
            <strong>Quick test command:</strong>
          </p>
          <CodeBlock language="bash">{`# Test your complete database setup
node scripts/test-database-connection.js`}</CodeBlock>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
            <h4 className="font-semibold mb-2">This test will verify:</h4>
            <ul className="text-gray-700 space-y-1 text-sm">
              <li>• Database connection works</li>
              <li>• All required tables exist</li>
              <li>• ai_metrics table has correct structure</li>
              <li>• You can insert and read data</li>
            </ul>
          </div>

          <p className="mb-6 text-gray-700 leading-relaxed">
            <strong>All checked?</strong> → Start Part A<br/>
            <strong>Issues?</strong> → Fix the failing items above first
          </p>

          <h2 className="text-2xl font-bold mt-10 mb-6 text-gray-900">Part A: Build Flask MLOps Service</h2>
          
          <p className="mb-6 text-gray-700 leading-relaxed italic">
            You'll create a separate Python service that tracks how well your AI is performing
          </p>

          <h3 className="text-xl font-semibold mt-8 mb-4 text-gray-900">1. Create Project Structure</h3>
          
          <p className="mb-4 text-gray-700 leading-relaxed">
            <strong>Create the MLOps service folder:</strong>
          </p>

          <p className="mb-2 text-gray-700 leading-relaxed">
            <strong>Windows:</strong>
          </p>
          <CodeBlock language="cmd">{`# In your project root directory
mkdir mlops-service
cd mlops-service`}</CodeBlock>

          <p className="mb-2 text-gray-700 leading-relaxed">
            <strong>Mac/Linux:</strong>
          </p>
          <CodeBlock language="bash">{`# In your project root directory
mkdir mlops-service
cd mlops-service`}</CodeBlock>

          <p className="mb-4 text-gray-700 leading-relaxed">
            <strong>Create the basic file structure:</strong>
          </p>

          <p className="mb-2 text-gray-700 leading-relaxed">
            <strong>Windows:</strong>
          </p>
          <CodeBlock language="cmd">{`# Create these files (we'll fill them in step by step)
echo. > app.py
echo. > requirements.txt
echo. > .env
echo. > start.bat`}</CodeBlock>

          <p className="mb-2 text-gray-700 leading-relaxed">
            <strong>Mac/Linux:</strong>
          </p>
          <CodeBlock language="bash">{`# Create these files (we'll fill them in step by step)
touch app.py
touch requirements.txt
touch .env
touch start.sh`}</CodeBlock>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
            <h4 className="font-semibold mb-2">Your folder should now look like:</h4>
            <CodeBlock language="text">{`mlops-service/
├── app.py          # Main Flask application
├── requirements.txt # Python dependencies
├── .env            # Environment variables
└── start.sh        # Startup script`}</CodeBlock>
          </div>

          <h3 className="text-xl font-semibold mt-8 mb-4 text-gray-900">2. Set Up Python Dependencies</h3>
          
          <p className="mb-2 text-gray-700 leading-relaxed">
            <strong>Create requirements.txt:</strong>
          </p>

          <CodeBlock language="txt">{`# Flask MLOps Service Dependencies
# Core Flask dependencies
Flask==3.0.0
Flask-CORS==4.0.0

# Prometheus for metrics monitoring
prometheus-client==0.19.0

# Database connectivity
psycopg2-binary==2.9.9

# Additional utilities
python-dotenv==1.0.0
requests==2.31.0`}</CodeBlock>       
   <p className="mb-4 text-gray-700 leading-relaxed">
            <strong>Create Python virtual environment:</strong>
          </p>

          <p className="mb-2 text-gray-700 leading-relaxed">
            <strong>Windows:</strong>
          </p>
          <CodeBlock language="cmd">{`# Create virtual environment
python -m venv venv

# Activate it
venv\\Scripts\\activate

# Install dependencies
pip install -r requirements.txt`}</CodeBlock>

          <p className="mb-2 text-gray-700 leading-relaxed">
            <strong>Mac/Linux:</strong>
          </p>
          <CodeBlock language="bash">{`# Create virtual environment
python3 -m venv venv

# Activate it
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt`}</CodeBlock>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <p className="text-green-800">
              <strong>✅ Success Check:</strong> Run <code className="bg-white px-1 py-0.5 rounded text-sm font-mono">pip list</code> - you should see Flask, prometheus-client, and other packages installed.
            </p>
          </div>

          <h3 className="text-xl font-semibold mt-8 mb-4 text-gray-900">3. Configure Environment Variables</h3>
          
          <p className="mb-2 text-gray-700 leading-relaxed">
            <strong>Create .env file:</strong>
          </p>

          <CodeBlock language="env">{`# Database Configuration (same as your Next.js app)
DATABASE_URL=your_neon_database_url_here

# Flask Configuration
FLASK_ENV=development
FLASK_DEBUG=True

# Service Configuration
ENVIRONMENT=development
SERVICE_PORT=5001
PROMETHEUS_PORT=8001`}</CodeBlock>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <h4 className="font-semibold text-yellow-800 mb-2">🔑 Important Steps:</h4>
            <ol className="text-yellow-700 space-y-1">
              <li>1. <strong>Copy your DATABASE_URL</strong> from your main project .env file</li>
              <li>2. <strong>Use the EXACT same connection string</strong> - this connects to the same Neon database</li>
              <li>3. <strong>Keep the quotes</strong> around the DATABASE_URL value</li>
            </ol>
          </div>

          <p className="mb-2 text-gray-700 leading-relaxed">
            <strong>How to Copy:</strong>
          </p>
          <CodeBlock language="bash">{`# In your main project directory, show your DATABASE_URL
cat .env | grep DATABASE_URL

# Copy that exact line to mlops-service/.env`}</CodeBlock>

          <h3 className="text-xl font-semibold mt-8 mb-4 text-gray-900">4. Build the Flask Application</h3>
          
          <p className="mb-2 text-gray-700 leading-relaxed">
            <strong>Create app.py - Start with imports and setup:</strong>
          </p>

          <CodeBlock language="python">{`"""
Flask MLOps Service for AI Appointment Setter
This service tracks AI performance metrics and stores them for analysis
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
from prometheus_client import Counter, Histogram, Gauge, generate_latest, CONTENT_TYPE_LATEST
import os
import json
import time
from datetime import datetime
import logging
import psycopg2
from psycopg2.extras import RealDictCursor

# Configure logging so we can see what's happening
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Allow requests from Next.js app

# Database connection
DATABASE_URL = os.getenv('DATABASE_URL')`}</CodeBlock>

          <p className="mb-2 text-gray-700 leading-relaxed">
            <strong>Add database functions:</strong>
          </p>

          <CodeBlock language="python">{`def fetch_metrics_from_db() -> bool:
    """
    Fetch metrics directly from Neon database using HTTP API
    This avoids psycopg2 dependency while accessing the database directly
    """
    try:
        if not DATABASE_URL:
            logger.warning("DATABASE_URL not configured, skipping metrics fetch")
            return False
        
        logger.info("Fetching historical metrics directly from Neon database...")
        
        # For Lab 2, we'll start with fresh metrics and implement full DB fetch in later labs
        # This ensures the service works immediately without complex DB setup
        logger.info("Starting with fresh Prometheus metrics (full DB integration in later labs)")
        return True
        
    except Exception as e:
        logger.error(f"Error fetching metrics from database: {e}")
        return False

def store_metrics_in_db(metrics_data):
    """
    Store metrics (handled by Next.js side to avoid psycopg2 installation issues)
    
    Args:
        metrics_data: Dictionary containing all metrics
        
    Returns:
        True (Next.js handles database storage)
    """
    try:
        # Log the metrics data for debugging
        logger.info(f"Processed metrics for business {metrics_data.get('business_id')}")
        
        # Database storage is handled by Next.js side
        # Next.js already stores the metrics when trackMetrics() is called
        return True
    except Exception as e:
        logger.error(f"Error processing metrics: {e}")
        return False`}</CodeBlock>    
      <p className="mb-2 text-gray-700 leading-relaxed">
            <strong>Add your first endpoint - health check:</strong>
          </p>

          <CodeBlock language="python">{`@app.route('/health', methods=['GET'])
def health_check():
    """Check if our service is running properly"""
    return jsonify({
        'status': 'healthy',
        'service': 'mlops-service',
        'timestamp': datetime.utcnow().isoformat(),
        'monitoring': 'prometheus'
    })`}</CodeBlock>

          <p className="mb-2 text-gray-700 leading-relaxed">
            <strong>Add the main metrics tracking endpoint:</strong>
          </p>

          <CodeBlock language="python">{`@app.route('/track', methods=['POST'])
def track_metrics():
    """Receive metrics from the Next.js chat application"""
    try:
        # Get the metrics data sent from Next.js
        metrics_data = request.get_json()

        if not metrics_data:
            return jsonify({'error': 'No metrics data provided'}), 400

        # Make sure we have the essential data
        required_fields = ['business_id', 'response_time_ms', 'tokens_used']
        for field in required_fields:
            if field not in metrics_data:
                return jsonify({'error': f'Missing required field: {field}'}), 400

        # Store metrics in database
        success = store_metrics_in_db(metrics_data)

        if success:
            logger.info(f"Successfully tracked metrics for business {metrics_data.get('business_id')}")
            return jsonify({
                'status': 'success',
                'message': 'Metrics tracked successfully',
                'timestamp': datetime.utcnow().isoformat()
            })
        else:
            return jsonify({'error': 'Failed to store metrics'}), 500

    except Exception as e:
        logger.error(f"Error tracking metrics: {e}")
        return jsonify({'error': 'Internal server error'}), 500`}</CodeBlock>

          <p className="mb-2 text-gray-700 leading-relaxed">
            <strong>Add the Flask app runner:</strong>
          </p>

          <CodeBlock language="python">{`if __name__ == '__main__':
    # Run the Flask app
    app.run(host='0.0.0.0', port=5001, debug=True)`}</CodeBlock>

          <h3 className="text-xl font-semibold mt-8 mb-4 text-gray-900">5. Create Startup Script</h3>
          
          <p className="mb-2 text-gray-700 leading-relaxed">
            <strong>Create start.sh:</strong>
          </p>

          <CodeBlock language="bash">{`#!/bin/bash

echo "🚀 Starting MLOps Service for AI Appointment Setter"
echo "=================================================="

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

# Install dependencies
echo "📚 Installing Python dependencies..."
pip install -r requirements.txt

# Create metrics directory for Prometheus
mkdir -p metrics

echo "✅ Setup complete!"
echo "🌐 Service will be available at: http://localhost:5001"
echo "Starting Flask application..."

# Start Flask application
python app.py`}</CodeBlock>

          <p className="mb-2 text-gray-700 leading-relaxed">
            <strong>Make it executable:</strong>
          </p>
          <CodeBlock language="bash">{`chmod +x start.sh`}</CodeBlock>

          <h3 className="text-xl font-semibold mt-8 mb-4 text-gray-900">6. Test Your Flask Service</h3>
          
          <p className="mb-4 text-gray-700 leading-relaxed">
            <strong>Start the service:</strong>
          </p>

          <p className="mb-2 text-gray-700 leading-relaxed">
            <strong>Windows:</strong>
          </p>
          <CodeBlock language="cmd">{`start.bat`}</CodeBlock>

          <p className="mb-2 text-gray-700 leading-relaxed">
            <strong>Mac/Linux:</strong>
          </p>
          <CodeBlock language="bash">{`./start.sh`}</CodeBlock>

          <p className="mb-2 text-gray-700 leading-relaxed">
            <strong>Test the health endpoint:</strong>
          </p>
          <CodeBlock language="bash">{`# In a new terminal
curl http://localhost:5001/health`}</CodeBlock>

          <p className="mb-2 text-gray-700 leading-relaxed">
            <strong>You should see:</strong>
          </p>
          <CodeBlock language="json">{`{
  "status": "healthy",
  "service": "mlops-service",
  "timestamp": "2024-01-15T10:30:00.000000",
  "monitoring": "prometheus"
}`}</CodeBlock>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <p className="text-green-800">
              <strong>✅ Success Check:</strong> If you see the healthy response, your Flask service is working!
            </p>
          </div>     
     <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <h4 className="font-semibold text-yellow-800 mb-2">Part A Completion Check</h4>
            <p className="text-yellow-700 mb-2">Before proceeding to Part B, ensure you have:</p>
            <ul className="text-yellow-700 space-y-1 text-sm">
              <li>✓ Flask service folder created with all files</li>
              <li>✓ Python virtual environment set up</li>
              <li>✓ Dependencies installed successfully</li>
              <li>✓ Environment variables configured</li>
              <li>✓ Flask app runs without errors</li>
              <li>✓ Health endpoint returns successful response</li>
              <li>✓ Database table created (check logs for "Metrics table created successfully")</li>
            </ul>
            <p className="text-yellow-700 mt-2 text-sm">
              <strong>Have all 7 items checked?</strong> → Proceed to Part B<br/>
              <strong>Missing something?</strong> → Complete the missing steps above
            </p>
          </div>

          <h2 className="text-2xl font-bold mt-10 mb-6 text-gray-900">Part B: Integrate Prometheus Monitoring</h2>
          
          <p className="mb-6 text-gray-700 leading-relaxed italic">
            Prometheus helps us track real-time metrics and see how our AI is performing over time
          </p>

          <h3 className="text-xl font-semibold mt-8 mb-4 text-gray-900">1. Set Up Prometheus Metrics</h3>
          
          <p className="mb-2 text-gray-700 leading-relaxed">
            <strong>Add Prometheus setup to your app.py (after the imports):</strong>
          </p>

          <CodeBlock language="python">{`# Prometheus Metrics Setup
from prometheus_client import Counter, Histogram, Gauge, generate_latest, CONTENT_TYPE_LATEST

# Define Prometheus metrics
ai_requests_total = Counter('ai_requests_total', 'Total AI requests', ['business_id', 'intent', 'response_type'])
ai_response_time_seconds = Histogram('ai_response_time_seconds', 'AI response time in seconds', ['business_id'])
ai_tokens_used_total = Counter('ai_tokens_used_total', 'Total tokens used', ['business_id', 'model'])
ai_api_cost_usd_total = Counter('ai_api_cost_usd_total', 'Total API cost in USD', ['business_id'])
appointments_requested_total = Counter('appointments_requested_total', 'Total appointment requests', ['business_id'])
human_handoffs_total = Counter('human_handoffs_total', 'Total human handoff requests', ['business_id'])

logger.info("Prometheus metrics initialized successfully")`}</CodeBlock>

          <h3 className="text-xl font-semibold mt-8 mb-4 text-gray-900">2. Create Prometheus Metrics Endpoint</h3>
          
          <p className="mb-2 text-gray-700 leading-relaxed">
            <strong>Add this endpoint to your app.py:</strong>
          </p>

          <CodeBlock language="python">{`@app.route('/metrics', methods=['GET'])
def prometheus_metrics():
    """Prometheus metrics endpoint - industry standard format"""
    try:
        return generate_latest(), 200, {'Content-Type': CONTENT_TYPE_LATEST}
    except Exception as e:
        logger.error(f"Error generating Prometheus metrics: {e}")
        return jsonify({'error': 'Failed to generate metrics'}), 500`}</CodeBlock>

          <h3 className="text-xl font-semibold mt-8 mb-4 text-gray-900">3. Create Prometheus Logging Function</h3>
          
          <p className="mb-2 text-gray-700 leading-relaxed">
            <strong>Add this function to your app.py:</strong>
          </p>

          <CodeBlock language="python">{`def update_prometheus_metrics(metrics_data):
    """Update Prometheus metrics with new data"""
    try:
        business_id = metrics_data.get('business_id', 'unknown')

        # Update request counter
        ai_requests_total.labels(
            business_id=business_id,
            intent=metrics_data.get('intent_detected', 'unknown'),
            response_type=metrics_data.get('response_type', 'unknown')
        ).inc()

        # Update response time histogram
        if 'response_time_ms' in metrics_data:
            response_time_seconds = metrics_data['response_time_ms'] / 1000.0
            ai_response_time_seconds.labels(business_id=business_id).observe(response_time_seconds)

        # Update token usage
        if 'tokens_used' in metrics_data:
            ai_tokens_used_total.labels(
                business_id=business_id,
                model=metrics_data.get('model_name', 'gemini-1.5-flash')
            ).inc(metrics_data['tokens_used'])

        # Update API cost
        if 'api_cost_usd' in metrics_data:
            ai_api_cost_usd_total.labels(business_id=business_id).inc(metrics_data['api_cost_usd'])

        # Update business metrics
        if metrics_data.get('appointment_requested', False):
            appointments_requested_total.labels(business_id=business_id).inc()

        if metrics_data.get('human_handoff_requested', False):
            human_handoffs_total.labels(business_id=business_id).inc()

        logger.info(f"Successfully updated Prometheus metrics for business {business_id}")
        return True

    except Exception as e:
        logger.error(f"Error updating Prometheus metrics: {e}")
        return False`}</CodeBlock> 
         <h3 className="text-xl font-semibold mt-8 mb-4 text-gray-900">4. Update Your Tracking Endpoint</h3>
          
          <p className="mb-2 text-gray-700 leading-relaxed">
            <strong>Modify the track_metrics() function to include Prometheus:</strong>
          </p>

          <CodeBlock language="python">{`@app.route('/track', methods=['POST'])
def track_metrics():
    """Receive metrics from the Next.js chat application"""
    try:
        metrics_data = request.get_json()

        if not metrics_data:
            return jsonify({'error': 'No metrics data provided'}), 400

        # Validate required fields
        required_fields = ['business_id', 'response_time_ms', 'tokens_used']
        for field in required_fields:
            if field not in metrics_data:
                return jsonify({'error': f'Missing required field: {field}'}), 400

        # Update Prometheus metrics first
        prometheus_success = update_prometheus_metrics(metrics_data)

        # Store in database
        db_success = store_metrics_in_db(metrics_data)

        if db_success and prometheus_success:
            logger.info(f"Successfully tracked metrics for business {metrics_data.get('business_id')}")
            return jsonify({
                'status': 'success',
                'message': 'Metrics tracked successfully',
                'prometheus_updated': prometheus_success,
                'timestamp': datetime.utcnow().isoformat()
            })
        else:
            return jsonify({'error': 'Failed to store metrics'}), 500

    except Exception as e:
        logger.error(f"Error tracking metrics: {e}")
        return jsonify({'error': 'Internal server error'}), 500`}</CodeBlock>

          <h3 className="text-xl font-semibold mt-8 mb-4 text-gray-900">5. Test Prometheus Integration</h3>
          
          <p className="mb-2 text-gray-700 leading-relaxed">
            <strong>Send test metrics to your service:</strong>
          </p>

          <CodeBlock language="bash">{`curl -X POST http://localhost:5001/track \\
  -H "Content-Type: application/json" \\
  -d '{
    "business_id": "test-business",
    "conversation_id": "conv-123",
    "session_id": "session-456",
    "response_time_ms": 1500,
    "tokens_used": 150,
    "api_cost_usd": 0.002,
    "intent_detected": "general",
    "appointment_requested": false,
    "user_message_length": 45,
    "ai_response_length": 120,
    "response_type": "text"
  }'`}</CodeBlock>

          <p className="mb-2 text-gray-700 leading-relaxed">
            <strong>Check Prometheus metrics:</strong>
          </p>

          <CodeBlock language="bash">{`curl http://localhost:5001/metrics`}</CodeBlock>

          <p className="mb-2 text-gray-700 leading-relaxed">
            <strong>You should see metrics like:</strong>
          </p>

          <CodeBlock language="text">{`# HELP ai_requests_total Total AI requests
# TYPE ai_requests_total counter
ai_requests_total{business_id="test-business",intent="general",response_type="text"} 1.0

# HELP ai_response_time_seconds AI response time in seconds
# TYPE ai_response_time_seconds histogram
ai_response_time_seconds_bucket{business_id="test-business",le="0.005"} 0.0
ai_response_time_seconds_bucket{business_id="test-business",le="1.5"} 1.0`}</CodeBlock>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <h4 className="font-semibold text-blue-800 mb-2">💡 What is Prometheus?</h4>
            <p className="text-blue-700 mb-2">Prometheus is an industry-standard monitoring system that tracks:</p>
            <ul className="text-blue-700 space-y-1">
              <li>• How fast your AI responds (real-time metrics)</li>
              <li>• How much each conversation costs</li>
              <li>• Which conversations lead to appointments</li>
              <li>• Performance trends over time</li>
              <li>• System health and reliability</li>
            </ul>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <h4 className="font-semibold text-yellow-800 mb-2">Part B Completion Check</h4>
            <p className="text-yellow-700 mb-2">Before proceeding to Part C, ensure you have:</p>
            <ul className="text-yellow-700 space-y-1 text-sm">
              <li>✓ Prometheus metrics initialized successfully</li>
              <li>✓ Prometheus metrics endpoint working (/metrics)</li>
              <li>✓ Dashboard accessible at http://localhost:5001/</li>
              <li>✓ Prometheus logging function implemented</li>
              <li>✓ Tracking endpoint updated to use Prometheus</li>
              <li>✓ Test metrics appear in /metrics endpoint and dashboard</li>
              <li>✓ Both database and Prometheus receive metrics</li>
            </ul>
            <p className="text-yellow-700 mt-2 text-sm">
              <strong>Have all 7 items checked?</strong> → Proceed to Part C<br/>
              <strong>Missing something?</strong> → Complete the missing steps above
            </p>
          </div>

          <h2 className="text-2xl font-bold mt-10 mb-6 text-gray-900">Part C: Enhance Next.js with Metrics</h2>
          
          <p className="mb-6 text-gray-700 leading-relaxed italic">
            Now we'll modify your Next.js app to send performance data to your Flask service
          </p>

          <h3 className="text-xl font-semibold mt-8 mb-4 text-gray-900">1. Create Metrics Tracking Utilities</h3>
          
          <p className="mb-2 text-gray-700 leading-relaxed">
            <strong>First, add metrics functions to lib/database.ts:</strong>
          </p>     
     <CodeBlock language="typescript">{`// Add this interface to your existing database.ts file
export interface AIMetrics {
  id: string
  business_id: string
  conversation_id?: string
  session_id: string
  
  // Performance metrics
  response_time_ms: number
  success_rate: number
  
  // AI performance metrics
  tokens_used: number
  prompt_tokens?: number
  completion_tokens?: number
  api_cost_usd: number
  model_name: string
  
  // Business metrics
  intent_detected: string
  appointment_requested: boolean
  human_handoff_requested: boolean
  appointment_booked?: boolean
  
  // Message metrics
  user_message_length: number
  ai_response_length: number
  response_type: string
  
  created_at: string
}

// Add these functions to the end of your database.ts file
export async function createAIMetrics(metrics: Omit<AIMetrics, "id" | "created_at">) {
  const result = await sql\`
    INSERT INTO ai_metrics (
      business_id, conversation_id, session_id,
      response_time_ms, success_rate,
      tokens_used, prompt_tokens, completion_tokens, api_cost_usd, model_name,
      intent_detected, appointment_requested, human_handoff_requested, appointment_booked,
      user_message_length, ai_response_length, response_type
    )
    VALUES (
      \${metrics.business_id}, \${metrics.conversation_id}, \${metrics.session_id},
      \${metrics.response_time_ms}, \${metrics.success_rate},
      \${metrics.tokens_used}, \${metrics.prompt_tokens}, \${metrics.completion_tokens}, \${metrics.api_cost_usd}, \${metrics.model_name},
      \${metrics.intent_detected}, \${metrics.appointment_requested}, \${metrics.human_handoff_requested}, \${metrics.appointment_booked || false},
      \${metrics.user_message_length}, \${metrics.ai_response_length}, \${metrics.response_type}
    )
    RETURNING *
  \`
  return result[0] as AIMetrics
}`}</CodeBlock>

          <p className="mb-2 text-gray-700 leading-relaxed">
            <strong>Then, create lib/mlops-tracking.ts:</strong>
          </p>

          <CodeBlock language="typescript">{`/**
 * MLOps Tracking Utilities
 * Functions to calculate and send AI performance metrics
 */

// Types for our metrics data
export interface MetricsData {
  business_id: string;
  conversation_id?: string | undefined;
  session_id: string;
  
  // Performance metrics
  response_time_ms: number;
  success_rate: number;
  user_satisfaction?: number;
  
  // AI performance metrics
  tokens_used: number;
  prompt_tokens?: number;
  completion_tokens?: number;
  api_cost_usd: number;
  model_name: string;
  
  // Business metrics
  intent_detected: string;
  appointment_requested: boolean;
  human_handoff_requested: boolean;
  appointment_booked?: boolean;
  
  // Message metrics
  user_message_length: number;
  ai_response_length: number;
  response_type: string;
}

/**
 * Track metrics by storing in database and sending to MLOps service
 * This runs in the background and won't slow down user responses
 */
export async function trackMetrics(metricsData: MetricsData): Promise<void> {
  try {
    // Import database function dynamically to avoid circular dependencies
    const { createAIMetrics } = await import('@/lib/database');
    
    // Store metrics in database first (for persistence/history)
    await createAIMetrics({
      business_id: metricsData.business_id,
      conversation_id: metricsData.conversation_id,
      session_id: metricsData.session_id,
      response_time_ms: metricsData.response_time_ms,
      success_rate: metricsData.success_rate,
      tokens_used: metricsData.tokens_used,
      prompt_tokens: metricsData.prompt_tokens,
      completion_tokens: metricsData.completion_tokens,
      api_cost_usd: metricsData.api_cost_usd,
      model_name: metricsData.model_name,
      intent_detected: metricsData.intent_detected,
      appointment_requested: metricsData.appointment_requested,
      human_handoff_requested: metricsData.human_handoff_requested,
      appointment_booked: metricsData.appointment_booked,
      user_message_length: metricsData.user_message_length,
      ai_response_length: metricsData.ai_response_length,
      response_type: metricsData.response_type
    });

    // Send metrics to Flask MLOps service (for Prometheus monitoring)
    const mlopsServiceUrl = process.env.MLOPS_SERVICE_URL || 'http://localhost:5001';
    
    const response = await fetch(\`\${mlopsServiceUrl}/track\`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(metricsData),
      signal: AbortSignal.timeout(5000), // 5 second timeout
    });

    if (!response.ok) {
      throw new Error(\`MLOps service responded with status: \${response.status}\`);
    }

    const result = await response.json();
    console.log('Metrics tracked successfully:', result.status);
    
  } catch (error) {
    // Log error but don't throw - we don't want metrics to break user experience
    console.error("Error tracking metrics:", error);
  }
}

/**
 * Calculate how many tokens our AI request used
 * This is an estimation based on text length
 */
export function calculateTokenUsage(
  systemPrompt: string,
  userMessage: string,
  aiResponse: string
) {
  // Rough estimation: 1 token ≈ 4 characters for English text
  const CHARS_PER_TOKEN = 4;

  const systemTokens = Math.ceil(systemPrompt.length / CHARS_PER_TOKEN);
  const userTokens = Math.ceil(userMessage.length / CHARS_PER_TOKEN);
  const responseTokens = Math.ceil(aiResponse.length / CHARS_PER_TOKEN);

  const totalTokens = systemTokens + userTokens + responseTokens;

  return {
    totalTokens,
    systemTokens,
    userTokens,
    responseTokens,
  };
}

/**
 * Estimate how much this AI request cost us
 * Based on Gemini API pricing
 */
export function estimateApiCost(totalTokens: number): number {
  // Gemini 1.5 Flash pricing: roughly $0.1875 per 1M tokens
  const COST_PER_MILLION_TOKENS = 0.1875;

  const costUsd = (totalTokens / 1_000_000) * COST_PER_MILLION_TOKENS;

  // Round to 6 decimal places
  return Math.round(costUsd * 1_000_000) / 1_000_000;
}`}</CodeBlock>   
       <h3 className="text-xl font-semibold mt-8 mb-4 text-gray-900">2. Add MLOps Service URL to Environment</h3>
          
          <p className="mb-2 text-gray-700 leading-relaxed">
            <strong>Add to your main .env file:</strong>
          </p>
          <CodeBlock language="env">{`# Add this line to your existing .env file
MLOPS_SERVICE_URL=http://localhost:5001`}</CodeBlock>

          <h3 className="text-xl font-semibold mt-8 mb-4 text-gray-900">3. Modify Chat API for Metrics Collection</h3>
          
          <p className="mb-2 text-gray-700 leading-relaxed">
            <strong>Update app/api/chat/route.ts - Add imports:</strong>
          </p>

          <CodeBlock language="typescript">{`// Add these imports at the top
import {
  trackMetrics,
  calculateTokenUsage,
  estimateApiCost,
} from "@/lib/mlops-tracking";`}</CodeBlock>

          <p className="mb-2 text-gray-700 leading-relaxed">
            <strong>Add timing at the start of the POST function:</strong>
          </p>

          <CodeBlock language="typescript">{`export async function POST(req: Request) {
  // Start timing for performance metrics
  const startTime = Date.now();

  try {
    const { messages, businessId, conversationId } = await req.json();
    // ... rest of your existing code`}</CodeBlock>

          <p className="mb-2 text-gray-700 leading-relaxed">
            <strong>Add metrics collection after AI response (before the return statement):</strong>
          </p>

          <CodeBlock language="typescript">{`// After you get the AI response, add this before the return statement:

// Calculate performance metrics
const endTime = Date.now();
const responseTimeMs = endTime - startTime;

// Get the last user message for metrics
const lastUserMessage = messages[messages.length - 1];
const userMessageLength = lastUserMessage?.content?.length || 0;
const aiResponseLength = parsedResponse.message.length;

// Calculate token usage and costs
const tokenMetrics = calculateTokenUsage(
  businessContext,
  lastUserMessage?.content || "",
  parsedResponse.message
);
const apiCost = estimateApiCost(tokenMetrics.totalTokens);

// Collect metrics for MLOps tracking
const metricsData = {
  business_id: businessId,
  conversation_id: conversationId,
  session_id: sessionId,

  // Performance metrics
  response_time_ms: responseTimeMs,
  success_rate: 1.0, // Successful response

  // AI performance metrics
  tokens_used: tokenMetrics.totalTokens,
  api_cost_usd: apiCost,
  model_name: "gemini-1.5-flash",

  // Business metrics
  intent_detected: parsedResponse.intent,
  appointment_requested: parsedResponse.type === "appointment_booking",
  human_handoff_requested: parsedResponse.type === "human_handoff",

  // Message metrics
  user_message_length: userMessageLength,
  ai_response_length: aiResponseLength,
  response_type: parsedResponse.type,
};

// Send metrics to MLOps service (non-blocking)
trackMetrics(metricsData).catch((error) => {
  console.error("Failed to track metrics:", error);
  // Don't fail the request if metrics tracking fails
});

// ... your existing return statement`}</CodeBlock>

          <h3 className="text-xl font-semibold mt-8 mb-4 text-gray-900">4. Test the Complete Integration</h3>
          
          <p className="mb-4 text-gray-700 leading-relaxed">
            <strong>Make sure both services are running:</strong>
          </p>

          <ol className="mb-6 ml-6 space-y-2">
            <li className="text-gray-700">Flask MLOps service on port 5001 (or your configured port)</li>
            <li className="text-gray-700">Next.js app on port 3000</li>
          </ol>

          <p className="mb-4 text-gray-700 leading-relaxed">
            <strong>Test the chat:</strong>
          </p>

          <ol className="mb-6 ml-6 space-y-2">
            <li className="text-gray-700">Go to http://localhost:3000</li>
            <li className="text-gray-700">Start a conversation with your AI</li>
            <li className="text-gray-700">Ask a few questions</li>
            <li className="text-gray-700">Try booking an appointment</li>
          </ol>

          <p className="mb-4 text-gray-700 leading-relaxed">
            <strong>Check your metrics:</strong>
          </p>

          <ol className="mb-6 ml-6 space-y-2">
            <li className="text-gray-700">Look at Flask service logs - you should see "Successfully tracked metrics"</li>
            <li className="text-gray-700">Check Prometheus metrics at http://localhost:5001/metrics - you should see updated counters</li>
            <li className="text-gray-700">Each chat message should increment the metrics</li>
          </ol>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <h4 className="font-semibold text-green-800 mb-2">Lab 2 Completion Check</h4>
            <p className="text-green-700 mb-2">Congratulations! Ensure you have:</p>
            <ul className="text-green-700 space-y-1 text-sm">
              <li>✓ MLOps tracking utilities created</li>
              <li>✓ Environment variable added for MLOps service URL</li>
              <li>✓ Chat API modified to collect timing metrics</li>
              <li>✓ Token usage and cost calculation implemented</li>
              <li>✓ Metrics sent to Flask service after each chat</li>
              <li>✓ Error tracking implemented for failed requests</li>
              <li>✓ Chat still works normally (metrics don't break user experience)</li>
              <li>✓ Dashboard shows real-time metrics at http://localhost:5001/</li>
              <li>✓ Raw Prometheus metrics available at http://localhost:5001/metrics</li>
            </ul>
            <p className="text-green-700 mt-2 text-sm">
              <strong>Have all 9 items checked?</strong> → Lab 2 Complete! 🎉<br/>
              <strong>Missing something?</strong> → Complete the missing steps above
            </p>
          </div> 
         <h2 className="text-2xl font-bold mt-10 mb-6 text-gray-900">Lab 2 Summary - What You Built</h2>
          
          <p className="mb-6 text-gray-700 leading-relaxed">
            Congratulations! You've successfully implemented a complete MLOps monitoring system for your AI appointment setter. Here's what you accomplished:
          </p>

          <h3 className="text-xl font-semibold mt-8 mb-4 text-gray-900">✅ Core MLOps Infrastructure</h3>
          
          <ul className="mb-6 ml-6 space-y-2">
            <li className="text-gray-700"><strong>Flask MLOps Service</strong> running on port 5001 with cross-platform compatibility</li>
            <li className="text-gray-700"><strong>Prometheus Metrics Collection</strong> tracking real-time AI performance</li>
            <li className="text-gray-700"><strong>Interactive Dashboard</strong> at http://localhost:5001/ for monitoring</li>
            <li className="text-gray-700"><strong>Database Integration</strong> for historical metrics storage</li>
          </ul>

          <h3 className="text-xl font-semibold mt-8 mb-4 text-gray-900">📊 Metrics You're Now Tracking</h3>
          
          <ul className="mb-6 ml-6 space-y-2">
            <li className="text-gray-700"><strong>AI Performance:</strong> Response times, token usage, API costs</li>
            <li className="text-gray-700"><strong>Business Metrics:</strong> Appointment requests, conversion rates, human handoffs</li>
            <li className="text-gray-700"><strong>System Health:</strong> Service status, error rates, success rates</li>
          </ul>

          <h3 className="text-xl font-semibold mt-8 mb-4 text-gray-900">🔧 Technical Achievements</h3>
          
          <ul className="mb-6 ml-6 space-y-2">
            <li className="text-gray-700"><strong>Cross-Platform Setup:</strong> Works on Windows, Mac, and Linux</li>
            <li className="text-gray-700"><strong>Port Configuration:</strong> Flexible port settings to avoid conflicts</li>
            <li className="text-gray-700"><strong>Real-Time Monitoring:</strong> Live dashboard updates as you chat</li>
            <li className="text-gray-700"><strong>Industry Standards:</strong> Prometheus format compatible with enterprise tools</li>
          </ul>

          <h3 className="text-xl font-semibold mt-8 mb-4 text-gray-900">🚀 What's Next</h3>
          
          <p className="mb-4 text-gray-700 leading-relaxed">
            Your AI system now has professional-grade monitoring! As you chat with your AI:
          </p>

          <ul className="mb-6 ml-6 space-y-2">
            <li className="text-gray-700">Watch metrics update in real-time on the dashboard</li>
            <li className="text-gray-700">Track costs and performance over time</li>
            <li className="text-gray-700">Monitor appointment conversion rates</li>
            <li className="text-gray-700">Identify when human handoffs are needed</li>
          </ul>

          <h3 className="text-xl font-semibold mt-8 mb-4 text-gray-900">🎯 Key URLs to Remember</h3>
          
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
            <ul className="space-y-2">
              <li><strong>Dashboard:</strong> <a href="http://localhost:5001/" className="text-blue-600 hover:text-blue-800 underline" target="_blank">http://localhost:5001/</a> (user-friendly metrics)</li>
              <li><strong>Health Check:</strong> <a href="http://localhost:5001/health" className="text-blue-600 hover:text-blue-800 underline" target="_blank">http://localhost:5001/health</a></li>
              <li><strong>Raw Metrics:</strong> <a href="http://localhost:5001/metrics" className="text-blue-600 hover:text-blue-800 underline" target="_blank">http://localhost:5001/metrics</a> (Prometheus format)</li>
            </ul>
          </div>

          <h3 className="text-xl font-semibold mt-8 mb-4 text-gray-900">📈 MLOps Best Practices Implemented</h3>
          
          <ul className="mb-6 ml-6 space-y-2">
            <li className="text-gray-700">✅ <strong>Observability:</strong> Real-time metrics and monitoring</li>
            <li className="text-gray-700">✅ <strong>Reliability:</strong> Health checks and error tracking</li>
            <li className="text-gray-700">✅ <strong>Cost Management:</strong> API usage and cost tracking</li>
            <li className="text-gray-700">✅ <strong>Performance Monitoring:</strong> Response time and success rate tracking</li>
            <li className="text-gray-700">✅ <strong>Business Intelligence:</strong> Appointment conversion analytics</li>
          </ul>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-blue-800">
              <strong>Note:</strong> We focus on essential monitoring with Prometheus. Your metrics collection provides the valuable insights you need for production AI systems.
            </p>
          </div>

          <h3 className="text-xl font-semibold mt-8 mb-4 text-gray-900">🔍 Troubleshooting & Resources</h3>
          
          <ul className="mb-6 ml-6 space-y-2">
            <li className="text-gray-700"><strong>Issues?</strong> Check <code className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono">mlops-service/TROUBLESHOOTING.md</code></li>
            <li className="text-gray-700"><strong>Testing:</strong> Run <code className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono">python mlops-service/test-simple.py</code></li>
            <li className="text-gray-700"><strong>Port Conflicts:</strong> Edit <code className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono">mlops-service/.env</code> to change ports</li>
          </ul>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <p className="text-green-800">
              <strong>Ready for Lab 3?</strong> You now have a solid MLOps foundation for testing and deployment!
            </p>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
            <h4 className="font-semibold mb-2">🪟 Windows Users - Important Notes</h4>
            <ul className="text-gray-700 space-y-1 text-sm">
              <li>• Use <strong>Command Prompt</strong> or <strong>PowerShell</strong> (not Git Bash for Python commands)</li>
              <li>• Python command is usually <code className="bg-white px-1 py-0.5 rounded text-sm font-mono">python</code> (not <code className="bg-white px-1 py-0.5 rounded text-sm font-mono">python3</code>)</li>
              <li>• Virtual environment activation: <code className="bg-white px-1 py-0.5 rounded text-sm font-mono">venv\\Scripts\\activate</code></li>
              <li>• Use <code className="bg-white px-1 py-0.5 rounded text-sm font-mono">start.bat</code> instead of <code className="bg-white px-1 py-0.5 rounded text-sm font-mono">start.sh</code></li>
              <li>• Dashboard available at http://localhost:5001/ for viewing metrics</li>
            </ul>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-12 pt-8 border-t border-gray-200">
            <div>
              <Link href="/labs/lab1" className="text-blue-600 hover:text-blue-700 font-medium">
                ← Lab 1: Foundation
              </Link>
            </div>
            <div>
              <Link href="/labs" className="text-blue-600 hover:text-blue-700 font-medium">
                Back to Labs →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
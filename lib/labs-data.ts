export interface LabSection {
  id: string;
  title: string;
  content: string;
}

export interface Lab {
  id: string;
  title: string;
  description: string;
  duration: string;
  level: string;
  technology: string;
  sections: LabSection[];
}

export const labs: Lab[] = [
  {
    id: "lab1",
    title: "Lab 1: Environment Setup & Project Introduction",
    description:
      "Create accounts for the services we need, install coding tools on your computer, and get the AI receptionist app running on your machine.",
    duration: "2-3 hours",
    level: "Foundation",
    technology: "Next.js + Setup",
    sections: [
      {
        id: "overview",
        title: "Lab Overview",
        content: `
# Lab 1: Environment Setup & Project Introduction

**Time Required:** 2-3 hours  
**What You'll Do:** Create accounts for the services we need, install coding tools on your computer, and get the AI receptionist app running on your machine

**Lab Collaborators:**
- Edward Lampoh - Software Developer & Collaborator
- Oluwafemi Adebayo, PhD - Academic Professor & Collaborator

## Lab Overview

This lab has 3 main parts. **Complete each part fully before moving to the next.**

### Part A: Create Your Accounts
- Create GitHub account and connect it to Git
- Sign up for Google Gemini API key
- Create AWS account (free tier)
- Sign up for Neon database
- Sign up for Resend email service

### Part B: Install Development Tools
- Install Node.js and npm
- Install Python 3.9+
- Install Git
- Install VS Code

### Part C: Project Setup
- Fork and clone repository
- Install dependencies
- Configure environment variables
- Run application locally
- Test complete flow

*All these services have free tiers - you won't pay anything during this course.*
        `,
      },
      {
        id: "accounts",
        title: "Part A: Create Your Accounts",
        content: `
# Part A: Create Your Accounts

*All these services have free tiers - you won't pay anything during this course.*

## 1. GitHub Setup

**Create Account:**
1. Go to [github.com](https://github.com) and click "Sign up"
2. Use your student email if available (gets you free GitHub Pro features!)
3. Choose a professional username (you'll use this publicly)
4. Verify your email address

**Connect Git to GitHub:**

**Video Tutorials by Platform:**
- **Windows:** [Git & GitHub Setup Tutorial](https://youtu.be/AdzKzlp66sQ?si=_B-0h1qM3OIV3bn5)
- **Mac:** [Git & GitHub Setup for Mac](https://www.youtube.com/watch?v=p0Js7IF17yI)
- **Linux:** [Git & GitHub Setup for Linux](https://www.youtube.com/watch?v=bc3_FL9zWWs)

**Quick Setup Commands:**
\`\`\`bash
# Tell Git your name (use your real name)
git config --global user.name "Your Full Name"

# Tell Git your email (use the SAME email as your GitHub account)
git config --global user.email "your.email@example.com"
\`\`\`

**Test Your Connection:**
\`\`\`bash
# This should show your name and email
git config --global --list
\`\`\`

**Success Check:** If you see your name and email listed, you're ready to go!

## 2. Google Gemini API

**What You Need:**
- A Gmail or Google account (most people already have this!)

**Get Your AI Key:**
1. Search "google gemini api" in your browser
2. Click on the "Google AI Studio" link that appears
3. Sign in with your Google account
4. Click "Get Started"
5. Click "Get a new API key"
6. Follow the instructions to create your key
7. **Copy and save this key somewhere safe**

## 3. AWS Account

**Sign Up:**
1. Go to [aws.amazon.com](https://aws.amazon.com)
2. Click "Create a Free Account"
3. You'll need to verify your phone number and add a payment method (but you won't be charged)
4. Choose "Basic Support - Free" when asked

**Note:** We'll only use free services! This is for later when we deploy your app.

## 4. Neon Database

**Sign Up:**
1. Go to [neon.tech](https://neon.tech)
2. Click "Sign up with GitHub" (easiest option)
3. Create a new project and name it: "ai-receptionist-lab"
4. **Copy the connection string** - it looks like:
   \`\`\`
   postgresql://neondb_owner:abc123@ep-cool-name-123456.us-east-1.aws.neon.tech/neondb?sslmode=require
   \`\`\`
5. **Save this entire string** - you'll paste it into your \`.env\` file next

## 5. Resend Email Service

**Sign Up:**
1. Go to [resend.com](https://resend.com)
2. Sign up for a free account
3. Once logged in, get your API key from the dashboard
4. **Save this key**

### Part A Completion Check

**Before proceeding to Part B, ensure you have:**
- GitHub account created and Git configured
- Google Gemini API key saved
- AWS account created
- Neon database project created with connection string saved
- Resend API key saved

**Have all 5 items checked?** → Proceed to Part B
**Missing something?** → Complete the missing steps above
        `,
      },
      {
        id: "tools",
        title: "Part B: Install Development Tools",
        content: `
# Part B: Install Development Tools

## 1. Node.js Installation

**All Platforms:**
1. Go to [nodejs.org](https://nodejs.org)
2. Download **LTS version** (v18 or v20)
3. Install with default settings

**Verify:**
\`\`\`bash
node --version
npm --version
\`\`\`

## 2. Python Installation

**Windows:**
1. Go to [python.org/downloads](https://python.org/downloads)
2. Download Python 3.9 or newer
3. **Check "Add Python to PATH"** during installation

**macOS:**
\`\`\`bash
brew install python@3.9
\`\`\`

**Linux (Ubuntu/Debian):**
\`\`\`bash
sudo apt update
sudo apt install python3 python3-pip python3-venv
\`\`\`

**Verify:**
\`\`\`bash
python --version  # or python3 --version
pip --version      # or pip3 --version
\`\`\`

## 3. Git Installation

**Windows:**
1. Download from [git-scm.com](https://git-scm.com)
2. Install with default settings

**macOS:**
\`\`\`bash
# Git usually comes pre-installed, if not:
brew install git
\`\`\`

**Linux:**
\`\`\`bash
sudo apt install git
\`\`\`

**Verify:**
\`\`\`bash
git --version
\`\`\`

## 4. Code Editor (Recommended)

**Visual Studio Code:**
1. Download from [code.visualstudio.com](https://code.visualstudio.com)
2. Install helpful extensions:
   - Python
   - JavaScript ES6 code snippets
   - Prettier - Code formatter

### Part B Completion Check

**Before proceeding to Part C, ensure you have:**
- Node.js and npm installed and verified
- Python 3.9+ installed and verified
- Git installed and verified
- VS Code installed with recommended extensions

**Have all 4 items checked?** → Proceed to Part C
**Missing something?** → Complete the missing steps above
        `,
      },
      {
        id: "project-setup",
        title: "Part C: Project Setup",
        content: `
# Part C: Project Setup

## 1. Fork Repository

**Why Fork?** You need your own copy to make changes throughout the course.

1. Go to: https://github.com/edielam/ai-solutions-lab
2. Click the **"Fork"** button (top-right corner)
3. This creates your personal copy at \`https://github.com/YOUR_USERNAME/ai-solutions-lab\`

## 2. Clone Your Fork

**Important:** Clone YOUR fork, not the original repository!

\`\`\`bash
# Replace YOUR_USERNAME with your actual GitHub username
git clone https://github.com/YOUR_USERNAME/ai-solutions-lab.git
cd ai-solutions-lab
\`\`\`

## 3. Install Dependencies

**Frontend (Next.js):**
\`\`\`bash
npm install
\`\`\`

**Backend (Python):**
*No backend setup needed for Lab 1 - we'll do this in later labs.*

## 4. Environment Configuration

Create \`.env\` file in the root directory:

\`\`\`env
# Database (from Neon)
DATABASE_URL=your_neon_connection_string_here

# AI API (from Google)
GOOGLE_GENERATIVE_AI_API_KEY=your_gemini_api_key_here

# Email Service (from Resend)
RESEND_API_KEY=your_resend_api_key_here

# App Settings
NEXT_PUBLIC_APP_URL=http://localhost:3000
SECRET_KEY=change_this_to_something_secure
DEBUG=true
\`\`\`

## 5. Run the Application

**Start Frontend:**
\`\`\`bash
npm run dev
\`\`\`

**Open Browser:**
Go to [http://localhost:3000](http://localhost:3000)

## 6. Test the Complete Flow

1. **Landing Page**: Click "TRY IT FREE - NO SIGNUP"
2. **Business Setup**: 
   - Enter business name and description
   - Choose a brand color
   - Click "Continue to Documents"
3. **Document Upload**: 
   - Skip for now or upload a sample document
   - Click "Continue"
4. **Generated URL**: 
   - Copy your unique chat URL
   - Click "Try Your AI Receptionist"
5. **Chat Interface**: 
   - Test asking questions
   - Try booking an appointment
   - Verify emails are sent (check spam folder)

### Part C Completion Check

**Before completing Lab 1, ensure you have:**
- Forked the repository to your GitHub account
- Cloned your fork to your computer
- Installed frontend dependencies
- Created \`.env\` file with all API keys
- Application runs at http://localhost:3000
- Free trial flow works end-to-end
- Chat interface responds to messages
- Appointment booking functions

**Have all 8 items checked?** → Lab 1 Complete! 🎉
**Missing something?** → Complete the missing steps above
        `,
      },
      {
        id: "troubleshooting",
        title: "Troubleshooting & Next Steps",
        content: `
# Troubleshooting

**"npm install" fails:**
- Try deleting \`node_modules\` and \`package-lock.json\`, then run \`npm install\` again

**Python virtual environment issues:**
- Make sure you're in the project directory
- Try \`python3 -m venv venv\` instead of \`python -m venv venv\`

**Database connection errors:**
- Verify your Neon connection string is correct
- Make sure there are no extra spaces in \`.env\` file

**API key not working:**
- Double-check the key is copied correctly

# Next Steps & Pro Tips

**Prepare for Lab 2:**
- Keep all your API keys handy
- Familiarize yourself with the chat interface
- Try uploading different business documents
- Think about how the AI decides when to book appointments

**Ready for Lab 2?** You'll integrate real AI capabilities and start tracking performance with MLflow!

**Pro Tips:**
- **Save your API keys securely** - never commit them to Git
- **Use meaningful commit messages** when pushing code
- **Test thoroughly** - the free trial flow is what your users will experience

## Docker Setup (Optional)

**Install Docker Desktop:**
1. Go to [docker.com/get-started](https://docker.com/get-started)
2. Download for your OS
3. Install and start Docker Desktop

**Verify:**
\`\`\`bash
docker --version
docker run hello-world
\`\`\`

**Note:** We'll use Docker in Lab 5 for containerization
        `,
      },
    ],
  },
  {
    id: "lab2",
    title: "Lab 2: AI Lifecycle & MLOps Integration",
    description:
      "Build a Flask MLOps service to track AI performance, integrate Prometheus for metrics monitoring, and implement comprehensive metrics collection for your AI receptionist.",
    duration: "3-4 hours",
    level: "Intermediate",
    technology: "Flask + Prometheus",
    sections: [
      {
        id: "prerequisites",
        title: "Prerequisites & Database Setup",
        content: `
# Lab 2: AI Lifecycle & MLOps Integration

**Time Required:** 3-4 hours  
**What You'll Do:** Build a Flask MLOps service to track AI performance, integrate Prometheus for metrics monitoring, and implement comprehensive metrics collection for your AI receptionist

**Lab Collaborators:**
- Edward Lampoh - Software Developer & Collaborator
- Oluwafemi Adebayo, PhD - Academic Professor & Collaborator

## Prerequisites from Lab 1

**Before starting Lab 2, ensure you completed Lab 1 and have:**

- Working Next.js app running at http://localhost:3000
- Environment file (.env) with these keys configured:
  \`\`\`env
  DATABASE_URL="your_neon_connection_string"
  GOOGLE_GENERATIVE_AI_API_KEY="your_gemini_api_key"
  \`\`\`
- Neon database connected and working (test by creating a business in the app)
- Chat functionality working (you can ask questions and get AI responses)
- Appointment booking working (AI can transition to booking mode)

**Quick Test:**

1. Go to http://localhost:3000
2. Create a test business
3. Chat with the AI and try booking an appointment
4. If this works, you're ready for Lab 2!

## Complete Database Setup

**If you haven't set up Neon database yet, follow these steps:**

### Step 1: Create Neon Database (If Not Done)

1. **Go to [neon.tech](https://neon.tech)** and sign up for free
2. **Create a new project** called "ai-appointment-setter"
3. **Copy your connection string** from the dashboard
4. **Add to your \`.env\` file:**
   \`\`\`env
   DATABASE_URL="postgresql://username:password@host/database?sslmode=require"
   \`\`\`

### Step 2: Create Required Tables

**You need BOTH tables for Lab 2 to work:**

#### Option A: Use the SQL files (Recommended)
\`\`\`bash
# Check if you have the SQL files
ls scripts/
# You should see: create-tables.sql and create-metrics-table.sql

# View the main tables SQL
cat scripts/create-tables.sql

# View the metrics table SQL  
cat scripts/create-metrics-table.sql
\`\`\`

#### Option B: Copy-paste this SQL

**Go to your Neon database console and run BOTH scripts:**

**First, create the main tables (if not done in Lab 1):**
\`\`\`sql
-- Main application tables (from Lab 1) - Copy from scripts/create-tables.sql
-- This creates: businesses, documents, conversations, messages, appointments, business_settings
-- Run the entire contents of scripts/create-tables.sql in your Neon console
\`\`\`

**Then, create the metrics table for Lab 2:**

\`\`\`sql
-- Create AI Metrics table for MLOps tracking
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
CREATE INDEX IF NOT EXISTS idx_ai_metrics_created_at ON ai_metrics(created_at);
\`\`\`

### Step 3: Verify Database Setup

**Test your database connection:**

\`\`\`sql
-- Check if all tables exist
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;

-- You should see: appointments, ai_metrics, businesses
\`\`\`

**Test inserting data:**
\`\`\`sql
-- Test businesses table
INSERT INTO businesses (name, industry, description) 
VALUES ('Test Business', 'Healthcare', 'Test description');

-- Check it worked
SELECT * FROM businesses WHERE name = 'Test Business';

-- Test ai_metrics table structure
SELECT column_name, data_type FROM information_schema.columns 
WHERE table_name = 'ai_metrics' 
ORDER BY ordinal_position;
\`\`\`

**Success indicators:**
- All 3 tables exist (businesses, appointments, ai_metrics)
- You can insert and select from businesses table
- ai_metrics table has all required columns

**Still having issues?** 
- Check your DATABASE_URL format includes \`?sslmode=require\`
- Ensure you're using the correct database name from Neon
- Try refreshing your Neon console and running SQL again

### Step 4: Environment Configuration Check

**Ensure your main \`.env\` file has:**
\`\`\`env
# Required for Lab 2
DATABASE_URL="postgresql://username:password@host/database?sslmode=require"
GOOGLE_GENERATIVE_AI_API_KEY="your_gemini_api_key"

# Optional but recommended
NEXTAUTH_SECRET="your_secret_here"
NEXTAUTH_URL="http://localhost:3000"
\`\`\`

**Test your Next.js app works:**
\`\`\`bash
# Start your Next.js app
npm run dev

# Go to http://localhost:3000
# Create a test business
# Try chatting with the AI
# Try booking an appointment
\`\`\`

### Pre-Lab 2 Checklist

**Before starting Part A, verify you have:**

- Neon database created and accessible
- All tables created (businesses, appointments, ai_metrics, etc.)
- DATABASE_URL in your \`.env\` file working
- Next.js app running at http://localhost:3000
- AI chat responding to messages
- Appointment booking working in the chat

**Quick test command:**
\`\`\`bash
# Test your complete database setup
node scripts/test-database-connection.js
\`\`\`

**This test will verify:**
- Database connection works
- All required tables exist
- ai_metrics table has correct structure
- You can insert and read data

**All checked?** → Start Part A
**Issues?** → Fix the failing items above first
        `,
      },
      {
        id: "flask-service",
        title: "Part A: Build Flask MLOps Service",
        content: `
# Part A: Build Flask MLOps Service

*You'll create a separate Python service that tracks how well your AI is performing*

## 1. Create Project Structure

**Create the MLOps service folder:**

**Windows:**
\`\`\`cmd
# In your project root directory
mkdir mlops-service
cd mlops-service
\`\`\`

**Mac/Linux:**
\`\`\`bash
# In your project root directory
mkdir mlops-service
cd mlops-service
\`\`\`

**Create the basic file structure:**

**Windows:**
\`\`\`cmd
# Create these files (we'll fill them in step by step)
echo. > app.py
echo. > requirements.txt
echo. > .env
echo. > start.bat
\`\`\`

**Mac/Linux:**
\`\`\`bash
# Create these files (we'll fill them in step by step)
touch app.py
touch requirements.txt
touch .env
touch start.sh
\`\`\`

**Your folder should now look like:**
\`\`\`
mlops-service/
├── app.py          # Main Flask application
├── requirements.txt # Python dependencies
├── .env            # Environment variables
└── start.sh        # Startup script
\`\`\`

## 2. Set Up Python Dependencies

**Create \`requirements.txt\`:**

\`\`\`txt
# Flask MLOps Service Dependencies
# Core Flask dependencies
Flask==3.0.0
Flask-CORS==4.0.0

# Prometheus for metrics monitoring
prometheus-client==0.19.0

# Database connectivity
psycopg2-binary==2.9.9

# Additional utilities
python-dotenv==1.0.0
requests==2.31.0
\`\`\`

**Create Python virtual environment:**

**Windows:**
\`\`\`cmd
# Create virtual environment
python -m venv venv

# Activate it
venv\\Scripts\\activate

# Install dependencies
pip install -r requirements.txt
\`\`\`

**Mac/Linux:**
\`\`\`bash
# Create virtual environment
python3 -m venv venv

# Activate it
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
\`\`\`

**Success Check:** Run \`pip list\` - you should see Flask, prometheus-client, and other packages installed.

## 3. Configure Environment Variables

**Create \`.env\` file:**

\`\`\`env
# Database Configuration (same as your Next.js app)
DATABASE_URL=your_neon_database_url_here

# Flask Configuration
FLASK_ENV=development
FLASK_DEBUG=True

# Service Configuration
ENVIRONMENT=development
SERVICE_PORT=5001
PROMETHEUS_PORT=8001
\`\`\`

**Important Steps:**

1. **Copy your DATABASE_URL** from your main project \`.env\` file
2. **Use the EXACT same connection string** - this connects to the same Neon database
3. **Keep the quotes** around the DATABASE_URL value

**How to Copy:**
\`\`\`bash
# In your main project directory, show your DATABASE_URL
cat .env | grep DATABASE_URL

# Copy that exact line to mlops-service/.env
\`\`\`

## 4. Build the Flask Application

**Create \`app.py\` - Start with imports and setup:**

\`\`\`python
"""
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
DATABASE_URL = os.getenv('DATABASE_URL')
\`\`\`

**Add database functions:**

\`\`\`python
def fetch_metrics_from_db() -> bool:
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
        return False
\`\`\`

**Add your first endpoint - health check:**

\`\`\`python
@app.route('/health', methods=['GET'])
def health_check():
    """Check if our service is running properly"""
    return jsonify({
        'status': 'healthy',
        'service': 'mlops-service',
        'timestamp': datetime.utcnow().isoformat(),
        'monitoring': 'prometheus'
    })
\`\`\`

**Add the main metrics tracking endpoint:**

\`\`\`python
@app.route('/track', methods=['POST'])
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
        return jsonify({'error': 'Internal server error'}), 500
\`\`\`

**Add the Flask app runner:**

\`\`\`python
if __name__ == '__main__':
    # Run the Flask app
    app.run(host='0.0.0.0', port=5001, debug=True)
\`\`\`

## 5. Create Startup Script

**Create \`start.sh\`:**

\`\`\`bash
#!/bin/bash

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
python app.py
\`\`\`

**Make it executable:**
\`\`\`bash
chmod +x start.sh
\`\`\`

## 6. Test Your Flask Service

**Start the service:**

**Windows:**
\`\`\`cmd
start.bat
\`\`\`

**Mac/Linux:**
\`\`\`bash
./start.sh
\`\`\`

**Test the health endpoint:**
\`\`\`bash
# In a new terminal
curl http://localhost:5001/health
\`\`\`

**You should see:**
\`\`\`json
{
  "status": "healthy",
  "service": "mlops-service",
  "timestamp": "2024-01-15T10:30:00.000000",
  "monitoring": "prometheus"
}
\`\`\`

**Success Check:** If you see the healthy response, your Flask service is working!

### Part A Completion Check

**Before proceeding to Part B, ensure you have:**

- Flask service folder created with all files
- Python virtual environment set up
- Dependencies installed successfully
- Environment variables configured
- Flask app runs without errors
- Health endpoint returns successful response
- Database table created (check logs for "Metrics table created successfully")

**Have all 7 items checked?** → Proceed to Part B
**Missing something?** → Complete the missing steps above
        `,
      },
      {
        id: "prometheus",
        title: "Part B: Integrate Prometheus Monitoring",
        content: `
# Part B: Integrate Prometheus Monitoring

*Prometheus helps us track real-time metrics and see how our AI is performing over time*

## 1. Set Up Prometheus Metrics

**Add Prometheus setup to your \`app.py\` (after the imports):**

\`\`\`python
# Prometheus Metrics Setup
from prometheus_client import Counter, Histogram, Gauge, generate_latest, CONTENT_TYPE_LATEST

# Define Prometheus metrics
ai_requests_total = Counter('ai_requests_total', 'Total AI requests', ['business_id', 'intent', 'response_type'])
ai_response_time_seconds = Histogram('ai_response_time_seconds', 'AI response time in seconds', ['business_id'])
ai_tokens_used_total = Counter('ai_tokens_used_total', 'Total tokens used', ['business_id', 'model'])
ai_api_cost_usd_total = Counter('ai_api_cost_usd_total', 'Total API cost in USD', ['business_id'])
appointments_requested_total = Counter('appointments_requested_total', 'Total appointment requests', ['business_id'])
human_handoffs_total = Counter('human_handoffs_total', 'Total human handoff requests', ['business_id'])

logger.info("Prometheus metrics initialized successfully")
\`\`\`

## 2. Create Prometheus Metrics Endpoint

**Add this endpoint to your \`app.py\`:**

\`\`\`python
@app.route('/metrics', methods=['GET'])
def prometheus_metrics():
    """Prometheus metrics endpoint - industry standard format"""
    try:
        return generate_latest(), 200, {'Content-Type': CONTENT_TYPE_LATEST}
    except Exception as e:
        logger.error(f"Error generating Prometheus metrics: {e}")
        return jsonify({'error': 'Failed to generate metrics'}), 500
\`\`\`

## 3. Create Prometheus Logging Function

**Add this function to your \`app.py\`:**

\`\`\`python
def update_prometheus_metrics(metrics_data):
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
        return False
\`\`\`

## 4. Update Your Tracking Endpoint

**Modify the \`track_metrics()\` function to include Prometheus:**

\`\`\`python
@app.route('/track', methods=['POST'])
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
        return jsonify({'error': 'Internal server error'}), 500
\`\`\`

## 5. Test Prometheus Integration

**Send test metrics to your service:**

\`\`\`bash
curl -X POST http://localhost:5001/track \\
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
  }'
\`\`\`

**Check Prometheus metrics:**

\`\`\`bash
curl http://localhost:5001/metrics
\`\`\`

**You should see metrics like:**

\`\`\`
# HELP ai_requests_total Total AI requests
# TYPE ai_requests_total counter
ai_requests_total{business_id="test-business",intent="general",response_type="text"} 1.0

# HELP ai_response_time_seconds AI response time in seconds
# TYPE ai_response_time_seconds histogram
ai_response_time_seconds_bucket{business_id="test-business",le="0.005"} 0.0
ai_response_time_seconds_bucket{business_id="test-business",le="1.5"} 1.0
\`\`\`

**What is Prometheus?**
Prometheus is an industry-standard monitoring system that tracks:

- How fast your AI responds (real-time metrics)
- How much each conversation costs
- Which conversations lead to appointments
- Performance trends over time
- System health and reliability

### Part B Completion Check

**Before proceeding to Part C, ensure you have:**

- Prometheus metrics initialized successfully
- Prometheus metrics endpoint working (/metrics)
- Dashboard accessible at http://localhost:5001/
- Prometheus logging function implemented
- Tracking endpoint updated to use Prometheus
- Test metrics appear in /metrics endpoint and dashboard
- Both database and Prometheus receive metrics

**Have all 7 items checked?** → Proceed to Part C
**Missing something?** → Complete the missing steps above
        `,
      },
      {
        id: "nextjs-integration",
        title: "Part C: Enhance Next.js with Metrics",
        content: `
# Part C: Enhance Next.js with Metrics

*Now we'll modify your Next.js app to send performance data to your Flask service*

## 1. Create Metrics Tracking Utilities

**First, add metrics functions to \`lib/database.ts\`:**

\`\`\`typescript
// Add this interface to your existing database.ts file
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
}
\`\`\`

**Then, create \`lib/mlops-tracking.ts\`:**

\`\`\`typescript
/**
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
}
\`\`\`

## 2. Add MLOps Service URL to Environment

**Add to your main \`.env\` file:**

\`\`\`env
# Add this line to your existing .env file
MLOPS_SERVICE_URL=http://localhost:5001
\`\`\`

## 3. Modify Chat API for Metrics Collection

**Update \`app/api/chat/route.ts\` - Add imports:**

\`\`\`typescript
// Add these imports at the top
import {
  trackMetrics,
  calculateTokenUsage,
  estimateApiCost,
} from "@/lib/mlops-tracking";
\`\`\`

**Add timing at the start of the POST function:**

\`\`\`typescript
export async function POST(req: Request) {
  // Start timing for performance metrics
  const startTime = Date.now();

  try {
    const { messages, businessId, conversationId } = await req.json();
    // ... rest of your existing code
\`\`\`

**Add metrics collection after AI response (before the return statement):**

\`\`\`typescript
// After you get the AI response, add this before the return statement:

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

// ... your existing return statement
\`\`\`

## 4. Test the Complete Integration

**Make sure both services are running:**

1. Flask MLOps service on port 5001 (or your configured port)
2. Next.js app on port 3000

**Test the chat:**

1. Go to http://localhost:3000
2. Start a conversation with your AI
3. Ask a few questions
4. Try booking an appointment

**Check your metrics:**

1. Look at Flask service logs - you should see "Successfully tracked metrics"
2. Check Prometheus metrics at http://localhost:5001/metrics - you should see updated counters
3. Each chat message should increment the metrics

### Part C Completion Check

**Lab 2 Completion Check:**

- MLOps tracking utilities created
- Environment variable added for MLOps service URL
- Chat API modified to collect timing metrics
- Token usage and cost calculation implemented
- Metrics sent to Flask service after each chat
- Error tracking implemented for failed requests
- Chat still works normally (metrics don't break user experience)
- Dashboard shows real-time metrics at http://localhost:5001/
- Raw Prometheus metrics available at http://localhost:5001/metrics

**Have all 9 items checked?** → Lab 2 Complete! 🎉
**Missing something?** → Complete the missing steps above
        `,
      },
      {
        id: "summary",
        title: "Lab 2 Summary & Next Steps",
        content: `
# Lab 2 Summary - What You Built

Congratulations! You've successfully implemented a complete MLOps monitoring system for your AI appointment setter. Here's what you accomplished:

## Core MLOps Infrastructure

- **Flask MLOps Service** running on port 5001 with cross-platform compatibility
- **Prometheus Metrics Collection** tracking real-time AI performance
- **Interactive Dashboard** at http://localhost:5001/ for monitoring
- **Database Integration** for historical metrics storage

## Metrics You're Now Tracking

- **AI Performance**: Response times, token usage, API costs
- **Business Metrics**: Appointment requests, conversion rates, human handoffs
- **System Health**: Service status, error rates, success rates

## Technical Achievements

- **Cross-Platform Setup**: Works on Windows, Mac, and Linux
- **Port Configuration**: Flexible port settings to avoid conflicts
- **Real-Time Monitoring**: Live dashboard updates as you chat
- **Industry Standards**: Prometheus format compatible with enterprise tools

## What's Next

Your AI system now has professional-grade monitoring! As you chat with your AI:

- Watch metrics update in real-time on the dashboard
- Track costs and performance over time
- Monitor appointment conversion rates
- Identify when human handoffs are needed

## Key URLs to Remember

- **Dashboard**: http://localhost:5001/ (user-friendly metrics)
- **Health Check**: http://localhost:5001/health
- **Raw Metrics**: http://localhost:5001/metrics (Prometheus format)
- **Analytics**: http://localhost:5001/analytics/your-business-id

## MLOps Best Practices Implemented

- ✅ **Observability**: Real-time metrics and monitoring
- ✅ **Reliability**: Health checks and error tracking
- ✅ **Cost Management**: API usage and cost tracking
- ✅ **Performance Monitoring**: Response time and success rate tracking
- ✅ **Business Intelligence**: Appointment conversion analytics

**Note**: We focus on essential monitoring with Prometheus. Your metrics collection provides the valuable insights you need for production AI systems.

## Troubleshooting & Resources

- **Issues?** Check \`mlops-service/TROUBLESHOOTING.md\`
- **Testing**: Run \`python mlops-service/test-simple.py\`
- **Port Conflicts**: Edit \`mlops-service/.env\` to change ports

**Ready for Lab 3?** You now have a solid MLOps foundation for testing and deployment!

## Windows Users - Important Setup Notes

**Before starting, Windows users should note:**

- Use **Command Prompt** or **PowerShell** (not Git Bash for Python commands)
- Python command is usually \`python\` (not \`python3\`)
- Virtual environment activation: \`venv\\Scripts\\activate\` (not \`source venv/bin/activate\`)
- Use \`start.bat\` instead of \`start.sh\`
- Dashboard available at http://localhost:5001/ for viewing metrics

**Windows-Specific Files:**

- \`start.bat\` - Windows startup script (equivalent to \`start.sh\`)
- Use \`python\` instead of \`python3\` in all commands
- Use backslashes \`\\\` for paths instead of forward slashes \`/\`
        `,
      },
    ],
  },
];

export function getLabById(id: string): Lab | undefined {
  return labs.find((lab) => lab.id === id);
}

export function getAllLabs(): Lab[] {
  return labs;
}

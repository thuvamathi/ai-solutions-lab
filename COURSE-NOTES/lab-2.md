# Lab 2: AI Lifecycle & MLOps Integration

**Time Required:** 3-4 hours  
**What You'll Do:** Build a Flask MLOps service to track AI performance, integrate Prometheus for metrics monitoring, and implement comprehensive metrics collection for your AI receptionist

**Lab Collaborators:**

- Edward Lampoh - Software Developer & Collaborator
- Oluwafemi Adebayo, PhD - Academic Professor & Collaborator

---

## 🎯 Lab Overview

This lab has 4 main parts. **Complete each part fully before moving to the next.**

<details>
<summary><strong>📋 Full Checklist (Click to expand)</strong></summary>

### **Part A: Build Flask MLOps Service**

- [ ] Create Flask application structure
- [ ] Set up database schema for metrics
- [ ] Implement health check endpoint
- [ ] Create metrics tracking endpoint
- [ ] Add analytics dashboard endpoint

### **Part B: Integrate Prometheus Monitoring**

- [ ] Install and configure Prometheus client
- [ ] Set up metrics collection
- [ ] Log conversation metrics
- [ ] Log AI performance metrics
- [ ] Log business metrics

**💡 What is Prometheus?**
Prometheus is an industry-standard monitoring system that tracks:

- How fast your AI responds (real-time metrics)
- How much each conversation costs
- Which conversations lead to appointments
- Performance trends over time
- System health and reliability

### **Part C: Enhance Next.js with Metrics**

- [ ] Create metrics tracking utilities
- [ ] Modify chat API for performance timing
- [ ] Calculate token usage and costs
- [ ] Implement non-blocking metrics sending
- [ ] Add error tracking

### **Part D: Set Up Data Versioning**

- [ ] Install and initialize DVC
- [ ] Create document processing pipeline
- [ ] Set up metrics tracking
- [ ] Test complete integration

</details>

---

## 🪟 Windows Users - Important Setup Notes

**Before starting, Windows users should note:**

- Use **Command Prompt** or **PowerShell** (not Git Bash for Python commands)
- Python command is usually `python` (not `python3`)
- Virtual environment activation: `venv\Scripts\activate` (not `source venv/bin/activate`)
- Use `start.bat` instead of `start.sh`
- For MLflow UI: Open a new Command Prompt window

**Windows-Specific Files:**

- `start.bat` - Windows startup script (equivalent to `start.sh`)
- Use `python` instead of `python3` in all commands
- Use backslashes `\` for paths instead of forward slashes `/`

---

<details open>
<summary><h2>🔧 Part A: Build Flask MLOps Service</h2></summary>

_You'll create a separate Python service that tracks how well your AI is performing_

<details>
<summary><h3>1. Create Project Structure</h3></summary>

**Create the MLOps service folder:**

**Windows:**

```cmd
# In your project root directory
mkdir mlops-service
cd mlops-service
```

**Mac/Linux:**

```bash
# In your project root directory
mkdir mlops-service
cd mlops-service
```

**Create the basic file structure:**

**Windows:**

```cmd
# Create these files (we'll fill them in step by step)
echo. > app.py
echo. > requirements.txt
echo. > .env
echo. > start.bat
```

**Mac/Linux:**

```bash
# Create these files (we'll fill them in step by step)
touch app.py
touch requirements.txt
touch .env
touch start.sh
```

**Your folder should now look like:**

```
mlops-service/
├── app.py          # Main Flask application
├── requirements.txt # Python dependencies
├── .env            # Environment variables
└── start.sh        # Startup script
```

</details>

<details>
<summary><h3>2. Set Up Python Dependencies</h3></summary>

**Create `requirements.txt`:**

```txt
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
```

**Create Python virtual environment:**

**Windows:**

```cmd
# Create virtual environment
python -m venv venv

# Activate it
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

**Mac/Linux:**

```bash
# Create virtual environment
python3 -m venv venv

# Activate it
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

**✅ Success Check:** Run `pip list` - you should see Flask, prometheus-client, and other packages installed.

</details>

<details>
<summary><h3>3. Configure Environment Variables</h3></summary>

**Create `.env` file:**

```env
# Database Configuration (same as your Next.js app)
DATABASE_URL=your_neon_database_url_here

# Flask Configuration
FLASK_ENV=development
FLASK_DEBUG=True

# Service Configuration
ENVIRONMENT=development
SERVICE_PORT=5000
```

**Important:** Copy your `DATABASE_URL` from your main `.env` file - it should be the same Neon database!

</details>

<details>
<summary><h3>4. Build the Flask Application</h3></summary>

**Create `app.py` - Start with imports and setup:**

```python
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
```

**Add database connection function:**

```python
def get_db_connection():
    """Connect to our Neon PostgreSQL database"""
    try:
        conn = psycopg2.connect(DATABASE_URL)
        return conn
    except Exception as e:
        logger.error(f"Database connection error: {e}")
        return None
```

**Add metrics table creation:**

```python
def create_metrics_table():
    """Create table to store AI performance metrics"""
    conn = get_db_connection()
    if not conn:
        return False

    try:
        with conn.cursor() as cursor:
            cursor.execute("""
                CREATE TABLE IF NOT EXISTS ai_metrics (
                    id SERIAL PRIMARY KEY,
                    business_id VARCHAR(255) NOT NULL,
                    conversation_id VARCHAR(255),
                    session_id VARCHAR(255),

                    -- How fast is our AI responding?
                    response_time_ms INTEGER,
                    success_rate DECIMAL(5,4),

                    -- How much is our AI costing us?
                    tokens_used INTEGER,
                    api_cost_usd DECIMAL(10,6),
                    model_name VARCHAR(100),

                    -- What are users asking about?
                    intent_detected VARCHAR(100),
                    appointment_requested BOOLEAN DEFAULT FALSE,
                    appointment_booked BOOLEAN DEFAULT FALSE,
                    human_handoff_requested BOOLEAN DEFAULT FALSE,

                    -- Message details
                    user_message_length INTEGER,
                    ai_response_length INTEGER,
                    response_type VARCHAR(50),

                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            """)
            conn.commit()
            logger.info("Metrics table created successfully")
            return True
    except Exception as e:
        logger.error(f"Error creating metrics table: {e}")
        return False
    finally:
        conn.close()

# Create the table when the app starts
create_metrics_table()
```

**Add your first endpoint - health check:**

```python
@app.route('/health', methods=['GET'])
def health_check():
    """Check if our service is running properly"""
    return jsonify({
        'status': 'healthy',
        'service': 'mlops-service',
        'timestamp': datetime.utcnow().isoformat(),
        'monitoring': 'prometheus'
    })
```

**Add the main metrics tracking endpoint:**

```python
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
```

**Add the database storage function:**

```python
def store_metrics_in_db(metrics_data):
    """Save metrics to our database for later analysis"""
    conn = get_db_connection()
    if not conn:
        return False

    try:
        with conn.cursor() as cursor:
            cursor.execute("""
                INSERT INTO ai_metrics (
                    business_id, conversation_id, session_id,
                    response_time_ms, success_rate,
                    tokens_used, api_cost_usd, model_name,
                    intent_detected, appointment_requested, appointment_booked, human_handoff_requested,
                    user_message_length, ai_response_length, response_type
                ) VALUES (
                    %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s
                )
            """, (
                metrics_data.get('business_id'),
                metrics_data.get('conversation_id'),
                metrics_data.get('session_id'),
                metrics_data.get('response_time_ms'),
                metrics_data.get('success_rate', 1.0),
                metrics_data.get('tokens_used'),
                metrics_data.get('api_cost_usd'),
                metrics_data.get('model_name', 'gemini-1.5-flash'),
                metrics_data.get('intent_detected'),
                metrics_data.get('appointment_requested', False),
                metrics_data.get('appointment_booked', False),
                metrics_data.get('human_handoff_requested', False),
                metrics_data.get('user_message_length'),
                metrics_data.get('ai_response_length'),
                metrics_data.get('response_type')
            ))
            conn.commit()
            return True
    except Exception as e:
        logger.error(f"Error storing metrics: {e}")
        return False
    finally:
        conn.close()
```

**Add the Flask app runner:**

```python
if __name__ == '__main__':
    # Run the Flask app
    app.run(host='0.0.0.0', port=5000, debug=True)
```

</details>

<details>
<summary><h3>5. Create Startup Script</h3></summary>

**Create `start.sh`:**

```bash
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
echo "🌐 Service will be available at: http://localhost:5000"
echo "Starting Flask application..."

# Start Flask application
python app.py
```

**Make it executable:**

```bash
chmod +x start.sh
```

</details>

<details>
<summary><h3>6. Test Your Flask Service</h3></summary>

**Start the service:**

**Windows:**

```cmd
start.bat
```

**Mac/Linux:**

```bash
./start.sh
```

**Test the health endpoint:**

```bash
# In a new terminal
curl http://localhost:5000/health
```

**You should see:**

```json
{
  "status": "healthy",
  "service": "mlops-service",
  "timestamp": "2024-01-15T10:30:00.000000",
  "monitoring": "prometheus"
}
```

**✅ Success Check:** If you see the healthy response, your Flask service is working!

</details>

### ✅ Part A Completion Check

**Before proceeding to Part B, ensure you have:**

- [ ] Flask service folder created with all files
- [ ] Python virtual environment set up
- [ ] Dependencies installed successfully
- [ ] Environment variables configured
- [ ] Flask app runs without errors
- [ ] Health endpoint returns successful response
- [ ] Database table created (check logs for "Metrics table created successfully")

**Have all 7 items checked?** → Proceed to Part B
**Missing something?** → Complete the missing steps above

</details>

<details>
<summary><h2>📊 Part B: Integrate Prometheus Monitoring</h2></summary>

_Prometheus helps us track real-time metrics and see how our AI is performing over time_

<details>
<summary><h3>1. Set Up Prometheus Metrics</h3></summary>

**Add Prometheus setup to your `app.py` (after the imports):**

```python
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
```

</details>

<details>
<summary><h3>2. Create Prometheus Metrics Endpoint</h3></summary>

**Add this endpoint to your `app.py`:**

```python
@app.route('/metrics', methods=['GET'])
def prometheus_metrics():
    """Prometheus metrics endpoint - industry standard format"""
    try:
        return generate_latest(), 200, {'Content-Type': CONTENT_TYPE_LATEST}
    except Exception as e:
        logger.error(f"Error generating Prometheus metrics: {e}")
        return jsonify({'error': 'Failed to generate metrics'}), 500
```

</details>

<details>
<summary><h3>3. Create Prometheus Logging Function</h3></summary>

**Add this function to your `app.py`:**

```python
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
```

</details>

<details>
<summary><h3>4. Update Your Tracking Endpoint</h3></summary>

**Modify the `track_metrics()` function to include Prometheus:**

```python
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
```

</details>

<details>
<summary><h3>5. Test Prometheus Integration</h3></summary>

**Send test metrics to your service:**

```bash
curl -X POST http://localhost:5000/track \
  -H "Content-Type: application/json" \
  -d '{
    "business_id": "test-business",
    "response_time_ms": 1500,
    "tokens_used": 150,
    "api_cost_usd": 0.002,
    "intent_detected": "general",
    "appointment_requested": false,
    "user_message_length": 45,
    "ai_response_length": 120,
    "response_type": "text"
  }'
```

**Check Prometheus metrics:**

```bash
curl http://localhost:5000/metrics
```

**You should see metrics like:**
```
# HELP ai_requests_total Total AI requests
# TYPE ai_requests_total counter
ai_requests_total{business_id="test-business",intent="general",response_type="text"} 1.0

# HELP ai_response_time_seconds AI response time in seconds
# TYPE ai_response_time_seconds histogram
ai_response_time_seconds_bucket{business_id="test-business",le="0.005"} 0.0
ai_response_time_seconds_bucket{business_id="test-business",le="1.5"} 1.0
```

</details>

### ✅ Part B Completion Check

**Before proceeding to Part C, ensure you have:**

- [ ] Prometheus metrics initialized successfully
- [ ] Prometheus metrics endpoint working (/metrics)
- [ ] Prometheus logging function implemented
- [ ] Tracking endpoint updated to use Prometheus
- [ ] Test metrics appear in /metrics endpoint
- [ ] Both database and Prometheus receive metrics

**Have all 6 items checked?** → Proceed to Part C
**Missing something?** → Complete the missing steps above

</details>

<details>
<summary><h2>🔗 Part C: Enhance Next.js with Metrics</h2></summary>

_Now we'll modify your Next.js app to send performance data to your Flask service_

<details>
<summary><h3>1. Create Metrics Tracking Utilities</h3></summary>

**Create `lib/mlops-tracking.ts`:**

```typescript
/**
 * MLOps Tracking Utilities
 * Functions to calculate and send AI performance metrics
 */

// Types for our metrics data
export interface MetricsData {
  business_id: string;
  conversation_id?: string;
  session_id: string;

  // Performance metrics
  response_time_ms: number;
  success_rate: number;

  // AI performance metrics
  tokens_used: number;
  api_cost_usd: number;
  model_name: string;

  // Business metrics
  intent_detected: string;
  appointment_requested: boolean;
  human_handoff_requested: boolean;

  // Message metrics
  user_message_length: number;
  ai_response_length: number;
  response_type: string;
}

/**
 * Send metrics to our Flask MLOps service
 * This runs in the background and won't slow down user responses
 */
export async function trackMetrics(metricsData: MetricsData): Promise<void> {
  try {
    // Get MLOps service URL from environment
    const mlopsServiceUrl =
      process.env.MLOPS_SERVICE_URL || "http://localhost:5000";

    // Send metrics to Flask service
    const response = await fetch(`${mlopsServiceUrl}/track`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(metricsData),
      // Set timeout to prevent hanging
      signal: AbortSignal.timeout(5000), // 5 second timeout
    });

    if (!response.ok) {
      throw new Error(
        `MLOps service responded with status: ${response.status}`
      );
    }

    const result = await response.json();
    console.log("Metrics tracked successfully:", result.mlflow_run_id);
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
```

</details>

<details>
<summary><h3>2. Add MLOps Service URL to Environment</h3></summary>

**Add to your main `.env` file:**

```env
# Add this line to your existing .env file
MLOPS_SERVICE_URL=http://localhost:5001
```

</details>

<details>
<summary><h3>3. Modify Chat API for Metrics Collection</h3></summary>

**Update `app/api/chat/route.ts` - Add imports:**

```typescript
// Add these imports at the top
import {
  trackMetrics,
  calculateTokenUsage,
  estimateApiCost,
} from "@/lib/mlops-tracking";
```

**Add timing at the start of the POST function:**

```typescript
export async function POST(req: Request) {
  // Start timing for performance metrics
  const startTime = Date.now();

  try {
    const { messages, businessId, conversationId } = await req.json();
    // ... rest of your existing code
```

**Add metrics collection after AI response (before the return statement):**

```typescript
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
```

**Add error tracking in the catch block:**

```typescript
  } catch (error) {
    console.error('Error in chat API:', error);

    // Track failed requests for MLOps monitoring
    const endTime = Date.now();
    const responseTimeMs = endTime - startTime;

    const failureMetrics = {
      business_id: businessId || 'unknown',
      session_id: generateSessionId(req),
      response_time_ms: responseTimeMs,
      success_rate: 0.0, // Failed response
      tokens_used: 0,
      api_cost_usd: 0,
      intent_detected: 'error',
      appointment_requested: false,
      human_handoff_requested: true,
      user_message_length: 0,
      ai_response_length: 0,
      response_type: 'error'
    };

    // Track failure metrics (non-blocking)
    trackMetrics(failureMetrics).catch(metricsError => {
      console.error('Failed to track failure metrics:', metricsError);
    });

    return Response.json({ error: 'Error processing request' }, { status: 500 });
  }
```

</details>

<details>
<summary><h3>4. Test the Complete Integration</h3></summary>

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

</details>

### ✅ Part C Completion Check

**Before proceeding to Part D, ensure you have:**

- [ ] MLOps tracking utilities created
- [ ] Environment variable added for MLOps service URL
- [ ] Chat API modified to collect timing metrics
- [ ] Token usage and cost calculation implemented
- [ ] Metrics sent to Flask service after each chat
- [ ] Error tracking implemented for failed requests
- [ ] Chat still works normally (metrics don't break user experience)
- [ ] New metrics appear in /metrics endpoint after chatting

**Have all 8 items checked?** → Proceed to Part D
**Missing something?** → Complete the missing steps above

</details>

<details>
<summary><h2>📁 Part D: Set Up Data Versioning</h2></summary>

_DVC helps us track changes to business documents and maintain reproducible AI workflows_

<details>
<summary><h3>1. Install DVC</h3></summary>

**Install DVC:**

```bash
# In your main project directory (not mlops-service)
pip install dvc
```

**Verify installation:**

```bash
dvc --version
```

</details>

<details>
<summary><h3>2. Initialize DVC</h3></summary>

**Initialize DVC in your project:**

```bash
# In your main project directory
dvc init
```

**Create directory structure for data:**

```bash
mkdir -p data/raw/business_documents
mkdir -p data/processed
mkdir -p metrics
```

</details>

<details>
<summary><h3>3. Create DVC Pipeline Configuration</h3></summary>

**Create `dvc.yaml`:**

```yaml
# DVC Pipeline Configuration
# This defines how we process business documents

stages:
  # Stage 1: Process business documents
  process_documents:
    cmd: python scripts/process_documents.py
    deps:
      - data/raw/business_documents/
    outs:
      - data/processed/document_embeddings.json
    metrics:
      - metrics/document_processing.json

  # Stage 2: Update AI knowledge base
  update_knowledge_base:
    cmd: python scripts/update_knowledge_base.py
    deps:
      - data/processed/document_embeddings.json
    outs:
      - data/knowledge_base/current_kb.json
    metrics:
      - metrics/knowledge_base_update.json
```

**Create `params.yaml`:**

```yaml
# Parameters for document processing
process_documents:
  max_file_size_mb: 10
  supported_formats:
    - "pdf"
    - "docx"
    - "txt"
    - "md"
  min_text_length: 50

update_knowledge_base:
  similarity_threshold: 0.85
  max_documents_per_topic: 10
```

</details>

<details>
<summary><h3>4. Add Sample Business Document</h3></summary>

**Create a sample document:**

```bash
# Create sample business document
cat > data/raw/business_documents/sample_business_info.txt << 'EOF'
Sample Business Information

Business Name: TechConsult Pro
Industry: Technology Consulting

Services:
- Software Development Consulting ($150/hour)
- Digital Transformation Projects
- Cloud Migration Services
- Technical Training Workshops

Pricing:
- Initial Consultation: Free (30 minutes)
- Hourly Consulting: $150/hour
- Project-based work: Custom quotes based on scope

Contact Information:
- Phone: (555) 123-4567
- Email: info@techconsultpro.com
- Address: 123 Tech Street, Innovation City

Business Hours:
- Monday-Friday: 9:00 AM - 6:00 PM
- Saturday: 10:00 AM - 2:00 PM
- Sunday: Closed

Appointment Booking:
- Online booking available through our website
- Same-day appointments available for urgent issues
- Please provide 24-hour notice for cancellations
- No-show fee: $50 (waived for first-time clients)
EOF
```

**Track the documents with DVC:**

```bash
dvc add data/raw/business_documents
```

</details>

<details>
<summary><h3>5. Create Initial Metrics</h3></summary>

**Create initial metrics file:**

```bash
cat > metrics/document_processing.json << 'EOF'
{
  "total_documents": 1,
  "processed_successfully": 1,
  "processing_time_seconds": 0.5,
  "average_document_length": 1250
}
EOF
```

**Commit DVC configuration to Git:**

```bash
git add .dvc .dvcignore dvc.yaml params.yaml data/raw/business_documents.dvc metrics/
git commit -m "Initialize DVC for document versioning"
```

</details>

<details>
<summary><h3>6. Test Complete Integration</h3></summary>

**Create a simple test script `test-integration.js`:**

```javascript
// Simple test to verify everything works together
const fetch = require("node-fetch");

async function testIntegration() {
  console.log("🧪 Testing Lab 2 Integration...");

  // Test Flask health
  try {
    const response = await fetch("http://localhost:5000/health");
    const data = await response.json();
    console.log("✅ Flask service healthy:", data.status);
  } catch (error) {
    console.log("❌ Flask service not responding");
    return;
  }

  // Test metrics tracking
  try {
    const testMetrics = {
      business_id: "test-business",
      session_id: "test-session",
      response_time_ms: 1200,
      success_rate: 1.0,
      tokens_used: 100,
      api_cost_usd: 0.001,
      intent_detected: "general",
      appointment_requested: false,
      human_handoff_requested: false,
      user_message_length: 30,
      ai_response_length: 80,
      response_type: "text",
    };

    const response = await fetch("http://localhost:5000/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(testMetrics),
    });

    const result = await response.json();
    console.log("✅ Metrics tracking works:", result.status);
    console.log("🎯 Check MLflow UI at http://localhost:5001");
  } catch (error) {
    console.log("❌ Metrics tracking failed:", error.message);
  }
}

testIntegration();
```

**Run the test:**

```bash
node test-integration.js
```

</details>

### ✅ Part D Completion Check

**Before completing Lab 2, ensure you have:**

- [ ] DVC installed and initialized
- [ ] Directory structure created for data tracking
- [ ] DVC pipeline configuration created
- [ ] Sample business document added and tracked
- [ ] Initial metrics files created
- [ ] DVC configuration committed to Git
- [ ] Integration test passes
- [ ] All services running together successfully

**Have all 8 items checked?** → Lab 2 Complete! 🎉
**Missing something?** → Complete the missing steps above

</details>

---

<details>
<summary><h2>🧪 Testing Your Complete System</h2></summary>

**Final Integration Test:**

1. **Start all services:**

   ```bash
   # Terminal 1: Flask MLOps service
   cd mlops-service && ./start.sh

   # Terminal 2: MLflow UI
   cd mlops-service && source venv/bin/activate && mlflow ui --port 5001

   # Terminal 3: Next.js app
   npm run dev
   ```

2. **Test the complete flow:**

   - Chat with your AI at http://localhost:3000
   - Check Flask logs for "Successfully tracked metrics"
   - View experiment runs at http://localhost:5001
   - Verify metrics are being stored

3. **Check your database:**
   ```sql
   SELECT COUNT(*) FROM ai_metrics;
   SELECT business_id, AVG(response_time_ms) FROM ai_metrics GROUP BY business_id;
   ```

</details>

---

<details>
<summary><h2>🐛 Troubleshooting</h2></summary>

**Flask service won't start:**

- Check if port 5000 is available: `lsof -i :5000`
- Verify DATABASE_URL is correct in `.env`
- Make sure virtual environment is activated

**Metrics not appearing in MLflow:**

- Check Flask service logs for errors
- Verify MLflow UI is running on port 5001
- Test with curl command to send metrics directly

**Next.js can't connect to Flask:**

- Verify MLOPS_SERVICE_URL in main `.env` file
- Check browser console for CORS errors
- Ensure Flask service is running

**Database connection errors:**

- Verify DATABASE_URL format and credentials
- Check network connectivity to Neon database
- Test connection with psql or database client

</details>

---

<details>
<summary><h2>🎓 What You've Learned</h2></summary>

**MLOps Fundamentals:**

- ✅ Built a microservice for AI performance tracking
- ✅ Implemented experiment tracking with MLflow
- ✅ Created comprehensive metrics collection
- ✅ Set up data versioning with DVC

**Production AI Skills:**

- ✅ Non-blocking metrics collection
- ✅ Performance monitoring and cost tracking
- ✅ Business intelligence from AI interactions
- ✅ Error handling and failure tracking

**System Architecture:**

- ✅ Microservices communication
- ✅ Database design for analytics
- ✅ RESTful API development
- ✅ Environment configuration management

**Ready for Lab 3?** You'll build comprehensive test suites for your AI components and MLOps infrastructure!

</details>

---

<details>
<summary><h2>💡 Pro Tips & Next Steps</h2></summary>

**Optimization Ideas:**

- Add caching to reduce database queries
- Implement batch metrics processing
- Create custom MLflow metrics visualizations
- Add alerting for performance degradation

**Business Intelligence:**

- Track peak usage hours
- Analyze most common user intents
- Monitor appointment conversion rates
- Calculate ROI of AI implementation

**Advanced Features:**

- A/B testing different AI prompts
- Sentiment analysis of user messages
- Predictive analytics for appointment booking
- Cost optimization recommendations

</details>

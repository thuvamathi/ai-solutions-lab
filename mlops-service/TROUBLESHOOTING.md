# MLOps Service Troubleshooting Guide - Prometheus Edition

## Platform-Specific Startup

### 🚀 Prometheus MLOps Service

**Windows Users:**
```cmd
# Navigate to mlops-service directory
cd mlops-service

# Run Prometheus startup script
start.bat
```

**Mac/Linux Users:**
```bash
# Navigate to mlops-service directory
cd mlops-service

# Run Prometheus startup script
./start.sh
```

## Quick Fixes for Common Issues

### Issue 1: "prometheus-client not found" or "Flask not found"
**Solution:** Make sure virtual environment is activated and dependencies are installed:

**Windows:**
```cmd
cd mlops-service
venv\Scripts\activate
pip install --upgrade pip
pip install -r requirements.txt
```

**Mac/Linux:**
```bash
cd mlops-service
source venv/bin/activate
pip install --upgrade pip
pip install -r requirements.txt
```

### Issue 1b: "psycopg2-binary compilation errors"
**Solution:** We've removed psycopg2-binary to avoid compilation issues. The service now works without direct database dependencies.

### Issue 2: "can't open file app.py"
**Solution:** Make sure you're in the mlops-service directory:
```bash
cd mlops-service
./start.sh
```

### Issue 3: "Permission denied" when running scripts
**Solution:** Make scripts executable:
```bash
chmod +x start.sh
```

### Issue 4: Database connection errors
**Solution:** Check your .env file has the correct DATABASE_URL:
```bash
# Make sure this matches your main .env file
DATABASE_URL=postgresql://your_neon_url_here
```

### Issue 5: Port already in use
**Solution:** Either kill the process or change the port:

**Option A: Kill the process using port 5000:**
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9
```

**Option B: Use different ports (recommended):**
Edit your `.env` file:
```bash
# Change these ports to available ones
SERVICE_PORT=5001
PROMETHEUS_PORT=8001
```

**Option C: Set ports temporarily:**

**Mac/Linux:**
```bash
export SERVICE_PORT=5001
export PROMETHEUS_PORT=8001
./start.sh
```

**Windows:**
```cmd
set SERVICE_PORT=5001
set PROMETHEUS_PORT=8001
start.bat
```

## Step-by-Step Startup

1. **Navigate to mlops-service directory:**
   ```bash
   cd mlops-service
   ```

2. **Start the Prometheus service:**
   ```bash
   ./start.sh
   ```

3. **Test the service:**
   ```bash
   curl http://localhost:5001/health
   ```

4. **Check Prometheus metrics:**
   ```bash
   curl http://localhost:5001/metrics
   ```

## Manual Setup (if scripts fail)

### Windows
```cmd
# 1. Create virtual environment
python -m venv venv

# 2. Activate it
venv\Scripts\activate

# 3. Upgrade pip first
python -m pip install --upgrade pip

# 4. Install dependencies (including Prometheus)
pip install -r requirements.txt

# 5. Set ports if needed (optional)
set SERVICE_PORT=5001
set PROMETHEUS_PORT=8001

# 6. Start Flask app with Prometheus
python app.py
```

### Mac/Linux
```bash
# 1. Create virtual environment
python3 -m venv venv

# 2. Activate it
source venv/bin/activate

# 3. Upgrade pip first
pip install --upgrade pip

# 4. Install dependencies (including Prometheus)
pip install -r requirements.txt

# 5. Start Flask app with Prometheus
python app.py
```

## Verify Everything Works

1. **Flask service health check:**
   ```bash
   curl http://localhost:5001/health
   ```

2. **Check Prometheus metrics:**
   ```bash
   curl http://localhost:5001/metrics
   ```

3. **Run the test script:**
   ```bash
   cd mlops-service
   python test-simple.py
   ```

4. **Send test metrics manually:**
   ```bash
   curl -X POST http://localhost:5001/track \
     -H "Content-Type: application/json" \
     -d '{"business_id":"test","response_time_ms":1000,"tokens_used":100,"model_name":"gemini-1.5-flash","intent_detected":"general","appointment_requested":false,"human_handoff_requested":false,"user_message_length":10,"ai_response_length":20,"response_type":"text"}'
   ```

5. **Check Prometheus metrics updated:**
   Open http://localhost:5001/metrics in browser (should show ai_requests_total counter)

## Still Having Issues?

1. Check Python version: `python3 --version` (should be 3.8+)
2. Check if virtual environment is activated (should see `(venv)` in prompt)
3. Check logs for specific error messages
4. Make sure DATABASE_URL is correct in .env file
5. Verify prometheus-client is installed: `pip list | grep prometheus`
6. Test Prometheus metrics endpoint: `curl http://localhost:5000/metrics`

## New Prometheus Features

### Metrics Available:
- `ai_response_time_seconds` - Response time histogram
- `ai_requests_total` - Total requests counter
- `ai_tokens_used_total` - Token usage counter
- `ai_api_cost_usd_total` - API cost counter
- `appointments_requested_total` - Appointment requests
- `human_handoffs_total` - Human handoff requests

### Endpoints:
- `/health` - Service health check
- `/metrics` - Prometheus metrics (industry standard)
- `/track` - Send metrics from Next.js
- `/analytics/<business_id>` - Business analytics dashboard
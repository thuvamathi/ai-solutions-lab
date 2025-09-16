# Lab 2: AI Lifecycle & MLOps Integration

## 🎯 Objective
Implement AI tracking and MLOps fundamentals by integrating Vercel AI SDK with Gemini API, building a Flask MLOps service, and setting up MLflow for comprehensive AI performance tracking.

## 📚 Learning Outcomes
By completing this lab, you will:
- ✅ Understand MLOps fundamentals and metrics collection
- ✅ Build a Flask microservice for AI performance tracking
- ✅ Integrate MLflow for experiment tracking and monitoring
- ✅ Implement data versioning with DVC
- ✅ Create non-blocking metrics collection in production AI systems
- ✅ Analyze AI performance, costs, and business metrics

## 🏗️ Architecture Overview

```
Next.js Application (Port 3000)
        ↓ (HTTP POST /track)
Flask MLOps Service (Port 5000)
        ↓
    MLflow Tracking
        ↓
  Neon PostgreSQL Database
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Python 3.8+
- Git
- Access to Neon PostgreSQL database

### Step 1: Set Up the Flask MLOps Service

1. **Navigate to the MLOps service directory:**
   ```bash
   cd mlops-service
   ```

2. **Install Python dependencies:**
   ```bash
   # Create virtual environment
   python3 -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   
   # Install dependencies
   pip install -r requirements.txt
   ```

3. **Configure environment variables:**
   ```bash
   # Copy the example environment file
   cp .env.example .env
   
   # Edit .env with your database URL (same as Next.js app)
   # The DATABASE_URL should match your Next.js .env file
   ```

4. **Start the MLOps service:**
   ```bash
   # Option 1: Use the startup script
   ./start.sh
   
   # Option 2: Manual start
   python app.py
   ```

5. **Verify the service is running:**
   ```bash
   curl http://localhost:5000/health
   ```
   You should see a JSON response with service status.

### Step 2: Start MLflow UI (Optional but Recommended)

1. **In a new terminal, start MLflow UI:**
   ```bash
   cd mlops-service
   source venv/bin/activate
   mlflow ui --port 5001 --backend-store-uri file:./mlruns
   ```

2. **Access MLflow dashboard:**
   Open http://localhost:5001 in your browser to view experiment tracking.

### Step 3: Initialize DVC for Document Versioning

1. **Install DVC:**
   ```bash
   pip install dvc
   ```

2. **Initialize DVC:**
   ```bash
   python scripts/init_dvc.py
   ```

3. **Verify DVC setup:**
   ```bash
   dvc dag  # View pipeline structure
   dvc metrics show  # View current metrics
   ```

### Step 4: Start the Next.js Application

1. **In the main project directory:**
   ```bash
   npm run dev
   ```

2. **Test the complete integration:**
   - Open http://localhost:3000
   - Start a conversation with the AI
   - Check MLflow UI (http://localhost:5001) for tracked metrics
   - Check Flask service logs for incoming metrics

## 📊 Metrics Being Tracked

### Conversation Metrics
- **Response Time**: How long each AI response takes (milliseconds)
- **Success Rate**: Percentage of successful AI interactions
- **User Satisfaction**: Optional 1-5 scale rating

### AI Performance Metrics
- **Token Usage**: Prompt tokens, completion tokens, total tokens
- **API Costs**: Estimated cost per interaction in USD
- **Model Performance**: Response quality and consistency

### Business Metrics
- **Intent Detection**: What users are asking about (pricing, services, appointments)
- **Appointment Conversion**: How many conversations lead to appointment requests
- **Human Handoff Rate**: When AI needs human assistance

## 🔍 Understanding the Code

### Flask MLOps Service (`mlops-service/app.py`)

The Flask service provides several key endpoints:

1. **`/health`** - Health check endpoint
2. **`/track`** - Receives metrics from Next.js app
3. **`/analytics/<business_id>`** - Returns analytics dashboard data

Key functions:
- `log_to_mlflow()` - Logs metrics to MLflow for experiment tracking
- `store_metrics_in_db()` - Stores metrics in PostgreSQL for persistence
- `create_metrics_table()` - Creates database schema for metrics

### Next.js Integration (`app/api/chat/route.ts`)

The chat API has been enhanced with:
- **Performance timing** - Measures response time for each interaction
- **Token calculation** - Estimates token usage and API costs
- **Metrics collection** - Gathers comprehensive interaction data
- **Non-blocking tracking** - Sends metrics without delaying user responses

### MLOps Utilities (`lib/mlops-tracking.ts`)

Utility functions for:
- `trackMetrics()` - Sends metrics to Flask service
- `calculateTokenUsage()` - Estimates token consumption
- `estimateApiCost()` - Calculates API costs
- `detectIntent()` - Categorizes user intents

## 🧪 Testing Your Implementation

### 1. Test Flask Service Directly

```bash
# Test health endpoint
curl http://localhost:5000/health

# Test metrics tracking
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

### 2. Test End-to-End Integration

1. Start both services (Next.js and Flask)
2. Have a conversation with the AI chatbot
3. Check MLflow UI for new experiment runs
4. Verify metrics in the database:

```sql
SELECT * FROM ai_metrics ORDER BY created_at DESC LIMIT 5;
```

### 3. Test Analytics Endpoint

```bash
# Get analytics for a business
curl http://localhost:5000/analytics/your-business-id
```

## 📈 Viewing Your Results

### MLflow Dashboard (http://localhost:5001)
- View experiment runs and metrics over time
- Compare different conversation sessions
- Analyze AI performance trends

### Database Queries
```sql
-- Average response time by business
SELECT business_id, AVG(response_time_ms) as avg_response_time
FROM ai_metrics 
GROUP BY business_id;

-- Appointment conversion rate
SELECT 
  business_id,
  COUNT(*) as total_conversations,
  COUNT(CASE WHEN appointment_requested THEN 1 END) as appointment_requests,
  ROUND(
    COUNT(CASE WHEN appointment_requested THEN 1 END)::float / COUNT(*) * 100, 2
  ) as conversion_rate_percent
FROM ai_metrics 
GROUP BY business_id;

-- Daily API costs
SELECT 
  DATE(created_at) as date,
  SUM(api_cost_usd) as daily_cost,
  COUNT(*) as interactions
FROM ai_metrics 
GROUP BY DATE(created_at)
ORDER BY date DESC;
```

## 🐛 Troubleshooting

### Common Issues

1. **Flask service won't start:**
   - Check if port 5000 is available: `lsof -i :5000`
   - Verify DATABASE_URL is correct
   - Check Python virtual environment is activated

2. **Metrics not appearing in MLflow:**
   - Verify Flask service is receiving requests
   - Check Flask service logs for errors
   - Ensure MLflow directory has write permissions

3. **Next.js can't connect to Flask:**
   - Verify MLOPS_SERVICE_URL in .env
   - Check if Flask service is running on correct port
   - Look for CORS issues in browser console

4. **Database connection errors:**
   - Verify DATABASE_URL format and credentials
   - Check network connectivity to Neon database
   - Ensure database allows connections from your IP

### Debug Commands

```bash
# Check Flask service logs
cd mlops-service && python app.py

# Test database connection
python -c "import psycopg2; conn = psycopg2.connect('your-database-url'); print('Connected!')"

# View MLflow experiments
cd mlops-service && mlflow experiments list

# Check DVC status
dvc status
```

## 🎓 Learning Exercises

### Exercise 1: Custom Metrics
Add a new metric to track user sentiment. Modify the tracking code to analyze user messages for positive/negative sentiment.

### Exercise 2: Performance Optimization
Implement caching in the Flask service to reduce database queries for frequently accessed analytics.

### Exercise 3: Advanced Analytics
Create a new endpoint that provides hourly conversation volume and identifies peak usage times.

### Exercise 4: Error Handling
Implement retry logic for failed metrics tracking and create a dead letter queue for failed requests.

## 📝 Lab Deliverables

By the end of this lab, you should have:

1. ✅ **Working Flask MLOps service** tracking AI metrics
2. ✅ **MLflow integration** with experiment tracking
3. ✅ **Enhanced Next.js chat API** with metrics collection
4. ✅ **DVC setup** for document versioning
5. ✅ **Database schema** for persistent metrics storage
6. ✅ **Analytics endpoints** for business insights

## 🚀 Next Steps

Ready for Lab 3? You'll build comprehensive test suites for your AI components and MLOps infrastructure, ensuring reliability and quality in your AI systems.

## 💡 Pro Tips

- **Monitor your API costs** - The cost tracking helps you understand the economics of AI applications
- **Use MLflow experiments** - Group related runs together for better organization
- **Non-blocking metrics** - Never let metrics collection slow down user experience
- **Database indexing** - Add indexes on frequently queried columns for better performance
- **Error handling** - Always handle metrics failures gracefully

## 📚 Additional Resources

- [MLflow Documentation](https://mlflow.org/docs/latest/index.html)
- [Flask Documentation](https://flask.palletsprojects.com/)
- [DVC Documentation](https://dvc.org/doc)
- [Gemini API Pricing](https://ai.google.dev/pricing)
- [PostgreSQL Performance Tips](https://www.postgresql.org/docs/current/performance-tips.html)
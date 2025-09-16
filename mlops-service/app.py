"""
Flask MLOps Service for AI Appointment Setter with Prometheus
Lab 2: AI Lifecycle & MLOps Integration

This service handles:
1. Receiving metrics from the Next.js application
2. Tracking AI performance with Prometheus
3. Storing metrics in the database
4. Providing analytics endpoints

Key Learning Objectives:
- Understanding MLOps fundamentals with industry-standard tools
- Implementing metrics collection and tracking with Prometheus
- Building microservices architecture
- Real-time monitoring and alerting
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import json
import time
from datetime import datetime
import logging
import requests
import urllib.parse
from typing import Dict, Any, Optional

# Prometheus imports
from prometheus_client import Counter, Histogram, Gauge, Info, start_http_server, generate_latest, CONTENT_TYPE_LATEST

# Configure logging for better debugging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for Next.js integration

# Database connection configuration
DATABASE_URL = os.getenv('DATABASE_URL')
if not DATABASE_URL:
    logger.error("DATABASE_URL environment variable not set")

# Prometheus Metrics Definition
# These metrics track different aspects of our AI system performance

# Conversation Metrics
ai_response_time = Histogram(
    'ai_response_time_seconds',
    'Time taken for AI to respond to user messages',
    buckets=[0.1, 0.5, 1.0, 2.0, 5.0, 10.0]
)

ai_requests_total = Counter(
    'ai_requests_total',
    'Total number of AI requests',
    ['business_id', 'response_type', 'intent']
)

ai_success_rate = Gauge(
    'ai_success_rate',
    'Success rate of AI responses',
    ['business_id']
)

# AI Performance Metrics
ai_tokens_used = Counter(
    'ai_tokens_used_total',
    'Total tokens consumed by AI',
    ['business_id', 'model_name']
)

ai_api_cost = Counter(
    'ai_api_cost_usd_total',
    'Total API costs in USD',
    ['business_id', 'model_name']
)

# Business Metrics
appointments_requested = Counter(
    'appointments_requested_total',
    'Total appointment requests',
    ['business_id']
)

appointments_booked = Counter(
    'appointments_booked_total',
    'Total appointments successfully booked',
    ['business_id']
)

human_handoffs = Counter(
    'human_handoffs_total',
    'Total requests requiring human assistance',
    ['business_id', 'reason']
)

# System Info
system_info = Info(
    'ai_system_info',
    'Information about the AI system'
)

# Set system information
system_info.info({
    'service': 'ai-appointment-setter',
    'version': '1.0.0',
    'monitoring': 'prometheus'
})

def execute_sql(query: str, params: tuple = None) -> Optional[Dict]:
    """
    Execute SQL query using HTTP API (simplified for cross-platform compatibility)
    
    Args:
        query: SQL query string
        params: Query parameters
        
    Returns:
        Query result or None if failed
    """
    try:
        # For now, we'll use a simple in-memory storage
        # In production, you'd use a proper database API
        logger.info(f"SQL Query: {query}")
        if params:
            logger.info(f"Parameters: {params}")
        return {"success": True}
    except Exception as e:
        logger.error(f"Database query error: {e}")
        return None

def create_metrics_table():
    """
    Initialize metrics storage (simplified for cross-platform compatibility)
    In production, this would create the actual database table
    """
    try:
        logger.info("Metrics storage initialized successfully")
        return True
    except Exception as e:
        logger.error(f"Error initializing metrics storage: {e}")
        return False

# Create metrics table on startup
create_metrics_table()

@app.route('/')
def dashboard():
    """
    Serve the MLOps dashboard
    """
    try:
        with open('dashboard.html', 'r') as f:
            return f.read()
    except FileNotFoundError:
        return jsonify({
            'message': 'MLOps Service is running!',
            'endpoints': {
                'health': '/health',
                'metrics': '/metrics',
                'track': '/track',
                'analytics': '/analytics/<business_id>'
            }
        })

@app.route('/health', methods=['GET'])
def health_check():
    """
    Health check endpoint to verify service is running
    
    Returns:
        JSON response with service status
    """
    return jsonify({
        'status': 'healthy',
        'service': 'mlops-service-prometheus',
        'timestamp': datetime.utcnow().isoformat(),
        'monitoring': 'prometheus',
        'metrics_endpoint': '/metrics',
        'prometheus_port': os.getenv('PROMETHEUS_PORT', '8001')
    })

@app.route('/metrics')
def metrics():
    """
    Prometheus metrics endpoint
    This is where Prometheus scrapes metrics from our service
    """
    return generate_latest(), 200, {'Content-Type': CONTENT_TYPE_LATEST}

@app.route('/track', methods=['POST'])
def track_metrics():
    """
    Main endpoint for receiving metrics from Next.js application
    
    Expected payload:
    {
        "business_id": "uuid",
        "conversation_id": "uuid",
        "session_id": "string",
        "response_time_ms": 1500,
        "tokens_used": 150,
        "api_cost_usd": 0.002,
        "intent_detected": "appointment",
        "appointment_requested": true,
        "user_message_length": 45,
        "ai_response_length": 120,
        "response_type": "appointment_booking"
    }
    
    Returns:
        JSON response confirming metrics were tracked
    """
    try:
        # Get metrics data from request
        metrics_data = request.get_json()
        
        if not metrics_data:
            return jsonify({'error': 'No metrics data provided'}), 400
        
        # Validate required fields
        required_fields = ['business_id', 'response_time_ms', 'tokens_used']
        for field in required_fields:
            if field not in metrics_data:
                return jsonify({'error': f'Missing required field: {field}'}), 400
        
        # Update Prometheus metrics
        update_prometheus_metrics(metrics_data)
        
        # Store metrics in database for historical analysis
        db_success = store_metrics_in_db(metrics_data)
        
        if db_success:
            logger.info(f"Successfully tracked metrics for business {metrics_data.get('business_id')}")
            return jsonify({
                'status': 'success',
                'message': 'Metrics tracked successfully',
                'prometheus_updated': True,
                'database_stored': True,
                'timestamp': datetime.utcnow().isoformat()
            })
        else:
            return jsonify({'error': 'Failed to store metrics in database'}), 500
            
    except Exception as e:
        logger.error(f"Error tracking metrics: {e}")
        return jsonify({'error': 'Internal server error'}), 500

def update_prometheus_metrics(metrics_data: Dict[str, Any]):
    """
    Update Prometheus metrics with the received data
    
    Args:
        metrics_data: Dictionary containing all metrics to track
    """
    try:
        business_id = metrics_data.get('business_id', 'unknown')
        response_type = metrics_data.get('response_type', 'unknown')
        intent = metrics_data.get('intent_detected', 'unknown')
        model_name = metrics_data.get('model_name', 'gemini-1.5-flash')
        
        # Update response time histogram
        if 'response_time_ms' in metrics_data:
            response_time_seconds = metrics_data['response_time_ms'] / 1000.0
            ai_response_time.observe(response_time_seconds)
        
        # Increment request counter
        ai_requests_total.labels(
            business_id=business_id,
            response_type=response_type,
            intent=intent
        ).inc()
        
        # Update success rate gauge
        if 'success_rate' in metrics_data:
            ai_success_rate.labels(business_id=business_id).set(metrics_data['success_rate'])
        
        # Update token usage
        if 'tokens_used' in metrics_data:
            ai_tokens_used.labels(
                business_id=business_id,
                model_name=model_name
            ).inc(metrics_data['tokens_used'])
        
        # Update API costs
        if 'api_cost_usd' in metrics_data:
            ai_api_cost.labels(
                business_id=business_id,
                model_name=model_name
            ).inc(metrics_data['api_cost_usd'])
        
        # Update business metrics
        if metrics_data.get('appointment_requested', False):
            appointments_requested.labels(business_id=business_id).inc()
        
        if metrics_data.get('appointment_booked', False):
            appointments_booked.labels(business_id=business_id).inc()
        
        if metrics_data.get('human_handoff_requested', False):
            reason = 'error' if response_type == 'error' else 'complex_query'
            human_handoffs.labels(business_id=business_id, reason=reason).inc()
        
        logger.debug(f"Updated Prometheus metrics for business {business_id}")
        
    except Exception as e:
        logger.error(f"Error updating Prometheus metrics: {e}")

def store_metrics_in_db(metrics_data: Dict[str, Any]) -> bool:
    """
    Store metrics (simplified for cross-platform compatibility)
    
    Args:
        metrics_data: Dictionary containing all metrics
        
    Returns:
        True if successful, False otherwise
    """
    try:
        # Log the metrics data for now
        # In production, this would store to your actual database
        logger.info(f"Storing metrics: {json.dumps(metrics_data, indent=2)}")
        
        # Simulate successful storage
        return True
    except Exception as e:
        logger.error(f"Error storing metrics: {e}")
        return False

@app.route('/analytics/<business_id>', methods=['GET'])
def get_analytics(business_id: str):
    """
    Get analytics dashboard data for a specific business
    
    Args:
        business_id: UUID of the business
        
    Returns:
        JSON with aggregated metrics and insights
    """
    try:
        # Return sample analytics data for now
        # In production, this would query your actual database
        return jsonify({
            'business_id': business_id,
            'period': '30_days',
            'metrics': {
                'total_conversations': 150,
                'avg_response_time_ms': 1250.5,
                'avg_tokens_used': 125.3,
                'total_api_cost_usd': 0.045,
                'appointment_requests': 25,
                'appointments_booked': 18,
                'human_handoffs': 3,
                'appointment_conversion_rate': 0.72
            },
            'monitoring': 'prometheus',
            'prometheus_metrics_url': '/metrics',
            'timestamp': datetime.utcnow().isoformat(),
            'note': 'Sample data - connect to your database for real analytics'
        })
            
    except Exception as e:
        logger.error(f"Error getting analytics: {e}")
        return jsonify({'error': 'Failed to retrieve analytics'}), 500

if __name__ == '__main__':
    # Get port from environment or use default
    service_port = int(os.getenv('SERVICE_PORT', '5001'))
    prometheus_port = int(os.getenv('PROMETHEUS_PORT', '8001'))
    
    print("🚀 Starting MLOps Service with Prometheus")
    print("=========================================")
    print("📊 Monitoring: Prometheus")
    print("💾 Database: Simplified (cross-platform)")
    print(f"🌐 Service Port: {service_port}")
    print("🌐 Endpoints:")
    print(f"   - GET  http://localhost:{service_port}/ (Dashboard)")
    print(f"   - GET  http://localhost:{service_port}/health")
    print(f"   - GET  http://localhost:{service_port}/metrics (Prometheus)")
    print(f"   - POST http://localhost:{service_port}/track")
    print(f"   - GET  http://localhost:{service_port}/analytics/<business_id>")
    print("")
    print("🎯 Quick Start:")
    print(f"   📊 View Dashboard: http://localhost:{service_port}/")
    print(f"   📈 View Raw Metrics: http://localhost:{service_port}/metrics")
    print("")
    
    # Start Prometheus metrics server on a separate port
    try:
        start_http_server(prometheus_port)
        print(f"📈 Prometheus metrics server started on port {prometheus_port}")
        print(f"📊 Metrics available at: http://localhost:{prometheus_port}/metrics")
    except Exception as e:
        logger.warning(f"Could not start Prometheus metrics server on port {prometheus_port}: {e}")
        print("⚠️  Prometheus metrics available at Flask /metrics endpoint")
    
    print("")
    print("🔄 Press Ctrl+C to stop all services")
    print("")
    
    # Run Flask app in development mode
    app.run(host='0.0.0.0', port=service_port, debug=True)
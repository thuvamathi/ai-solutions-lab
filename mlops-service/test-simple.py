#!/usr/bin/env python3
"""
Simple test script to verify MLOps service works without database dependencies
"""

import requests
import json
import time

def test_service():
    """Test the MLOps service endpoints"""
    import os
    service_port = os.getenv('SERVICE_PORT', '5001')
    base_url = f"http://localhost:{service_port}"
    
    print("🧪 Testing MLOps Service")
    print("=" * 40)
    
    # Test 1: Health check
    print("1. Testing health endpoint...")
    try:
        response = requests.get(f"{base_url}/health", timeout=5)
        if response.status_code == 200:
            print("✅ Health check passed")
            print(f"   Response: {response.json()}")
        else:
            print(f"❌ Health check failed: {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Health check error: {e}")
        return False
    
    # Test 2: Metrics endpoint
    print("\n2. Testing metrics endpoint...")
    try:
        response = requests.get(f"{base_url}/metrics", timeout=5)
        if response.status_code == 200:
            print("✅ Metrics endpoint working")
            print(f"   Content type: {response.headers.get('content-type')}")
        else:
            print(f"❌ Metrics endpoint failed: {response.status_code}")
    except Exception as e:
        print(f"❌ Metrics endpoint error: {e}")
    
    # Test 3: Track metrics
    print("\n3. Testing track endpoint...")
    test_metrics = {
        "business_id": "test-business-123",
        "conversation_id": "conv-456",
        "session_id": "session-789",
        "response_time_ms": 1500,
        "tokens_used": 150,
        "api_cost_usd": 0.002,
        "intent_detected": "general",
        "appointment_requested": False,
        "user_message_length": 45,
        "ai_response_length": 120,
        "response_type": "text"
    }
    
    try:
        response = requests.post(
            f"{base_url}/track",
            json=test_metrics,
            headers={"Content-Type": "application/json"},
            timeout=5
        )
        if response.status_code == 200:
            print("✅ Track endpoint working")
            print(f"   Response: {response.json()}")
        else:
            print(f"❌ Track endpoint failed: {response.status_code}")
            print(f"   Response: {response.text}")
    except Exception as e:
        print(f"❌ Track endpoint error: {e}")
    
    # Test 4: Analytics endpoint
    print("\n4. Testing analytics endpoint...")
    try:
        response = requests.get(f"{base_url}/analytics/test-business-123", timeout=5)
        if response.status_code == 200:
            print("✅ Analytics endpoint working")
            print(f"   Response: {response.json()}")
        else:
            print(f"❌ Analytics endpoint failed: {response.status_code}")
    except Exception as e:
        print(f"❌ Analytics endpoint error: {e}")
    
    print("\n🎉 Test completed!")
    return True

if __name__ == "__main__":
    import os
    service_port = os.getenv('SERVICE_PORT', '5001')
    
    print("Starting MLOps service test...")
    print(f"Make sure the service is running on http://localhost:{service_port}")
    print("You can start it with: ./start.sh")
    print()
    
    # Wait a moment for user to start service if needed
    input("Press Enter when the service is running...")
    
    test_service()
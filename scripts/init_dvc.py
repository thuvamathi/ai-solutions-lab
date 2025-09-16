#!/usr/bin/env python3
"""
DVC Initialization Script
Lab 2: AI Lifecycle & MLOps Integration

This script initializes DVC for tracking business documents and AI model artifacts.

Key Learning Objectives:
- Setting up data versioning for ML projects
- Understanding DVC workflow
- Tracking business document changes
- Maintaining reproducible AI pipelines

Usage:
    python scripts/init_dvc.py
"""

import os
import subprocess
import sys
from pathlib import Path

def run_command(command, description):
    """Run a shell command and handle errors"""
    print(f"🔧 {description}...")
    try:
        result = subprocess.run(command, shell=True, check=True, capture_output=True, text=True)
        print(f"✅ {description} completed successfully")
        return result.stdout
    except subprocess.CalledProcessError as e:
        print(f"❌ Error during {description}: {e.stderr}")
        return None

def create_directory_structure():
    """Create the directory structure for DVC tracking"""
    directories = [
        "data/raw/business_documents",
        "data/processed",
        "data/knowledge_base",
        "metrics",
        "models",
        "scripts"
    ]
    
    for directory in directories:
        Path(directory).mkdir(parents=True, exist_ok=True)
        print(f"📁 Created directory: {directory}")

def initialize_dvc():
    """Initialize DVC in the project"""
    print("🚀 Initializing DVC for AI Appointment Setter")
    print("=" * 50)
    
    # Check if DVC is installed
    if run_command("dvc --version", "Checking DVC installation") is None:
        print("❌ DVC is not installed. Installing DVC...")
        if run_command("pip install dvc", "Installing DVC") is None:
            print("❌ Failed to install DVC. Please install manually: pip install dvc")
            return False
    
    # Initialize DVC if not already initialized
    if not os.path.exists(".dvc"):
        run_command("dvc init", "Initializing DVC repository")
    else:
        print("✅ DVC already initialized")
    
    # Create directory structure
    create_directory_structure()
    
    # Add data directories to DVC tracking
    run_command("dvc add data/raw/business_documents", "Adding business documents to DVC tracking")
    
    # Create sample business document
    sample_doc_path = "data/raw/business_documents/sample_business_info.txt"
    if not os.path.exists(sample_doc_path):
        with open(sample_doc_path, "w") as f:
            f.write("""Sample Business Information

Business Name: TechConsult Pro
Industry: Technology Consulting
Services: 
- Software Development Consulting
- Digital Transformation
- Cloud Migration Services
- Technical Training

Pricing:
- Initial Consultation: Free (30 minutes)
- Hourly Consulting: $150/hour
- Project-based work: Custom quotes

Contact Information:
- Phone: (555) 123-4567
- Email: info@techconsultpro.com
- Address: 123 Tech Street, Innovation City, TC 12345

Business Hours:
- Monday-Friday: 9:00 AM - 6:00 PM
- Saturday: 10:00 AM - 2:00 PM
- Sunday: Closed

Appointment Booking:
- Online booking available
- Same-day appointments for urgent issues
- Minimum 24-hour notice for cancellations
""")
        print(f"📄 Created sample business document: {sample_doc_path}")
    
    # Create .dvcignore file
    dvcignore_content = """# DVC ignore file
# Lab 2: AI Lifecycle & MLOps Integration

# Ignore temporary files
*.tmp
*.temp
.DS_Store
Thumbs.db

# Ignore log files
*.log
logs/

# Ignore cache directories
__pycache__/
.pytest_cache/
.coverage

# Ignore IDE files
.vscode/
.idea/
*.swp
*.swo

# Ignore large model files that should be tracked separately
*.bin
*.pkl
*.joblib
"""
    
    with open(".dvcignore", "w") as f:
        f.write(dvcignore_content)
    print("📝 Created .dvcignore file")
    
    # Create initial metrics file
    metrics_content = """{
  "document_processing": {
    "total_documents": 1,
    "processed_successfully": 1,
    "processing_time_seconds": 0.5,
    "average_document_length": 1250
  },
  "document_validation": {
    "validation_passed": 1,
    "validation_failed": 0,
    "average_readability_score": 0.8,
    "average_coherence_score": 0.9
  },
  "knowledge_base_update": {
    "documents_added": 1,
    "documents_updated": 0,
    "knowledge_base_size_mb": 0.1,
    "update_time_seconds": 0.2
  }
}"""
    
    with open("metrics/initial_metrics.json", "w") as f:
        f.write(metrics_content)
    print("📊 Created initial metrics file")
    
    print("\n🎉 DVC initialization completed successfully!")
    print("\n📚 Next steps:")
    print("1. Add your business documents to data/raw/business_documents/")
    print("2. Run 'dvc repro' to execute the processing pipeline")
    print("3. Use 'dvc metrics show' to view processing metrics")
    print("4. Use 'dvc dag' to visualize the pipeline")
    print("\n💡 Pro tip: Use 'git add .dvc .dvcignore' to commit DVC configuration to Git")
    
    return True

if __name__ == "__main__":
    success = initialize_dvc()
    sys.exit(0 if success else 1)
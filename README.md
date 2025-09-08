# AI Appointment Setter Lab

An AI-powered receptionist system for learning deployment and MLOps practices.

## 🎯 Overview

This lab guides you through building and deploying an **AI-powered receptionist** that:
- Handles customer inquiries using business documents
- Intelligently decides when to answer questions vs. schedule appointments  
- Provides a seamless booking experience with calendar integration
- Sends automated email confirmations
- Tracks performance and costs through MLOps monitoring

**Perfect for:** Dental offices, law firms, consultancy services, repair shops, and any service-based business.

## 🚀 Lab 1 Setup

### Prerequisites
- **Node.js 18+**
- **Python 3.9+**  
- **Git**
- **Docker**
- **Google Cloud Account** (free tier)
- **AWS Account** (free tier)

### Quick Start

1. **Clone Repository**
```bash
git clone https://github.com/[your-repo]/ai-appointment-setter-lab.git
cd ai-appointment-setter-lab
```

2. **Install Frontend Dependencies**
```bash
npm install
npm run dev
```
Visit `http://localhost:3000` to see the application.

3. **Python Environment**
```bash
python -m venv venv
source venv/bin/activate  # Linux/Mac
# or
venv\Scripts\activate     # Windows

pip install -r requirements.txt
```

4. **Environment Variables**
Create `.env` file:
```env
DATABASE_URL=postgresql://localhost/ai_receptionist_dev
GOOGLE_API_KEY=your_gemini_api_key_here
SENDGRID_API_KEY=your_sendgrid_key_here
SECRET_KEY=your_secret_key_here
```

5. **Database Setup**
```bash
docker run --name postgres-ai-lab -e POSTGRES_PASSWORD=password -d -p 5432:5432 postgres
```

## 📁 Project Structure
```
├── app/                    # Next.js pages
├── components/             # UI components  
├── lib/                   # Utilities
├── lab-materials/         # Lab instructions
├── backend/               # Python API
├── tests/                 # Test files
└── requirements.txt       # Python deps
```

## 🎓 Next Steps
Follow the detailed instructions in `lab-materials/lab.md` for Lab 1 and beyond.

---
**Ready to start?** Run `npm run dev` and explore the application at `http://localhost:3000`
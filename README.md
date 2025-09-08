# AI Appointment Setter Lab

A platform that creates custom AI receptionist instances for different businesses. Build, deploy, and monitor AI-powered customer support with appointment booking capabilities.

## 🎯 What We're Building

This lab teaches you to create an **AI receptionist service** where:
- **Each business gets a personalized chatbot** that understands their specific services, documents, and policies
- **AI handles customer inquiries** using uploaded business documents and context
- **Intelligent appointment booking** when customers need human assistance
- **Complete MLOps pipeline** for monitoring AI performance, costs, and success rates
- **Multiple deployment strategies** from local development to serverless production

**Real-World Applications:** Dental offices, law firms, consultancy services, repair shops, and any service-based business that handles customer inquiries and scheduling.

## 🏗️ Architecture & Tech Stack

```
Next.js Full-Stack App → Vercel AI SDK → Gemini API
        ↓
   Neon PostgreSQL
        ↓
   Email Service (Resend)
        ↓
Flask MLOps Service → MLflow
```

**Frontend + Backend:** Next.js 14 with App Router and API Routes  
**AI Integration:** Vercel AI SDK + Google Gemini API  
**Database:** Neon PostgreSQL (serverless)  
**Email:** Resend API  
**MLOps:** Flask service with MLflow tracking  

## 🚀 Getting Started

### For Complete Setup Instructions
📖 **[Follow Lab 1 Setup Guide](COURSE-NOTES/lab-1.md)** - includes account creation, tool installation, and environment configuration.

### Quick Clone (if you already have Git/GitHub ready)
```bash
git clone https://github.com/edielam/ai-solutions-lab.git
cd ai-solutions-lab
npm install
npm run dev
```

Visit `http://localhost:3000` to see the complete application with:
- Landing page and marketing site
- Free trial onboarding flow (no signup required)
- Business setup wizard
- AI chat interface with appointment booking
- Document upload and processing

## 📁 Codebase Overview

### **Frontend Application** (`app/` & `components/`)
- **Landing Page** (`app/page.tsx`) - Marketing site with pricing and features
- **Setup Wizard** (`app/setup/page.tsx`) - 3-step business onboarding
- **Chat Interface** (`app/chat/[id]/page.tsx`) - Personalized AI receptionist per business
- **UI Components** (`components/`) - Chat system, appointment booking, document upload
<!-- - **Type Definitions** (`lib/types.ts`) - Database models and interfaces
- **Mock Data** (`lib/storage.ts`) - Local storage system for development -->


### **MLOps Service** (To be built in labs)
- **Flask service** for metrics tracking
- **MLflow integration** for AI performance monitoring
- **Real-time analytics** for conversation success rates

## 🎓 Learning Journey

This lab covers **12 progressive modules**:

1. **Environment Setup** - Get everything running locally
2. **AI & MLOps Integration** - Real Gemini API + tracking with MLflow
3. **Testing AI Systems** - pytest for AI components
4. **CI/CD Pipelines** - GitHub Actions automation
5. **Containerization** - Docker for MLOps service
6. **Kubernetes** - Orchestration and scaling
7. **Cloud Deployment** - AWS/GCP production deployment  
8. **Serverless** - Lambda/Cloud Functions conversion
9. **Monitoring** - Essential metrics and alerting
10. **Security** - Authentication and compliance
11. **Performance Analysis** - Load testing and optimization
12. **Final Project** - Complete system demonstration

## 🔍 Key Features to Explore

### **Free Trial Experience**
1. Click "TRY IT FREE - NO SIGNUP" on homepage
2. Set up a mock business (dental office, law firm, etc.)
3. Upload business documents or skip
4. Get personalized chat URL
5. Test AI responses and appointment booking

### **AI Receptionist Capabilities**
- Understands business context from uploaded documents
- Answers common questions about services, hours, pricing
- Smoothly transitions to appointment booking when needed
- Sends confirmation emails
- Maintains conversation history

### **Business Customization**
- Custom branding and colors
- Personalized welcome messages  
- Business-specific document knowledge
- Tailored appointment types and durations

## 🎯 Learning Outcomes

By completing this lab, you'll have:
- **Production-ready AI application** with real business value
- **Complete MLOps pipeline** from development to monitoring
- **Multiple deployment strategies** (containerized, serverless, cloud)
- **End-to-end testing** of AI systems
- **Industry-relevant skills** in AI deployment and operations

---

**Ready to build your AI receptionist service?** Start with **[Lab 1 Setup](COURSE-NOTES/lab-1.md)** to get your development environment ready!
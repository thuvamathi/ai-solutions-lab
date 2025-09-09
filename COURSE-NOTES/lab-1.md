# Lab 1: Environment Setup & Project Introduction

**Time Required:** 2-3 hours  
**Objective:** Set up all required accounts and development tools, then run the complete application locally

**Lab Collaborators:**
- Edward Lampoh - Software Developer & Collaborator
- Oluwafemi Adebayo, PhD - Academic Professor & Collaborator

---

## 📋 Lab 1 Checklist

### **Part A: Account Setup**
- [ ] Create GitHub account and configure Git
- [ ] Sign up for Google Cloud and get Gemini API key
- [ ] Create AWS account (free tier)
- [ ] Sign up for Neon database and create project
- [ ] Sign up for Resend email service

### **Part B: Development Tools**
- [ ] Install Node.js and npm/pnpm
- [ ] Install Python 3.9+
- [ ] Install Git
- [ ] Install code editor (VS Code recommended)

### **Part C: Project Setup**
- [ ] Fork and clone repository
- [ ] Install dependencies
- [ ] Configure environment variables
- [ ] Run application locally
- [ ] Test complete free trial flow

### **Part D: Optional (Can be done later)**
- [ ] Install Docker Desktop

---

## Part A: Account Setup

### 1. GitHub Setup

**Create Account:**
1. Go to [github.com](https://github.com) and sign up
2. Use your student email if available
3. Choose a professional username

**Configure Git:**
```bash
git config --global user.name "Your Full Name"
git config --global user.email "your.email@example.com"
```

### 2. Google Cloud Platform

**Sign Up:**
1. Go to [console.cloud.google.com](https://console.cloud.google.com)
2. Sign up with your Google account
3. Accept free tier ($300 credit)

**Get Gemini API Key:**
1. Create new project or use default
2. Enable Gemini API
3. Go to "Credentials" → "Create API Key"
4. **Save this key** - you'll need it later

### 3. AWS Account

**Sign Up:**
1. Go to [aws.amazon.com](https://aws.amazon.com)
2. Create free tier account
3. Verify phone number and payment method
4. Choose "Basic Support - Free"

**Note:** We'll use AWS later in the course for deployment

### 4. Neon Database

**Sign Up:**
1. Go to [neon.tech](https://neon.tech)
2. Sign up with GitHub (recommended)
3. Create new project: "ai-receptionist-lab"
4. **Save the connection string** - you'll need it

### 5. Resend Email Service

**Sign Up:**
1. Go to [resend.com](https://resend.com)
2. Sign up for free account
3. Get API key from dashboard
4. **Save this key** - you'll need it later

---

## Part B: Install Development Tools

### Node.js Installation

**All Platforms:**
1. Go to [nodejs.org](https://nodejs.org)
2. Download **LTS version** (v18 or v20)
3. Install with default settings

**Verify:**
```bash
node --version
npm --version
```

### Python Installation

**Windows:**
1. Go to [python.org/downloads](https://python.org/downloads)
2. Download Python 3.9 or newer
3. **Check "Add Python to PATH"** during installation

**macOS:**
```bash
brew install python@3.9
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt update
sudo apt install python3 python3-pip python3-venv
```

**Verify:**
```bash
python --version  # or python3 --version
pip --version      # or pip3 --version
```

### Git Installation

**Windows:**
1. Download from [git-scm.com](https://git-scm.com)
2. Install with default settings

**macOS:**
```bash
# Git usually comes pre-installed, if not:
brew install git
```

**Linux:**
```bash
sudo apt install git
```

**Verify:**
```bash
git --version
```

### Code Editor (Recommended)

**Visual Studio Code:**
1. Download from [code.visualstudio.com](https://code.visualstudio.com)
2. Install helpful extensions:
   - Python
   - JavaScript ES6 code snippets
   - Prettier - Code formatter

---

## Part C: Project Setup

### 1. Fork Repository

**Why Fork?** You'll be making changes throughout the course and need your own copy to work with.

1. Go to the lab repository: https://github.com/edielam/ai-solutions-lab
2. Click the **"Fork"** button in the top-right corner
3. This creates your personal copy at `https://github.com/YOUR_USERNAME/ai-solutions-lab`
4. You now have full control over your version of the code
5. **Throughout the course:** All commits and changes go to YOUR fork, not the original repo

### 2. Clone Your Fork

**Important:** Clone YOUR fork, not the original repository!

```bash
# Clone YOUR fork (replace YOUR_USERNAME with your actual GitHub username)
git clone https://github.com/YOUR_USERNAME/ai-solutions-lab.git
cd ai-solutions-lab
```

### 3. Install Dependencies

**Frontend (Next.js):**
```bash
npm install
# or if you prefer pnpm:
pnpm install
```

**Backend (Python):**
```bash
# Create virtual environment
python -m venv venv

# Activate it
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install packages
pip install -r requirements.txt
```

### 4. Environment Configuration

Create `.env` file in the root directory:

```env
# Database (from Neon)
DATABASE_URL=your_neon_connection_string_here

# AI API (from Google Cloud)
GOOGLE_GENERATIVE_AI_API_KEY=your_gemini_api_key_here

# Email Service (from Resend)
RESEND_API_KEY=your_resend_api_key_here

# App Settings
NEXT_PUBLIC_APP_URL=http://localhost:3000
SECRET_KEY=change_this_to_something_secure
DEBUG=true
```

### 5. Run the Application

**Start Frontend:**
```bash
npm run dev
```

**Open Browser:**
Go to [http://localhost:3000](http://localhost:3000)

### 6. Test the Free Trial Flow

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

---

## Part D: Docker Setup (Optional - Can Skip for Now)

**Install Docker Desktop:**
1. Go to [docker.com/get-started](https://docker.com/get-started)
2. Download for your OS
3. Install and start Docker Desktop

**Verify:**
```bash
docker --version
docker run hello-world
```

**Note:** We'll use Docker in Lab 5 for containerization

---

## ✅ Verification Checklist

Before moving to Lab 2, ensure:

- [ ] All accounts created with API keys saved
- [ ] Application runs at http://localhost:3000
- [ ] Free trial flow works end-to-end
- [ ] Chat interface responds to messages
- [ ] Appointment booking flow functions
- [ ] Environment variables configured correctly
- [ ] Git setup complete with your fork

---

## 🚨 Troubleshooting

**"npm install" fails:**
- Try deleting `node_modules` and `package-lock.json`, then run `npm install` again

**Python virtual environment issues:**
- Make sure you're in the project directory
- Try `python3 -m venv venv` instead of `python -m venv venv`

**Database connection errors:**
- Verify your Neon connection string is correct
- Make sure there are no extra spaces in `.env` file

**API key not working:**
- Double-check the key is copied correctly
- Verify the API is enabled in Google Cloud Console

---

## 📚 Next Steps

**Prepare for Lab 2:**
- Keep all your API keys handy
- Familiarize yourself with the chat interface
- Try uploading different business documents
- Think about how the AI decides when to book appointments

**Ready for Lab 2?** You'll integrate real AI capabilities and start tracking performance with MLflow!

---

## 💡 Pro Tips

- **Save your API keys securely** - never commit them to Git
- **Use meaningful commit messages** when pushing code
- **Test thoroughly** - the free trial flow is what your users will experience

# Lab 1: Introduction & Setup

**Objective:** Set up development environment and understand the project architecture

**Time Required:** 2-3 hours

**What You'll Learn:**
- Git and GitHub fundamentals
- Setting up development tools
- Understanding project structure
- Running the application locally

---

## Part 1: Installing Required Software

### 1.1 Install Git

**What is Git?** Git is a version control system that tracks changes in your code and allows collaboration.

#### Windows:
1. Go to [https://git-scm.com/download/windows](https://git-scm.com/download/windows)
2. Download the installer
3. Run the installer with default settings
4. Open Command Prompt or PowerShell and verify: `git --version`

#### macOS:
1. Open Terminal (press `Cmd + Space`, type "Terminal", press Enter)
2. Type: `git --version`
3. If not installed, it will prompt you to install Xcode Command Line Tools - click "Install"
4. Or install via Homebrew: `brew install git`

#### Linux (Ubuntu/Debian):
```bash
sudo apt update
sudo apt install git
```

**Verify Installation:**
```bash
git --version
# Should show something like: git version 2.x.x
```

### 1.2 Install Node.js

**What is Node.js?** A JavaScript runtime that allows running JavaScript outside the browser, needed for our frontend.

1. Go to [https://nodejs.org](https://nodejs.org)
2. Download the **LTS version** (recommended for most users)
3. Run the installer with default settings
4. Restart your terminal/command prompt

**Verify Installation:**
```bash
node --version
# Should show: v18.x.x or v20.x.x

npm --version  
# Should show: 9.x.x or 10.x.x
```

### 1.3 Install Python

**What is Python?** Programming language we'll use for the backend AI processing.

#### Windows:
1. Go to [https://python.org/downloads](https://python.org/downloads)
2. Download Python 3.9 or newer
3. **Important:** Check "Add Python to PATH" during installation
4. Verify in Command Prompt: `python --version`

#### macOS:
```bash
# Using Homebrew (recommended)
brew install python@3.9

# Or download from python.org
```

#### Linux:
```bash
sudo apt update
sudo apt install python3 python3-pip python3-venv
```

**Verify Installation:**
```bash
python --version
# or
python3 --version
# Should show: Python 3.9.x or newer

pip --version
# or  
pip3 --version
# Should show pip version
```

### 1.4 Install Docker

**What is Docker?** Containerization platform that packages applications with their dependencies.

1. Go to [https://docker.com/get-started](https://docker.com/get-started)
2. Download Docker Desktop for your operating system
3. Install and start Docker Desktop
4. Create a Docker account if prompted

**Verify Installation:**
```bash
docker --version
# Should show: Docker version 20.x.x or newer

docker run hello-world
# Should download and run a test container successfully
```

### 1.5 Install a Code Editor

**Recommended:** Visual Studio Code (free)

1. Go to [https://code.visualstudio.com](https://code.visualstudio.com)
2. Download and install
3. Install helpful extensions:
   - Python (by Microsoft)
   - JavaScript ES6 code snippets
   - Prettier - Code formatter
   - GitLens

---

## Part 2: Setting Up GitHub

### 2.1 Create GitHub Account

1. Go to [https://github.com](https://github.com)
2. Click "Sign up"
3. Choose a username (this will be public)
4. Use your student email if available (for education benefits)
5. Verify your email address

### 2.2 Configure Git Locally

**Set up your identity:**
```bash
git config --global user.name "Your Full Name"
git config --global user.email "your.email@example.com"
```

**Check your configuration:**
```bash
git config --list
# Should show your name and email
```

### 2.3 Set Up SSH Keys (Recommended)

**Why SSH?** Secure way to authenticate with GitHub without typing passwords.

**Generate SSH Key:**
```bash
ssh-keygen -t ed25519 -C "your.email@example.com"
# Press Enter for default location
# Press Enter for empty passphrase (or create one if you prefer)
```

**Add SSH Key to ssh-agent:**

**Windows (Git Bash):**
```bash
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519
```

**macOS:**
```bash
eval "$(ssh-agent -s)"
ssh-add --apple-use-keychain ~/.ssh/id_ed25519
```

**Linux:**
```bash
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519
```

**Copy Your Public Key:**
```bash
cat ~/.ssh/id_ed25519.pub
# Copy the entire output
```

**Add to GitHub:**
1. Go to GitHub.com → Settings → SSH and GPG keys
2. Click "New SSH key"
3. Paste your public key
4. Click "Add SSH key"

**Test Connection:**
```bash
ssh -T git@github.com
# Should say: "Hi username! You've successfully authenticated"
```

---

## Part 3: Setting Up the Project

### 3.1 Fork the Repository

1. Go to the lab repository on GitHub (your instructor will provide the link)
2. Click the "Fork" button in the top right
3. This creates your own copy of the repository

### 3.2 Clone Your Fork

```bash
git clone https://github.com/YOUR_USERNAME/ai-appointment-setter-lab.git
cd ai-appointment-setter-lab
```

**What just happened?** You downloaded the project files to your computer.

### 3.3 Explore the Project Structure

```bash
# List all files and folders
ls -la
# or on Windows:
dir

# Look at the main folders
tree
# or manually explore each folder
```

**Key folders:**
- `app/` - Frontend pages (Next.js)
- `components/` - Reusable UI components
- `lib/` - Utility functions and types
- `COURSE-NOTES/` - Lab instructions (you're reading one now!)

---

## Part 4: Running the Application

### 4.1 Install Frontend Dependencies

```bash
# Make sure you're in the project directory
pwd
# Should show: .../ai-appointment-setter-lab

# Install Node.js packages
npm install
# This downloads all required packages (may take a few minutes)
```

**What's happening?** npm is reading `package.json` and downloading all the libraries our frontend needs.

### 4.2 Start the Development Server

```bash
npm run dev
```

**Expected Output:**
```
> next dev
> ✓ Ready on http://localhost:3000
```

### 4.3 View the Application

1. Open your web browser
2. Go to [http://localhost:3000](http://localhost:3000)
3. You should see the AI Appointment Setter landing page

**Try the Free Trial Flow:**
1. Click "TRY IT FREE - NO SIGNUP"
2. Fill out the business setup form
3. Upload a document or skip
4. See your generated chat URL
5. Try the chat interface

### 4.4 Set Up Python Environment

**Open a new terminal** (keep the first one running npm)

```bash
# Navigate to project directory
cd ai-appointment-setter-lab

# Create virtual environment
python -m venv venv
# or on some systems:
python3 -m venv venv
```

**Activate Virtual Environment:**

**Windows:**
```bash
venv\Scripts\activate
```

**macOS/Linux:**
```bash
source venv/bin/activate
```

**You should see `(venv)` at the beginning of your command prompt.**

**Install Python Dependencies:**
```bash
pip install -r requirements.txt
```

### 4.5 Set Up Environment Variables

**Create `.env` file** in your project root:

```bash
# Create the file
touch .env
# or on Windows:
type nul > .env
```

**Edit `.env` file** (use your code editor):
```env
# Database
DATABASE_URL=postgresql://localhost/ai_receptionist_dev

# AI Services (we'll get these in later labs)
GOOGLE_API_KEY=your_gemini_api_key_here

# Email Service (we'll get these in later labs)
SENDGRID_API_KEY=your_sendgrid_key_here
SENDGRID_FROM_EMAIL=noreply@yourdomain.com

# App Configuration
SECRET_KEY=your_secret_key_here_change_this
DEBUG=True
```

---

## Part 5: Understanding Git Workflow

### 5.1 Basic Git Commands

**Check status:**
```bash
git status
# Shows which files have been modified
```

**Add files to staging:**
```bash
git add .
# Adds all modified files

git add filename.txt
# Adds specific file
```

**Commit changes:**
```bash
git commit -m "Describe what you changed"
# Example: git commit -m "Complete Lab 1 setup"
```

**Push to GitHub:**
```bash
git push origin main
# Uploads your changes to GitHub
```

### 5.2 Create a Branch for Lab 1

```bash
# Create and switch to new branch
git checkout -b lab-1-setup

# Make some changes (create a file to test)
echo "Lab 1 completed!" > lab1-notes.txt

# Add and commit
git add .
git commit -m "Add Lab 1 completion notes"

# Push branch to GitHub
git push origin lab-1-setup
```

---

## Part 6: Verification & Troubleshooting

### 6.1 Verify Everything is Working

**Checklist:**
- [ ] Frontend runs at http://localhost:3000
- [ ] You can navigate through the setup wizard
- [ ] Chat interface loads
- [ ] Python virtual environment activates
- [ ] Git commands work
- [ ] You can push to GitHub

### 6.2 Common Issues

**"npm: command not found"**
- Node.js not installed correctly
- Restart terminal after installation

**"python: command not found"**
- Try `python3` instead
- Check Python PATH installation

**"Permission denied (publickey)"**
- SSH key not set up correctly
- Use HTTPS clone instead

**Frontend not loading:**
- Check for error messages in terminal
- Try `npm install` again
- Ensure you're on http://localhost:3000

**Port already in use:**
```bash
# Kill process using port 3000
npx kill-port 3000
# Then restart: npm run dev
```

---

## 🎯 Lab 1 Deliverables

1. **Repository Setup:**
   - Forked repository
   - Cloned to local machine
   - Created lab-1-setup branch

2. **Running Application:**
   - Frontend accessible at localhost:3000
   - Successfully tested free trial flow
   - Python environment activated

3. **Development Environment:**
   - All required software installed
   - Git configured with your identity
   - SSH keys set up (optional but recommended)

4. **Documentation:**
   - Created `.env` file with placeholder values
   - Added lab1-notes.txt with your observations
   - Committed changes to your branch

---

## 🚀 Next Steps

1. **Explore the Code:**
   - Open project in VS Code
   - Look at `app/page.tsx` (landing page)
   - Check `app/setup/page.tsx` (setup wizard)
   - Explore `components/chat/` folder

2. **Prepare for Lab 2:**
   - Sign up for Google Cloud (free tier)
   - Review Gemini API documentation
   - Read about MLflow basics

3. **Optional Enhancements:**
   - Customize the landing page with your name
   - Try the document upload feature
   - Test different business scenarios

**Questions?** Document any issues you encountered and bring them to the next lab session.

**Ready for Lab 2?** You'll integrate real AI capabilities with the Gemini API and start tracking with MLflow!
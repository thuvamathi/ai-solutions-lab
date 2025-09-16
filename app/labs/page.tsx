'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function LabsPage() {
  const [activeSection, setActiveSection] = useState('overview')

  const navigation = [
    { id: 'overview', title: 'Overview' },
    { id: 'lab1', title: 'Lab 1: Foundation' },
    { id: 'lab2', title: 'Lab 2: MLOps Integration' },
  ]

  const lab2Sections = [
    { id: 'prerequisites', title: 'Prerequisites' },
    { id: 'part-a', title: 'Part A: Flask Service' },
    { id: 'part-b', title: 'Part B: Prometheus' },
    { id: 'part-c', title: 'Part C: Next.js Integration' },
    { id: 'part-d', title: 'Part D: Advanced (Optional)' },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-sm text-gray-600 hover:text-gray-900">
                ← Home
              </Link>
              <h1 className="text-xl font-semibold text-gray-900">AI Receptionist Labs</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <nav className="w-64 flex-shrink-0">
            <div className="sticky top-24">
              <div className="space-y-1">
                {navigation.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={`w-full text-left px-3 py-2 text-sm rounded-md transition-colors ${
                      activeSection === item.id
                        ? 'bg-blue-50 text-blue-700 font-medium'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {item.title}
                  </button>
                ))}
              </div>

              {activeSection === 'lab2' && (
                <div className="mt-4 pl-4 border-l border-gray-200">
                  <div className="space-y-1">
                    {lab2Sections.map((section) => (
                      <a
                        key={section.id}
                        href={`#${section.id}`}
                        className="block px-3 py-1 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md"
                      >
                        {section.title}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Main Content */}
          <main className="flex-1 max-w-4xl">
            {activeSection === 'overview' && (
              <div className="prose prose-gray max-w-none">
                <h1>AI Receptionist Labs</h1>
                <p className="text-lg text-gray-600">
                  Learn to build production-ready AI applications through hands-on labs.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose mt-8">
                  <div className="border border-gray-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-2">Lab 1: Foundation</h3>
                    <p className="text-gray-600 mb-4">
                      Build the core Next.js application with AI chat and appointment booking functionality.
                    </p>
                    <div className="text-sm text-gray-500 mb-4">
                      Duration: 2-3 hours
                    </div>
                    <button
                      onClick={() => setActiveSection('lab1')}
                      className="text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Start Lab 1 →
                    </button>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-2">Lab 2: MLOps Integration</h3>
                    <p className="text-gray-600 mb-4">
                      Add Flask MLOps service with Prometheus monitoring for production deployment.
                    </p>
                    <div className="text-sm text-gray-500 mb-4">
                      Duration: 3-4 hours
                    </div>
                    <button
                      onClick={() => setActiveSection('lab2')}
                      className="text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Start Lab 2 →
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'lab1' && (
              <div className="prose prose-gray max-w-none">
                <h1>Lab 1: Foundation</h1>
                <p className="text-lg text-gray-600">
                  Build the core Next.js application with AI chat and appointment booking.
                </p>

                <h2>Prerequisites</h2>
                <ul>
                  <li>Node.js 18+ installed</li>
                  <li>Git installed</li>
                  <li>Code editor (VS Code recommended)</li>
                  <li>Neon database account (free tier)</li>
                  <li>Google AI Studio API key</li>
                </ul>

                <h2>What You'll Build</h2>
                <ul>
                  <li>Next.js application with TypeScript</li>
                  <li>Neon PostgreSQL database connection</li>
                  <li>AI chat interface using Google Gemini</li>
                  <li>Appointment booking system</li>
                  <li>Business profile management</li>
                </ul>

                <h2>Getting Started</h2>
                <p>
                  Clone the repository and install dependencies:
                </p>
                <pre><code>git clone [your-repo-url]
cd ai-receptionist
npm install</code></pre>

                <p>
                  Create your <code>.env</code> file with the required environment variables:
                </p>
                <pre><code>DATABASE_URL="postgresql://username:password@host/database?sslmode=require"
GOOGLE_GENERATIVE_AI_API_KEY="your_gemini_api_key_here"</code></pre>

                <div className="not-prose mt-8">
                  <Link
                    href="/labs/lab1"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                  >
                    View Full Lab 1 Guide
                  </Link>
                </div>
              </div>
            )}

            {activeSection === 'lab2' && (
              <div className="prose prose-gray max-w-none">
                <h1>Lab 2: MLOps Integration</h1>
                <p className="text-lg text-gray-600">
                  Build a Flask MLOps service to track AI performance and integrate Prometheus monitoring.
                </p>

                <div className="not-prose bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                  <h3 className="font-semibold text-red-800 mb-2">Prerequisites Required</h3>
                  <p className="text-red-700">
                    You must complete Lab 1 and have a working Next.js application before starting Lab 2.
                  </p>
                </div>

                <h2 id="prerequisites">Prerequisites & Database Setup</h2>
                
                <h3>Step 1: Verify Lab 1 Completion</h3>
                <p>Ensure you have:</p>
                <ul>
                  <li>Next.js app running at http://localhost:3000</li>
                  <li>Environment file (.env) with DATABASE_URL and GOOGLE_GENERATIVE_AI_API_KEY</li>
                  <li>Neon database connected and working</li>
                  <li>Chat functionality working (AI responds to messages)</li>
                  <li>Appointment booking working</li>
                </ul>

                <h3>Step 2: Database Setup</h3>
                <p>If you haven't set up Neon database yet:</p>
                <ol>
                  <li>Go to <a href="https://neon.tech" target="_blank">neon.tech</a> and sign up</li>
                  <li>Create a new project called "ai-appointment-setter"</li>
                  <li>Copy your connection string from the dashboard</li>
                  <li>Add to your .env file: <code>DATABASE_URL="postgresql://..."</code></li>
                </ol>

                <p>Create the required tables:</p>
                <ul>
                  <li>Main tables: Run <code>scripts/create-tables.sql</code> in your Neon console</li>
                  <li>Metrics table: Run <code>scripts/create-metrics-table.sql</code> in your Neon console</li>
                </ul>

                <h3>Test Your Setup</h3>
                <pre><code>node scripts/test-database-connection.js</code></pre>

                <h2 id="part-a">Part A: Build Flask MLOps Service</h2>
                <p>Create a separate Python service that tracks how well your AI is performing.</p>

                <h3>1. Project Structure</h3>
                <pre><code>mkdir mlops-service
cd mlops-service
touch app.py requirements.txt .env start.sh</code></pre>

                <h3>2. Python Dependencies</h3>
                <p>Create your virtual environment and install dependencies:</p>
                <pre><code># Create virtual environment
python3 -m venv venv

# Activate it
source venv/bin/activate  # Mac/Linux
# or
venv\Scripts\activate     # Windows

# Install dependencies
pip install -r requirements.txt</code></pre>

                <h3>3. Flask Application</h3>
                <p>Build the Flask app with:</p>
                <ul>
                  <li>Health check endpoint</li>
                  <li>Metrics tracking endpoint</li>
                  <li>Database functions</li>
                </ul>

                <div className="not-prose bg-green-50 border border-green-200 rounded-lg p-4 mt-4">
                  <h4 className="font-semibold text-green-800 mb-2">Part A Success Check</h4>
                  <p className="text-green-700">
                    Test: <code>curl http://localhost:5001/health</code> should return healthy status
                  </p>
                </div>

                <h2 id="part-b">Part B: Integrate Prometheus Monitoring</h2>
                <p>Prometheus helps us track real-time metrics and see how our AI is performing over time.</p>

                <h3>What Prometheus Tracks</h3>
                <ul>
                  <li>AI response times (real-time performance)</li>
                  <li>Token usage and API costs</li>
                  <li>Appointment booking success rates</li>
                  <li>Conversation intent detection</li>
                </ul>

                <div className="not-prose bg-green-50 border border-green-200 rounded-lg p-4 mt-4">
                  <h4 className="font-semibold text-green-800 mb-2">Part B Success Check</h4>
                  <p className="text-green-700">
                    Test: <code>curl http://localhost:5001/metrics</code> should show Prometheus metrics
                  </p>
                </div>

                <h2 id="part-c">Part C: Enhance Next.js with Metrics</h2>
                <p>Modify your Next.js app to send performance data to your Flask service.</p>

                <h3>Implementation Steps</h3>
                <ol>
                  <li>Create metrics tracking utilities</li>
                  <li>Add performance timing to chat API</li>
                  <li>Calculate token usage and costs</li>
                  <li>Implement non-blocking metrics sending</li>
                </ol>

                <div className="not-prose bg-green-50 border border-green-200 rounded-lg p-4 mt-4">
                  <h4 className="font-semibold text-green-800 mb-2">Part C Success Check</h4>
                  <p className="text-green-700">
                    Chat with AI → Check http://localhost:5001/ → See metrics update in real-time
                  </p>
                </div>

                <h2 id="part-d">Part D: Advanced Features (Optional)</h2>
                <p>Optional advanced features for experienced users:</p>
                <ul>
                  <li>Additional monitoring dashboards</li>
                  <li>Custom metrics collection</li>
                  <li>Advanced alerting setup</li>
                  <li>Complete integration testing</li>
                </ul>

                <div className="not-prose bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
                  <h4 className="font-semibold text-yellow-800 mb-2">Note</h4>
                  <p className="text-yellow-700">
                    Part D is optional. Parts A-C provide a complete MLOps solution.
                  </p>
                </div>

                <h2>Quick Links</h2>
                <div className="not-prose grid grid-cols-2 gap-4 mt-4">
                  <a href="http://localhost:3000" target="_blank" className="block p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                    Next.js App
                  </a>
                  <a href="http://localhost:5001/health" target="_blank" className="block p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                    MLOps Health Check
                  </a>
                  <a href="http://localhost:5001/metrics" target="_blank" className="block p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                    Prometheus Metrics
                  </a>
                  <a href="http://localhost:5001/" target="_blank" className="block p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                    Analytics Dashboard
                  </a>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
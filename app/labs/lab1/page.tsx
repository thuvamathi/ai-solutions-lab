'use client'

import Link from 'next/link'

export default function Lab1Page() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Link href="/labs" className="text-sm text-gray-600 hover:text-gray-900">
                ← Labs
              </Link>
              <h1 className="text-xl font-semibold text-gray-900">Lab 1: Foundation</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="prose prose-gray max-w-none">
          <h1>Lab 1: AI Receptionist Foundation</h1>
          <p className="text-lg text-gray-600">
            Build the core Next.js application with AI chat and appointment booking functionality.
          </p>

          <div className="not-prose bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-lg font-semibold text-blue-900">2-3 hours</div>
                <div className="text-sm text-blue-700">Duration</div>
              </div>
              <div>
                <div className="text-lg font-semibold text-blue-900">Foundation</div>
                <div className="text-sm text-blue-700">Level</div>
              </div>
              <div>
                <div className="text-lg font-semibold text-blue-900">Next.js</div>
                <div className="text-sm text-blue-700">Technology</div>
              </div>
            </div>
          </div>

          <h2>Prerequisites</h2>
          <p>Before starting Lab 1, ensure you have:</p>
          <ul>
            <li>Node.js 18+ installed</li>
            <li>Git installed</li>
            <li>Code editor (VS Code recommended)</li>
            <li>Neon database account (free tier)</li>
            <li>Google AI Studio API key</li>
          </ul>

          <h3>Required API Keys</h3>
          <ul>
            <li><strong>Neon Database URL:</strong> Get from <a href="https://neon.tech" target="_blank">neon.tech</a></li>
            <li><strong>Google Gemini API:</strong> Get from <a href="https://aistudio.google.com/app/apikey" target="_blank">Google AI Studio</a></li>
          </ul>

          <h2>What You'll Build</h2>
          <ul>
            <li>Next.js application with TypeScript</li>
            <li>Neon PostgreSQL database connection</li>
            <li>AI chat interface using Google Gemini</li>
            <li>Appointment booking system</li>
            <li>Business profile management</li>
          </ul>

          <h2>Project Setup</h2>

          <h3>1. Clone and Install</h3>
          <pre><code>git clone [your-repo-url]
cd ai-receptionist
npm install</code></pre>

          <h3>2. Environment Setup</h3>
          <p>Create your <code>.env</code> file with the required environment variables:</p>
          <pre><code>DATABASE_URL="postgresql://username:password@host/database?sslmode=require"
GOOGLE_GENERATIVE_AI_API_KEY="your_gemini_api_key_here"</code></pre>

          <h3>3. Database Setup</h3>
          <p>Run the SQL script to create your database tables:</p>
          <pre><code># Run this in your Neon database console
cat scripts/create-tables.sql</code></pre>

          <h2>Core Features Implementation</h2>

          <h3>1. Business Management</h3>
          <ul>
            <li>Create business data model</li>
            <li>Implement business API endpoints</li>
            <li>Build business setup UI</li>
          </ul>

          <h3>2. AI Chat System</h3>
          <ul>
            <li>Integrate Google Gemini API</li>
            <li>Build chat interface</li>
            <li>Implement conversation flow</li>
            <li>Add business context awareness</li>
          </ul>

          <h3>3. Appointment Booking</h3>
          <ul>
            <li>Create appointment data model</li>
            <li>Implement booking flow in chat</li>
            <li>Add calendar functionality</li>
            <li>Build booking confirmation</li>
          </ul>

          <h2>Testing & Validation</h2>
          <p>Test your implementation by:</p>
          <ol>
            <li>Creating a test business profile</li>
            <li>Testing AI chat responses</li>
            <li>Testing appointment booking flow</li>
            <li>Verifying data persistence in database</li>
          </ol>

          <div className="not-prose bg-green-50 border border-green-200 rounded-lg p-4 mt-6">
            <h3 className="font-semibold text-green-800 mb-2">Lab 1 Success Criteria</h3>
            <ul className="text-green-700 space-y-1">
              <li>• Next.js app runs at http://localhost:3000</li>
              <li>• Can create and manage business profiles</li>
              <li>• AI chat responds intelligently to questions</li>
              <li>• Appointment booking works end-to-end</li>
              <li>• Data persists in Neon database</li>
            </ul>
          </div>

          <h2>Next Steps</h2>
          <p>
            Once you've completed Lab 1, you'll be ready to add MLOps monitoring and performance tracking in Lab 2.
          </p>

          <div className="not-prose mt-8">
            <Link 
              href="/labs" 
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Continue to Lab 2 →
            </Link>
          </div>

          <h2>Resources</h2>
          <div className="not-prose grid grid-cols-2 gap-4 mt-4">
            <a href="https://nextjs.org/docs" target="_blank" className="block p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
              Next.js Documentation
            </a>
            <a href="https://neon.tech/docs" target="_blank" className="block p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
              Neon Database Docs
            </a>
            <a href="https://ai.google.dev/gemini-api/docs" target="_blank" className="block p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
              Google Gemini API
            </a>
            <a href="https://tailwindcss.com/docs" target="_blank" className="block p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
              Tailwind CSS Docs
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
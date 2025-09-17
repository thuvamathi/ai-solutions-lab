'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { LabNavigation } from '@/components/labs/lab-navigation'

// Define all lab configurations
const labConfigs = {
  'lab1': {
    title: 'Lab 1: Environment Setup & Project Introduction',
    sections: [
      { id: 'overview', title: 'Lab Overview' },
      { id: 'part-a', title: 'Part A: Create Accounts' },
      { id: 'github-setup', title: '1. GitHub Setup' },
      { id: 'gemini-api', title: '2. Google Gemini API' },
      { id: 'aws-account', title: '3. AWS Account' },
      { id: 'neon-database', title: '4. Neon Database' },
      { id: 'resend-email', title: '5. Resend Email' },
      { id: 'part-b', title: 'Part B: Install Tools' },
      { id: 'nodejs', title: '1. Node.js Installation' },
      { id: 'python', title: '2. Python Installation' },
      { id: 'git', title: '3. Git Installation' },
      { id: 'vscode', title: '4. VS Code' },
      { id: 'part-c', title: 'Part C: Project Setup' },
      { id: 'fork-repo', title: '1. Fork Repository' },
      { id: 'clone-fork', title: '2. Clone Your Fork' },
      { id: 'install-deps', title: '3. Install Dependencies' },
      { id: 'env-config', title: '4. Environment Config' },
      { id: 'run-app', title: '5. Run Application' },
      { id: 'test-flow', title: '6. Test Complete Flow' },
      { id: 'troubleshooting', title: 'Troubleshooting' },
    ]
  },
  'lab2': {
    title: 'Lab 2: AI Lifecycle & MLOps Integration',
    sections: [
      { id: 'overview', title: 'Lab Overview' },
      { id: 'prerequisites', title: 'Prerequisites' },
      { id: 'database-setup', title: 'Database Setup' },
      { id: 'part-a', title: 'Part A: Flask MLOps Service' },
      { id: 'project-structure', title: '1. Project Structure' },
      { id: 'python-deps', title: '2. Python Dependencies' },
      { id: 'env-vars', title: '3. Environment Variables' },
      { id: 'flask-app', title: '4. Flask Application' },
      { id: 'startup-script', title: '5. Startup Script' },
      { id: 'test-flask', title: '6. Test Flask Service' },
      { id: 'part-b', title: 'Part B: Prometheus Integration' },
      { id: 'prometheus-setup', title: '1. Prometheus Setup' },
      { id: 'metrics-endpoint', title: '2. Metrics Endpoint' },
      { id: 'prometheus-logging', title: '3. Prometheus Logging' },
      { id: 'update-tracking', title: '4. Update Tracking' },
      { id: 'test-prometheus', title: '5. Test Prometheus' },
      { id: 'part-c', title: 'Part C: Next.js Integration' },
      { id: 'troubleshooting', title: 'Troubleshooting' },
    ]
  }
}

export default function LabsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  
  // Extract current lab ID from pathname
  const currentLabId = pathname.split('/').pop() as keyof typeof labConfigs
  const currentLab = labConfigs[currentLabId]
  
  // If we're on the main labs page, don't show the lab layout
  if (pathname === '/labs') {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header - Fixed */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="py-3 sm:py-4 space-y-1 sm:space-y-2">
            <Link
              href="/labs"
              className="inline-block text-xs sm:text-sm text-gray-600 hover:text-gray-900"
            >
              ← Labs
            </Link>
            <h1 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900 pr-12 lg:pr-0">
              {currentLab?.title || 'Lab'}
            </h1>
          </div>
        </div>
      </header>

      {/* Content Area */}
      <div className="flex">
        <div className="w-full lg:max-w-7xl lg:mx-auto lg:px-8 lg:py-6 lg:flex lg:gap-6">
          {/* Navigation Sidebar - Desktop only, Mobile uses overlay */}
          <div className="hidden lg:block lg:flex-shrink-0">
            <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto">
              <LabNavigation
                currentLabId={currentLabId}
                sections={currentLab?.sections || []}
              />
            </div>
          </div>

          {/* Main Content */}
          <main className="flex-1 lg:max-w-4xl px-3 sm:px-4 lg:px-0 py-4 lg:py-0">
            <div className="pb-16 lg:pb-20">
              {children}
            </div>
          </main>
        </div>
      </div>

      {/* Mobile Navigation - Show for mobile/tablet */}
      <div className="lg:hidden">
        <LabNavigation
          currentLabId={currentLabId}
          sections={currentLab?.sections || []}
        />
      </div>
    </div>
  )
}
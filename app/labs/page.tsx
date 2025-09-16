import Link from 'next/link'
import { getAllLabs } from '@/lib/labs-data'
import { LabSidebar } from '@/components/labs/lab-sidebar'

export default function LabsPage() {
  const labs = getAllLabs()

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="py-4">
            <h1 className="text-xl font-semibold text-gray-900">AI Receptionist Labs</h1>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <LabSidebar labs={labs} />

          {/* Main Content */}
          <main className="flex-1 max-w-4xl">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Receptionist Labs</h1>
              <p className="text-lg text-gray-600">
                Learn to build production-ready AI applications through hands-on labs.
              </p>
            </div>

            <div className="grid gap-6">
              {labs.map((lab) => (
                <div key={lab.id} className="border border-gray-200 rounded-lg p-6 hover:border-gray-300 transition-colors">
                  <h2 className="text-xl font-semibold mb-2 text-gray-900">{lab.title}</h2>
                  <p className="text-gray-600 mb-4">{lab.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex gap-4 text-sm text-gray-500">
                      <span>Duration: {lab.duration}</span>
                      <span>Level: {lab.level}</span>
                      <span>Tech: {lab.technology}</span>
                    </div>
                    
                    <Link
                      href={`/labs/${lab.id}`}
                      className="text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Start Lab →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
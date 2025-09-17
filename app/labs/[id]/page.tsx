'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { getLabById, getAllLabsSummary } from '@/lib/labs-data'
import { LabSidebar } from '@/components/labs/lab-sidebar'
import { LabHeader } from '@/components/labs/lab-header'
import { MarkdownContent } from '@/components/labs/markdown-content'
import { Lab } from '@/lib/labs-data'

export default function LabPage() {
  const params = useParams()
  const labId = params.id as string
  const [currentSectionId, setCurrentSectionId] = useState<string>('')
  const [lab, setLab] = useState<Lab | null>(null)
  const [loading, setLoading] = useState(true)
  
  const allLabsSummary = getAllLabsSummary()

  useEffect(() => {
    async function loadLab() {
      setLoading(true)
      const labData = await getLabById(labId)
      setLab(labData)
      
      // Set first section as active by default
      if (labData?.sections && labData.sections.length > 0) {
        setCurrentSectionId(labData.sections[0].id)
      }
      setLoading(false)
    }

    loadLab()
  }, [labId])

  useEffect(() => {
    // Handle hash changes for section navigation
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1)
      if (hash && lab?.sections?.find(s => s.id === hash)) {
        setCurrentSectionId(hash)
      }
    }

    handleHashChange()
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [lab])

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading lab content...</p>
        </div>
      </div>
    )
  }

  if (!lab) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Lab Not Found</h1>
          <p className="text-gray-600 mb-4">The requested lab could not be found.</p>
          <Link href="/labs" className="text-blue-600 hover:text-blue-700 font-medium">
            ← Back to Labs
          </Link>
        </div>
      </div>
    )
  }

  const currentSection = lab.sections.find(s => s.id === currentSectionId) || lab.sections[0]

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4 space-y-2">
            <Link href="/labs" className="inline-block text-sm text-gray-600 hover:text-gray-900">
              ← Labs
            </Link>
            <h1 className="text-lg sm:text-xl font-semibold text-gray-900 pr-12 lg:pr-0">{lab.title}</h1>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <LabSidebar 
            labs={allLabsSummary.map(summary => ({
              ...summary,
              sections: summary.id === labId ? lab.sections : []
            }))} 
            currentLabId={labId}
            currentSectionId={currentSectionId}
          />

          {/* Main Content */}
          <main className="flex-1 max-w-4xl lg:ml-0 ml-0 min-w-0">
            <LabHeader lab={lab} />
            
            {currentSection && (
              <div id={currentSection.id} className="overflow-hidden">
                <MarkdownContent content={currentSection.content} />
              </div>
            )}

            {/* Navigation between sections */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mt-12 pt-8 border-t border-gray-200">
              {(() => {
                const currentIndex = lab.sections.findIndex(s => s.id === currentSectionId)
                const prevSection = currentIndex > 0 ? lab.sections[currentIndex - 1] : null
                const nextSection = currentIndex < lab.sections.length - 1 ? lab.sections[currentIndex + 1] : null

                return (
                  <>
                    <div className="flex-1">
                      {prevSection && (
                        <a
                          href={`#${prevSection.id}`}
                          className="text-blue-600 hover:text-blue-700 font-medium text-sm sm:text-base"
                          onClick={() => setCurrentSectionId(prevSection.id)}
                        >
                          ← {prevSection.title}
                        </a>
                      )}
                    </div>
                    <div className="flex-1 text-right">
                      {nextSection && (
                        <a
                          href={`#${nextSection.id}`}
                          className="text-blue-600 hover:text-blue-700 font-medium text-sm sm:text-base"
                          onClick={() => setCurrentSectionId(nextSection.id)}
                        >
                          {nextSection.title} →
                        </a>
                      )}
                    </div>
                  </>
                )
              })()}
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
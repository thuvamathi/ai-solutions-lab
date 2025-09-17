'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, ChevronRight } from 'lucide-react'

interface LabSection {
  id: string
  title: string
  completed?: boolean
}

interface LabNavigationProps {
  currentLabId: string
  sections: LabSection[]
  currentSectionId?: string
}

export function LabNavigation({ currentLabId, sections, currentSectionId }: LabNavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const allLabs = [
    { id: 'lab1', title: 'Lab 1: Environment Setup', path: '/labs/lab1' },
    { id: 'lab2', title: 'Lab 2: MLOps Integration', path: '/labs/lab2' },
  ]

  const SidebarContent = () => (
    <div className="space-y-6">
      {/* All Labs */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-3">All Labs</h3>
        <div className="space-y-1">
          {allLabs.map((lab) => (
            <Link
              key={lab.id}
              href={lab.path}
              className={`block px-3 py-2 text-sm rounded-md transition-colors ${
                currentLabId === lab.id
                  ? 'bg-blue-50 text-blue-700 font-medium border-l-2 border-blue-500'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {lab.title}
            </Link>
          ))}
        </div>
      </div>

      {/* Current Lab Sections */}
      {sections.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-3">This Lab</h3>
          <div className="space-y-1">
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className={`block px-3 py-2 text-sm rounded-md transition-colors group ${
                  currentSectionId === section.id
                    ? 'bg-blue-100 text-blue-800 font-medium'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <div className="flex items-center justify-between">
                  <span className="truncate">{section.title}</span>
                  {section.completed && (
                    <span className="text-green-500 text-xs">✓</span>
                  )}
                </div>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Quick Links */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Quick Links</h3>
        <div className="space-y-1">
          <Link
            href="/labs"
            className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            ← All Labs
          </Link>
          <a
            href="#troubleshooting"
            className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            🔧 Troubleshooting
          </a>
        </div>
      </div>
    </div>
  )

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-20 left-4 z-50 p-2 bg-white border border-gray-200 rounded-md shadow-sm hover:bg-gray-50"
        aria-label="Toggle navigation menu"
      >
        {isMobileMenuOpen ? (
          <X className="w-5 h-5" />
        ) : (
          <Menu className="w-5 h-5" />
        )}
      </button>

      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Desktop sidebar */}
      <nav className="hidden lg:block w-64 flex-shrink-0">
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <SidebarContent />
        </div>
      </nav>

      {/* Mobile sidebar */}
      <nav className={`lg:hidden fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-200 z-50 transform transition-transform duration-300 ease-in-out ${
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="p-4 pt-20">
          <SidebarContent />
        </div>
      </nav>
    </>
  )
}
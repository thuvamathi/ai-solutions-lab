'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { Lab } from '@/lib/labs-data'

interface LabSidebarProps {
  labs: Array<Pick<Lab, 'id' | 'title' | 'sections'>>
  currentLabId?: string
  currentSectionId?: string
}

export function LabSidebar({ labs, currentLabId, currentSectionId }: LabSidebarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const SidebarContent = () => (
    <div className="space-y-1">
      {labs.map((lab) => (
        <div key={lab.id}>
          <Link
            href={`/labs/${lab.id}`}
            className={`block px-3 py-2 text-sm rounded-md transition-colors ${
              currentLabId === lab.id
                ? 'bg-blue-50 text-blue-700 font-medium'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {lab.title}
          </Link>
          
          {currentLabId === lab.id && lab.sections && (
            <div className="ml-4 mt-1 space-y-1">
              {lab.sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className={`block px-3 py-1 text-sm rounded-md transition-colors ${
                    currentSectionId === section.id
                      ? 'bg-blue-100 text-blue-800'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {section.title}
                </a>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white border border-gray-200 rounded-md shadow-sm"
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
        <div className="sticky top-6">
          <SidebarContent />
        </div>
      </nav>

      {/* Mobile sidebar */}
      <nav className={`lg:hidden fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-200 z-50 transform transition-transform duration-300 ease-in-out ${
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="p-4 pt-16">
          <SidebarContent />
        </div>
      </nav>
    </>
  )
}
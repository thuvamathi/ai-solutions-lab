'use client'

import Link from 'next/link'
import { Lab } from '@/lib/labs-data'

interface LabSidebarProps {
  labs: Lab[]
  currentLabId?: string
  currentSectionId?: string
}

export function LabSidebar({ labs, currentLabId, currentSectionId }: LabSidebarProps) {
  return (
    <nav className="w-64 flex-shrink-0">
      <div className="sticky top-6">
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
                    >
                      {section.title}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </nav>
  )
}
'use client'

import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

interface ContentBlock {
  type: 'heading' | 'paragraph' | 'code' | 'list' | 'alert' | 'link'
  level?: number // for headings (1-6)
  content?: string
  language?: string // for code blocks
  items?: string[] // for lists
  listType?: 'ul' | 'ol'
  alertType?: 'info' | 'warning' | 'success' | 'error'
  href?: string // for links
  text?: string // for links
}

interface ContentSection {
  id: string
  title: string
  blocks: ContentBlock[]
}

interface ContentRendererProps {
  sections: ContentSection[]
  currentSectionId: string
}

function CodeBlock({ code, language }: { code: string; language?: string }) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  return (
    <div className="relative group mb-6">
      <div className="flex items-center justify-between bg-gray-800 text-gray-200 px-4 py-2 text-sm rounded-t-lg">
        <span className="font-mono text-xs uppercase tracking-wide">
          {language || 'code'}
        </span>
        <button
          onClick={copyToClipboard}
          className="flex items-center gap-1 px-2 py-1 rounded text-xs hover:bg-gray-700 transition-colors"
          title="Copy to clipboard"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="w-3 h-3" />
              Copy
            </>
          )}
        </button>
      </div>
      <pre className="bg-gray-100 border border-gray-200 border-t-0 p-4 rounded-b-lg overflow-x-auto">
        <code className="font-mono text-sm text-gray-800 whitespace-pre">
          {code}
        </code>
      </pre>
    </div>
  )
}

function AlertBox({ type, children }: { type: 'info' | 'warning' | 'success' | 'error'; children: React.ReactNode }) {
  const styles = {
    info: 'bg-blue-50 border-blue-200 text-blue-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    success: 'bg-green-50 border-green-200 text-green-800',
    error: 'bg-red-50 border-red-200 text-red-800'
  }

  return (
    <div className={`border rounded-lg p-4 mb-6 ${styles[type]}`}>
      {children}
    </div>
  )
}

function renderBlock(block: ContentBlock, index: number): JSX.Element {
  switch (block.type) {
    case 'heading':
      const HeadingTag = `h${block.level || 2}` as keyof JSX.IntrinsicElements
      const headingClasses = {
        1: 'text-2xl font-bold mt-8 mb-6 text-gray-900',
        2: 'text-xl font-semibold mt-10 mb-4 text-gray-900',
        3: 'text-lg font-semibold mt-8 mb-4 text-gray-900',
        4: 'text-base font-semibold mt-6 mb-3 text-gray-900',
        5: 'text-sm font-semibold mt-4 mb-2 text-gray-900',
        6: 'text-xs font-semibold mt-4 mb-2 text-gray-900'
      }
      return (
        <HeadingTag 
          key={index} 
          className={headingClasses[block.level as keyof typeof headingClasses] || headingClasses[2]}
          id={block.content?.toLowerCase().replace(/[^a-z0-9]+/g, '-')}
        >
          {block.content}
        </HeadingTag>
      )

    case 'paragraph':
      return (
        <p key={index} className="mb-4 text-gray-700 leading-relaxed break-words">
          {block.content}
        </p>
      )

    case 'code':
      return (
        <CodeBlock 
          key={index}
          code={block.content || ''}
          language={block.language}
        />
      )

    case 'list':
      const ListTag = block.listType === 'ol' ? 'ol' : 'ul'
      return (
        <ListTag key={index} className="mb-6 ml-6 space-y-2">
          {block.items?.map((item, itemIndex) => (
            <li key={itemIndex} className="text-gray-700 leading-relaxed">
              {item}
            </li>
          ))}
        </ListTag>
      )

    case 'alert':
      return (
        <AlertBox key={index} type={block.alertType || 'info'}>
          {block.content}
        </AlertBox>
      )

    case 'link':
      return (
        <a 
          key={index}
          href={block.href}
          className="text-blue-600 hover:text-blue-800 underline break-words"
          target="_blank"
          rel="noopener noreferrer"
        >
          {block.text || block.href}
        </a>
      )

    default:
      return <div key={index}></div>
  }
}

export function ContentRenderer({ sections, currentSectionId }: ContentRendererProps) {
  const currentSection = sections.find(s => s.id === currentSectionId)

  if (!currentSection) {
    return <div>Section not found</div>
  }

  return (
    <div className="max-w-none overflow-hidden">
      <div className="prose-content">
        {currentSection.blocks.map((block, index) => renderBlock(block, index))}
      </div>
    </div>
  )
}
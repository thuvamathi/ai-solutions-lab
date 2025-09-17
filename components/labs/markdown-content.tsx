'use client'

import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

interface MarkdownContentProps {
  content: string
}

interface CodeBlockProps {
  code: string
  language?: string
}

function CodeBlock({ code, language }: CodeBlockProps) {
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

export function MarkdownContent({ content }: MarkdownContentProps) {
  const processContent = (content: string) => {
    const lines = content.split('\n')
    const elements: JSX.Element[] = []
    let i = 0
    let inCodeBlock = false
    let codeLines: string[] = []
    let codeLanguage = ''
    let inList = false
    let listItems: JSX.Element[] = []
    let listType: 'ul' | 'ol' = 'ul'

    const flushList = () => {
      if (listItems.length > 0) {
        const ListComponent = listType === 'ul' ? 'ul' : 'ol'
        elements.push(
          <ListComponent key={`list-${elements.length}`} className="mb-6 ml-6 space-y-2">
            {listItems}
          </ListComponent>
        )
        listItems = []
        inList = false
      }
    }

    const parseInlineMarkdown = (text: string) => {
      // Bold
      text = text.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>')
      
      // Inline code
      text = text.replace(/`([^`]+)`/g, '<code class="bg-gray-100 px-2 py-1 rounded text-sm font-mono text-gray-800 break-words">$1</code>')
      
      // Links
      text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-600 hover:text-blue-800 underline break-words" target="_blank" rel="noopener noreferrer">$1</a>')
      
      return <span dangerouslySetInnerHTML={{ __html: text }} />
    }

    while (i < lines.length) {
      const line = lines[i]
      
      if (line.startsWith('```')) {
        flushList()
        if (!inCodeBlock) {
          // Start code block
          inCodeBlock = true
          codeLanguage = line.slice(3).trim()
          codeLines = []
        } else {
          // End code block
          inCodeBlock = false
          elements.push(
            <CodeBlock 
              key={`code-${elements.length}`}
              code={codeLines.join('\n')}
              language={codeLanguage}
            />
          )
          codeLines = []
          codeLanguage = ''
        }
      } else if (inCodeBlock) {
        codeLines.push(line)
      } else if (line.startsWith('### ')) {
        flushList()
        elements.push(
          <h3 key={`h3-${elements.length}`} className="text-lg font-semibold mt-8 mb-4 text-gray-900 scroll-mt-20" id={line.slice(4).toLowerCase().replace(/[^a-z0-9]+/g, '-')}>
            {line.slice(4)}
          </h3>
        )
      } else if (line.startsWith('## ')) {
        flushList()
        elements.push(
          <h2 key={`h2-${elements.length}`} className="text-xl font-semibold mt-10 mb-4 text-gray-900 scroll-mt-20" id={line.slice(3).toLowerCase().replace(/[^a-z0-9]+/g, '-')}>
            {line.slice(3)}
          </h2>
        )
      } else if (line.startsWith('# ')) {
        flushList()
        elements.push(
          <h1 key={`h1-${elements.length}`} className="text-2xl font-bold mt-8 mb-6 text-gray-900 scroll-mt-20" id={line.slice(2).toLowerCase().replace(/[^a-z0-9]+/g, '-')}>
            {line.slice(2)}
          </h1>
        )
      } else if (line.startsWith('- ')) {
        if (!inList || listType !== 'ul') {
          flushList()
          inList = true
          listType = 'ul'
        }
        listItems.push(
          <li key={`li-${elements.length}-${listItems.length}`} className="text-gray-700 leading-relaxed">
            {parseInlineMarkdown(line.slice(2))}
          </li>
        )
      } else if (line.match(/^\d+\. /)) {
        if (!inList || listType !== 'ol') {
          flushList()
          inList = true
          listType = 'ol'
        }
        listItems.push(
          <li key={`li-${elements.length}-${listItems.length}`} className="text-gray-700 leading-relaxed">
            {parseInlineMarkdown(line.replace(/^\d+\. /, ''))}
          </li>
        )
      } else if (line.trim() === '') {
        flushList()
        // Skip empty lines, spacing is handled by margins
      } else {
        flushList()
        // Regular paragraphs
        if (line.trim()) {
          elements.push(
            <p key={`p-${elements.length}`} className="mb-4 text-gray-700 leading-relaxed break-words">
              {parseInlineMarkdown(line)}
            </p>
          )
        }
      }
      i++
    }

    flushList() // Flush any remaining list items

    return elements
  }

  return (
    <div className="max-w-none overflow-hidden">
      <div className="prose-content">
        {processContent(content)}
      </div>
    </div>
  )
}
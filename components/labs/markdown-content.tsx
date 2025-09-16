'use client'

interface MarkdownContentProps {
  content: string
}

export function MarkdownContent({ content }: MarkdownContentProps) {
  const processContent = (content: string) => {
    const lines = content.split('\n')
    const elements: JSX.Element[] = []
    let i = 0
    let inCodeBlock = false
    let codeLines: string[] = []
    let inList = false
    let listItems: JSX.Element[] = []
    let listType: 'ul' | 'ol' = 'ul'

    const flushList = () => {
      if (listItems.length > 0) {
        const ListComponent = listType === 'ul' ? 'ul' : 'ol'
        elements.push(
          <ListComponent key={`list-${elements.length}`} className="mb-4 ml-6 space-y-1">
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
      text = text.replace(/`([^`]+)`/g, '<code class="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono text-gray-800">$1</code>')
      
      // Links
      text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-600 hover:text-blue-800 underline" target="_blank">$1</a>')
      
      return <span dangerouslySetInnerHTML={{ __html: text }} />
    }

    while (i < lines.length) {
      const line = lines[i]
      
      if (line.startsWith('```')) {
        flushList()
        if (!inCodeBlock) {
          // Start code block
          inCodeBlock = true
          codeLines = []
        } else {
          // End code block
          inCodeBlock = false
          elements.push(
            <pre key={`code-${elements.length}`} className="bg-gray-100 border border-gray-200 p-4 rounded-lg overflow-x-auto mb-6 text-sm">
              <code className="font-mono text-gray-800">
                {codeLines.join('\n')}
              </code>
            </pre>
          )
          codeLines = []
        }
      } else if (inCodeBlock) {
        codeLines.push(line)
      } else if (line.startsWith('### ')) {
        flushList()
        elements.push(
          <h3 key={`h3-${elements.length}`} className="text-lg font-semibold mt-8 mb-4 text-gray-900">
            {line.slice(4)}
          </h3>
        )
      } else if (line.startsWith('## ')) {
        flushList()
        elements.push(
          <h2 key={`h2-${elements.length}`} className="text-xl font-semibold mt-10 mb-4 text-gray-900">
            {line.slice(3)}
          </h2>
        )
      } else if (line.startsWith('# ')) {
        flushList()
        elements.push(
          <h1 key={`h1-${elements.length}`} className="text-2xl font-bold mt-8 mb-6 text-gray-900">
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
          <li key={`li-${elements.length}-${listItems.length}`} className="text-gray-700">
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
          <li key={`li-${elements.length}-${listItems.length}`} className="text-gray-700">
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
            <p key={`p-${elements.length}`} className="mb-4 text-gray-700 leading-relaxed">
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
    <div className="max-w-none">
      {processContent(content)}
    </div>
  )
}
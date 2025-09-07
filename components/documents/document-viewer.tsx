"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { X, Download, Edit, FileText } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

interface Document {
  id: string
  name: string
  type: string
  size: number
  uploadedAt: Date
  status: "active" | "processing" | "error"
  category?: string
  description?: string
  content?: string
}

interface DocumentViewerProps {
  document: Document | null
  onClose: () => void
  onEdit?: (document: Document) => void
}

export function DocumentViewer({ document, onClose, onEdit }: DocumentViewerProps) {
  if (!document) return null

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  // Sample content for demonstration
  const sampleContent = `# Business FAQ

## General Questions

**Q: What are your business hours?**
A: We are open Monday through Friday from 9:00 AM to 6:00 PM, and Saturday from 10:00 AM to 4:00 PM. We are closed on Sundays and major holidays.

**Q: How can I contact you?**
A: You can reach us by phone at (555) 123-4567, by email at info@business.com, or through our website contact form. We typically respond to emails within 2-4 hours during business hours.

**Q: Do you offer consultations?**
A: Yes, we offer both in-person and virtual consultations. Initial consultations are complimentary and typically last 30 minutes. You can schedule a consultation through our online booking system or by calling our office.

## Services

**Q: What services do you provide?**
A: We offer a comprehensive range of professional services including:
- Business consulting
- Strategic planning
- Market analysis
- Financial advisory
- Process optimization
- Technology integration

**Q: How long does a typical project take?**
A: Project timelines vary depending on scope and complexity. Most consulting projects range from 2-12 weeks. We provide detailed timelines during the initial consultation phase.

## Pricing

**Q: How do you structure your pricing?**
A: We offer flexible pricing options including hourly rates, project-based fees, and retainer agreements. Pricing depends on the specific services required and project complexity. Contact us for a customized quote.

**Q: Do you offer payment plans?**
A: Yes, we offer flexible payment arrangements for larger projects. Payment plans can be discussed during the proposal phase.`

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-4xl max-h-[90vh] flex flex-col">
        <CardHeader className="flex-shrink-0">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="h-5 w-5 text-muted-foreground" />
                <CardTitle className="text-lg">{document.name}</CardTitle>
                <Badge
                  variant={
                    document.status === "active"
                      ? "default"
                      : document.status === "processing"
                        ? "secondary"
                        : "destructive"
                  }
                >
                  {document.status}
                </Badge>
                {document.category && (
                  <Badge variant="outline" className="text-xs">
                    {document.category}
                  </Badge>
                )}
              </div>
              {document.description && <CardDescription>{document.description}</CardDescription>}
              <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
                <span>{document.type}</span>
                <span>{formatFileSize(document.size)}</span>
                <span>Uploaded {formatDistanceToNow(document.uploadedAt)} ago</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => onEdit?.(document)}>
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <Separator />
        <CardContent className="flex-1 p-0">
          <ScrollArea className="h-full p-6">
            <div className="prose prose-sm max-w-none">
              <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">
                {document.content || sampleContent}
              </pre>
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}

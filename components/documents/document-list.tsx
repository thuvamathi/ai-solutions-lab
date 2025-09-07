"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { File, Search, MoreVertical, Eye, Download, Trash2, Edit } from "lucide-react"
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
}

interface DocumentListProps {
  onViewDocument?: (document: Document) => void
  onEditDocument?: (document: Document) => void
  onDeleteDocument?: (document: Document) => void
}

export function DocumentList({ onViewDocument, onEditDocument, onDeleteDocument }: DocumentListProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [documents] = useState<Document[]>([
    {
      id: "1",
      name: "Business FAQ.pdf",
      type: "PDF",
      size: 245760,
      uploadedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      status: "active",
      category: "FAQ",
      description: "Frequently asked questions about our services",
    },
    {
      id: "2",
      name: "Service Descriptions.docx",
      type: "DOCX",
      size: 156432,
      uploadedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      status: "active",
      category: "Services",
      description: "Detailed descriptions of all our service offerings",
    },
    {
      id: "3",
      name: "Privacy Policy.txt",
      type: "TXT",
      size: 89123,
      uploadedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      status: "active",
      category: "Legal",
      description: "Company privacy policy and data handling procedures",
    },
    {
      id: "4",
      name: "Pricing Information.md",
      type: "MD",
      size: 67890,
      uploadedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
      status: "processing",
      category: "Pricing",
      description: "Current pricing structure and packages",
    },
  ])

  const filteredDocuments = documents.filter(
    (doc) =>
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.description?.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Knowledge Base Documents</CardTitle>
        <CardDescription>Manage your business documents that power the AI assistant</CardDescription>
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search documents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {filteredDocuments.length === 0 ? (
            <div className="text-center py-8">
              <File className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                {searchQuery ? "No documents match your search." : "No documents uploaded yet."}
              </p>
            </div>
          ) : (
            filteredDocuments.map((document) => (
              <div
                key={document.id}
                className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/30 transition-colors"
              >
                <File className="h-8 w-8 text-muted-foreground flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-medium truncate">{document.name}</h3>
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
                  {document.description && <p className="text-sm text-muted-foreground mb-1">{document.description}</p>}
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>{document.type}</span>
                    <span>{formatFileSize(document.size)}</span>
                    <span>Uploaded {formatDistanceToNow(document.uploadedAt)} ago</span>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onViewDocument?.(document)}>
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onEditDocument?.(document)}>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => onDeleteDocument?.(document)}
                      className="text-destructive focus:text-destructive"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}

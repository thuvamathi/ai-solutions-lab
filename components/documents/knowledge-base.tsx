"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, UploadIcon } from "lucide-react"
import { DocumentUpload } from "./document-upload"
import { DocumentList } from "./document-list"
import { DocumentViewer } from "./document-viewer"

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

export function KnowledgeBase() {
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null)
  const [activeTab, setActiveTab] = useState("documents")

  const handleViewDocument = (document: Document) => {
    setSelectedDocument(document)
  }

  const handleCloseViewer = () => {
    setSelectedDocument(null)
  }

  const handleEditDocument = (document: Document) => {
    // TODO: Implement document editing
    console.log("Edit document:", document)
  }

  const handleDeleteDocument = (document: Document) => {
    // TODO: Implement document deletion
    console.log("Delete document:", document)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Knowledge Base</h1>
          <p className="text-muted-foreground">
            Manage your business documents to power your AI assistant with accurate information.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="flex items-center gap-1">
            <BookOpen className="h-3 w-3" />4 Documents Active
          </Badge>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="documents" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Documents
          </TabsTrigger>
          <TabsTrigger value="upload" className="flex items-center gap-2">
            <UploadIcon className="h-4 w-4" />
            Upload
          </TabsTrigger>
        </TabsList>

        <TabsContent value="documents" className="space-y-6">
          <DocumentList
            onViewDocument={handleViewDocument}
            onEditDocument={handleEditDocument}
            onDeleteDocument={handleDeleteDocument}
          />
        </TabsContent>

        <TabsContent value="upload" className="space-y-6">
          <DocumentUpload onUploadComplete={() => setActiveTab("documents")} />
        </TabsContent>
      </Tabs>

      <DocumentViewer document={selectedDocument} onClose={handleCloseViewer} onEdit={handleEditDocument} />
    </div>
  )
}

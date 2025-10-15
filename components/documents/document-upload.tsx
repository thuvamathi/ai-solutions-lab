"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Upload, File, X, CheckCircle, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface UploadedFile {
  id: string
  file: File
  status: "uploading" | "processing" | "completed" | "error"
  progress: number
  error?: string
}

interface DocumentUploadProps {
  businessId?: string
  onUploadComplete?: (files: UploadedFile[]) => void
}

export function DocumentUpload({ businessId, onUploadComplete }: DocumentUploadProps) {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles: UploadedFile[] = acceptedFiles.map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      status: "uploading",
      progress: 0,
    }))

    setUploadedFiles((prev) => [...prev, ...newFiles])
    
    // Upload files to database
    newFiles.forEach((uploadedFile) => {
      uploadFile(uploadedFile.id, uploadedFile.file)
    })
  }, [businessId])

  const extractTextFromFile = async (file: File): Promise<string> => {
    if (file.type === 'application/pdf') {
      const pdfToText = (await import('react-pdftotext')).default
      return await pdfToText(file)
    } else if (file.type === 'text/plain' || file.type === 'text/markdown') {
      return await file.text()
    } else {
      // For DOC/DOCX files, we'll send them to the server for mammoth processing
      return 'SERVER_EXTRACT'
    }
  }

  const uploadFile = async (fileId: string, file: File) => {
    const updateProgress = (progress: number, status: UploadedFile["status"], error?: string) => {
      setUploadedFiles((prev) =>
        prev.map((file) => (file.id === fileId ? { ...file, progress, status, error } : file))
      )
    }

    try {
      if (!file) return

      updateProgress(0, "uploading")

      // Extract text from file client-side (if possible)
      let extractedText = ""
      let needsServerExtraction = false
      
      try {
        updateProgress(10, "processing")
        extractedText = await extractTextFromFile(file)
        if (extractedText === 'SERVER_EXTRACT') {
          needsServerExtraction = true
        }
        updateProgress(30, "uploading")
      } catch (extractError) {
        updateProgress(0, "error", `Failed to extract text: ${extractError instanceof Error ? extractError.message : 'Unknown error'}`)
        return
      }

      // Create FormData for upload
      const formData = new FormData()
      if (needsServerExtraction) {
        // Send file for server-side processing
        formData.append('file', file)
      } else {
        // Send pre-extracted content
        formData.append('file_name', file.name)
        formData.append('file_type', file.type)
        formData.append('file_size', file.size.toString())
        formData.append('content', extractedText)
      }
      formData.append('business_id', businessId)

      updateProgress(60, "uploading")

      // Upload to database
      const response = await fetch("/api/documents", {
        method: "POST",
        body: formData,
      })

      updateProgress(90, "processing")

      if (response.ok) {
        updateProgress(100, "completed")
        setTimeout(() => {
          onUploadComplete?.(uploadedFiles.filter((f) => f.status === "completed" || f.id === fileId))
        }, 100)
      } else {
        const errorData = await response.json()
        updateProgress(0, "error", errorData.details || errorData.error || "Upload failed")
      }
    } catch (error) {
      updateProgress(0, "error", error instanceof Error ? error.message : "Upload failed")
    }
  }

  const removeFile = (fileId: string) => {
    setUploadedFiles((prev) => prev.filter((file) => file.id !== fileId))
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "application/msword": [".doc"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
      "text/plain": [".txt"],
      "text/markdown": [".md"],
    },
    maxSize: 10 * 1024 * 1024, // 10MB
  })

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Upload Business Documents</CardTitle>
          <CardDescription>
            Upload your FAQs, service descriptions, policies, and other business information. Supported formats: PDF,
            DOC, DOCX, TXT, MD (Max 10MB per file)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div
            {...getRootProps()}
            className={cn(
              "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors",
              isDragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-primary/50",
            )}
          >
            <input {...getInputProps()} />
            <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            {isDragActive ? (
              <p className="text-lg font-medium">Drop the files here...</p>
            ) : (
              <div>
                <p className="text-lg font-medium mb-2">Drag & drop files here, or click to select</p>
                <p className="text-sm text-muted-foreground">PDF, DOC, DOCX, TXT, MD files up to 10MB</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {uploadedFiles.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Upload Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {uploadedFiles.map((uploadedFile) => (
                <div key={uploadedFile.id} className="flex items-center gap-4 p-4 border rounded-lg">
                  <File className="h-8 w-8 text-muted-foreground flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <p className="text-sm font-medium truncate">{uploadedFile.file.name}</p>
                      <Badge
                        variant={
                          uploadedFile.status === "completed"
                            ? "default"
                            : uploadedFile.status === "error"
                              ? "destructive"
                              : "secondary"
                        }
                      >
                        {uploadedFile.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <Progress value={uploadedFile.progress} className="flex-1" />
                      <span className="text-xs text-muted-foreground">{Math.round(uploadedFile.progress)}%</span>
                    </div>
                    {uploadedFile.error && <p className="text-xs text-destructive mt-1">{uploadedFile.error}</p>}
                  </div>
                  <div className="flex items-center gap-2">
                    {uploadedFile.status === "completed" && <CheckCircle className="h-5 w-5 text-green-500" />}
                    {uploadedFile.status === "error" && <AlertCircle className="h-5 w-5 text-destructive" />}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(uploadedFile.id)}
                      className="h-8 w-8 p-0"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

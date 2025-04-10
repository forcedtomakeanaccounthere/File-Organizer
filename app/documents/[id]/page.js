"use client"

import { useParams } from "next/navigation"
import { DocumentViewer } from "@/components/document-viewer"
import { sampleDocuments } from "@/lib/utils"

export default function DocumentPage() {
  const params = useParams()
  const documentId = params.id

  // Find the document in our sample data
  const document = sampleDocuments.find((doc) => doc.id === documentId) || null

  return (
    <div className="h-screen">
      <DocumentViewer document={document} />
    </div>
  )
}


"use client"

import { useState } from "react"
import { Save, Download, Share, Printer, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export function DocumentViewer({ document }) {
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = 5 // Example value

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-xl font-bold">{document?.name || "Document Viewer"}</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Save className="h-4 w-4 mr-2" />
            Save
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
          <Button variant="outline" size="sm">
            <Share className="h-4 w-4 mr-2" />
            Share
          </Button>
          <Button variant="outline" size="sm">
            <Printer className="h-4 w-4 mr-2" />
            Print
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-4">
        <Card className="mx-auto max-w-3xl min-h-[800px]">
          <CardContent className="p-8">
            <div className="space-y-4">
              <h1 className="text-2xl font-bold">Sample Document Content</h1>
              <p>
                This is a placeholder for document content. In a real application, this would display the actual
                document content.
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies,
                nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl.
              </p>
              <h2 className="text-xl font-semibold mt-6">Section 1</h2>
              <p>
                Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum
                tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante.
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Item one with some text</li>
                <li>Item two with some more text</li>
                <li>Item three with even more text</li>
              </ul>
              <h2 className="text-xl font-semibold mt-6">Section 2</h2>
              <p>
                Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum
                tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center justify-between p-4 border-t">
        <Button variant="outline" size="sm" onClick={handlePrevPage} disabled={currentPage === 1}>
          <ChevronLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>

        <div className="text-sm">
          Page {currentPage} of {totalPages}
        </div>

        <Button variant="outline" size="sm" onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
          <ChevronRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  )
}


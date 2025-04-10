"use client"

import { motion } from "framer-motion"
import { FileText, FileSpreadsheet, FileIcon as FilePresentationIcon, Clock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function RecentActivity() {
  const activities = [
    {
      id: 1,
      user: "John Doe",
      action: "edited",
      document: "Project Proposal.pdf",
      time: "10 minutes ago",
      icon: FileText,
    },
    {
      id: 2,
      user: "Jane Smith",
      action: "commented on",
      document: "Financial Report Q4.xlsx",
      time: "1 hour ago",
      icon: FileSpreadsheet,
    },
    {
      id: 3,
      user: "Mike Johnson",
      action: "shared",
      document: "Client Presentation.pptx",
      time: "2 hours ago",
      icon: FilePresentationIcon,
    },
    {
      id: 4,
      user: "Sarah Williams",
      action: "uploaded",
      document: "Meeting Notes.docx",
      time: "3 hours ago",
      icon: FileText,
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex items-start gap-3"
            >
              <div className="file-icon">
                <activity.icon className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <p className="text-sm">
                  <span className="font-medium">{activity.user}</span> {activity.action}{" "}
                  <span className="font-medium">{activity.document}</span>
                </p>
                <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>{activity.time}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}


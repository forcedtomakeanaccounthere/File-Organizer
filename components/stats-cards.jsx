"use client"

import { motion } from "framer-motion"
import { FileText, Upload, Users, Clock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function StatsCards() {
  const stats = [
    {
      title: "Total Documents",
      value: "128",
      icon: FileText,
      color: "bg-secondary",
    },
    {
      title: "Recent Uploads",
      value: "24",
      icon: Upload,
      color: "bg-secondary",
    },
    {
      title: "Shared With Me",
      value: "32",
      icon: Users,
      color: "bg-secondary",
    },
    {
      title: "Last Activity",
      value: "2h ago",
      icon: Clock,
      color: "bg-secondary",
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <div className={`${stat.color} p-2 rounded-md`}>
                <stat.icon className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}


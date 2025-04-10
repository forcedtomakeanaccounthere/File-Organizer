"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { SearchBar } from "@/components/search-bar";
import { StatsCards } from "@/components/stats-cards";
import { RecentActivity } from "@/components/recent-activity";
import { FileExplorer } from "@/components/file-explorer";
import { sampleDocuments, getFileIconComponent } from "@/lib/data";
import { Sidebar } from "./sidebar";
import { DeepSearch } from "./deep-search";
import { useRouter } from "next/navigation";

import { logOutUserAction } from "../app/actions/logout";
import { toast } from "sonner";
import {
  File,
  FileText,
  FileSpreadsheet,
  FileIcon as FilePresentationIcon,
  Download,
  Share,
} from "lucide-react";
import { Button } from "./ui/button";
export default function Dashboard({ user }) {
  const [activeTab, setActiveTab] = useState("overview");
  const [activeFolder, setActiveFolder] = useState("all");
  const [docs, setDocs] = useState([{}]);
  const handleLogOut = async () => {
    const result = await logOutUserAction();

    if (result.status === 200) {
      toast({
        title: "Logged Out",
        description: "You have logged out successfully",
        duration: 3000,
      });
      router.push("/auth/login");
    } else {
      console.log(result);
    }
  };
  useEffect(() => {
    const fetchDocs = async () => {
      try {
        const res = await fetch("/api/getFiles");
        if (res.ok) {
          const data = await res.json();

          setDocs(data.files);
        } else {
          console.error("Failed to fetch files");
        }
      } catch (error) {
        console.error("Error fetching files:", error);
      }
    };
    fetchDocs();
  }, []);
  return (
    <>
      {/* Fixed Header with Profile Tab & Logout Button */}

      <div className="container mx-auto p-4 md:p-6 pt-20">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6"
        >
          <div>
            <h1 className="text-3xl font-bold">Document Management</h1>
            <p className="text-muted-foreground">
              Manage and organize your documents efficiently
            </p>
          </div>

          <SearchBar />
          <div className=" bg-white shadow p-4 flex justify-end items-center">
            <button className="mr-4 text-gray-700 font-medium">Profile</button>
            <button
              onClick={handleLogOut}
              className="px-4 py-2 bg-red-500 text-white rounded"
            >
              Logout
            </button>
          </div>
        </motion.div>

        {/* Tabs Section */}
        <Tabs
          defaultValue="overview"
          className="mb-6"
          onValueChange={setActiveTab}
        >
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="shared">Shared</TabsTrigger>
            <TabsTrigger value="deep-search">Deep Search</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <StatsCards />

            <div className="grid gap-6 md:grid-cols-2">
              {/* Recent Activity Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <RecentActivity />
              </motion.div>

              {/* Quick Access Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Quick Access</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {docs.length > 0 &&
                        docs?.map((doc, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            className="flex items-center gap-3 p-2 rounded-md hover:bg-secondary cursor-pointer"
                          >
                            <div className="file-icon">
                              {getFileIconComponent(doc?.type)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-medium truncate">
                                {doc.name}
                              </h3>
                              <p className="text-xs text-muted-foreground">
                                {doc.modified}
                              </p>
                            </div>
                          </motion.div>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </TabsContent>

          {/* Documents Tab */}
          <TabsContent value="documents">
            <FileExplorer filter={activeFolder} docs={docs} />
          </TabsContent>

          {/* Shared Tab */}
          <TabsContent value="shared">
            <SharedFiles />
          </TabsContent>

          {/* Deep Search Tab */}
          <TabsContent value="deep-search">
            <DeepSearch />
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">User Profile</h2>
              <p>Username: {user?.username}</p>
              <p>Email: {user?.email}</p>
              {/* Logout button inside profile tab as well */}
              <button
                onClick={handleLogOut}
                className="px-4 py-2 bg-red-500 text-white rounded"
              >
                Logout
              </button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}

function SharedFiles() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch shared files for the logged in user on mount
  useEffect(() => {
    async function fetchSharedFiles() {
      try {
        const res = await fetch("/api/sharedFiles");
        if (res.ok) {
          const data = await res.json();
          setFiles(data.files);
        } else {
          console.error("Failed to fetch shared files");
        }
      } catch (error) {
        console.error("Error fetching shared files:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchSharedFiles();
  }, []);

  // Choose the appropriate icon based on the file type
  const getFileIconComponent = (type) => {
    switch (type) {
      case "pdf":
        return <FileText className="h-10 w-10" />;
      case "docx":
        return <FileText className="h-10 w-10" />;
      case "xlsx":
        return <FileSpreadsheet className="h-10 w-10" />;
      case "pptx":
        return <FilePresentationIcon className="h-10 w-10" />;
      default:
        return <File className="h-10 w-10" />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 border rounded-lg">
        <div className="text-center">
          <h3 className="text-lg font-medium">Loading shared documents...</h3>
        </div>
      </div>
    );
  }

  if (!files || files.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 border rounded-lg">
        <div className="text-center">
          <h3 className="text-lg font-medium">No shared documents</h3>
          <p className="text-muted-foreground">
            Documents shared with you will appear here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
      {files.map((file) => (
        <Card key={file._id || file.id}>
          <CardContent>
            <div className="flex items-center gap-3">
              <div className="file-icon">{getFileIconComponent(file.type)}</div>
              <div>
                <h3 className="font-medium truncate">{file.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {new Date(file.createdAt).toLocaleDateString()}
                </p>
                <p className="text-sm">
                  {file.author?.username ? `by ${file.author.username}` : ""}
                </p>
              </div>
            </div>
            <div className="mt-2 flex gap-2">
              <Button variant="ghost" size="icon">
                <Download size={16} />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

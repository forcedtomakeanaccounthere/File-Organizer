"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  FolderOpen,
  Upload,
  Settings,
  Menu,
  X,
  Trash,
  FileText,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { sampleDocuments, folders } from "@/lib/data";
import { toast } from "sonner";

export function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

  // Hide the sidebar on '/', '/login', and '/register' routes
  if (
    pathname === "/" ||
    pathname === "/auth/login" ||
    pathname === "/auth/signup"
  ) {
    return null;
  }

  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [expandedFolders, setExpandedFolders] = useState({});
  const [docs, setDocs] = useState([{}]);
  const params = useSearchParams();
  if (params.get("/")) {
    return null;
  }
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

  useEffect(() => {
    const handleResize = () => {
      setSidebarVisible(window.innerWidth >= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = sidebarVisible ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [sidebarVisible]);

  const toggleFolder = (folderId) => {
    setExpandedFolders((prev) => ({
      ...prev,
      [folderId]: !prev[folderId],
    }));
  };

  const getDocsForFolder = (folderId) => {
    if (folderId === "all") return docs;
    if (folderId === "recent")
      return [...docs].sort((a, b) => (a.modified < b.modified ? 1 : -1));
    return docs.filter((doc) => doc.folder.toLowerCase() === folderId);
  };

  const handleDeleteDoc = (docId) => {
    setDocs((prevDocs) => prevDocs.filter((doc) => doc.id !== docId));
  };

  const [selectedFile, setSelectedFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error("No file selected!");
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("File uploaded successfully!");
        console.log("File Data:", data.file);
        // refresh the page
        router.refresh();
        setSelectedFile(null);
      } else {
        throw new Error(data.error || "Upload failed");
      }
    } catch (error) {
      console.error("Upload Error:", error);
      toast.error(error.message || "Something went wrong!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={() => setSidebarVisible(!sidebarVisible)}
      >
        {sidebarVisible ? <X size={20} /> : <Menu size={20} />}
      </Button>

      {sidebarVisible && window.innerWidth < 768 && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setSidebarVisible(false)}
        ></div>
      )}

      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: sidebarVisible ? 0 : -300 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 md:relative md:translate-x-0"
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b">
            <h1 className="text-xl font-bold">DocManager</h1>
          </div>
          <div
            className="p-2 border border-black border-dashed "
            onClick={() => router.push("")}
          >
            <h1 className="text-lg font-bold  text-center cursor-pointer ">
              Dashboard
            </h1>
          </div>
          <div className="p-4">
            {!selectedFile ? (
              <label
                htmlFor="upload"
                className="w-full flex items-center justify-start gap-2 cursor-pointer bg-black text-white p-4 rounded-md"
              >
                <Upload size={18} /> Upload Document
              </label>
            ) : (
              <div className="flex items-center justify-between bg-gray-100 p-3 rounded-md">
                <div className="flex items-center gap-2">
                  <FileText size={18} />
                  <span className="text-sm">{selectedFile.name}</span>
                </div>
                <button
                  onClick={() => setSelectedFile(null)}
                  className="text-red-500"
                >
                  <X size={18} />
                </button>
              </div>
            )}

            <input
              type="file"
              className="hidden"
              id="upload"
              onChange={handleFileChange}
              name="file"
            />

            {selectedFile && (
              <button
                onClick={handleUpload}
                className="mt-3 w-full bg-blue-500 text-white p-2 rounded-md flex items-center justify-center gap-2"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Uploading..." : "Submit"}
                {isSubmitting ? <Upload size={18} /> : <Check size={18} />}
              </button>
            )}
          </div>

          <nav className="flex-1 overflow-auto p-4 folders-sidebar">
            {folders.map((folder) => (
              <div key={folder.id} className="mb-4">
                <Button
                  variant="ghost"
                  className="w-full justify-between gap-2"
                  onClick={() => toggleFolder(folder.id)}
                >
                  <div className="flex items-center gap-2">
                    <FolderOpen size={18} />
                    <span>{folder.name}</span>
                  </div>
                  <span className="text-xs text-gray-500">{folder.count}</span>
                </Button>
                {expandedFolders[folder.id] && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="mt-2 ml-6 border-l border-gray-300 pl-2"
                  >
                    {getDocsForFolder(folder.id).length === 0 ? (
                      <p className="text-xs text-gray-400">No documents</p>
                    ) : (
                      getDocsForFolder(folder.id).map((doc) => (
                        <div
                          key={doc.id}
                          className="flex items-center justify-between p-1 hover:bg-gray-100 rounded cursor-pointer"
                        >
                          <div
                            className="flex-1"
                            // make this to visit doc.fileUrl link of the file
                            onClick={() => router.push(doc?.fileUrl)}
                          >
                            <p className="text-sm font-medium">{doc.name}</p>
                            <p className="text-xs text-gray-500">
                              {doc.modified}
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteDoc(doc.id)}
                          >
                            <Trash size={16} />
                          </Button>
                        </div>
                      ))
                    )}
                  </motion.div>
                )}
              </div>
            ))}
          </nav>
          <div className="p-4 border-t">
            <Button variant="ghost" className="w-full justify-start gap-2">
              <Settings size={18} /> Settings
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start gap-2 text-destructive"
            >
              <Trash size={18} />
              Trash
            </Button>
          </div>
        </div>
      </motion.aside>
    </>
  );
}

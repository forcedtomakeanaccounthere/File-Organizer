"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  File,
  FileText,
  FileSpreadsheet,
  FileIcon as FilePresentationIcon,
  Download,
  Share,
  Edit,
  X,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { sampleDocuments } from "@/lib/utils";

// ShareModal component accepts a fileId prop and its input is blank on open
function ShareModal({ open, onClose, fileId }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [fetchedUsers, setFetchedUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Whenever the search query changes, fetch users from the API
  useEffect(() => {
    if (!searchQuery) {
      setFetchedUsers([]);
      return;
    }
    const fetchUsers = async () => {
      try {
        const res = await fetch(
          `/api/users?q=${encodeURIComponent(searchQuery)}`
        );
        if (res.ok) {
          const data = await res.json();
          setFetchedUsers(data);
        } else {
          console.error("Failed to fetch users");
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, [searchQuery]);

  const addUser = (user) => {
    if (!selectedUsers.some((u) => u.id === user.id)) {
      setSelectedUsers([...selectedUsers, user]);
    }
  };

  const removeUser = (user) => {
    setSelectedUsers(selectedUsers.filter((u) => u.id !== user.id));
  };

  const shareFile = async () => {
    // POST the fileId and selected collaborator IDs to our API route
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/shareFile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fileId,
          collaboratorIds: selectedUsers.map((user) => user.id),
        }),
      });
      if (res.ok) {
        // Optionally, notify the user that sharing was successful
        onClose();
      } else {
        console.error("Failed to share file");
      }
    } catch (error) {
      console.error("Error sharing file:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset state when modal opens/closes so that input is blank every time
  useEffect(() => {
    if (open) {
      setSearchQuery("");
      setFetchedUsers([]);
      setSelectedUsers([]);
    }
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Share File</h2>
          <Button variant="ghost" onClick={onClose}>
            <X size={16} />
          </Button>
        </div>
        <input
          type="text"
          className="border border-gray-300 rounded p-2 w-full"
          placeholder="Search users..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="mt-4 max-h-60 overflow-y-auto">
          {fetchedUsers.map((user) => (
            <div
              key={user.id}
              className="flex justify-between items-center p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => addUser(user)}
            >
              <span>{user.username}</span>
              <Button variant="outline" size="sm">
                Add
              </Button>
            </div>
          ))}
        </div>
        {selectedUsers.length > 0 && (
          <div className="mt-4">
            <h3 className="font-medium">Selected Collaborators:</h3>
            <div className="flex flex-wrap gap-2 mt-2">
              {selectedUsers.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center gap-1 px-2 py-1 bg-blue-100 rounded"
                >
                  <span>{user.username}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeUser(user)}
                  >
                    <X size={16} />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="mt-4 flex justify-end gap-2">
          <Button onClick={onClose} variant="outline">
            Cancel
          </Button>
          <Button
            onClick={shareFile}
            disabled={isSubmitting || selectedUsers.length === 0}
          >
            {isSubmitting ? "Sharing..." : "Share File"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export function FileExplorer({ filter = "all", docs }) {
  const [hoveredItem, setHoveredItem] = useState(null);
  // Store the fileId for which the share modal is open
  const [shareModalFileId, setShareModalFileId] = useState(null);
  // console.log(docs[0]._id);
  const filteredDocs =
    filter === "all"
      ? docs
      : docs.filter((doc) => doc?.folder?.toLowerCase() === filter);
  console.log(filteredDocs);

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

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
        {filteredDocs.length > 0 &&
          filteredDocs.map((doc, index) => (
            <motion.div
              key={doc._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.03 }}
              onHoverStart={() => setHoveredItem(doc?._id)}
              onHoverEnd={() => setHoveredItem(null)}
            >
              <Card className="overflow-hidden cursor-pointer">
                <CardContent className="p-0">
                  <div className="p-4 flex items-start gap-3">
                    <div className="file-icon">
                      {getFileIconComponent(doc.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium truncate">{doc.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {doc.size} • {doc.modified}
                      </p>
                    </div>
                    {hoveredItem === doc?._id && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex gap-1"
                      >
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit size={16} />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Download size={16} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => setShareModalFileId(doc?._id)}
                        >
                          <Share size={16} />
                        </Button>
                      </motion.div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
      </div>
      <ShareModal
        open={!!shareModalFileId}
        fileId={shareModalFileId}
        onClose={() => setShareModalFileId(null)}
      />
    </>
  );
}

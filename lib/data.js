import {
  FileText,
  FileSpreadsheet,
  FileImage,
  File,
  FileIcon as FilePresentation,
  FileCode,
  FileJson,
  FileArchive,
} from "lucide-react";

// Sample documents with various types and metadata
export const sampleDocuments = [
  {
    id: "doc1",
    name: "Project Proposal - Q1 2024.pdf",
    type: "pdf",
    size: "2.4 MB",
    modified: "2024-02-15",
    created: "2024-02-10",
    folder: "Projects",
    tags: ["proposal", "important", "2024"],
    author: "user1",
    shared: ["user2", "user3"],
    favorited: true,
    content: "This proposal outlines our strategy for Q1 2024...",
    thumbnail: "/placeholder.svg?height=400&width=300",
  },
  {
    id: "doc2",
    name: "Financial Report Q4 2023.xlsx",
    type: "xlsx",
    size: "1.8 MB",
    modified: "2024-01-20",
    created: "2024-01-15",
    folder: "Finance",
    tags: ["financial", "quarterly", "report"],
    author: "user2",
    shared: ["user1", "user4"],
    favorited: false,
    content: "Quarterly financial data and projections...",
    thumbnail: "/placeholder.svg?height=400&width=300",
  },
  {
    id: "doc3",
    name: "Team Meeting Notes - Feb 2024.docx",
    type: "docx",
    size: "0.5 MB",
    modified: "2024-02-18",
    created: "2024-02-18",
    folder: "Meetings",
    tags: ["meeting", "notes", "team"],
    author: "user1",
    shared: ["user2", "user3", "user4", "user5"],
    favorited: true,
    content: "Discussion points from our February team meeting...",
    thumbnail: "/placeholder.svg?height=400&width=300",
  },
  {
    id: "doc4",
    name: "Product Roadmap 2024-2025.pptx",
    type: "pptx",
    size: "3.2 MB",
    modified: "2024-02-05",
    created: "2024-01-25",
    folder: "Projects",
    tags: ["roadmap", "product", "presentation"],
    author: "user3",
    shared: ["user1", "user2"],
    favorited: true,
    content: "Our product development plans for the next 18 months...",
    thumbnail: "/placeholder.svg?height=400&width=300",
  },
  {
    id: "doc5",
    name: "Employee Handbook 2024.pdf",
    type: "pdf",
    size: "4.7 MB",
    modified: "2024-01-10",
    created: "2024-01-05",
    folder: "HR",
    tags: ["handbook", "policies", "employees"],
    author: "user4",
    shared: ["user1", "user2", "user3", "user5"],
    favorited: false,
    content: "Updated company policies and procedures for 2024...",
    thumbnail: "/placeholder.svg?height=400&width=300",
  },
  {
    id: "doc6",
    name: "Marketing Strategy - Q1 & Q2.docx",
    type: "docx",
    size: "1.2 MB",
    modified: "2024-02-12",
    created: "2024-02-01",
    folder: "Marketing",
    tags: ["marketing", "strategy", "2024"],
    author: "user5",
    shared: ["user1", "user3"],
    favorited: false,
    content:
      "Marketing initiatives and campaigns planned for first half of 2024...",
    thumbnail: "/placeholder.svg?height=400&width=300",
  },
  {
    id: "doc7",
    name: "Budget Forecast 2024.xlsx",
    type: "xlsx",
    size: "1.5 MB",
    modified: "2024-01-30",
    created: "2024-01-20",
    folder: "Finance",
    tags: ["budget", "forecast", "financial"],
    author: "user2",
    shared: ["user1", "user4"],
    favorited: true,
    content: "Annual budget projections and allocations...",
    thumbnail: "/placeholder.svg?height=400&width=300",
  },
  {
    id: "doc8",
    name: "Client Presentation - ABC Corp.pptx",
    type: "pptx",
    size: "2.8 MB",
    modified: "2024-02-20",
    created: "2024-02-15",
    folder: "Sales",
    tags: ["client", "presentation", "sales"],
    author: "user3",
    shared: ["user1", "user5"],
    favorited: false,
    content: "Presentation for our upcoming meeting with ABC Corporation...",
    thumbnail: "/placeholder.svg?height=400&width=300",
  },
  {
    id: "doc9",
    name: "System Architecture Diagram.png",
    type: "png",
    size: "1.1 MB",
    modified: "2024-02-10",
    created: "2024-02-10",
    folder: "Technical",
    tags: ["architecture", "diagram", "technical"],
    author: "user1",
    shared: ["user3"],
    favorited: false,
    content: "Visual representation of our system architecture...",
    thumbnail: "/placeholder.svg?height=400&width=300",
  },
  {
    id: "doc10",
    name: "API Documentation.pdf",
    type: "pdf",
    size: "2.2 MB",
    modified: "2024-02-05",
    created: "2024-01-15",
    folder: "Technical",
    tags: ["api", "documentation", "technical"],
    author: "user3",
    shared: ["user1"],
    favorited: true,
    content: "Comprehensive documentation of our API endpoints and usage...",
    thumbnail: "/placeholder.svg?height=400&width=300",
  },
  {
    id: "doc11",
    name: "Customer Feedback Analysis.xlsx",
    type: "xlsx",
    size: "1.7 MB",
    modified: "2024-02-18",
    created: "2024-02-10",
    folder: "Marketing",
    tags: ["feedback", "analysis", "customers"],
    author: "user5",
    shared: ["user1", "user2"],
    favorited: false,
    content: "Analysis of customer feedback collected in January 2024...",
    thumbnail: "/placeholder.svg?height=400&width=300",
  },
  {
    id: "doc12",
    name: "Legal Contract - Vendor XYZ.pdf",
    type: "pdf",
    size: "1.3 MB",
    modified: "2024-01-25",
    created: "2024-01-20",
    folder: "Legal",
    tags: ["contract", "legal", "vendor"],
    author: "user4",
    shared: ["user1"],
    favorited: false,
    content: "Service agreement with Vendor XYZ for 2024...",
    thumbnail: "/placeholder.svg?height=400&width=300",
  },
  {
    id: "doc13",
    name: "Project Timeline.xlsx",
    type: "xlsx",
    size: "0.9 MB",
    modified: "2024-02-22",
    created: "2024-02-15",
    folder: "Projects",
    tags: ["timeline", "project", "schedule"],
    author: "user1",
    shared: ["user2", "user3", "user5"],
    favorited: true,
    content: "Detailed timeline for our Q1 project milestones...",
    thumbnail: "/placeholder.svg?height=400&width=300",
  },
  {
    id: "doc14",
    name: "Competitive Analysis.docx",
    type: "docx",
    size: "1.4 MB",
    modified: "2024-02-08",
    created: "2024-01-30",
    folder: "Marketing",
    tags: ["competitive", "analysis", "market"],
    author: "user5",
    shared: ["user1", "user3"],
    favorited: false,
    content: "Analysis of our main competitors and market positioning...",
    thumbnail: "/placeholder.svg?height=400&width=300",
  },
  {
    id: "doc15",
    name: "Onboarding Checklist.pdf",
    type: "pdf",
    size: "0.6 MB",
    modified: "2024-01-15",
    created: "2024-01-10",
    folder: "HR",
    tags: ["onboarding", "checklist", "new hires"],
    author: "user4",
    shared: ["user1", "user2", "user5"],
    favorited: true,
    content: "Step-by-step process for onboarding new team members...",
    thumbnail: "/placeholder.svg?height=400&width=300",
  },
  {
    id: "doc16",
    name: "Sales Targets Q1 2024.xlsx",
    type: "xlsx",
    size: "0.8 MB",
    modified: "2024-01-10",
    created: "2024-01-05",
    folder: "Sales",
    tags: ["sales", "targets", "quarterly"],
    author: "user3",
    shared: ["user1", "user5"],
    favorited: false,
    content: "Sales goals and targets for Q1 2024...",
    thumbnail: "/placeholder.svg?height=400&width=300",
  },
  {
    id: "doc17",
    name: "Brand Guidelines.pdf",
    type: "pdf",
    size: "3.5 MB",
    modified: "2024-01-20",
    created: "2023-12-15",
    folder: "Marketing",
    tags: ["brand", "guidelines", "design"],
    author: "user5",
    shared: ["user1", "user2", "user3", "user4"],
    favorited: true,
    content:
      "Official brand guidelines including logo usage, colors, and typography...",
    thumbnail: "/placeholder.svg?height=400&width=300",
  },
  {
    id: "doc18",
    name: "Database Schema.json",
    type: "json",
    size: "0.3 MB",
    modified: "2024-02-15",
    created: "2024-02-10",
    folder: "Technical",
    tags: ["database", "schema", "technical"],
    author: "user1",
    shared: ["user3"],
    favorited: false,
    content: "JSON representation of our database schema...",
    thumbnail: "/placeholder.svg?height=400&width=300",
  },
  {
    id: "doc19",
    name: "User Research Results.pptx",
    type: "pptx",
    size: "2.1 MB",
    modified: "2024-02-10",
    created: "2024-02-05",
    folder: "Research",
    tags: ["research", "users", "results"],
    author: "user5",
    shared: ["user1", "user2"],
    favorited: false,
    content: "Findings from our January user research studies...",
    thumbnail: "/placeholder.svg?height=400&width=300",
  },
  {
    id: "doc20",
    name: "Expense Report - Jan 2024.pdf",
    type: "pdf",
    size: "0.7 MB",
    modified: "2024-02-05",
    created: "2024-02-01",
    folder: "Finance",
    tags: ["expenses", "report", "monthly"],
    author: "user2",
    shared: ["user1", "user4"],
    favorited: false,
    content: "Monthly expense report for January 2024...",
    thumbnail: "/placeholder.svg?height=400&width=300",
  },
  {
    id: "doc21",
    name: "Code Review Guidelines.md",
    type: "md",
    size: "0.1 MB",
    modified: "2024-01-25",
    created: "2024-01-20",
    folder: "Technical",
    tags: ["code", "review", "guidelines"],
    author: "user3",
    shared: ["user1"],
    favorited: true,
    content: "Best practices and standards for our code review process...",
    thumbnail: "/placeholder.svg?height=400&width=300",
  },
  {
    id: "doc22",
    name: "Project Kickoff Presentation.pptx",
    type: "pptx",
    size: "1.9 MB",
    modified: "2024-02-20",
    created: "2024-02-18",
    folder: "Projects",
    tags: ["kickoff", "presentation", "project"],
    author: "user1",
    shared: ["user2", "user3", "user4", "user5"],
    favorited: true,
    content: "Presentation for our new project kickoff meeting...",
    thumbnail: "/placeholder.svg?height=400&width=300",
  },
  {
    id: "doc23",
    name: "Software Requirements Specification.docx",
    type: "docx",
    size: "1.6 MB",
    modified: "2024-02-15",
    created: "2024-02-01",
    folder: "Technical",
    tags: ["requirements", "specification", "software"],
    author: "user3",
    shared: ["user1", "user2"],
    favorited: false,
    content:
      "Detailed requirements specification for our new software release...",
    thumbnail: "/placeholder.svg?height=400&width=300",
  },
  {
    id: "doc24",
    name: "Training Materials.zip",
    type: "zip",
    size: "5.2 MB",
    modified: "2024-01-30",
    created: "2024-01-25",
    folder: "HR",
    tags: ["training", "materials", "onboarding"],
    author: "user4",
    shared: ["user1", "user5"],
    favorited: false,
    content: "Collection of training materials for new employees...",
    thumbnail: "/placeholder.svg?height=400&width=300",
  },
];

// Folder structure
export const folders = [
  { id: "all", name: "All Documents", icon: "folder" },
  { id: "recent", name: "Recent", icon: "clock" },
  { id: "favorited", name: "Favorites", icon: "star" },
  { id: "resume", name: "Resume", icon: "folder" },
  { id: "contract", name: "Contract", icon: "folder" },
  { id: "trash", name: "Trash", icon: "trash" },
];

// User data
export const users = [
  {
    id: "user1",
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "Admin",
  },
  {
    id: "user2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "Finance Manager",
  },
  {
    id: "user3",
    name: "Mike Johnson",
    email: "mike.johnson@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "Technical Lead",
  },
  {
    id: "user4",
    name: "Sarah Williams",
    email: "sarah.williams@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "HR Manager",
  },
  {
    id: "user5",
    name: "David Brown",
    email: "david.brown@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "Marketing Director",
  },
];

// Recent activity data
export const recentActivities = [
  {
    id: "activity1",
    userId: "user1",
    action: "edited",
    documentId: "doc1",
    timestamp: "2024-02-22T14:30:00Z",
  },
  {
    id: "activity2",
    userId: "user2",
    action: "commented",
    documentId: "doc2",
    timestamp: "2024-02-22T13:15:00Z",
  },
  {
    id: "activity3",
    userId: "user3",
    action: "shared",
    documentId: "doc8",
    timestamp: "2024-02-22T11:45:00Z",
  },
  {
    id: "activity4",
    userId: "user5",
    action: "uploaded",
    documentId: "doc22",
    timestamp: "2024-02-22T10:30:00Z",
  },
  {
    id: "activity5",
    userId: "user4",
    action: "edited",
    documentId: "doc5",
    timestamp: "2024-02-21T16:20:00Z",
  },
  {
    id: "activity6",
    userId: "user1",
    action: "uploaded",
    documentId: "doc13",
    timestamp: "2024-02-21T14:10:00Z",
  },
  {
    id: "activity7",
    userId: "user3",
    action: "commented",
    documentId: "doc10",
    timestamp: "2024-02-21T11:30:00Z",
  },
  {
    id: "activity8",
    userId: "user2",
    action: "shared",
    documentId: "doc7",
    timestamp: "2024-02-21T09:45:00Z",
  },
  {
    id: "activity9",
    userId: "user5",
    action: "edited",
    documentId: "doc14",
    timestamp: "2024-02-20T15:30:00Z",
  },
  {
    id: "activity10",
    userId: "user1",
    action: "commented",
    documentId: "doc3",
    timestamp: "2024-02-20T13:20:00Z",
  },
];

// Tags for document categorization
export const tags = [
  { id: "tag1", name: "important", color: "#ef4444" },
  { id: "tag2", name: "financial", color: "#22c55e" },
  { id: "tag3", name: "report", color: "#3b82f6" },
  { id: "tag4", name: "presentation", color: "#a855f7" },
  { id: "tag5", name: "contract", color: "#f59e0b" },
  { id: "tag6", name: "technical", color: "#64748b" },
  { id: "tag7", name: "marketing", color: "#ec4899" },
  { id: "tag8", name: "research", color: "#06b6d4" },
  { id: "tag9", name: "draft", color: "#94a3b8" },
  { id: "tag10", name: "final", color: "#10b981" },
];

// Helper function to get file icon based on file type
export const getFileIconComponent = (type) => {
  switch (type?.toLowerCase()) {
    case "pdf":
      return <FileText className="h-10 w-10" />;
    case "docx":
    case "doc":
      return <FileText className="h-10 w-10" />;
    case "xlsx":
    case "xls":
    case "csv":
      return <FileSpreadsheet className="h-10 w-10" />;
    case "pptx":
    case "ppt":
      return <FilePresentation className="h-10 w-10" />;
    case "png":
    case "jpg":
    case "jpeg":
    case "gif":
    case "svg":
      return <FileImage className="h-10 w-10" />;
    case "json":
      return <FileJson className="h-10 w-10" />;
    case "js":
    case "ts":
    case "jsx":
    case "tsx":
    case "html":
    case "css":
    case "md":
      return <FileCode className="h-10 w-10" />;
    case "zip":
    case "rar":
    case "7z":
      return <FileArchive className="h-10 w-10" />;
    default:
      return <File className="h-10 w-10" />;
  }
};

// Helper function to format date
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
};

// Helper function to format file size
export const formatFileSize = (sizeInMB) => {
  const size = Number.parseFloat(sizeInMB);
  if (size < 1) {
    return `${Math.round(size * 1024)} KB`;
  }
  return `${size.toFixed(1)} MB`;
};

// Helper function to get relative time
export const getRelativeTime = (timestamp) => {
  const date = new Date(timestamp);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);

  if (diffInSeconds < 60) {
    return "just now";
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""} ago`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
  }

  return formatDate(timestamp);
};

// Helper function to get user by ID
export const getUserById = (userId) => {
  return users.find((user) => user.id === userId);
};

// Helper function to get document by ID
export const getDocumentById = (documentId) => {
  return sampleDocuments.find((doc) => doc.id === documentId);
};

// Helper function to get recent documents
export const getRecentDocuments = (limit = 5) => {
  return [...sampleDocuments]
    .sort((a, b) => new Date(b.modified) - new Date(a.modified))
    .slice(0, limit);
};

// Helper function to get favorite documents
export const getFavoriteDocuments = () => {
  return sampleDocuments.filter((doc) => doc.favorited);
};

// Helper function to get documents by folder
export const getDocumentsByFolder = (folderName) => {
  if (folderName.toLowerCase() === "all") {
    return sampleDocuments;
  }
  if (folderName.toLowerCase() === "recent") {
    return getRecentDocuments(12);
  }
  if (folderName.toLowerCase() === "favorites") {
    return getFavoriteDocuments();
  }
  return sampleDocuments.filter(
    (doc) => doc.folder.toLowerCase() === folderName.toLowerCase()
  );
};

// Helper function to search documents
export const searchDocuments = (query) => {
  if (!query) return [];

  const lowerQuery = query.toLowerCase();
  return sampleDocuments.filter(
    (doc) =>
      doc.name.toLowerCase().includes(lowerQuery) ||
      doc.content.toLowerCase().includes(lowerQuery) ||
      doc.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
  );
};

// Stats for dashboard
export const documentStats = {
  totalDocuments: sampleDocuments.length,
  recentUploads: 8,
  sharedWithMe: 15,
  favorites: getFavoriteDocuments().length,
};

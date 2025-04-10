import { NextResponse } from "next/server";
import connectDB from "@/lib/dbConnect";
import File from "@/models/File";
import { getSignedurl } from "@/app/actions";
import { verifyAuth } from "../../../lib/auth";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const token = req.cookies.get("usertoken")?.value;
    if (!token) {
      return NextResponse.json(
        { error: "User not authenticated" },
        { status: 401 }
      );
    }
    const user = await verifyAuth(token);

    await connectDB();

    // Generate S3 Signed URL
    const signedUrlData = await getSignedurl(file.name, file.type);
    const signedUrl = signedUrlData.url;

    // Upload file to S3
    const uploadResponse = await fetch(signedUrl, {
      method: "PUT",
      body: file,
      headers: {
        "Content-Type": file.type,
      },
    });

    if (!uploadResponse.ok) {
      throw new Error("Failed to upload to S3");
    }

    // Extract file URL without query parameters
    const fileUrlBase = signedUrl.split("?")[0];

    // Call the classification service with the file URL
    const classifyResponse = await fetch(
      "https://intelligent-document-management-production.up.railway.app/classify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: fileUrlBase }),
      }
    );

    if (!classifyResponse.ok) {
      throw new Error("Failed to classify file");
    }

    // Expect the response to contain a 'category' property.
    const { category } = await classifyResponse.json();
    console.log("Category:", category);

    // Save file metadata in MongoDB, using the returned category as the folder
    const newFile = await File.create({
      name: file.name,
      type: file.type,
      size: (file.size / 1024 / 1024).toFixed(2) + " MB",
      modified: new Date(),
      created: new Date(),
      folder: category,
      author: user.userId,
      tags: [],
      shared: [],
      favorited: false,
      thumbnail: "",
      fileUrl: fileUrlBase,
    });

    return NextResponse.json(
      {
        message: "File uploaded successfully",
        file: newFile,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 }
    );
  }
}

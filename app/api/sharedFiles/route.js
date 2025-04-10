import { NextResponse } from "next/server";
import connectDB from "@/lib/dbConnect";
import File from "@/models/File";
import { verifyAuth } from "@/lib/auth";
import { ObjectId } from "mongodb";
import mongoose from "mongoose";

export async function GET(request) {
  try {
    // Retrieve token from cookies
    const token = request.cookies.get("usertoken")?.value;
    if (!token) {
      return NextResponse.json(
        { error: "User not authenticated" },
        { status: 401 }
      );
    }

    // Verify user authentication
    const user = await verifyAuth(token);
    if (!user) {
      return NextResponse.json(
        { error: "User not authenticated" },
        { status: 401 }
      );
    }

    await connectDB();

    // Convert userId to ObjectId
    const userId = user.userId;
    if (!userId || !ObjectId.isValid(userId.toString())) {
      return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
    }
    const objectIdToCheck = new mongoose.Types.ObjectId(userId);

    const sharedFiles = await File.find({ shared: objectIdToCheck });

    return NextResponse.json({ files: sharedFiles }, { status: 200 });
  } catch (error) {
    console.error("Error fetching shared files:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 }
    );
  }
}

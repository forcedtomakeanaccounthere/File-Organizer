import { NextResponse } from "next/server";
import connectDB from "@/lib/dbConnect";
import File from "@/models/File";
import User from "@/models/User";
import { verifyAuth } from "@/lib/auth";
import { ObjectId } from "mongodb";

export async function GET(request) {
  try {
    const token = request.cookies.get("usertoken")?.value;
    if (!token) {
      return NextResponse.json(
        { error: "User not authenticated" },
        { status: 401 }
      );
    }
    const user = await verifyAuth(token);
    if (!user) {
      return NextResponse.json(
        { error: "User not authenticated" },
        { status: 401 }
      );
    }

    await connectDB();

    const files = await File.find({ author: new ObjectId(user.userId) })
      .populate({ path: "shared", select: "username" })
      .populate({ path: "author", select: "username" })
      .lean();

    // Serialize files: convert all ObjectId fields to string.
    const serializedFiles = files.map((file) => ({
      ...file,
      _id: file._id.toString(),
      author: file.author
        ? { ...file.author, _id: file.author._id.toString() }
        : null,
      shared: file.shared
        ? file.shared.map((item) => ({
            ...item,
            _id: item._id.toString(),
          }))
        : [],
    }));

    return NextResponse.json({ files: serializedFiles }, { status: 200 });
  } catch (error) {
    console.error("Error fetching files:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 }
    );
  }
}

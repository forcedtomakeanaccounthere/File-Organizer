// app/api/shareFile/route.js
import File from "@/models/File";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import mongoose from "mongoose";

export async function POST(request) {
  try {
    const { fileId, collaboratorIds } = await request.json();

    // Validate the input
    if (!fileId || !collaboratorIds || !Array.isArray(collaboratorIds)) {
      return NextResponse.json({ message: "Invalid input" }, { status: 400 });
    }
    const objectIdToCheck = new mongoose.Types.ObjectId(fileId);
    const result = await File.updateOne(
      { _id: objectIdToCheck },
      { $addToSet: { shared: { $each: collaboratorIds } } }
    );

    if (result.modifiedCount === 1) {
      return NextResponse.json(
        { message: "File shared successfully" },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "File not found or no update needed" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Error sharing file:", error);
    return NextResponse.json(
      { message: "Error sharing file", error: error.message },
      { status: 500 }
    );
  }
}

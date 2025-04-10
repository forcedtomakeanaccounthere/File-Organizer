import User from "@/models/User";
import { NextResponse } from "next/server";

export async function GET(request) {
  // Parse the "q" parameter from the query string
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") || "";

  try {
    const users = await User.find({ username: { $regex: q, $options: "i" } });

    const formattedUsers = users.map((user) => ({
      id: user._id.toString(),
      username: user.username,
    }));

    return NextResponse.json(formattedUsers, { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { message: "Error fetching users", error: error.message },
      { status: 500 }
    );
  }
}

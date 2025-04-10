"use server";

import connectDb from "@/lib/dbConnect";
import User from "@/models/User";
import * as z from "zod";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";
import { cookies } from "next/headers";

export async function loginUserAction(formData) {
  const schema = z.object({
    email: z.string().email({ message: "Invalid email" }),
    password: z
      .string()
      .min(5, { message: "Password must be at least 5 characters" }),
  });

  const validatedFields = schema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.errors[0].message,
      status: 400,
    };
  }

  const { email, password } = validatedFields.data;
  console.log(email);

  // ArcJet email validation
  try {
    // Database connection and login logic
    await connectDb();

    // Find user by email
    const user = await User.findOne({ email });

    // Check if the password matches
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return {
        error: "Password is incorrect",
        status: 400,
      };
    }

    // Generate JWT Token with role
    const token = await new SignJWT({
      email: user.email,
      userId: user._id,
      username: user.username,
      role: user?.role, // Include role in the payload
    })
      .setProtectedHeader({
        alg: "HS256",
        typ: "JWT",
      })
      .setIssuedAt()
      .setExpirationTime("5h")
      .sign(new TextEncoder().encode(process.env.JWT_SECRET));

    // Set token in cookies
    (await cookies()).set("usertoken", token, {
      httpOnly: true,
      maxAge: 60 * 60 * 5,
      path: "/",
      secure: false,
    });

    return {
      success: true,
      message: "User Logged in successfully",
      status: 200,
    };
  } catch (error) {
    console.log(error, "Login error");
    return {
      error: "Something went wrong",
      status: 500,
    };
  }
}

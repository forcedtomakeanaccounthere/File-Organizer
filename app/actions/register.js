"use server";

import connectDb from "@/lib/dbConnect";
import User from "@/models/User";
import * as z from "zod";
import bcrypt from "bcryptjs";

export async function registerUserAction(formData) {
  console.log(formData);
  const schema = z.object({
    username: z
      .string()
      .min(2, { message: "Username must be at least 2 characters" }),
    email: z.string().email({ message: "Invalid email" }),
    password: z
      .string()
      .min(5, { message: "Password must be at least 5 characters" }),
  });
  try {
    const validatedFields = schema.safeParse({
      username: formData.get("username"),
      email: formData.get("email"),
      password: formData.get("password"),
    });

    if (!validatedFields.success) {
      return {
        error: validatedFields.error.errors[0].message,
        status: 400,
      };
    }
    const { username, email, password } = validatedFields.data;

    try {
      await connectDb();

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return {
          success: false,
          error: "User already exists",
          status: 400,
        };
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ username, email, password: hashedPassword });
      await user.save();

      return {
        success: true,
        message: "User registered successfully",
        status: 200,
      };
    } catch (error) {
      console.log(error, "Register error");
      return {
        error: "Something went wrong",
        status: 500,
      };
    }
  } catch (error) {
    console.log(error, "Register error");
    return {
      error: "Something went wrong",
      status: 500,
    };
  }
}

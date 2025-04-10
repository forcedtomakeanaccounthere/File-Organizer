"use server";
import { cookies } from "next/headers";

export async function logOutUserAction() {
  try {
    (await cookies()).delete("usertoken", { path: "/" });
    return {
      status: 200,
      message: "User logged out successfully",
    };
  } catch (err) {
    console.log(err);
    return {
      error: err.message,
      status: 400,
    };
  }
}

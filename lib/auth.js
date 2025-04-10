
import { jwtVerify } from "jose";

export async function verifyAuth(token) {
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);

    return {
      userId: payload.userId,
      email: payload.email,
      role: payload.role,
      username: payload.username,
    };
  } catch (err) {
    console.error("JWT verification failed:", err.message);
    return {
      success: false,
      error: err.message,
    };
  }
}

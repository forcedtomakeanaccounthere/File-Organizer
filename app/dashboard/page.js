import Dashboard from "@/components/dashboard";
import { cookies } from "next/headers";
import { verifyAuth } from "../../lib/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const token = (await cookies())?.get("usertoken")?.value || null;
  if (!token) return redirect("/auth/login");
  const user = await verifyAuth(token);
  return <Dashboard user={user} />;
}

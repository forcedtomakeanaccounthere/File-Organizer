import RegisterForm from "@/components/layout/RegisterForm";
import { cookies } from "next/headers";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function RegisterPage() {
  const token = (await cookies()).get("blogusertoken")?.value || null;
  if (token) return redirect("/");

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500">
      <div className="w-full md:w-1/2 flex justify-center items-center p-8 lg:p-12">
        <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-lg shadow-lg">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold tracking-tighter text-gray-900">
              Register
            </h1>
            <p className="text-sm text-gray-500">
              Create an account to get started
            </p>
            <RegisterForm />
            <p className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <a
                href="/auth/login"
                className="text-blue-500 font-semibold hover:underline"
              >
                Login
              </a>
            </p>
          </div>
        </div>
      </div>
      <div className="hidden  md:flex w-1/2 p-12 justify-center items-center relative">
        <div className="max-w-lg space-y-6 text-white z-10">
          <h2>
            <span className="text-3xl text-black font-bold tracking-tight sm:text-4xl">
              Welcome to Document Management System
            </span>
          </h2>
          <p className="text-lg text-right text-black font-bold ">No Lifers</p>
        </div>
        <div className="absolute inset-0 bg-gray-300">
          <Image
            className="inset-0 w-full h-full object-cover"
            src="/image/login.webp"
            alt="Next.js logo"
            width={1000}
            height={1000}
            priority
          />
        </div>
      </div>
    </div>
  );
}

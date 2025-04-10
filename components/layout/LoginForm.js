"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import * as z from "zod";
import { Eye, EyeClosedIcon, User } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { loginUserAction } from "../../app/actions/login";
import { useRouter } from "next/navigation";
const schema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  password: z
    .string()
    .min(5, { message: "Password must be at least 5 characters" }),
});

function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });
  const router = useRouter();
  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      console.log(data);
      const formData = new FormData();
      Object.keys(data).forEach((key) => formData.append(key, data[key]));
      const result = await loginUserAction(formData);
      console.log(result, "result");
      if (result.success) {
        toast({
          title: "Success",
          description: "User logged in successfully",
          variant: "default",
        });
        router.push("/dashboard");
      } else {
        console.log(result.error);
        throw new Error(result.error);
      }
    } catch (error) {
      setIsLoading(false);
      // console.error(error);
      toast({
        title: "Error",
        description: error.message || "Something went wrong",
        variant: "destructive",
      });
    }
  };

  const { toast } = useToast();
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-4">
        <div className="relative">
          <User className="w-5 h-5 absolute top-2 left-3 text-gray-400" />
          <Input
            type="email"
            placeholder="Email"
            {...register("email")}
            disabled={isLoading}
            name="email"
            className="pl-11 bg-gray-50 border-gray-300 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500  block w-full rounded-m
    d"
          />
        </div>
        <div className="relative">
          {!showPassword ? (
            <EyeClosedIcon
              className="w-5 h-5 absolute top-2 left-3 text-gray-400"
              onClick={() => setShowPassword(true)}
            />
          ) : (
            <Eye
              className="w-5 h-5 absolute top-2 left-3 text-gray-400"
              onClick={() => setShowPassword(false)}
            />
          )}
          <Input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            {...register("password")}
            disabled={isLoading}
            className="pl-11 bg-gray-50 border-gray-300 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500  block w-full rounded-md"
          />
        </div>
        <Button type="submit" className="w-full">
          Sign In
        </Button>
      </div>
    </form>
  );
}
export default LoginForm;

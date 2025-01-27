import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useNavigate } from "react-router";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { toast } from "sonner";
import Logo from "/KitaabKosh_logo.svg";
import bookImage from '../assets/signupimage.jpeg';

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  name: z.string().optional(),
});

export default function SignUpForm() {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      const endpoint = isSignUp ? "/api/auth/signup" : "/api/auth/signin";
      const response = await fetch(`http://localhost:3000${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Something went wrong");

      localStorage.setItem("token", result.token);
      localStorage.setItem("user", JSON.stringify(result.user));
      toast.success("Signed in successfully");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="w-full min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 via-blue to-blue-800"
      style={{ height: "100vh" }}
    >
      {/* Outer Container */}
      <div className="w-full max-w-4xl bg-white shadow-xl rounded-xl grid md:grid-cols-2 overflow-hidden">
        {/* Left Section */}
        <div className="hidden md:flex flex-col justify-center items-center bg-blue-100 p-8">
          <img
            src={bookImage}
            alt="Books"
            className="rounded-lg shadow-md"
          />
          <h1 
            className="
              mt-8 mb-6
              text-4xl md:text-5xl lg:text-6xl
              font-bold
              text-transparent bg-clip-text
              bg-gradient-to-r from-blue-600 to-purple-600
              hover:from-purple-600 hover:to-blue-600
              transition-all duration-300
              tracking-tight
              text-center
              drop-shadow-lg
              transform hover:scale-105
            "
          >
            Welcome to KitaabKosh
          </h1>
          <p className="text-blue-600 mt-2 text-center">
            Your one-stop solution for managing all your book collections and
            resources.
          </p>
          </div>

          {/* Right Section */}
        <div className="flex flex-col justify-center px-6 py-8 md:px-12">
          <div className="text-center">
            <img src={Logo} alt="KitaabKosh Logo" className="h-14 mx-auto" />
            <h2 className="mt-4 text-2xl font-bold text-gray-800">
              {isSignUp ? "Create an Account" : "Sign In"}
            </h2>
            <p className="text-gray-600 text-sm">
              {isSignUp
                ? "Start managing your books today."
                : "Sign in to access your account."}
            </p>
          </div>

          <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 space-y-6">
            {isSignUp && (
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <Input
                  id="name"
                  placeholder="Your name"
                  {...form.register("name")}
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            )}

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="Email address"
                {...form.register("email")}
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="Password"
                {...form.register("password")}
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : isSignUp ? "Sign Up" : "Sign In"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              {isSignUp
                ? "Already have an account?"
                : "Don't have an account?"}{" "}
              <button
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-blue-600 hover:underline font-medium"
              >
                {isSignUp ? "Sign In" : "Sign Up"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

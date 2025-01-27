import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useNavigate } from "react-router";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { toast } from "sonner";
import Logo from "/KitaabKosh_logo.svg";
import bookImage from "../assets/signupimage.jpeg";
import { useAuth } from "./auth-context";
import { signIn, signUp } from "../lib/queries";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  name: z.string().optional(),
});

export default function SignUpForm() {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

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
      const result = isSignUp ? await signUp(data) : await signIn(data);
      login(result.user, result.token);
      toast.success(`Successfully ${isSignUp ? "signed up" : "signed in"}`);
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="via-blue flex min-h-screen w-full items-center justify-center bg-gradient-to-r from-blue-50 to-blue-800"
      style={{ height: "100vh" }}
    >
      {/* Outer Container */}
      <div className="grid w-full max-w-4xl overflow-hidden rounded-xl bg-white shadow-xl md:grid-cols-2">
        {/* Left Section */}
        <div className="hidden flex-col items-center justify-center bg-blue-100 p-8 md:flex">
          <img src={bookImage} alt="Books" className="rounded-lg shadow-md" />
          <h1 className="mb-6 mt-8 transform bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-center text-4xl font-bold tracking-tight text-transparent drop-shadow-lg transition-all duration-300 hover:scale-105 hover:from-purple-600 hover:to-blue-600 md:text-5xl lg:text-6xl">
            Welcome to KitaabKosh
          </h1>
          <p className="mt-2 text-center text-blue-600">
            Your one-stop solution for managing all your book collections and
            resources.
          </p>
        </div>

        {/* Right Section */}
        <div className="flex flex-col justify-center px-6 py-8 md:px-12">
          <div className="text-center">
            <img src={Logo} alt="KitaabKosh Logo" className="mx-auto h-14" />
            <h2 className="mt-4 text-2xl font-bold text-gray-800">
              {isSignUp ? "Create an Account" : "Sign In"}
            </h2>
            <p className="text-sm text-gray-600">
              {isSignUp
                ? "Start managing your books today."
                : "Sign in to access your account."}
            </p>
          </div>

          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-8 space-y-6"
          >
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
              className="w-full rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : isSignUp ? "Sign Up" : "Sign In"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
              <button
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                className="font-medium text-blue-600 hover:underline"
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

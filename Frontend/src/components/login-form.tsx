import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify"; // Importing toast
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function LoginForm({ className, ...props }: React.ComponentPropsWithoutRef<"form">) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ userLogin: "", password: "" });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Clear any previous error message
    setError(null);

    try {
      // Make the POST request using axios
      const response = await axios.post(import.meta.env.VITE_API_URL +"/api/users/login", {
        userLogin: formData.userLogin,
        password: formData.password,
      });
      
      // Check if the response is successful
      if (response.data.token) {
        // Save the token (if needed) and navigate to the portfolio page on success
        localStorage.setItem("authToken", response.data.token);
        navigate("/portfolio");

        // Show success notification using react-toastify
        toast.success("Login successful!");
      } else {
        // If login fails, show an error message
        setError("Invalid username or password");
        toast.error("Invalid username or password");
      }
    } catch (err) {
      // If there's an error (network error, server error, etc.)
      setError("An error occurred. Please try again.");
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-4xl font-bold">Tit Immobiler</h1>
      </div>

      <div className="grid gap-6">
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        {/* User Login Field */}
        <div className="grid gap-2">
          <Label htmlFor="userLogin">Username</Label>
          <Input
            id="userLogin"
            name="userLogin"
            placeholder="m@example"
            required
            value={formData.userLogin}
            onChange={handleChange}
          />
        </div>

        {/* Password Field */}
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <a href="#" className="ml-auto text-sm underline-offset-4 hover:underline">
              Forgot your password?
            </a>
          </div>
          <Input
            id="password"
            name="password"
            type="password"
            required
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        {/* Login Button */}
        <Button type="submit" className="w-full">
          Login
        </Button>
      </div>

      {/* Sign Up Link */}
      <div className="text-center text-sm">
        Don't have an account?{" "}
        <a href="#" className="underline underline-offset-4">
          Sign up
        </a>
      </div>
    </form>
  );
}

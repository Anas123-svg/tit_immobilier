import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify"; // Importing toast
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useAuthStore from "@/store/authStore";
import { login } from "@/hooks/auth";

interface LoginFormProps extends React.ComponentPropsWithoutRef<"form"> {
  setLogin?: (value: boolean) => void;
}

export function LoginForm({ className, setLogin, ...props }: LoginFormProps) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ userLogin: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setUser, setToken } = useAuthStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { userLogin, password } = formData;
    if (!userLogin || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    try {
      setIsSubmitting(true);
      const { user, token } = await login(userLogin, password);
      setUser(user);
      setToken(token);
      setIsSubmitting(false);
      toast.success("Logged in successfully");
      navigate("/dashboard");
    } catch (error: any) {
      if (error.response?.status === 401) {
        toast.error("Invalid email or password");
        return;
      }
      toast.error("Something went wrong, please try again");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-4xl font-bold">Tit Immobiler</h1>
      </div>

      <div className="grid gap-6">
        {/* User Login Field */}
        <div className="grid gap-2">
          <Label htmlFor="userLogin">Username</Label>
          <Input
            id="userLogin"
            name="userLogin"
            placeholder="m@example"
            value={formData.userLogin}
            onChange={handleChange}
          />
        </div>

        {/* Password Field */}
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <a
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </a>
          </div>
          <Input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        {/* Login Button */}
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? <span className="loader">Loading...</span> : "Login"}
        </Button>
      </div>

      {/* Sign Up Link */}
      <div className="text-center text-sm">
        Don't have an account?{" "}
        <button
          className="underline underline-offset-4"
          onClick={() => setLogin?.(false)}
        >
          Sign up
        </button>
      </div>
    </form>
  );
}

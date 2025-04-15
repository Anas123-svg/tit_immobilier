import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useAuthStore from "@/store/authStore";
import { register } from "@/hooks/auth"; // Assuming you have a register function in your auth hooks

interface SignupFormProps extends React.ComponentPropsWithoutRef<"form"> {
  setLogin: (value: boolean) => void;
}

export function SignupForm({ className, setLogin, ...props }: SignupFormProps) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    Gender: "",
    userLogin: "",
    service: "",
    contact: "",
    pronouns: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setUser, setToken } = useAuthStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const {
      name,
      email,
      password,
      Gender,
      userLogin,
      service,
      contact,
      pronouns,
    } = formData;

    // Validate all fields
    if (
      !name ||
      !email ||
      !password ||
      !Gender ||
      !userLogin ||
      !service ||
      !contact ||
      !pronouns
    ) {
      console.log(formData);
      toast.error("Please fill in all fields");
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    try {
      setIsSubmitting(true);
      const { user, token } = await register(formData);
      setUser(user);
      setToken(token);
      setIsSubmitting(false);
      toast.success("Account created successfully");
      navigate("/dashboard");
    } catch (error: any) {
      if (error.response?.status === 422) {
        toast.error("User already exists");
        console.error(error);
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
        <p className="text-lg text-gray-500">Create your account</p>
      </div>
      <div className="grid gap-2">
        {/* Name Field */}
        <div className="grid gap-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            name="name"
            placeholder="John Doe"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        {/* Email Field */}
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="your@email.com"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        {/* password field */}
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="********"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        {/* Gender Field */}
        <div className="grid gap-2">
          <Label htmlFor="Gender">Gender</Label>
          <Select
            value={formData.Gender}
            onValueChange={(value) => handleSelectChange("Gender", value)}
          >
            <SelectTrigger id="Gender">
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="non-binary">Non-binary</SelectItem>
              <SelectItem value="other">Other</SelectItem>
              <SelectItem value="prefer-not-to-say">
                Prefer not to say
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Username Field */}
        <div className="grid gap-2">
          <Label htmlFor="userLogin">Username</Label>
          <Input
            id="userLogin"
            name="userLogin"
            placeholder="johndoe123"
            value={formData.userLogin}
            onChange={handleChange}
          />
        </div>

        {/* Service Field */}
        <div className="grid gap-2">
          <Label htmlFor="service">Service</Label>
          <Select
            value={formData.service}
            onValueChange={(value) => handleSelectChange("service", value)}
          >
            <SelectTrigger id="service">
              <SelectValue placeholder="Select service" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rental">Rental</SelectItem>
              <SelectItem value="purchase">Purchase</SelectItem>
              <SelectItem value="sale">Sale</SelectItem>
              <SelectItem value="consultation">Consultation</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Contact Field */}
        <div className="grid gap-2">
          <Label htmlFor="contact">Contact Number</Label>
          <Input
            id="contact"
            name="contact"
            placeholder="+1 234 567 8900"
            value={formData.contact}
            onChange={handleChange}
          />
        </div>

        {/* Pronouns Field */}
        <div className="grid gap-2">
          <Label htmlFor="pronouns">Pronouns</Label>
          <Select
            value={formData.pronouns}
            onValueChange={(value) => handleSelectChange("pronouns", value)}
          >
            <SelectTrigger id="pronouns">
              <SelectValue placeholder="Select pronouns" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="he/him">He/Him</SelectItem>
              <SelectItem value="she/her">She/Her</SelectItem>
              <SelectItem value="they/them">They/Them</SelectItem>
              <SelectItem value="other">Other/Custom</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Signup Button */}
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <span className="loader">Loading...</span>
          ) : (
            "Sign Up"
          )}
        </Button>
      </div>
      {/* Login Link */}
      <div className="text-center text-sm">
        Already have an account?{" "}
        <button
          className="underline underline-offset-4"
          onClick={() => setLogin?.(true)}
        >
          Login
        </button>
      </div>
    </form>
  );
}

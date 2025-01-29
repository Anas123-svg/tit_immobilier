import React from "react";
import { LoginForm } from "@/components/login-form";
import Cover from "@/assets/cover.jpg"; // Update path to your cover image

const Login: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row h-screen items-center md:justify-center">
      {/* Left Side - Image Section */}
      <div className="bg-black relative w-full md:w-11/12 h-1/3 md:h-full">
        <div className="absolute inset-0 flex flex-col justify-center items-start p-6 md:p-20 text-white z-10">
          <h2 className="text-3xl md:text-5xl font-bold">Nice to see you again!</h2>
          <p className="text-sm md:text-xl w-full md:w-[80%]">
            The number one platform (N˚1) in Real Estate Management, Recovery, Sales
            (Real Estate Development, Subdivision)
          </p>
        </div>
        <img className="absolute inset-0 w-full h-full object-cover opacity-50" src={Cover} alt="Real Estate Background" />
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6">
        <LoginForm className="w-full max-w-md" />
      </div>
    </div>
  );
};

export default Login;

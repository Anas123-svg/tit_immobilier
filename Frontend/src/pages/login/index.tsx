import React from "react";
import { LoginForm } from "@/components/login-form";
import Cover from "@/assets/cover.jpg"

const Login: React.FC = () => {

  return (<div className="  flex items-center h-screen justify-center" >
  <div className="bg-black relative w-fit h-full">
    <div className="z-20  w-full h-1/2 flex justify-center top-26 items-start p-20 flex-col absolute text-white gap-5 "><h2 className="text-5xl">Nice to see you again!
</h2>
<p className="text-xl w-fit">The number one platform (N˚1) in Real Estate Management, Recovery, Sales
(Real Estate Development, Subdivision)</p></div>
    <img className="h-full opacity-50 " src={Cover} alt="" />
    </div>
    <div className="w-2/6  h-full flex items-center p-6"><LoginForm className="w-full"/></div>

 </div>
  );
};

export default Login;
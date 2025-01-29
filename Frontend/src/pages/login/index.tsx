import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Sidebar from "@/components/admin-panel/sidebar";
import Navbar from "@/components/admin-panel/navbar";
import { sidebarOptions, SidebarOption } from "@/data/sidebarOptions";
import SettingsComponent from "@/components/admin-panel/sidebar/profile/Settings";
import TicketConfiguration from "@/components/admin-panel/sidebar/extra/ticket/TicketConfiguratoin";
import ResourceConfiguration from "@/components/admin-panel/sidebar/extra/resource/ResourceConfiguration";
import SendMailSmsSettings from "@/components/admin-panel/sidebar/extra/extra/SendMailSmsSettings";
import { LoginForm } from "@/components/login-form";


const Login: React.FC = () => {

  return (<div className="flex p-6 items-center h-screen justify-center gap-5" >
 <LoginForm/>
 <div className="bg-red-400 w-1/2 h-full"></div>
 </div>
  );
};

export default Login;
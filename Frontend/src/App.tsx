import { Routes, Route } from "react-router-dom";
import AdminPanel from "@/pages/admin-panel";
import Login from "./pages/login";
import { ToastContainer } from 'react-toastify';

const App = () => {
  return (
    <div className="overflow-x-hidden md:overflow-x-visible">
      <Routes>

<Route path="/*" element={<AdminPanel/>} />

<Route path="/login" element={<Login/>} />


      </Routes>
      <ToastContainer />
    </div>
  );
};

export default App;

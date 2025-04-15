import { Routes, Route, useNavigate } from "react-router-dom";
import AdminPanel from "@/pages/admin-panel";
import Login from "./pages/login";
import { ToastContainer } from "react-toastify";
import TenantDetailPage from "./components/admin-panel/sidebar/property-management/tiers/tenant/sub-page/tenant-detail-page";
import useAuthStore from "./store/authStore";
import { useEffect } from "react";
import { loginBack } from "./hooks/auth";

const App = () => {
  const { setUser, setToken } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    handleLoginBack();
  }, []);

  const handleLoginBack = async () => {
    try {
      const res = await loginBack();
      if (!res) {
        setToken("");
        setUser(null);
        localStorage.removeItem("token");
        return;
      }
      setUser(res?.user.user);

      if (res?.token) {
        setToken(res.token);
      }
      navigate("/dashboard");
    } catch (error: any) {
      console.log(error);
      setToken("");
      setUser(null);
      localStorage.removeItem("token");
    }
  };
  return (
    <div className="overflow-x-hidden md:overflow-x-visible">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/*" element={<AdminPanel />} />
      </Routes>
      <ToastContainer />
    </div>
  );
};

export default App;

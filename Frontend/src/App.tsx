import { Routes, Route } from "react-router-dom";
import AdminPanel from "@/pages/admin-panel";
import Login from "./pages/login";
import { ToastContainer } from 'react-toastify';
import TenantDetailPage from "./components/admin-panel/sidebar/property-management/tiers/tenant/sub-page/tenant-detail-page";

const App = () => {
  return (
    <div className="overflow-x-hidden md:overflow-x-visible">
      <Routes>
<Route path="/" element={<Login/>} />
<Route path="/*" element={<AdminPanel/>} />





      </Routes>
      <ToastContainer />
    </div>
  );
};

export default App;

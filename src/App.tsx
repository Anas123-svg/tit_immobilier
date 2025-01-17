import { Routes, Route } from "react-router-dom";
import AdminPanel from "@/pages/admin-panel";
import SettingsRoutes from "./components/admin-panel/sidebar/profile/Settings/SettingsRoutes";

const App = () => {
  return (
    <div className="overflow-x-hidden md:overflow-x-visible">
      <Routes>

<Route path="/*" element={<AdminPanel/>} />

      </Routes>
    </div>
  );
};

export default App;

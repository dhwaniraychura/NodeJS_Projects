import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import ResidentDashboard from "./pages/ResidentDashboard";
import SecurityDashboard from "./pages/SecurityDashboard";
import MaintenanceDashboard from "./pages/MaintenanceDashboard";
import ComplaintPage from "./pages/ComplaintPage";
import Residents from "./pages/Residents";
import EditResident from "./pages/EditResident";
import AddResident from "./pages/AddResident";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/resident" element={<ResidentDashboard />} />
        <Route path="/security" element={<SecurityDashboard />} />
        <Route path="/maintenance" element={<MaintenanceDashboard />} />
        <Route path="/complaint" element={<ComplaintPage />} />
        <Route path="/residents" element={<Residents />} />
        <Route path="/edit-resident/:id" element={<EditResident />} />
        <Route path="/add-resident" element={<AddResident />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
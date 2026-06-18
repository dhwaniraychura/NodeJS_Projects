import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import API from "../services/api";
import ResidentsTable from "../components/ResidentsTable";
import ComplaintsTable from "../components/ComplaintsTable";
import VisitorsTable from "../components/VisitorsTable";
import BillsTable from "../components/BillsTable";
import DashboardChart from "../components/DashboardChart";

function AdminDashboard() {
  const [stats, setStats] = useState({
    residents: 0,
    complaints: 0,
    visitors: 0,
    bills: 0
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await API.get("/dashboard/admin-stats");
      setStats(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />

      <div className="d-flex">
        <Sidebar />

        <div className="p-4 flex-grow-1">
          <h1>Admin Dashboard</h1>

          <div className="row mt-4 g-4">
            <div className="col-md-3">
                <div className="card shadow border-0 p-4">
                <h6>Total Residents</h6>
                <h2>{stats.residents}</h2>
                </div>
            </div>

            <div className="col-md-3">
                <div className="card shadow border-0 p-4">
                <h6>Complaints</h6>
                <h2>{stats.complaints}</h2>
                </div>
            </div>

            <div className="col-md-3">
                <div className="card shadow border-0 p-4">
                <h6>Visitors</h6>
                <h2>{stats.visitors}</h2>
                </div>
            </div>

            <div className="col-md-3">
                <div className="card shadow border-0 p-4">
                <h6>Bills</h6>
                <h2>{stats.bills}</h2>
                </div>
            </div>
        </div>
          <ResidentsTable />
          <ComplaintsTable />
          <VisitorsTable />
          <BillsTable />
          <DashboardChart stats={stats} />
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;
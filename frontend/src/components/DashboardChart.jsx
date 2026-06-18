import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function DashboardChart({ stats }) {
  const data = {
    labels: ["Residents", "Complaints", "Visitors", "Bills"],
    datasets: [
      {
        label: "Analytics",
        data: [
          stats.residents,
          stats.complaints,
          stats.visitors,
          stats.bills
        ]
      }
    ]
  };

  return (
    <div className="card shadow p-4 mt-5">
      <h4>Analytics</h4>
      <Bar data={data} />
    </div>
  );
}

export default DashboardChart;
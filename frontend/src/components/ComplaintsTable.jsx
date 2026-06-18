import { useEffect, useState } from "react";
import API from "../services/api";

function ComplaintsTable() {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const res = await API.get("/dashboard/complaints");
      setComplaints(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mt-5">
      <h3>Complaints</h3>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Resident</th>
            <th>Issue</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {complaints.map((complaint) => (
            <tr key={complaint._id}>
              <td>{complaint.resident?.name || "N/A"}</td>
              <td>{complaint.description}</td>
              <td>
                <span className="badge bg-warning text-dark">
                  {complaint.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ComplaintsTable;
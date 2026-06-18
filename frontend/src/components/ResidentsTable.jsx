import { useEffect, useState } from "react";
import API from "../services/api";

function ResidentsTable() {
  const [residents, setResidents] = useState([]);

  useEffect(() => {
    fetchResidents();
  }, []);

  const fetchResidents = async () => {
    const res = await API.get("/dashboard/residents");
    setResidents(res.data);
  };

  return (
    <div className="mt-5">
      <h3>Residents</h3>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>

        <tbody>
          {residents.map((resident) => (
            <tr key={resident._id}>
              <td>{resident.name}</td>
              <td>{resident.email}</td>
              <td>{resident.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ResidentsTable;
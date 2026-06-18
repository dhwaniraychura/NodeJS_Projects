import { useEffect, useState } from "react";
import API from "../services/api";

function VisitorsTable() {
  const [visitors, setVisitors] = useState([]);

  useEffect(() => {
    fetchVisitors();
  }, []);

  const fetchVisitors = async () => {
    try {
      const res = await API.get("/dashboard/visitors");
      setVisitors(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mt-5">
      <h3>Visitors</h3>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Purpose</th>
          </tr>
        </thead>

        <tbody>
          {visitors.map((visitor) => (
            <tr key={visitor._id}>
              <td>{visitor.name}</td>
              <td>{visitor.purpose}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default VisitorsTable;
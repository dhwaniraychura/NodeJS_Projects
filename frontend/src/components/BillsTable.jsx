import { useEffect, useState } from "react";
import API from "../services/api";

function BillsTable() {
  const [bills, setBills] = useState([]);

  useEffect(() => {
    fetchBills();
  }, []);

  const fetchBills = async () => {
    try {
      const res = await API.get("/dashboard/bills");
      setBills(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mt-5">
      <h3>Bills</h3>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Resident</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {bills.map((bill) => (
            <tr key={bill._id}>
              <td>{bill.resident?.name || "N/A"}</td>
              <td>₹{bill.amount}</td>
              <td>{bill.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BillsTable;
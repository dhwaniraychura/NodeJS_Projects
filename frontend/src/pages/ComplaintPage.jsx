import { useState } from "react";
import API from "../services/api";

function ComplaintPage() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [formData, setFormData] = useState({
    category: "",
    description: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/complaints", {
        resident: user._id,
        category: formData.category,
        description: formData.description
      });

      alert("Complaint Submitted Successfully");

      setFormData({
        category: "",
        description: ""
      });
    } catch (error) {
      console.log(error);
      alert("Failed to submit complaint");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "600px" }}>
      <div className="card shadow p-4">
        <h2 className="mb-4 text-center">Submit Complaint</h2>

        <form onSubmit={handleSubmit}>
          <select
            className="form-control mb-3"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            <option>Electrical</option>
            <option>Plumbing</option>
            <option>Cleaning</option>
            <option>Security</option>
            <option>Lift Issue</option>
          </select>

          <textarea
            className="form-control mb-3"
            rows="4"
            name="description"
            placeholder="Describe your complaint"
            value={formData.description}
            onChange={handleChange}
            required
          />

          <button className="btn btn-danger w-100">
            Submit Complaint
          </button>
        </form>
      </div>
    </div>
  );
}

export default ComplaintPage;
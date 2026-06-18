import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "resident"
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
     await API.post("http://localhost:5000/api/auth/register", formData);
      alert("Registration Successful");
      navigate("/");
    } catch (error) {
  console.log(error);
  console.log(error.response);
  alert(error.response?.data?.message || error.message);
}
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <div className="card shadow p-4">
        <h2 className="text-center mb-4">Register</h2>

        <form onSubmit={handleSubmit}>
          <input
            className="form-control mb-3"
            name="name"
            placeholder="Name"
            onChange={handleChange}
          />

          <input
            className="form-control mb-3"
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
          />

          <input
            className="form-control mb-3"
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
          />

          <select
            className="form-control mb-3"
            name="role"
            onChange={handleChange}
          >
            <option value="resident">Resident</option>
            <option value="admin">Admin</option>
            <option value="security">Security</option>
            <option value="maintenance">Maintenance</option>
          </select>

          <button className="btn btn-success w-100">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
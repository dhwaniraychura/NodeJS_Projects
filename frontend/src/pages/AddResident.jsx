import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddResident = () => {

    const navigate = useNavigate();

    const [resident, setResident] = useState({
        name: "",
        email: "",
        phone: "",
        flatNumber: "",
        password: "",
        role: "resident"
    });

    const handleChange = (e) => {
        setResident({
            ...resident,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await axios.post(
                "http://localhost:5000/api/auth/register",
                resident
            );

            alert("Resident added successfully");

            navigate("/residents");

        } catch (error) {

            console.log(error);

        }

    };

    return (
        <div className="container mt-4">

            <div className="card p-4">

                <h2>Add Resident</h2>

                <form onSubmit={handleSubmit}>

                    <div className="mb-3">
                        <label>Name</label>
                        <input
                            type="text"
                            className="form-control"
                            name="name"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label>Email</label>
                        <input
                            type="email"
                            className="form-control"
                            name="email"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label>Phone</label>
                        <input
                            type="text"
                            className="form-control"
                            name="phone"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label>Flat Number</label>
                        <input
                            type="text"
                            className="form-control"
                            name="flatNumber"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label>Password</label>
                        <input
                            type="password"
                            className="form-control"
                            name="password"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button className="btn btn-primary">
                        Add Resident
                    </button>

                </form>

            </div>

        </div>
    );
};

export default AddResident;
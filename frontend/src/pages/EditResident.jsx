import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditResident = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [resident, setResident] = useState({
        name: "",
        email: "",
        phone: "",
        flatNumber: ""
    });

    useEffect(() => {
        getResident();
    }, []);

    const getResident = async () => {

        try {

            const response = await axios.get(
                `http://localhost:5000/api/residents/${id}`
            );

            setResident(response.data.resident);

        } catch (error) {
            console.log(error);
        }
    };

    const handleChange = (e) => {

        setResident({
            ...resident,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await axios.put(
                `http://localhost:5000/api/residents/${id}`,
                resident
            );

            alert("Resident updated successfully");

            navigate("/residents");

        } catch (error) {

            console.log(error);

        }

    };

    return (
        <div className="container mt-4">

            <h2>Edit Resident</h2>

            <form onSubmit={handleSubmit}>

                <div className="mb-3">
                    <label>Name</label>
                    <input
                        type="text"
                        name="name"
                        className="form-control"
                        value={resident.name}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-3">
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        className="form-control"
                        value={resident.email}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-3">
                    <label>Phone</label>
                    <input
                        type="text"
                        name="phone"
                        className="form-control"
                        value={resident.phone}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-3">
                    <label>Flat Number</label>
                    <input
                        type="text"
                        name="flatNumber"
                        className="form-control"
                        value={resident.flatNumber}
                        onChange={handleChange}
                    />
                </div>

                <button className="btn btn-primary">
                    Update Resident
                </button>

            </form>

        </div>
    );
};

export default EditResident;
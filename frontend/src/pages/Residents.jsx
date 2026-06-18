import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Residents() {

    const [residents, setResidents] = useState([]);

    useEffect(() => {
        fetchResidents();
    }, []);

    const fetchResidents = async () => {
        try {
            const response = await axios.get(
                "http://localhost:5000/api/residents"
            );

            setResidents(response.data.residents);

        } catch (error) {
            console.log(error);
        }
    };
    const deleteResident = async (id) => {
    try {
        await axios.delete(`http://localhost:5000/api/residents/${id}`);

        // refresh table
        getResidents();

        alert("Resident deleted successfully");
    } catch (error) {
        console.log(error);
    }
    };

    return (
        <div className="container mt-4">
            <h2>Residents List</h2>
            <Link
                to="/add-resident"
                className="btn btn-success mb-3"
            >
                Add Resident
            </Link>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Flat Number</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        residents.map((resident) => (
                            <tr key={resident._id}>
                                <td>{resident.name}</td>
                                <td>{resident.email}</td>
                                <td>{resident.phone}</td>
                                <td>{resident.flatNumber}</td>
                                    <td>
                                   <Link
                                        to={`/edit-resident/${resident._id}`}
                                        className="btn btn-warning btn-sm me-2"
                                    >
                                        Edit
                                    </Link>

                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => deleteResident(resident._id)}
                                    >
                                        Delete
                                    </button>
                                    </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
}

export default Residents;
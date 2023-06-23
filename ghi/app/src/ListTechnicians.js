import './ServiceHistory.css'
import React, { useState, useEffect } from 'react';
import { NavLink } from "react-router-dom";


function ListTechnicians() {
    const [technicians, setTechnicians] = useState([]);
    const fetchData = async () => {
        const url = "http://localhost:8080/api/technicians/";
        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            setTechnicians(data.technicians)
        }
    };
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <NavLink to='./new'>
                    <button className='button-10' type="button">
                        Create Technician Profile
                    </button>
                </NavLink>
            </div>
            <h1 style={{ fontSize: '2em', color: "whitesmoke" }}>Technicians</h1>
            <div className="scrollable-div">
                <table className="table" style={{ color: "whitesmoke" }} >
                    <thead>
                        <tr>
                            <th>Employee ID</th>
                            <th>First Name</th>
                            <th>last Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {technicians.map((technician, index) => {
                            return (
                                <tr key={index}>
                                    <td>{technician.employee_id}</td>
                                    <td>{technician.first_name}</td>
                                    <td>{technician.last_name}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ListTechnicians;


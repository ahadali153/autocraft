import React, { useState, useEffect} from 'react';


function ServiceHistory() {
    const [appointments, setAppointments] = useState([]);
    const [autos, setAutos] = useState([]);
    const [matchVIN, setMatchVIN] = useState('')


    const fetchData = async () => {
        const url = "http://localhost:8080/api/appointments/";
        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            setAppointments(data.appointments)
        }
    };

    const fetchAutosData = async () => {
        const autosUrl = "http://localhost:8100/api/automobiles/";
        const response = await fetch(autosUrl);

        if (response.ok) {
            const autosData = await response.json();
            setAutos(autosData.autos)
        }
    }

    useEffect(() => {
		fetchData();
        fetchAutosData();
	}, []);

    const isVIP = (vin) => {
        if (autos.some(auto => auto.vin === vin)) {
            return 'Yes';
        } else {
            return 'No';
        }
    }

    const handleVINChange = (event) => {
        const value = event.target.value;
        setMatchVIN(value);
    };



    return (
        <>
        <input
        type="text" placeholder='Find VIN'
        value={matchVIN}
        onChange={handleVINChange}
        />
        <table className="table table-striped">
        <thead>
        <tr>
            <th style={{ fontSize: '2em' }}>Service History</th>
        </tr>
        <tr>
            <th>VIN</th>
            <th>VIP</th>
            <th>Customer</th>
            <th>Appointment</th>
            <th>Technician</th>
            <th>Reason</th>
            <th>Status</th>

        </tr>
        </thead>
        <tbody>{appointments
        .filter(appointment => appointment.vin.includes(matchVIN))
        .map((appointment, index) => {
        return (
        <tr key={index}>
            <td>{ appointment.vin }</td>
            <td>{ isVIP(appointment.vin) }</td>
            <td>{ appointment.customer }</td>
            <td>{ appointment.date_time }</td>
            <td>{ appointment.technician.last_name } { appointment.technician.employee_id }</td>
            <td>{ appointment.reason }</td>
            <td>{ appointment.status }</td>

        </tr>
        );
        })}
        </tbody>
        </table>
        </>
    );
    }

    export default ServiceHistory;

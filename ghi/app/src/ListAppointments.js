import './ServiceHistory.css'
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

function ListAppointments() {
	const [appointments, setAppointments] = useState([]);
	const [autos, setAutos] = useState([]);

	const fetchData = async () => {
		const url = "http://localhost:8080/api/appointments/";
		const response = await fetch(url);

		if (response.ok) {
			const data = await response.json();
			setAppointments(data.appointments);
		}
	};

	const fetchAutosData = async () => {
		const autosUrl = "http://localhost:8100/api/automobiles/";
		const response = await fetch(autosUrl);

		if (response.ok) {
			const autosData = await response.json();
			setAutos(autosData.autos);
		}
	};

	useEffect(() => {
		fetchData();
		fetchAutosData();
	}, []);

	const isVIP = (vin) => {
		if (autos.some((auto) => auto.vin === vin)) {
			return "Yes";
		} else {
			return "No";
		}
	};

	const finish = async (id) => {
		const finishURL = `http://localhost:8080/api/appointments/${id}/finish`;
		const fetchConfig = {
			method: "PUT",
		};
		const response = await fetch(finishURL, fetchConfig);
		if (response.ok) {
			fetchData();
		} else {
			console.log("ERROR: COULD NOT FINISH STATUS");
		}
	};

	const cancel = async (id) => {
		const cancelURL = `http://localhost:8080/api/appointments/${id}/cancel`;
		const fetchConfig = {
			method: "PUT",
		};
		const response = await fetch(cancelURL, fetchConfig);
		if (response.ok) {
			fetchData();
		} else {
			console.log("ERROR: COULD NOT CANCEL STATUS");
		}
	};
	return (
		<div>
			<div style={{ display: 'flex', justifyContent: 'space-between' }}>
				<NavLink to='./new'>
					<button className='button-10' type="button">
						Schedule Service
					</button>
				</NavLink>
				<NavLink to='./history'>
					<button className='button-10' type="button">
						Service History
					</button>
				</NavLink>
			</div>
			<h1 style={{ fontSize: "2em", color: "whitesmoke" }}>Service Appointments</h1>
			<div className="scrollable-div">
				<table className="table" style={{ color: 'whitesmoke' }}>
					<thead>
						<tr>
							<th>VIN</th>
							<th>VIP</th>
							<th>Customer</th>
							<th>Appointment</th>
							<th>Technician</th>
							<th>Reason</th>
						</tr>
					</thead>
					<tbody>
						{appointments
							.filter(appointment => appointment.status === 'pending')
							.map((appointment, index) => {
								let formatDate = new Date(appointment.date_time);
								return (
									<tr key={index} style={{ backgroundColor: "rgba(60, 117, 240, 0.1)" }}>
										<td>{appointment.vin}</td>
										<td>{isVIP(appointment.vin)}</td>
										<td>{appointment.customer}</td>
										<td>{formatDate.toLocaleString('en-US',
											{
												year: 'numeric', month: 'numeric',
												day: 'numeric', hour: '2-digit', minute: '2-digit'
											})}
										</td>
										<td>{appointment.technician.last_name} {appointment.technician.employee_id}</td>
										<td>{appointment.reason}</td>
										<td>
											<button style={{ backgroundColor: 'green', color: 'white' }}
												onClick={() => finish(appointment.id)}>finish
											</button>
										</td>
										<td>
											<button style={{ backgroundColor: 'red', color: 'white' }}
												onClick={() => cancel(appointment.id)}>cancel
											</button>
										</td>
									</tr>
								);
							})}
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default ListAppointments;

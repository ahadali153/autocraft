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
			<div className="container">
				<div className="row">
					<div className="col-5">
						<h1 style={{ color: "black" }}>Service Appointments</h1>
					</div>
					<div className="col-1">
						<NavLink className="nav-link" aria-current="page" to="./new">
							<button type="button" className="btn btn-dark">
								+
							</button>
						</NavLink>
					</div>
					<div className="col-3">
						<NavLink className="nav-link" aria-current="page" to="./history">
							<button type="button" className="btn btn-dark">
								Service History
							</button>
						</NavLink>
					</div>
				</div>
			</div>
			<table className="table table-hover">
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
						.filter((appointment) => appointment.status === "pending")
						.map((appointment, index) => {
							let formatDate = new Date(appointment.date_time);
							return (
								<tr key={index}>
									<td>{appointment.vin}</td>
									<td>{isVIP(appointment.vin)}</td>
									<td>{appointment.customer}</td>
									<td>
										{formatDate.toLocaleString("en-US", {
											year: "numeric",
											month: "numeric",
											day: "numeric",
											hour: "2-digit",
											minute: "2-digit",
										})}
									</td>
									<td>
										{appointment.technician.last_name}{" "}
										{appointment.technician.employee_id}
									</td>
									<td>{appointment.reason}</td>
									<td>
										<button
											style={{ backgroundColor: "green", color: "white" }}
											onClick={() => finish(appointment.id)}
										>
											finish
										</button>
									</td>
									<td>
										<button
											style={{ backgroundColor: "red", color: "white" }}
											onClick={() => cancel(appointment.id)}
										>
											cancel
										</button>
									</td>
								</tr>
							);
						})}
				</tbody>
			</table>
		</div>
	);
}

export default ListAppointments;

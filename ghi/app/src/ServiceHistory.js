import React, { useState, useEffect } from "react";

function ServiceHistory() {
	const [appointments, setAppointments] = useState([]);
	const [autos, setAutos] = useState([]);
	const [matchVIN, setMatchVIN] = useState("");

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

	const handleVINChange = (event) => {
		const value = event.target.value;
		setMatchVIN(value.toUpperCase());
	};

	const createButton = (input) => {
		if (input == "finished") {
			return <button className="alert alert-success btn-sm">finished</button>;
		} else if (input == "pending") {
			return <button className="alert alert-warning btn-sm">pending</button>;
		} else {
			return <button className="alert alert-danger btn-sm">canceled</button>;
		}
	};
	return (
		<>
			<h1 style={{ fontSize: "2em" }}>Service History</h1>
			<input
				type="text"
				placeholder="Find VIN"
				value={matchVIN}
				onChange={handleVINChange}
			/>
			<table className="table table-hover" id="historytable">
				<thead>
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
				<tbody>
					{appointments
						.filter((appointment) => appointment.vin.includes(matchVIN))
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
									<td>{createButton(appointment.status)}</td>
								</tr>
							);
						})}
				</tbody>
			</table>
		</>
	);
}

export default ServiceHistory;

import React, { useEffect, useState } from "react";

function AppointmentFrom() {
	const [technicians, setTechnician] = useState([]);
	const [vin, setVin] = useState("");
	const [customer, setCustomer] = useState("");
	const [date, setDate] = useState("");
	const [reason, setReason] = useState("");
	const [Technician, setTechnicianChange] = useState("");
	const [hasCreated, setHasCreated] = useState(false);

	const handleVinChange = (event) => {
		const value = event.target.value;
		setVin(value);
	};

	const handleCustomerChange = (event) => {
		const value = event.target.value;
		setCustomer(value);
	};

	const handleDateChange = (event) => {
		const value = event.target.value;
		setDate(value);
	};

	const handleReasonChange = (event) => {
		const value = event.target.value;
		setReason(value);
	};

	const handleTechnicianChange = (event) => {
		const value = event.target.value;
		setTechnicianChange(value);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		const data = {
			date_time: date,
			reason: reason,
			status: "",
			vin: vin,
			customer: customer,
			technician: Technician,
		};

		console.log(data);

		const appointmentURL = "http://localhost:8080/api/appointments/";
		const fetchConfig = {
			method: "post",
			body: JSON.stringify(data),
			headers: {
				"Content-Type": "application/json",
			},
		};

		const response = await fetch(appointmentURL, fetchConfig);
		if (response.ok) {
			const newAppointment = await response.json();
			console.log(newAppointment);
			setVin("");
			setCustomer("");
			setDate("");
			setReason("");
			setTechnicianChange("");
			setHasCreated(true);

			setTimeout(() => setHasCreated(false), 3000);
		}
	};

	const fetchData = async () => {
		const url = "http://localhost:8080/api/technicians/";

		const response = await fetch(url);

		if (response.ok) {
			const data = await response.json();
			setTechnician(data.technicians);
		}
	};
	useEffect(() => {
		fetchData();
	}, []);

	let messageClasses = "alert alert-success d-none mb-0";
	let formClasses = "";
	if (hasCreated) {
		messageClasses = "alert alert-success mb-0";
		formClasses = "d-none";
	}

	return (
		<div className="row">
			<div className="offset-3 col-6">
				<div className="shadow p-4 mt-4">
					<h1 style={{ color: "whitesmoke" }}>Create A Service Request</h1>
					<form onSubmit={handleSubmit} id="create-service-form">
						<div className="form-floating mb-3">
							<input
								onChange={handleVinChange}
								placeholder="Vin"
								required
								type="text"
								value={vin}
								name="vin"
								id="vin"
								className="form-control"
							/>
							<label htmlFor="vin">Vin</label>
						</div>
						<div className="form-floating mb-3">
							<input
								onChange={handleCustomerChange}
								placeholder="Customer"
								required
								value={customer}
								type="text"
								name="customer"
								id="customer"
								className="form-control"
							/>
							<label htmlFor="customer">Customer</label>
						</div>
						<div className="form-floating mb-3">
							<input
								onChange={handleDateChange}
								placeholder="Date Time"
								required
								value={date}
								type="datetime-local"
								name="date_time"
								id="date_time"
								className="form-control"
							/>
							<label htmlFor="date_time">Date Time</label>
						</div>
						<div className="form-floating mb-3">
							<input
								onChange={handleReasonChange}
								placeholder="Reason"
								required
								value={reason}
								type="text"
								name="reason"
								id="reason"
								className="form-control"
							/>
							<label htmlFor="reason">Reason</label>
						</div>
						<div className="mb-3">
							<select
								required
								name="technician"
								id="technician"
								className="form-select"
								onChange={handleTechnicianChange}
								value={Technician}
							>
								<option value="">Technicians</option>
								{technicians.map((technician) => {
									return (
										<option key={technician.id} value={technician.id}>
											{technician.first_name} {technician.last_name}
										</option>
									);
								})}
							</select>
						</div>
						<button className="btn btn-primary">Create</button>
					</form>
					<div className={messageClasses} id="success-message">
						Service Request Completed!
					</div>
				</div>
			</div>
		</div>
	);
}

export default AppointmentFrom;

import React, { useState } from "react";

function TechnicianForm() {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [employeeID, setEmployeeID] = useState("");
	const [hasCreated, setHasCreated] = useState(false);

	const handleFirstNameChange = (event) => {
		const value = event.target.value;
		setFirstName(value);
	};

	const handleLastNameChange = (event) => {
		const value = event.target.value;
		setLastName(value);
	};

	const handleEmployeeIDChange = (event) => {
		const value = event.target.value;
		setEmployeeID(value);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		const data = {
			first_name: firstName,
			last_name: lastName,
			employee_id: employeeID,
		};

		const technicianURL = "http://localhost:8080/api/technicians/";
		const fetchConfig = {
			method: "post",
			body: JSON.stringify(data),
			headers: {
				"Content-Type": "application/json",
			},
		};
		const response = await fetch(technicianURL, fetchConfig);
		if (response.ok) {
			setLastName("");
			setFirstName("");
			setEmployeeID("");
			setHasCreated(true);
		}
	};

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
					<h1 style={{ color: "whitesmoke" }}>Create Technician Profile</h1>
					<form onSubmit={handleSubmit} id="create-technician-form">
						<div className="form-floating mb-3">
							<input
								onChange={handleFirstNameChange}
								placeholder="First Name"
								required
								type="text"
								value={firstName}
								name="first_name"
								id="first_name"
								className="form-control"
							/>
							<label htmlFor="first_name">First Name</label>
						</div>
						<div className="form-floating mb-3">
							<input
								onChange={handleLastNameChange}
								placeholder="Last Name"
								required
								value={lastName}
								type="text"
								name="last_name"
								id="last_name"
								className="form-control"
							/>
							<label htmlFor="last_name">Last Name</label>
						</div>
						<div className="form-floating mb-3">
							<input
								onChange={handleEmployeeIDChange}
								placeholder="Employee ID"
								required
								value={employeeID}
								type="text"
								name="employee_id"
								id="employee_id"
								className="form-control"
							/>
							<label htmlFor="employee_id">Employee ID</label>
						</div>
						<button className="btn btn-primary">Create</button>
					</form>
					<div className={messageClasses} id="success-message">
						Technician Profile Created!
					</div>
				</div>
			</div>
		</div>
	);
}

export default TechnicianForm;

import React, { useState } from "react";

function CreateCustomerForm() {
	const [formData, setFormData] = useState({
		first_name: "",
		last_name: "",
		address: "",
		phone_number: "",
	});
	const [hasCreated, setHasCreated] = useState(false);

	const handleFormDataChange = async (event) => {
		const name = event.target.name;
		const value = event.target.value;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		const data = {};

		data.first_name = formData.first_name;
		data.last_name = formData.last_name;
		data.address = formData.address;
		data.phone_number = formData.phone_number;
		console.log(data);

		const customerURL = "http://localhost:8090/api/customers/";
		const fetchConfig = {
			method: "post",
			body: JSON.stringify(data),
			headers: {
				"Content-Type": "application/json",
			},
		};
		const response = await fetch(customerURL, fetchConfig);
		if (response.ok) {
			setFormData({
				first_name: "",
				last_name: "",
				address: "",
				phone_number: "",
			});
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
					<h1>Create a Customer!</h1>
					<form
						className={formClasses}
						onSubmit={handleSubmit}
						id="create-shoe-form"
					>
						<div className="form-floating mb-3">
							<input
								onChange={handleFormDataChange}
								placeholder="First name..."
								required
								type="text"
								name="first_name"
								id="first_name"
								className="form-control"
								value={formData.first_name}
							/>
							<label htmlFor="first_name">First name</label>
						</div>
						<div className="form-floating mb-3">
							<input
								onChange={handleFormDataChange}
								placeholder="Last name..."
								required
								type="text"
								name="last_name"
								id="last_name"
								className="form-control"
								value={formData.last_name}
							/>
							<label htmlFor="last_name">Last name</label>
						</div>
						<div className="form-floating mb-3">
							<input
								onChange={handleFormDataChange}
								placeholder="Address..."
								required
								type="text"
								name="address"
								id="address"
								className="form-control"
								value={formData.address}
							/>
							<label htmlFor="address">Address</label>
						</div>
						<div className="form-floating mb-3">
							<input
								onChange={handleFormDataChange}
								placeholder="Phone number..."
								required
								type="text"
								name="phone_number"
								id="phone_number"
								className="form-control"
								value={formData.phone_number}
							/>
							<label htmlFor="phone_number">Phone number</label>
						</div>
						<button type="submit" className="btn btn-primary">
							Add
						</button>
					</form>
					<div className={messageClasses} id="success-message">
						Customer has been created!
					</div>
				</div>
			</div>
		</div>
	);
}

export default CreateCustomerForm;

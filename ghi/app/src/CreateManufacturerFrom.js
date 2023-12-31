import React, { useState } from "react";

function CreateManufacturerForm() {
	const [name, setName] = useState("");

	const handleNameChange = (event) => {
		const value = event.target.value;
		setName(value);
	};

	const [hasCreated, setHasCreated] = useState(false);

	const handleSubmit = async (event) => {
		event.preventDefault();

		const data = {
			name: name,
		};

		const manufacturerURL = "http://localhost:8100/api/manufacturers/";
		const fetchConfig = {
			method: "post",
			body: JSON.stringify(data),
			headers: {
				"Content-Type": "application/json",
			},
		};
		const response = await fetch(manufacturerURL, fetchConfig);
		if (response.ok) {
			setName("");
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
					<h1>Create Manufacturer</h1>
					<form
						className={formClasses}
						onSubmit={handleSubmit}
						id="create-manufacturer-form"
					>
						<div className="form-floating mb-3">
							<input
								onChange={handleNameChange}
								placeholder="Name"
								required
								type="text"
								value={name}
								name="name"
								id="name"
								className="form-control"
							/>
							<label htmlFor="name">Name</label>
						</div>
						<button className="btn btn-primary">Create</button>
					</form>
					<div className={messageClasses} id="success-message">
						Manufacturer has been created!
					</div>
				</div>
			</div>
		</div>
	);
}

export default CreateManufacturerForm;

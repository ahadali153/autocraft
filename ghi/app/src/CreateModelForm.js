import React, { useEffect, useState } from "react";

function CreateModelForm() {
	const [manufacturers, setManufacturer] = useState([]);

	const fetchData = async () => {
		const locationURL = "http://localhost:8100/api/manufacturers/";

		const response = await fetch(locationURL);
		if (response.ok) {
			const data = await response.json();
			setManufacturer(data.manufacturers);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	const [formData, setFormData] = useState({
		name: "",
		picture_url: "",
		manufacturer: "",
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

		data.name = formData.name;
		data.picture_url = formData.picture_url;
		data.manufacturer = formData.manufacturer;

		const modelsURL = "http://localhost:8100/api/models/";
		const fetchConfig = {
			method: "post",
			body: JSON.stringify(data),
			headers: {
				"Content-Type": "application/json",
			},
		};
		const response = await fetch(modelsURL, fetchConfig);
		if (response.ok) {
			setFormData({
				name: "",
				picture_url: "",
				manufacturer: "",
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
					<h1>Create a vehicle model!</h1>
					<form
						className={formClasses}
						onSubmit={handleSubmit}
						id="create-model-form"
					>
						<div className="form-floating mb-3">
							<input
								onChange={handleFormDataChange}
								placeholder="Model name..."
								required
								type="text"
								name="name"
								id="name"
								className="form-control"
								value={formData.name}
							/>
							<label htmlFor="name">Model name</label>
						</div>
						<div className="form-floating mb-3">
							<input
								onChange={handleFormDataChange}
								placeholder="Picture URL..."
								required
								type="text"
								name="picture_url"
								id="picture_url"
								className="form-control"
								value={formData.picture_url}
							/>
							<label htmlFor="picture_url">Picture</label>
						</div>
						<div className="mb-3">
							<select
								onChange={handleFormDataChange}
								required
								name="manufacturer"
								id="manufacturer"
								className="form-select"
								value={formData.manufacturer}
							>
								<option value="">Choose a manufacturer...</option>
								{manufacturers.map((manufacturer) => {
									return (
										<option key={manufacturer.id} value={manufacturer.id}>
											{manufacturer.name}
										</option>
									);
								})}
							</select>
						</div>
						<button type="submit" className="btn btn-primary">
							Create
						</button>
					</form>
					<div className={messageClasses} id="success-message">
						Model has been created!
					</div>
				</div>
			</div>
		</div>
	);
}

export default CreateModelForm;

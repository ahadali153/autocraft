import { useState, useEffect } from "react";

function CreateAutomobile() {
	const [models, setModels] = useState([]);
	const fetchData = async () => {
		const locationURL = "http://localhost:8100/api/models/";

		const response = await fetch(locationURL);
		if (response.ok) {
			const data = await response.json();
			setModels(data.models);
		}
	};
	useEffect(() => {
		fetchData();
	}, []);
	const [formData, setFormData] = useState({
		color: "",
		year: "",
		vin: "",
		model: "",
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

		data.color = formData.color;
		data.year = formData.year;
		data.vin = formData.vin;
		data.model = formData.model;

		const automobileURL = "http://localhost:8100/api/automobiles/";
		const fetchConfig = {
			method: "post",
			body: JSON.stringify(data),
			headers: {
				"Content-Type": "application/json",
			},
		};
		const response = await fetch(automobileURL, fetchConfig);
		if (response.ok) {
			setFormData({
				color: "",
				year: "",
				vin: "",
				model: "",
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
					<h1>Add an automobile to the inventory!</h1>
					<form
						className={formClasses}
						onSubmit={handleSubmit}
						id="create-automobile-form"
					>
						<div className="form-floating mb-3">
							<input
								onChange={handleFormDataChange}
								placeholder="Color..."
								required
								type="text"
								name="color"
								id="color"
								className="form-control"
								value={formData.color}
							/>
							<label htmlFor="color">Color</label>
						</div>
						<div className="form-floating mb-3">
							<input
								onChange={handleFormDataChange}
								placeholder="Year..."
								required
								type="number"
								name="year"
								id="year"
								className="form-control"
								value={formData.year}
							/>
							<label htmlFor="year">Year</label>
						</div>
						<div className="form-floating mb-3">
							<input
								onChange={handleFormDataChange}
								placeholder="VIN..."
								required
								type="text"
								name="vin"
								id="vin"
								className="form-control"
								value={formData.vin}
							/>
							<label htmlFor="vin">VIN</label>
						</div>
						<div className="mb-3">
							<select
								onChange={handleFormDataChange}
								required
								name="model"
								id="model"
								className="form-select"
								value={formData.model}
							>
								<option value="">Choose a model...</option>
								{models.map((model) => {
									return (
										<option key={model.id} value={model.id}>
											{model.name}
										</option>
									);
								})}
							</select>
						</div>
						<button type="submit" className="btn btn-primary">
							Add
						</button>
					</form>
					<div className={messageClasses} id="success-message">
						Automobile has been added!
					</div>
				</div>
			</div>
		</div>
	);
}

export default CreateAutomobile;

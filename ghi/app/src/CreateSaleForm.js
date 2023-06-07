import React, { useState, useEffect } from "react";

function CreateSaleForm() {
	const [automobiles, setAutomobiles] = useState([]);
	const [salespeople, setSalespeople] = useState([]);
	const [customers, setCustomers] = useState([]);
	const fetchSalespeopleData = async () => {
		const locationURL = "http://localhost:8090/api/salespeople/";

		const response = await fetch(locationURL);
		if (response.ok) {
			const data = await response.json();
			setSalespeople(data.salespeople);
		}
	};
	const fetchCustomersData = async () => {
		const locationURL = "http://localhost:8090/api/customers/";

		const response = await fetch(locationURL);
		if (response.ok) {
			const data = await response.json();
			setCustomers(data.customers);
		}
	};
	const fetchAutomobilesData = async () => {
		const locationURL = "http://localhost:8100/api/automobiles/";

		const response = await fetch(locationURL);
		if (response.ok) {
			const data = await response.json();
			const unsoldAutos = [];
			for (let auto of data.autos) {
				if (!auto.sold) {
					unsoldAutos.push(auto);
				}
			}
			setAutomobiles(unsoldAutos);
		}
	};

	useEffect(() => {
		fetchSalespeopleData();
		fetchCustomersData();
		fetchAutomobilesData();
	}, []);

	const [formData, setFormData] = useState({
		automobile: "",
		salesperson: "",
		customer: "",
		price: "",
	});
	const handleFormDataChange = async (event) => {
		const name = event.target.name;
		const value = event.target.value;
		setFormData({ ...formData, [name]: value });
	};
	const [hasCreated, setHasCreated] = useState(false);

	const handleSubmit = async (event) => {
		event.preventDefault();
		const data = {};

		data.automobile = formData.automobile;
		data.salesperson = formData.salesperson;
		data.customer = formData.customer;
		data.price = formData.price;
		console.log(data);

		const url = "http://localhost:8090/api/sales/";
		const fetchConfig = {
			method: "post",
			body: JSON.stringify(data),
			headers: {
				"Content-Type": "application/json",
			},
		};
		const response = await fetch(url, fetchConfig);

		if (response.ok) {
			const vin = formData.automobile;
			const automobileURL = `http://localhost:8100/api/automobiles/${vin}/`;
			const fetchConfigAuto = {
				method: "put",
				body: JSON.stringify({ sold: true }),
				headers: {
					"Content-Type": "application/json",
				},
			};
			const automobileResponse = await fetch(automobileURL, fetchConfigAuto);
			if (automobileResponse.ok) {
				setFormData({
					vin: "",
					salesperson: "",
					customer: "",
					price: "",
				});
				setHasCreated(true);
			}
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
					<h1>Create a new sale</h1>
					<form
						onSubmit={handleSubmit}
						className={formClasses}
						id="create-conference-form"
					>
						<div className="mb-3">
							<select
								onChange={handleFormDataChange}
								required
								name="automobile"
								id="automobile"
								className="form-select"
								value={formData.automobile}
							>
								<option value="">Automobile VIN</option>
								{automobiles.map((auto) => {
									return (
										<option key={auto.vin} value={auto.vin}>
											{auto.vin}
										</option>
									);
								})}
							</select>
						</div>
						<div className="mb-3">
							<select
								onChange={handleFormDataChange}
								required
								name="salesperson"
								id="salesperson"
								className="form-select"
								value={formData.salesperson}
							>
								<option value="">Salesperson</option>
								{salespeople.map((salesperson) => {
									return (
										<option key={salesperson.id} value={salesperson.id}>
											{salesperson.first_name} {salesperson.last_name}
										</option>
									);
								})}
							</select>
						</div>
						<div className="mb-3">
							<select
								onChange={handleFormDataChange}
								required
								name="customer"
								id="customer"
								className="form-select"
								value={formData.customer}
							>
								<option value="">Customer</option>
								{customers.map((customer) => {
									return (
										<option key={customer.id} value={customer.id}>
											{customer.first_name} {customer.last_name}
										</option>
									);
								})}
							</select>
						</div>
						<div className="form-floating mb-3">
							<input
								onChange={handleFormDataChange}
								placeholder="Price"
								required
								type="text"
								name="price"
								id="price"
								className="form-control"
								value={formData.price}
							/>
							<label htmlFor="price">Price</label>
						</div>
						<button className="btn btn-primary">Create</button>
					</form>
					<div className={messageClasses} id="success-message">
						Congratulations on the sale!
					</div>
				</div>
			</div>
		</div>
	);
}

export default CreateSaleForm;

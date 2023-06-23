import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

function CustomersList() {
	const [customers, setCustomers] = useState([]);
	const fetchData = async () => {
		const url = "http://localhost:8090/api/customers/";
		const response = await fetch(url);

		if (response.ok) {
			const data = await response.json();
			setCustomers(data.customers);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	const deleteCustomer = async (id) => {
		const deleteUrl = `http://localhost:8090/api/customers/${id}/`;
		const fetchConfig = {
			method: "DELETE",
		};
		const response = await fetch(deleteUrl, fetchConfig);

		if (response.ok) {
			// Refresh the shoe list after successful deletion
			fetchData();
		} else {
			// Handle error if the deletion was not successful
			console.log("Failed to delete salesperson");
		}
	};

	return (
		<div className="container-fluid">
			<ul className="navbar-nav me-auto mb-2 mb-lg-0">
				<li className="nav-item">
					<NavLink className="nav-link" aria-current="page" to="./add">
						Add a new customer!
					</NavLink>
				</li>
			</ul>
			<table className="table" style={{ color: 'whitesmoke' }}>
				<colgroup>
					<col style={{ width: "18%" }} />
					<col style={{ width: "18%" }} />
					<col style={{ width: "22%" }} />
					<col style={{ width: "37%" }} />
					<col style={{ width: "5%" }} />
				</colgroup>
				<thead>
					<tr>
						<th>First Name</th>
						<th>Last Name</th>
						<th>Phone Number</th>
						<th>Address</th>
					</tr>
				</thead>
				<tbody>
					{customers.map((customer, index) => {
						return (
							<tr key={index}>
								<td>{customer.first_name}</td>
								<td>{customer.last_name}</td>
								<td>{customer.phone_number}</td>
								<td>{customer.address}</td>
								<td>
									<button onClick={() => deleteCustomer(customer.id)}>
										Remove
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

export default CustomersList;

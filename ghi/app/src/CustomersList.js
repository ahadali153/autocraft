import { useEffect, useState } from "react";

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
		<table className="table table-hover table-striped-columns">
			<colgroup>
				<col style={{ width: "18%" }} />
				<col style={{ width: "18%" }} />
				<col style={{ width: "22%" }} />
				<col style={{ width: "37%" }} />
				<col style={{ width: "5%" }} />
			</colgroup>
			<thead className="table-dark">
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
	);
}

export default CustomersList;

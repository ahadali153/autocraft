import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

function SalespeopleList() {
	const [salespeople, setSalespeople] = useState([]);
	const fetchData = async () => {
		const url = "http://localhost:8090/api/salespeople/";
		const response = await fetch(url);

		if (response.ok) {
			const data = await response.json();
			setSalespeople(data.salespeople);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	const deleteSalesperson = async (id) => {
		const deleteUrl = `http://localhost:8090/api/salespeople/${id}/`;
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
					<NavLink className="nav-link" aria-current="page" to="./create">
						Create a new salesperson!
					</NavLink>
				</li>
			</ul>
			<table className="table table-hover table-striped-columns">
				<colgroup>
					<col style={{ width: "30%" }} />
					<col style={{ width: "30%" }} />
					<col style={{ width: "30%" }} />
					<col style={{ width: "10%" }} />
				</colgroup>
				<thead className="table-dark">
					<tr>
						<th>Employee ID</th>
						<th>First Name</th>
						<th>Last Name</th>
					</tr>
				</thead>
				<tbody>
					{salespeople.map((salesperson, index) => {
						return (
							<tr key={index}>
								<td>{salesperson.employee_id}</td>
								<td>{salesperson.first_name}</td>
								<td>{salesperson.last_name}</td>
								<td>
									<button onClick={() => deleteSalesperson(salesperson.id)}>
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

export default SalespeopleList;

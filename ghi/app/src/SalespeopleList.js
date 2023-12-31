import React, { useState, useEffect } from "react";
import { GiRingBox } from "react-icons/gi";
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
			<div className="container">
				<div className="row">
					<div className="col-3">
						<h1 style={{ color: "black" }}>Salespeople</h1>
					</div>
					<div className="col-1">
						<NavLink className="nav-link" aria-current="page" to="./create">
							<button type="button" className="btn btn-dark">
								+
							</button>
						</NavLink>
					</div>
				</div>
			</div>
			<table className="table table-hover">
				<colgroup>
					<col style={{ width: "30%" }} />
					<col style={{ width: "30%" }} />
					<col style={{ width: "30%" }} />
					<col style={{ width: "10%" }} />
				</colgroup>
				<thead>
					<tr>
						<th>Employee ID</th>
						<th>First Name</th>
						<th>Last Name</th>
						<th></th>
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
									<button
										type="button"
										className="btn btn-outline-danger btn-sm"
										onClick={() => deleteSalesperson(salesperson.id)}
									>
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

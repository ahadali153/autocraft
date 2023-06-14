import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

function ListTechnicians() {
	const [technicians, setTechnicians] = useState([]);
	const fetchData = async () => {
		const url = "http://localhost:8080/api/technicians/";
		const response = await fetch(url);

		if (response.ok) {
			const data = await response.json();
			setTechnicians(data.technicians);
		}
	};
	useEffect(() => {
		fetchData();
	}, []);

	return (
		<div className="container-fluid">
			<ul className="navbar-nav me-auto mb-2 mb-lg-0">
				<li className="nav-item">
					<NavLink className="nav-link" aria-current="page" to="./new">
						<button type="button" class="btn btn-info">
							Create Technician Profile!
						</button>
					</NavLink>
				</li>
			</ul>
			<h1 style={{ fontSize: "2em" }}>Technicians</h1>
			<table className="table table-hover  ">
				<colgroup>
					<col style={{ width: "40%" }} />
					<col style={{ width: "30%" }} />
					<col style={{ width: "30%" }} />
				</colgroup>
				<thead>
					<tr>
						<th>Employee ID</th>
						<th>First Name</th>
						<th>last Name</th>
					</tr>
				</thead>
				<tbody>
					{technicians.map((technician, index) => {
						return (
							<tr key={index}>
								<td>{technician.employee_id}</td>
								<td>{technician.first_name}</td>
								<td>{technician.last_name}</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}

export default ListTechnicians;

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
			<div className="container">
				<div className="row">
					<div className="col-3">
						<h1 style={{ color: "black" }}>Technicians</h1>
					</div>
					<div className="col-1">
						<NavLink className="nav-link" aria-current="page" to="./new">
							<button type="button" className="btn btn-dark">
								+
							</button>
						</NavLink>
					</div>
				</div>
			</div>
			<table className="table table-hover">
				<colgroup>
					<col style={{ width: "65%" }} />
					<col style={{ width: "20%" }} />
					<col style={{ width: "15%" }} />
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

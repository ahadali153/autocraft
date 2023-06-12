import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

function ListManufacturers() {
	const [manufacturers, setManufacturers] = useState([]);
	const fetchData = async () => {
		const url = "http://localhost:8100/api/manufacturers/";
		const response = await fetch(url);

		if (response.ok) {
			const data = await response.json();
			setManufacturers(data.manufacturers);
		}
	};
	useEffect(() => {
		fetchData();
	}, []);

	return (
		<div>
			<ul className="navbar-nav me-auto mb-2 mb-lg-0">
				<li className="nav-item">
					<NavLink className="nav-link" aria-current="page" to="./new">
						Create a Manufacturer!
					</NavLink>
				</li>
			</ul>
			<table className="table table-hover table-striped-columns">
				<thead>
					<tr>
						<th style={{ fontSize: "2em" }}>Manufacturers</th>
					</tr>
					<tr>
						<th>Name</th>
					</tr>
				</thead>
				<tbody>
					{manufacturers.map((manufacturer, index) => {
						return (
							<tr key={index}>
								<td>{manufacturer.name}</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}

export default ListManufacturers;

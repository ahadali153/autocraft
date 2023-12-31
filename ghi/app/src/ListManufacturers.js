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

	const deleteManufacturer = async (id) => {
		const deleteUrl = `http://localhost:8100/api/manufacturers/${id}/`;
		const fetchConfig = {
			method: "DELETE",
		};
		const response = await fetch(deleteUrl, fetchConfig);

		if (response.ok) {
			fetchData();
		} else {
			console.log("Failed to delete manufacturer");
		}
	};
	return (
		<div>
			<div className="container">
				<div className="row">
					<div className="col-3">
						<h1 style={{ color: "black" }}>Manufacturers</h1>
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
			<table className="table table-hover  ">
				<colgroup>
					<col style={{ width: "90%" }} />
					<col style={{ width: "10%" }} />
				</colgroup>
				<thead>
					<tr>
						<th>Name</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{manufacturers.map((manufacturer, index) => {
						return (
							<tr key={index}>
								<td>{manufacturer.name}</td>
								<td>
									<button
										type="button"
										className="btn btn-outline-danger btn-sm"
										onClick={() => deleteManufacturer(manufacturer.id)}
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

export default ListManufacturers;

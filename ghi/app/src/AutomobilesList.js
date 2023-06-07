import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

function AutomobilesList() {
	const [automobiles, setAutomobiles] = useState([]);
	const fetchData = async () => {
		const url = "http://localhost:8100/api/automobiles/";
		const response = await fetch(url);

		if (response.ok) {
			const data = await response.json();
			setAutomobiles(data.autos);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);
	function handleSoldBoolean(boolean) {
		if (boolean === true) {
			return "Yes";
		} else {
			return "No";
		}
	}
	return (
		<div className="container-fluid">
			<ul className="navbar-nav me-auto mb-2 mb-lg-0">
				<li className="nav-item">
					<NavLink className="nav-link" aria-current="page" to="./create">
						Create a new automobile!
					</NavLink>
				</li>
			</ul>
			<table className="table table-hover table-striped-columns">
				<colgroup>
					<col style={{ width: "30%" }} />
					<col style={{ width: "15%" }} />
					<col style={{ width: "15%" }} />
					<col style={{ width: "15%" }} />
					<col style={{ width: "20%" }} />
					<col style={{ width: "5%" }} />
				</colgroup>
				<thead className="table-dark">
					<tr>
						<th>VIN</th>
						<th>Color</th>
						<th>Year</th>
						<th>Model</th>
						<th>Manufacturer</th>
						<th>Sold</th>
					</tr>
				</thead>
				<tbody>
					{automobiles.map((automobile) => {
						return (
							<tr key={automobile.id}>
								<td>{automobile.vin}</td>
								<td>{automobile.color}</td>
								<td>{automobile.year}</td>
								<td>{automobile.model.name}</td>
								<td>{automobile.model.manufacturer.name}</td>
								<td>{handleSoldBoolean(automobile.sold)}</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}

export default AutomobilesList;

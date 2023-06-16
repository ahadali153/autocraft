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
			<div className="container">
				<div className="row">
					<div className="col-4">
						<h1 style={{ color: "black" }}>Our Automobiles</h1>
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
			<table className="table table-hover  ">
				<colgroup>
					<col style={{ width: "30%" }} />
					<col style={{ width: "15%" }} />
					<col style={{ width: "15%" }} />
					<col style={{ width: "15%" }} />
					<col style={{ width: "20%" }} />
					<col style={{ width: "5%" }} />
				</colgroup>
				<thead>
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

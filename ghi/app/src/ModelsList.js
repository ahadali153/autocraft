import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

function ModelsList() {
	const [models, setModels] = useState([]);
	const fetchData = async () => {
		const url = "http://localhost:8100/api/models/";
		const response = await fetch(url);

		if (response.ok) {
			const data = await response.json();
			setModels(data.models);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	const deleteModel = async (id) => {
		const deleteUrl = `http://localhost:8100/api/models/${id}/`;
		const fetchConfig = {
			method: "DELETE",
		};
		const response = await fetch(deleteUrl, fetchConfig);

		if (response.ok) {
			fetchData();
		} else {
			console.log("Failed to delete model");
		}
	};

	return (
		<div className="container-fluid">
			<div className="container">
				<div className="row">
					<div className="col-3">
						<h1 style={{ color: "black" }}>Models</h1>
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
					<col style={{ width: "20%" }} />
					<col style={{ width: "20%" }} />
					<col style={{ width: "50%" }} />
					<col style={{ width: "10%" }} />
				</colgroup>
				<thead>
					<tr>
						<th>Name</th>
						<th>Manufacturer</th>
						<th>Picture</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{models.map((model, index) => {
						return (
							<tr key={index}>
								<td>{model.name}</td>
								<td>{model.manufacturer.name}</td>
								<td>
									<img
										src={model.picture_url}
										className="img-fluid"
										alt={model.name}
									/>
								</td>
								<td>
									<button
										type="button"
										className="btn btn-outline-danger btn-sm"
										onClick={() => deleteModel(model.id)}
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

export default ModelsList;

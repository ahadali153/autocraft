import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

function SalesList() {
	const [sales, setSales] = useState([]);
	const fetchData = async () => {
		const url = "http://localhost:8090/api/sales/";
		const response = await fetch(url);

		if (response.ok) {
			const data = await response.json();
			setSales(data.sales);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	const deleteSale = async (id) => {
		const deleteUrl = `http://localhost:8090/api/sales/${id}/`;
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
						<button type="button" className="btn btn-info">
							Create a new sale!
						</button>
					</NavLink>
				</li>
				<li className="nav-item">
					<NavLink className="nav-link" aria-current="page" to="./history">
						<button type="button" className="btn btn-info">
							View sale history
						</button>
					</NavLink>
				</li>
			</ul>
			<h1 style={{ fontSize: "2em" }}>Sales</h1>
			<table className="table table-hover">
				<colgroup>
					<col style={{ width: "20%" }} />
					<col style={{ width: "15%" }} />
					<col style={{ width: "15%" }} />
					<col style={{ width: "25%" }} />
					<col style={{ width: "15%" }} />
					<col style={{ width: "10%" }} />
				</colgroup>
				<thead>
					<tr>
						<th>Salesperson</th>
						<th>Employee ID</th>
						<th>Customer</th>
						<th>VIN</th>
						<th>Price</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{sales.map((sale, index) => {
						return (
							<tr key={index}>
								<td>
									{sale.salesperson.first_name} {sale.salesperson.last_name}
								</td>
								<td>{sale.salesperson.employee_id}</td>
								<td>
									{sale.customer.first_name} {sale.customer.last_name}
								</td>
								<td>{sale.automobile.vin}</td>
								<td>{sale.price}</td>
								<td>
									<button
										type="button"
										className="btn btn-outline-danger btn-sm"
										onClick={() => deleteSale(sale.id)}
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

export default SalesList;

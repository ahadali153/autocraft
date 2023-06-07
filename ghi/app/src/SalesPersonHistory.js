import { useEffect, useState } from "react";

function SalespersonHistory() {
	const [salespeople, setSalespeople] = useState([]);
	const [salesperson, setSalesperson] = useState([]);
	const fetchData = async () => {
		const url = "http://localhost:8090/api/salespeople";
		const response = await fetch(url);
		if (response.ok) {
			const data = await response.json();
			setSalespeople(data.salespeople);
		}
	};
	useEffect(() => {
		fetchData();
	}, []);
	const renderHistory = async (id) => {
		const url = "http://localhost:8090/api/sales";
		const response = await fetch(url);
		if (response.ok) {
			const data = await response.json();
			const salespersonData = [];
			for (let sale of data.sales) {
				if (sale.salesperson.id == id) {
					salespersonData.push(sale);
				}
			}
			setSalesperson(salespersonData);
		}
	};
	return (
		<div>
			<div>
				<h1>Salesperson History</h1>
			</div>
			<div className="mb-3">
				<select
					required
					name="salesperson"
					id="salesperson"
					className="form-select"
					onChange={(event) => renderHistory(event.target.value)}
				>
					<option value="">Select a salesperson</option>
					{salespeople.map((salesperson) => {
						return (
							<option key={salesperson.id} value={salesperson.id}>
								{salesperson.first_name} {salesperson.last_name}
							</option>
						);
					})}
				</select>
			</div>
			<div>
				<table className="table table-hover table-striped-columns">
					<colgroup>
						<col style={{ width: "20%" }} />
						<col style={{ width: "20%" }} />
						<col style={{ width: "40%" }} />
						<col style={{ width: "20%" }} />
					</colgroup>
					<thead className="table-dark">
						<tr>
							<th>Salesperson</th>
							<th>Customer</th>
							<th>Vin</th>
							<th>Price</th>
						</tr>
					</thead>
					<tbody>
						{salesperson.map((sale, index) => {
							return (
								<tr key={index}>
									<td>
										{sale.salesperson.first_name} {sale.salesperson.last_name}
									</td>
									<td>
										{sale.customer.first_name} {sale.customer.last_name}
									</td>
									<td>{sale.automobile.vin}</td>
									<td>{sale.price}</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default SalespersonHistory;

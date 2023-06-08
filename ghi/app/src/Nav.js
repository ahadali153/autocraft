import { NavLink } from "react-router-dom";

function Nav() {
	return (
		<nav className="navbar navbar-expand-lg navbar-dark bg-success">
			<div className="container-fluid">
				<NavLink className="navbar-brand" to="/">
					CarCar
				</NavLink>
				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarSupportedContent"
					aria-controls="navbarSupportedContent"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<ul className="navbar-nav me-auto mb-2 mb-lg-0">
						<div className="dropdown">
							<button
								className="btn dropdown-toggle"
								type="button"
								data-bs-toggle="dropdown"
								aria-expanded="false"
								style={{ color: "white" }}
							>
								Sales
							</button>
							<ul className="dropdown-menu">
								<li>
									<NavLink className="dropdown-item" to="/salespeople">
										All Salespeople
									</NavLink>
								</li>
								<li>
									<NavLink className="dropdown-item" to="/salespeople/create">
										Create a Salesperson
									</NavLink>
								</li>
							</ul>
						</div>
						<div className="dropdown">
							<button
								className="btn dropdown-toggle"
								type="button"
								data-bs-toggle="dropdown"
								aria-expanded="false"
								style={{ color: "white" }}
							>
								Customers
							</button>
							<ul className="dropdown-menu">
								<li>
									<NavLink className="dropdown-item" to="/customers">
										All Customers
									</NavLink>
								</li>
								<li>
									<NavLink className="dropdown-item" to="/customers/add">
										Add a customer
									</NavLink>
								</li>
							</ul>
						</div>
						<div className="dropdown">
							<button
								className="btn dropdown-toggle"
								type="button"
								data-bs-toggle="dropdown"
								aria-expanded="false"
								style={{ color: "white" }}
							>
								Customers
							</button>
							<ul className="dropdown-menu">
								<li>
									<NavLink className="dropdown-item" to="/sales">
										All Sales
									</NavLink>
								</li>
								<li>
									<NavLink className="dropdown-item" to="/sales/create">
										Create a sale
									</NavLink>
								</li>
								<li>
									<NavLink className="dropdown-item" to="/sales/history">
										Sales History
									</NavLink>
								</li>
							</ul>
						</div>
						<div className="dropdown">
							<button
								className="btn dropdown-toggle"
								type="button"
								data-bs-toggle="dropdown"
								aria-expanded="false"
								style={{ color: "white" }}
							>
								Technicians
							</button>
							<ul className="dropdown-menu">
								<li>
									<NavLink className="dropdown-item" to="/technicians">
										All Technicians
									</NavLink>
								</li>
								<li>
									<NavLink className="dropdown-item" to="/technicians/new">
										Create a Technician
									</NavLink>
								</li>
							</ul>
						</div>
						<div className="dropdown">
							<button
								className="btn dropdown-toggle"
								type="button"
								data-bs-toggle="dropdown"
								aria-expanded="false"
								style={{ color: "white" }}
							>
								Appointments
							</button>
							<ul className="dropdown-menu">
								<li>
									<NavLink className="dropdown-item" to="/appointments">
										All Appointments
									</NavLink>
								</li>
								<li>
									<NavLink className="dropdown-item" to="/appointments/new">
										Create an Appointment
									</NavLink>
								</li>
								<li>
									<NavLink className="dropdown-item" to="/appointments/history">
										Service History
									</NavLink>
								</li>
							</ul>
						</div>
						<div className="dropdown">
							<button
								className="btn dropdown-toggle"
								type="button"
								data-bs-toggle="dropdown"
								aria-expanded="false"
								style={{ color: "white" }}
							>
								Manufacturers
							</button>
							<ul className="dropdown-menu">
								<li>
									<NavLink className="dropdown-item" to="/manufacturers">
										All Manufacturers
									</NavLink>
								</li>
								<li>
									<NavLink className="dropdown-item" to="/manufacturers/new">
										Add a manufacturer
									</NavLink>
								</li>
							</ul>
						</div>
						<div className="dropdown">
							<button
								className="btn dropdown-toggle"
								type="button"
								data-bs-toggle="dropdown"
								aria-expanded="false"
								style={{ color: "white" }}
							>
								Models
							</button>
							<ul className="dropdown-menu">
								<li>
									<NavLink className="dropdown-item" to="/models">
										All Models
									</NavLink>
								</li>
								<li>
									<NavLink className="dropdown-item" to="/models/create">
										Add a Model
									</NavLink>
								</li>
							</ul>
						</div>
						<div className="dropdown">
							<button
								className="btn dropdown-toggle"
								type="button"
								data-bs-toggle="dropdown"
								aria-expanded="false"
								style={{ color: "white" }}
							>
								Automobiles
							</button>
							<ul className="dropdown-menu">
								<li>
									<NavLink className="dropdown-item" to="/automobiles">
										All Automobiles
									</NavLink>
								</li>
								<li>
									<NavLink className="dropdown-item" to="/automobiles/create">
										Add an Automobile
									</NavLink>
								</li>
							</ul>
						</div>
					</ul>
				</div>
			</div>
		</nav>
	);
}

export default Nav;

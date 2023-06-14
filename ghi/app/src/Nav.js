import { Link } from "react-router-dom";

function Nav() {
	return (
		<nav className="navbar navbar-expand-lg navbar-dark">
			<div className="container-fluid">
				<Link className="navbar-brand" to="/">
					CarCar
				</Link>
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
									<Link className="dropdown-item" to="/salespeople">
										All Salespeople
									</Link>
								</li>
								<li>
									<Link className="dropdown-item" to="/salespeople/create">
										Create a Salesperson
									</Link>
								</li>
								<div className="dropdown-divider"></div>
								<li>
									<Link className="dropdown-item" to="/customers">
										All Customers
									</Link>
								</li>
								<li>
									<Link className="dropdown-item" to="/customers/add">
										Add a customer
									</Link>
								</li>
								<div className="dropdown-divider"></div>
								<li>
									<Link className="dropdown-item" to="/sales">
										All Sales
									</Link>
								</li>
								<li>
									<Link className="dropdown-item" to="/sales/create">
										Create a sale
									</Link>
								</li>
								<li>
									<Link className="dropdown-item" to="/sales/history">
										Sales History
									</Link>
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
								Services
							</button>
							<ul className="dropdown-menu">
								<li>
									<Link className="dropdown-item" to="/technicians">
										All Technicians
									</Link>
								</li>
								<li>
									<Link className="dropdown-item" to="/technicians/new">
										Create a Technician
									</Link>
								</li>
								<div className="dropdown-divider"></div>
								<li>
									<Link className="dropdown-item" to="/appointments">
										All Appointments
									</Link>
								</li>
								<li>
									<Link className="dropdown-item" to="/appointments/new">
										Create an Appointment
									</Link>
								</li>
								<li>
									<Link className="dropdown-item" to="/appointments/history">
										Service History
									</Link>
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
								Inventory
							</button>
							<ul className="dropdown-menu">
								<li>
									<Link className="dropdown-item" to="/manufacturers">
										All Manufacturers
									</Link>
								</li>
								<li>
									<Link className="dropdown-item" to="/manufacturers/new">
										Add a manufacturer
									</Link>
								</li>
								<div className="dropdown-divider"></div>
								<li>
									<Link className="dropdown-item" to="/models">
										All Models
									</Link>
								</li>
								<li>
									<Link className="dropdown-item" to="/models/create">
										Add a Model
									</Link>
								</li>
								<div className="dropdown-divider"></div>
								<li>
									<Link className="dropdown-item" to="/automobiles">
										All Automobiles
									</Link>
								</li>
								<li>
									<Link className="dropdown-item" to="/automobiles/create">
										Add an Automobile
									</Link>
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

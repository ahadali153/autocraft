function MainPage() {
	return (
		<div className="px-4 py-5 my-5 text-center">
			<h1 className="display-5 fw-bold">CarCar</h1>
			<div className="col-lg-6 mx-auto">
				<p className="lead mb-4">
					The premiere solution for automobile dealership management!
				</p>
			</div>
			<div
				id="carouselExampleAutoplaying"
				className="carousel slide"
				data-bs-ride="carousel"
			>
				<div className="carousel-inner">
					<div className="carousel-item active">
						<img
							src="https://clipground.com/images/car-dealer-clipart-10.jpg"
							className="d-block w-100"
							alt="..."
						/>
					</div>
					<div className="carousel-item">
						<img
							src="https://clipground.com/images/maintenance-vehicle-clipart-2.jpg"
							className="d-block w-100"
							alt="..."
						/>
					</div>
					<div className="carousel-item">
						<img
							src="https://webstockreview.net/images/conversation-clipart-training-person-1.png"
							className="d-block w-100"
							alt="..."
						/>
					</div>
				</div>
				<button
					className="carousel-control-prev"
					type="button"
					data-bs-target="#carouselExampleAutoplaying"
					data-bs-slide="prev"
				>
					<span
						className="carousel-control-prev-icon"
						aria-hidden="true"
					></span>
					<span className="visually-hidden">Previous</span>
				</button>
				<button
					className="carousel-control-next"
					type="button"
					data-bs-target="#carouselExampleAutoplaying"
					data-bs-slide="next"
				>
					<span
						className="carousel-control-next-icon"
						aria-hidden="true"
					></span>
					<span className="visually-hidden">Next</span>
				</button>
			</div>{" "}
		</div>
	);
}

export default MainPage;

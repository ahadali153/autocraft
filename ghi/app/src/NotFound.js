import { Link } from "react-router-dom";

function NotFound() {
	return (
		<div className="text-center">
			<h1>404</h1>
			<h2>Page not found!</h2>
			<p>
				Return to the <Link to="/">Homepage</Link>
			</p>
		</div>
	);
}

export default NotFound;

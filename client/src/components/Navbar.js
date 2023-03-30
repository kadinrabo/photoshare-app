import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
	return (
		<div className="navbar">
			<Link to="/home" className="navbar-link">
				Home
			</Link>
			<Link to="/profile" className="navbar-link">
				Profile
			</Link>
		</div>
	);
}

export default Navbar;

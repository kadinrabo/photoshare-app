import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { fetchUsersBySearch } from "../api";

function Navbar() {
	const [loggedInUser, setLoggedInUser] = useState(null);
	const uid = localStorage.getItem("uid");
	useEffect(() => {
		async function fetchUser() {
			const user = await fetchUsersBySearch(uid);
			setLoggedInUser(user);
		}
		fetchUser();
	}, [uid]);
	return (
		<div className="navbar">
			<Link to="/home" className="navbar-link">
				Home
			</Link>
			{loggedInUser && (
				<span
					className="navbar-logged-in"
					style={{ color: "grey", fontSize: "0.8em", fontWeight: "bold" }}
				>
					Logged in as {loggedInUser.fname} {loggedInUser.lname}
					{" ("}
					{loggedInUser.uid}
					{")"}
				</span>
			)}
			<Link to="/profile" className="navbar-link">
				Profile
			</Link>
		</div>
	);
}

export default Navbar;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { useHistory } from "react-router-dom";
import { fetchUsersBySearch } from "../api/users";

function Navbar() {
	const [loggedInUser, setLoggedInUser] = useState(null);
	const uid = localStorage.getItem("uid");
	const history = useHistory();

	useEffect(() => {
		async function fetchUser() {
			const user = await fetchUsersBySearch(uid);
			setLoggedInUser(user);
		}
		fetchUser();
	}, [uid]);

	function handleLogIn() {
		history.push("/");
	}

	function handleSignUp() {
		history.push("/signup");
	}

	return (
		<div className="navbar">
			<Link to="/home" className="navbar-link">
				Home
			</Link>
			{localStorage.getItem("uid") ? (
				<div>
					{loggedInUser && (
						<span
							className="navbar-logged-in"
							style={{ color: "grey", fontSize: "0.8em", fontWeight: "bold" }}
						>
							Logged in as {loggedInUser.fname} {loggedInUser.lname}
							{" (uid:"}
							{loggedInUser.uid}
							{")"}
						</span>
					)}
				</div>
			) : (
				<div>
					<button onClick={handleLogIn}>Log in</button>
					<button onClick={handleSignUp}>Sign up</button>
				</div>
			)}
			{localStorage.getItem("uid") && loggedInUser && (
				<Link to="/profile" className="navbar-link">
					Profile
				</Link>
			)}
		</div>
	);
}

export default Navbar;

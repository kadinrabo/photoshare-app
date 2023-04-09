import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { fetchUsersBySearch } from "../api/users";

function Navbar() {
	const [loggedInUser, setLoggedInUser] = useState(null);
	const uid = localStorage.getItem("uid");
	const history = useHistory();

	useEffect(() => {
		async function fetchUser() {
			const user = await fetchUsersBySearch(uid);
			if (user) {
				setLoggedInUser(user);
			}
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
		<div
			style={{
				display: "flex",
				justifyContent: "space-between",
				alignItems: "center",
				backgroundColor: "#f8f8f8",
				padding: "10px",
				borderBottom: "1px solid #ccc",
			}}
		>
			<Link
				to="/home"
				style={{
					color: "#333",
					textDecoration: "none",
					marginRight: "10px",
					fontSize: "16px",
					fontWeight: "bold",
				}}
				className="navbar-link"
			>
				Home
			</Link>
			{loggedInUser ? (
				<span
					className="navbar-logged-in"
					style={{
						color: "grey",
						fontSize: "0.8em",
						fontWeight: "bold",
					}}
				>
					Logged in as {loggedInUser.fname} {loggedInUser.lname}
				</span>
			) : (
				<div>
					<button
						onClick={handleLogIn}
						style={{
							marginRight: "10px",
						}}
					>
						Log in
					</button>
					<button onClick={handleSignUp}>Sign up</button>
				</div>
			)}
			{localStorage.getItem("uid") && loggedInUser && (
				<Link
					to="/profile"
					style={{
						color: "#333",
						textDecoration: "none",
						marginRight: "10px",
						fontSize: "16px",
						fontWeight: "bold",
					}}
					className="navbar-link"
				>
					Profile
				</Link>
			)}
		</div>
	);
}

export default Navbar;

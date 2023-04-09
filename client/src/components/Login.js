import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { fetchUsersBySearch } from "../api/users";
import bcrypt from "bcryptjs";

function Login() {
	const [email, setEmail] = useState("");
	const [pass, setPass] = useState("");
	const [user, setUser] = useState(null);
	const [formSubmitted, setFormSubmitted] = useState(false);
	const history = useHistory();

	useEffect(() => {
		async function fetchUserData() {
			const fetchedUser = await fetchUsersBySearch(email);
			setUser(fetchedUser);
		}
		if (formSubmitted && email && pass) {
			fetchUserData();
		}
	}, [formSubmitted, email, pass]);

	const handleSubmit = (event) => {
		event.preventDefault();
		if (email !== "" && pass !== "") {
			setFormSubmitted(true);
		}
	};

	const handleSignUp = () => {
		history.push("/signup");
	};

	const handleNoSignIn = () => {
		history.push("/home");
	};

	useEffect(() => {
		if (user !== null && user.pass === pass) {
			history.push("/home");
			window.localStorage.setItem("uid", user.uid);
		}
	}, [user, pass]);

	return (
		<div
			style={{
				width: "200px",
				height: "500",
				padding: "20px",
				borderRadius: "10px",
				boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
				backgroundColor: "white",
				overflow: "auto",
				position: "fixed",
				top: "50%",
				left: "50%",
				transform: "translate(-50%, -50%)",
			}}
		>
			<h1>Photoshare App</h1>
			<h2>Login</h2>
			<form onSubmit={handleSubmit}>
				<label>
					<input
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="Email"
						style={{
							padding: "5px",
							border: "1px solid #ddd",
							borderRadius: "5px",
							marginBottom: "10px",
							maxWidth: "90%",
						}}
					/>
				</label>
				<br />
				<label>
					<input
						type="pass"
						value={pass}
						onChange={(e) => setPass(e.target.value)}
						placeholder="Password"
						style={{
							padding: "5px",
							border: "1px solid #ddd",
							borderRadius: "5px",
							marginBottom: "10px",
							maxWidth: "90%",
						}}
					/>
				</label>
				<br />
				<button type="submit">Sign In</button>
				<button type="button" onClick={handleSignUp}>
					Sign Up
				</button>
				<button type="button" onClick={handleNoSignIn}>
					Continue without signing in
				</button>
			</form>
		</div>
	);
}

export default Login;

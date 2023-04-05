import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { createNewUser, fetchUsersBySearch } from "../api";

function isValidDate(str) {
	const dobRegex =
		/^(-?\d{1,6})-((0[1-9]|1[0-2])|-0[1-9]|-1[0-2])-((0[1-9]|[12][0-9]|3[01])|-0[1-9]|-[12][0-9]|-3[01])$/;
	if (!dobRegex.test(str)) {
		return false;
	}
	const date = new Date(str);
	return date.toString() !== "Invalid Date";
}

function Signup() {
	const [email, setEmail] = useState("");
	const [pass, setPass] = useState("");
	const [user, setUser] = useState(null);
	const [fname, setFname] = useState("");
	const [lname, setLname] = useState("");
	const [dob, setDob] = useState("");
	const [gender, setGender] = useState("");
	const [home, setHome] = useState("");
	const [formSubmitted, setFormSubmitted] = useState(false);
	const history = useHistory();
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

	useEffect(() => {
		async function createUserData() {
			await createNewUser(email, fname, lname, pass, dob, gender, home);
			const fetchedUser = await fetchUsersBySearch(email);
			setUser(fetchedUser);
		}
		if (formSubmitted && fname && lname && dob && email && pass) {
			createUserData();
		}
	}, [formSubmitted, fname, lname, dob, email, pass]);

	const handleSubmit = (event) => {
		event.preventDefault();
		if (
			fname.trim() !== "" &&
			lname.trim() !== "" &&
			dob.trim() !== "" &&
			email.trim() !== "" &&
			pass.trim() !== "" &&
			isValidDate(dob) &&
			emailRegex.test(email)
		) {
			setFormSubmitted(true);
		} else {
			alert("Please enter valid information. ");
		}
	};

	const handleLogIn = () => {
		history.push("/");
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
			<div>
				<h1>Photoshare App</h1>
				<h2>Sign Up</h2>
				<form onSubmit={handleSubmit}>
					<label>
						<input
							type="fname"
							value={fname}
							onChange={(e) => setFname(e.target.value)}
							placeholder="First name"
							style={{
								padding: "5px",
								border: "1px solid #ddd",
								borderRadius: "5px",
								marginBottom: "10px",
								maxWidth: "90%",
							}}
						/>
					</label>
					<label>
						<input
							type="lname"
							value={lname}
							onChange={(e) => setLname(e.target.value)}
							placeholder="Last name"
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
							type="dob"
							value={dob}
							onChange={(e) => setDob(e.target.value)}
							placeholder="Date of birth (YYYY-MM-DD)"
							style={{
								padding: "5px",
								border: "1px solid #ddd",
								borderRadius: "5px",
								marginBottom: "10px",
								maxWidth: "90%",
							}}
						/>
					</label>
					<label>
						<input
							type="gender"
							value={gender}
							onChange={(e) => setGender(e.target.value)}
							placeholder="Gender (optional)"
							style={{
								padding: "5px",
								border: "1px solid #ddd",
								borderRadius: "5px",
								marginBottom: "10px",
								maxWidth: "90%",
							}}
						/>
					</label>
					<label>
						<input
							type="home"
							value={home}
							onChange={(e) => setHome(e.target.value)}
							placeholder="Hometown (optional)"
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
					<button type="submit">Sign Up</button>
					<button type="button" onClick={handleLogIn}>
						Log In
					</button>
					<button type="button" onClick={handleNoSignIn}>
						Continue without signing in
					</button>
				</form>
			</div>
		</div>
	);
}

export default Signup;

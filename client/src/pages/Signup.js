import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { createNewUser, fetchUsersBySearch } from "../api/users";
import bcrypt from "bcryptjs";

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
	const emailRegex = /^[\w.-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

	const handleInputChange = (event) => {
		const target = event.target;
		var value = target.value;
		const name = target.name;

		if (/\s/.test(value)) {
			value = value.replace(/\s/g, "");
		}

		if (name === "fname") {
			if (value.length > 50) {
				value = value.slice(0, 50);
			}
			setFname(value);
		} else if (name === "lname") {
			if (value.length > 50) {
				value = value.slice(0, 50);
			}
			setLname(value);
		} else if (name === "pass") {
			if (value.length > 100) {
				value = value.slice(0, 100);
			}
			setPass(value);
		} else if (name === "dob") {
			setDob(value);
		} else if (name === "gender") {
			if (value.length > 10) {
				value = value.slice(0, 10);
			}
			setGender(value);
		} else if (name === "home") {
			if (value.length > 50) {
				value = value.slice(0, 50);
			}
			setHome(value);
		} else if (name === "email") {
			if (value.length > 320) {
				value = value.slice(0, 320);
			}
			setEmail(value);
		}
	};

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

	const handleSubmit = async (event) => {
		event.preventDefault();
		if (
			fname.length == 0 ||
			lname.length == 0 ||
			dob.length == 0 ||
			email.length == 0 ||
			pass.length == 0
		) {
			alert("Please fill out required fields");
			return;
		}
		const emailExists = await fetchUsersBySearch(email);
		if (isValidDate(dob)) {
			if (emailRegex.test(email) && !emailExists) {
				setFormSubmitted(true);
			} else {
				alert("Email is already in use or invalid");
			}
		} else {
			alert("Please enter a valid date in form YYYY-MM-DD");
		}
	};

	const handleLogIn = () => {
		history.push("/");
	};

	const handleNoSignIn = () => {
		history.push("/home");
	};

	useEffect(() => {
		if (user && bcrypt.compareSync(pass, user.pass)) {
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
							name="fname"
							value={fname}
							onChange={handleInputChange}
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
							name="lname"
							value={lname}
							onChange={handleInputChange}
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
							name="dob"
							value={dob}
							onChange={handleInputChange}
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
							name="gender"
							value={gender}
							onChange={handleInputChange}
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
							name="home"
							value={home}
							onChange={handleInputChange}
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
							name="email"
							value={email}
							onChange={handleInputChange}
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
							name="pass"
							value={pass}
							onChange={handleInputChange}
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

import React, { useState } from "react";
import { fetchUpdateUserByUid } from "../api/users";
import bcrypt from "bcryptjs";

function UpdateInfo() {
	const [formData, setFormData] = useState({
		pass: "",
		fname: "",
		lname: "",
		dob: "",
		gender: "",
		home: "",
	});

	const handleInputChange = (event) => {
		const target = event.target;
		const value = target.value;
		const name = target.name;

		if (/\s/.test(value)) {
			alert("No spaces");
			return;
		}

		setFormData({
			...formData,
			[name]: value,
		});
	};

	const trimFormData = (formData) => {
		const trimmedFields = {};
		Object.keys(formData).forEach((key) => {
			if (typeof formData[key] === "string") {
				trimmedFields[key] = formData[key].trim();
			} else {
				trimmedFields[key] = formData[key];
			}
		});
		return trimmedFields;
	};

	function isValidDate(str) {
		const dobRegex =
			/^(-?\d{1,6})-((0[1-9]|1[0-2])|-0[1-9]|-1[0-2])-((0[1-9]|[12][0-9]|3[01])|-0[1-9]|-[12][0-9]|-3[01])$/;
		if (!dobRegex.test(str)) {
			return false;
		}
		const date = new Date(str);
		return date.toString() !== "Invalid Date";
	}

	const handleSubmit = async () => {
		const trimmedFormData = trimFormData(formData);

		if (trimmedFormData.dob !== "" && !isValidDate(trimmedFormData.dob)) {
			alert("Invalid date format for Date of Birth");
			return;
		}

		trimmedFormData.pass = bcrypt.hashSync(trimmedFormData.pass, 10);

		await fetchUpdateUserByUid(localStorage.getItem("uid"), trimmedFormData);

		setFormData({
			pass: "",
			fname: "",
			lname: "",
			dob: "",
			gender: "",
			home: "",
		});

		location.reload();
	};

	return (
		<div
			style={{
				display: "inline-block",
				boxShadow: "0 0 10px rgba(0,0,0,0.5)",
				borderRadius: "10px",
				padding: "20px",
				maxHeight: "100%",
			}}
		>
			<h1 style={{ maxWidth: "90%" }}>Update Info</h1>
			<input
				type="text"
				name="pass"
				placeholder="Password"
				value={formData.pass}
				onChange={handleInputChange}
				style={{
					padding: "5px",
					border: "1px solid #ddd",
					borderRadius: "5px",
					marginBottom: "10px",
					maxWidth: "90%",
				}}
			/>
			<input
				type="text"
				name="fname"
				placeholder="First Name"
				value={formData.fname}
				onChange={handleInputChange}
				style={{
					padding: "5px",
					border: "1px solid #ddd",
					borderRadius: "5px",
					marginBottom: "10px",
					maxWidth: "90%",
				}}
			/>
			<input
				type="text"
				name="lname"
				placeholder="Last Name"
				value={formData.lname}
				onChange={handleInputChange}
				style={{
					padding: "5px",
					border: "1px solid #ddd",
					borderRadius: "5px",
					marginBottom: "10px",
					maxWidth: "90%",
				}}
			/>
			<input
				type="text"
				name="dob"
				placeholder="Date of Birth (YYYY-MM-DD)"
				value={formData.dob}
				onChange={handleInputChange}
				style={{
					padding: "5px",
					border: "1px solid #ddd",
					borderRadius: "5px",
					marginBottom: "10px",
					maxWidth: "90%",
				}}
			/>
			<input
				type="text"
				name="gender"
				placeholder="Gender"
				value={formData.gender}
				onChange={handleInputChange}
				style={{
					padding: "5px",
					border: "1px solid #ddd",
					borderRadius: "5px",
					marginBottom: "10px",
					maxWidth: "90%",
				}}
			/>
			<input
				type="text"
				name="home"
				placeholder="Hometown"
				value={formData.home}
				onChange={handleInputChange}
				style={{
					padding: "5px",
					border: "1px solid #ddd",
					borderRadius: "5px",
					marginBottom: "10px",
					maxWidth: "90%",
				}}
			/>
			<button onClick={handleSubmit}>Submit</button>
		</div>
	);
}

export default UpdateInfo;

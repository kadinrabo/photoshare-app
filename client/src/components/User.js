import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchUsersBySearch } from "../api";
import Navbar from "./Navbar";
import UserPhotos from "./UserPhotos";

function User() {
	const { uid } = useParams();
	const [user, setUser] = useState(null);

	useEffect(() => {
		async function fetchUser() {
			const fetchedUser = await fetchUsersBySearch(uid.toString());
			setUser(fetchedUser);
		}
		fetchUser();
	}, [uid]);

	return (
		<div>
			<Navbar />
			{user && (
				<>
					<UserPhotos user={user}></UserPhotos>
				</>
			)}
			{/* {user && (
				<>
					<h1>
						{user.fname} {user.lname}
						{"'s Profile"}
					</h1>
					<p>Email: {user.email}</p>
					<p>Date of Birth: {user.dob.substring(0, 10)}</p>
					<p>Gender: {user.gender ? user.gender : ""}</p>
					<p>Hometown: {user.home ? user.home : ""}</p>
				</>
			)} */}
		</div>
	);
}

export default User;

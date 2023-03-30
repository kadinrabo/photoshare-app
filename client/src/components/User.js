import React from "react";

function User({ user }) {
	return (
		<div>
			<h1>
				{user.fname} {user.lname}
			</h1>
			<p>Gender: {user.gender ? user.gender : "____"}</p>
			<p>Email: {user.email}</p>
			<p>Hometown: {user.home ? user.home : "____"}</p>
			<p>Date of Birth: {user.dob.substring(0, 10)}</p>
		</div>
	);
}

export default User;

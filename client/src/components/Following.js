import React, { useEffect, useState } from "react";
import { fetchFollowingByUid } from "../api/friends";
import { Link } from "react-router-dom";

function Following({ user }) {
	const [users, setUsers] = useState([]);

	useEffect(() => {
		async function fetchData() {
			const fetchData = await fetchFollowingByUid(user.uid);
			setUsers(fetchData.users);
		}
		fetchData();
	}, [user]);

	return (
		<>
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					width: "90%",
				}}
			>
				<h1>I Friended</h1>
				<ul
					style={{
						listStyleType: "none",
						margin: 0,
						padding: 0,
						paddingLeft: "1.5rem",
					}}
				>
					{users.map((user) => (
						<li key={user.uid} style={{ marginBottom: "1.5rem" }}>
							<Link
								to={`/user/${user.uid}`}
								style={{
									color: "#3478f6",
									textDecoration: "none",
									fontSize: "2rem",
								}}
							>
								{user.fname} {user.lname}
							</Link>
						</li>
					))}
				</ul>
			</div>
		</>
	);
}

export default Following;

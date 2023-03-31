import React, { useEffect, useState } from "react";
import { fetchLikersByPid } from "../api";

function Likes({ photo }) {
	const [users, setUsers] = useState([]);

	useEffect(() => {
		async function fetchUsers() {
			const fetchedUser = await fetchLikersByPid(photo.pid);
			setUsers(fetchedUser.users);
		}
		fetchUsers();
	}, [photo.pid]);

	return (
		<>
			<div
				style={{
					width: "160px",
					height: "250px",
					padding: "20px",
					borderRadius: "10px",
					boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
					backgroundColor: "white",
					overflowY: "scroll",
				}}
			>
				<h3 style={{ textAlign: "left" }}>
					{users.length} {users.length < 2 ? "Like" : "Likes"}
				</h3>
				<ul style={{ listStyle: "none", padding: 0 }}>
					{users.map((user) => (
						<li key={user.uid}>
							{user.fname} {user.lname}
						</li>
					))}
				</ul>
			</div>
		</>
	);
}

export default Likes;

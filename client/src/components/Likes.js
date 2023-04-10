import React, { useEffect, useState } from "react";
import { fetchAddLikeByPid } from "../api/likes";
import { fetchLikersByPid, fetchUsersBySearch } from "../api/users";

function Likes({ photo }) {
	const [users, setUsers] = useState([]);
	const [loggedInUser, setLoggedInUser] = useState(null);
	const uid = localStorage.getItem("uid");

	useEffect(() => {
		async function fetchUser() {
			const user = await fetchUsersBySearch(uid);
			if (user) {
				setLoggedInUser(user);
			}
		}
		fetchUser();
	}, [uid]);

	useEffect(() => {
		async function fetchUsers() {
			const fetchedUser = await fetchLikersByPid(photo.pid);
			setUsers(fetchedUser.users);
		}
		fetchUsers();
	}, [photo.pid, users]);

	const handleAdd = async () => {
		const likedAlready = users.find(
			(user) => user.uid == localStorage.getItem("uid")
		);
		if (!likedAlready) {
			await fetchAddLikeByPid(photo.pid, localStorage.getItem("uid"));
			return;
		}
	};

	return (
		<>
			<div
				style={{
					width: "160px",
					height: "250px",
					padding: "20px",
					borderRadius: "10px",
					boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
					backgroundColor: "white",
					overflowY: "auto",
				}}
			>
				<h3 style={{ textAlign: "left" }}>
					{users.length} {users.length < 2 ? "Like" : "Likes"}
				</h3>
				{localStorage.getItem("uid") && loggedInUser && (
					<div style={{ marginBottom: "10px" }}>
						<button
							style={{
								padding: "5px",
								border: "1px solid #ddd",
								borderRadius: "5px",
								marginBottom: "10px",
								maxWidth: "90%",
							}}
							onClick={handleAdd}
						>
							Add like
						</button>
					</div>
				)}
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

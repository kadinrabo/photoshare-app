import React, { useEffect, useState } from "react";
import { fetchFollowingByUid } from "../api";

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
				<ul style={{ listStyleType: "none", margin: 0, padding: 0 }}>
					{users.map((user) => (
						<li key={user.uid}>
							<h2>
								{user.fname} {user.lname}
							</h2>
						</li>
					))}
				</ul>
			</div>
		</>
	);
}

export default Following;

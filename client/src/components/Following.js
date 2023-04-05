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
			<div style={{ display: "flex", justifyContent: "center" }}>
				<ul style={{ listStyleType: "none" }}>
					{users.map((user) => (
						<li key={user.uid}>
							<h1>
								{user.fname} {user.lname}
							</h1>
						</li>
					))}
				</ul>
			</div>
		</>
	);
}

export default Following;

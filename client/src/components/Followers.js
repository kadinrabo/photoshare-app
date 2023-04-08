import React, { useEffect, useState } from "react";
import { fetchFolllowersByUid } from "../api/friends";

function Followers() {
	const [users, setUsers] = useState([]);

	useEffect(() => {
		async function fetchData() {
			const fetchedData = await fetchFolllowersByUid(
				localStorage.getItem("uid")
			);
			setUsers(fetchedData.users);
		}
		fetchData();
	}, []);

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

export default Followers;

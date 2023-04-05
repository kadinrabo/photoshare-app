import React, { useEffect, useState } from "react";
import { fetchFolllowersByUid } from "../api";

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

export default Followers;

import React, { useEffect, useState } from "react";
import { fetchUserRecommendationsByUid } from "../api";

function Recommendations({ user }) {
	const [users, setUsers] = useState([]);

	useEffect(() => {
		async function fetchData() {
			const fetchedData = await fetchUserRecommendationsByUid(
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

export default Recommendations;

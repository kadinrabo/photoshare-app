import React, { useEffect, useState } from "react";
import { fetchUserRecommendationsByUid } from "../api/users";
import { Link } from "react-router-dom";

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
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					width: "90%",
				}}
			>
				<h1>Friend Recommendations</h1>
				<ul style={{ listStyleType: "none", margin: 0, padding: 0 }}>
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

export default Recommendations;

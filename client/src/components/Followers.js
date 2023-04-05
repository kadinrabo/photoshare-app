import React, { useEffect, useState } from "react";
import { fetchFollowedByUidF } from "../api";

function Followers() {
	const [followers, setFollowers] = useState([]);

	useEffect(() => {
		async function fetchFollowers() {
			const fetchedData = await fetchFollowedByUidF(
				localStorage.getItem("uid")
			);
			setFollowers(fetchedData.users);
		}
		fetchFollowers();
	}, []);

	return (
		<>
			<div style={{ display: "flex", justifyContent: "center" }}>
				<ul style={{ listStyleType: "none" }}>
					{followers.map((follow) => (
						<li key={follow.uid}>
							<h1>
								{follow.fname} {follow.lname}
							</h1>
						</li>
					))}
				</ul>
			</div>
		</>
	);
}

export default Followers;

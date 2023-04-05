import React, { useEffect, useState } from "react";
import { fetchFollowingByUid } from "../api";

function Following({ user }) {
	const [following, setFollowing] = useState([]);

	useEffect(() => {
		async function fetchFollowing() {
			const fetchData = await fetchFollowingByUid(user.uid);
			setFollowing(fetchData.users);
		}
		fetchFollowing();
	}, [user]);

	return (
		<>
			<div style={{ display: "flex", justifyContent: "center" }}>
				<ul style={{ listStyleType: "none" }}>
					{following.map((follow) => (
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

export default Following;

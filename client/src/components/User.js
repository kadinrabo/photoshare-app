import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchUsersBySearch } from "../api/users";
import { fetchAddFriend, fetchHasFriendByUidFid } from "../api/friends";
import Navbar from "./Navbar";
import UserPhotos from "./UserPhotos";
import UserAlbums from "./UserAlbums";

function User() {
	const { uid } = useParams();
	const [user, setUser] = useState(null);
	const [isFollowing, setIsFollowing] = useState(false);

	useEffect(() => {
		async function fetchData() {
			const fetchedData = await fetchUsersBySearch(uid.toString());
			setUser(fetchedData);
		}
		fetchData();
	}, [uid]);

	useEffect(() => {
		async function checkFriends() {
			const res = await fetchHasFriendByUidFid(
				localStorage.getItem("uid"),
				uid
			);
			if (res) {
				setIsFollowing(true);
			} else {
				setIsFollowing(false);
			}
		}
		checkFriends();
	}, [uid]);

	const handleFollowClick = async () => {
		await fetchAddFriend(localStorage.getItem("uid"), uid);
		setIsFollowing(true);
	};

	const buttonText = isFollowing ? "Following" : "Follow";

	return (
		<>
			<Navbar />
			<h1
				style={{
					justifyContent: "center",
					alignItems: "center",
					display: "flex",
				}}
			>
				{user && (
					<div>
						{user.fname} {user.lname}
						{"'s"} Profile
					</div>
				)}
			</h1>
			<div
				style={{
					display: "flex",
					flexWrap: "wrap",
					justifyContent: "center",
					gap: "20px",
				}}
			>
				<div style={{ flex: 1, paddingLeft: "20px" }}>
					{user && <UserPhotos user={user}></UserPhotos>}
				</div>
				<div style={{ flex: 1, paddingRight: "20px" }}>
					{user && <UserAlbums user={user}></UserAlbums>}
				</div>
			</div>
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					padding: "20px",
				}}
			>
				{user && localStorage.getItem("uid") != uid && (
					<button
						style={{
							background: isFollowing ? "gray" : "#3478f6",
							color: "white",
							padding: "10px 20px",
							borderRadius: "5px",
							cursor: isFollowing ? "not-allowed" : "pointer",
						}}
						onClick={handleFollowClick}
						disabled={isFollowing}
					>
						{buttonText}
					</button>
				)}
			</div>
		</>
	);
}

export default User;

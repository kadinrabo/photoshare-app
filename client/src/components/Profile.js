import React, { useEffect, useState } from "react";
import Auth from "./Auth";
import Navbar from "./Navbar";
import UploadPhoto from "./UploadPhoto";
import Popup from "./Popup";
import { fetchUsersBySearch } from "../api";
import UserPhotos from "./UserPhotos";
import UserAlbums from "./UserAlbums";
import Followers from "./Followers";
import Following from "./Following";
import UpdateInfo from "./UpdateInfo";
import Recommendations from "./Recommendations";

function Profile() {
	const [user, setUser] = useState(null);
	const uid = localStorage.getItem("uid");
	const [showFollowersPopup, setShowFollowersPopup] = useState(false);
	const [showFollowingPopup, setShowFollowingPopup] = useState(false);
	const [showRecsPopup, setShowRecsPopup] = useState(false);

	function handleOpenFollowersPopup() {
		setShowFollowersPopup(true);
	}

	function handleCloseFollowersPopup() {
		setShowFollowersPopup(false);
	}

	function handleOpenFollowingPopup() {
		setShowFollowingPopup(true);
	}

	function handleCloseFollowingPopup() {
		setShowFollowingPopup(false);
	}

	function handleOpenRecsPopup() {
		setShowRecsPopup(true);
	}

	function handleCloseRecsPopup() {
		setShowRecsPopup(false);
	}

	useEffect(() => {
		async function fetchUser() {
			const fetchedUser = await fetchUsersBySearch(uid);
			setUser(fetchedUser);
		}
		fetchUser();
	}, [uid]);

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
					justifyContent: "center",
					alignItems: "center",
					padding: "20px",
				}}
			>
				<div style={{ marginRight: "40px" }}>
					{user && <UserPhotos user={user}></UserPhotos>}
				</div>
				{user && <UserAlbums user={user}></UserAlbums>}
			</div>
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<button onClick={handleOpenFollowersPopup}>Followers</button>
				<button onClick={handleOpenFollowingPopup}>Following</button>
				<button onClick={handleOpenRecsPopup}>Recommendations</button>
			</div>
			<Popup
				isOpen={showFollowersPopup}
				onClose={handleCloseFollowersPopup}
				contentStyle={{ maxWidth: "fit-content" }}
			>
				{user && <Followers />}
			</Popup>
			<Popup
				isOpen={showFollowingPopup}
				onClose={handleCloseFollowingPopup}
				contentStyle={{
					maxWidth: "fit-content",
					padding: "0 20px",
				}}
			>
				{user && <Following user={user} />}
			</Popup>
			<Popup
				isOpen={showRecsPopup}
				onClose={handleCloseRecsPopup}
				contentStyle={{
					maxWidth: "fit-content",
					padding: "0 20px",
				}}
			>
				{user && <Recommendations user={user} />}
			</Popup>

			<div
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "flex-start",
					padding: "20px",
				}}
			>
				<div style={{ flex: 1, justifyContent: "center", display: "flex" }}>
					<UploadPhoto />
				</div>
			</div>
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "flex-start",
					padding: "20px",
				}}
			>
				<div style={{ flex: 1, justifyContent: "center", display: "flex" }}>
					<UpdateInfo />
				</div>
			</div>
		</>
	);
}

export default Auth(Profile);

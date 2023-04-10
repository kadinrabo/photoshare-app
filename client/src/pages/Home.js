import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import SearchForFriends from "../components/SearchForFriends";
import SearchForTags from "../components/SearchForTags";
import TrendingTags from "../components/TrendingTags";
import CScore from "../components/CScore";
import AllAlbums from "../components/AllAlbums";
import AllPhotos from "../components/AllPhotos";
import PhotoSearch from "../components/PhotoSearch";
import { fetchUsersBySearch } from "../api/users";

function Home() {
	const [loggedInUser, setLoggedInUser] = useState(null);
	const uid = localStorage.getItem("uid");

	useEffect(() => {
		async function fetchUser() {
			const user = await fetchUsersBySearch(uid);
			if (user) {
				setLoggedInUser(user);
			}
		}
		fetchUser();
	}, [uid]);

	return (
		<>
			<Navbar />
			<h1 style={{ padding: "20px" }}> Photoshare Home </h1>
			<div
				style={{
					display: "flex",
					flexWrap: "wrap",
					justifyContent: "center",
					gap: "20px",
					padding: "20px",
				}}
			>
				<div style={{ flex: 0.33 }}>
					<TrendingTags />
				</div>
				<div style={{ flex: 0.33 }}>
					<PhotoSearch />
				</div>
				<div style={{ flex: 0.33 }}>
					<CScore />
				</div>
			</div>
			<div
				style={{
					display: "flex",
					flexWrap: "wrap",
					justifyContent: "center",
					gap: "20px",
					padding: "20px",
				}}
			>
				<div style={{ flex: 0.25 }}>
					<AllPhotos />
				</div>
				<div style={{ flex: 0.25 }}>
					<SearchForFriends />
				</div>
				<div style={{ flex: 0.25 }}>
					<AllAlbums />
				</div>
				<div style={{ flex: 0.25 }}>
					<SearchForTags />
				</div>
			</div>
		</>
	);
}

export default Home;

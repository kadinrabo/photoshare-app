import React from "react";
import Navbar from "../components/Navbar";
import SearchForFriends from "../components/SearchForFriends";
import SearchForTags from "../components/SearchForTags";
import TrendingTags from "../components/TrendingTags";
import CScore from "../components/CScore";
import AllAlbums from "../components/AllAlbums";
import AllPhotos from "../components/AllPhotos";

function Home() {
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
				<div style={{ flex: 1 }}>
					<TrendingTags />
				</div>
				<div style={{ flex: 1 }}>
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
					{localStorage.getItem("uid") && <SearchForFriends />}
				</div>
				<div style={{ flex: 0.25 }}>
					<AllAlbums />
				</div>
				<div style={{ flex: 0.25 }}>
					{localStorage.getItem("uid") && <SearchForTags />}
				</div>
			</div>
		</>
	);
}

export default Home;

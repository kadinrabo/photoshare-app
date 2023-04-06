import React from "react";
import Auth from "./Auth";
import Navbar from "./Navbar";
import SearchForFriends from "./SearchForFriends";
import SearchForTags from "./SearchForTags";
import TrendingTags from "./TrendingTags";
import CScore from "./CScore";
import AllAlbums from "./AllAlbums";
import AllPhotos from "./AllPhotos";

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
				<div style={{ flex: 1 }}>
					<AllAlbums />
				</div>
				<div style={{ flex: 1 }}>
					<AllPhotos />
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
				{localStorage.getItem("uid") && (
					<div style={{ flex: 1 }}>
						<SearchForFriends />
					</div>
				)}
				{localStorage.getItem("uid") && (
					<div style={{ flex: 1 }}>
						<SearchForTags />
					</div>
				)}
			</div>
		</>
	);
}

export default Home;

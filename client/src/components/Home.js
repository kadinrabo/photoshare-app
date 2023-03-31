import React from "react";
import Auth from "./Auth";
import Navbar from "./Navbar";
import SearchForFriends from "./SearchForFriends";
import SearchForTags from "./SearchForTags";
import Popup from "./Popup";

function Home() {
	return (
		<>
			<Navbar />
			<h1 style={{ padding: "20px" }}> Home </h1>
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "flex-start",
					padding: "20px",
				}}
			>
				<div style={{ flex: 1, marginRight: "20px" }}>
					<SearchForFriends />
				</div>
				<div style={{ flex: 1 }}>
					<SearchForTags />
				</div>
			</div>
		</>
	);
}

export default Auth(Home);

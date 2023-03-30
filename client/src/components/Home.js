import React from "react";
import Auth from "./Auth";
import Navbar from "./Navbar";
import Searcher from "./Searcher";

function Home() {
	return (
		<>
			<Navbar />
			<h1 style={{ padding: "20px" }}> Home </h1>
			<div style={{ padding: "20px" }}>
				<Searcher />
			</div>
		</>
	);
}

export default Auth(Home);

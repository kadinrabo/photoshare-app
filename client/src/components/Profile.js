import React from "react";
import Auth from "./Auth";
import Navbar from "./Navbar";
import UploadPhoto from "./UploadPhoto";

function Profile() {
	return (
		<>
			<Navbar />
			<h1 style={{ padding: "20px" }}> Profile </h1>
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "flex-start",
					padding: "20px",
				}}
			>
				<div style={{ flex: 1, marginRight: "20px" }}>
					<UploadPhoto />
				</div>
			</div>
			;
		</>
	);
}

export default Auth(Profile);

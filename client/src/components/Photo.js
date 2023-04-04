import React, { useState, useEffect } from "react";
import {
	fetchUserByPid,
	fetchTagsByPid,
	fetchAddTag,
	fetchDeletePhotoByPid,
} from "../api";
import Likes from "./Likes";
import Comments from "./Comments";

function Photo({ photo }) {
	const [user, setUser] = useState(null);
	const [tags, setTags] = useState(null);
	const [newTag, setNewTag] = useState("");

	const handleInputChange = (event) => {
		setNewTag(event.target.value);
	};

	useEffect(() => {
		async function fetchUser() {
			const fetchedUser = await fetchUserByPid(photo.pid);
			setUser(fetchedUser);
		}
		fetchUser();
	}, [photo.pid]);

	useEffect(() => {
		async function fetchTags() {
			const fetchedTags = await fetchTagsByPid(photo.pid);
			setTags(fetchedTags.tags);
		}
		fetchTags();
	}, [photo.pid]);

	const handleAddTag = async () => {
		if (!newTag || newTag.trim() === "" || !/^\s*(?!.*#)\S+\s*$/.test(newTag)) {
			alert("Invalid tag. no spaces and no #");
			return;
		}
		// Check if duplidate tag
		await fetchAddTag("#" + newTag.trim(), photo.pid);
		const fetchedTags = await fetchTagsByPid(photo.pid);
		setTags(fetchedTags.tags);
		setNewTag("");
	};

	const handleDeletePhoto = async () => {
		await fetchDeletePhotoByPid(photo.pid);
		window.location.reload();
	};

	return (
		<>
			<div
				style={{
					width: "100%",
					height: "100%",
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "flex-start",
				}}
			>
				<img
					src={photo.pdata}
					alt=""
					style={{
						maxWidth: "100%",
						maxHeight: "100%",
						objectFit: "contain",
					}}
				/>
				<div style={{ display: "inline-block", marginTop: "10px" }}>
					<h4 style={{ display: "inline-block", marginRight: "10px" }}>
						{photo.caption ? photo.caption : "Photo"}
					</h4>
					{user && (
						<p
							style={{
								display: "inline-block",
								fontSize: "14px",
								color: "#999",
							}}
						>
							By {user.fname} {user.lname}
						</p>
					)}
				</div>
				<div
					style={{
						display: "flex",
						justifyContent: "center",
						alignItems: "flex-start",
						padding: "20px",
					}}
				>
					<div style={{ flex: 1, marginRight: "20px" }}>
						<Likes photo={photo} />
					</div>
					<div style={{ flex: 1 }}>
						<Comments photo={photo} />
					</div>
				</div>
				{user && user.uid == localStorage.getItem("uid") && (
					<div style={{ display: "flex", alignItems: "center" }}>
						<div>
							<button onClick={handleAddTag}> Add </button>
							<input
								type="text"
								placeholder="Add tag"
								style={{
									padding: "5px",
									border: "1px solid #ddd",
									borderRadius: "5px",
									marginBottom: "10px",
									maxWidth: "90%",
									marginRight: "3px",
									marginLeft: "5px",
								}}
								value={newTag}
								onChange={handleInputChange}
							/>
						</div>
					</div>
				)}
				<div
					style={{
						display: "flex",
						alignItems: "center",
						flexWrap: "wrap",
						maxWidth: "500px",
					}}
				>
					{tags && (
						<p style={{ display: "flex", flexWrap: "wrap" }}>
							{tags.map((tag, index) => (
								<span
									key={index}
									style={{ whiteSpace: "nowrap", marginRight: "5px" }}
								>
									{tag.tag}
									{index !== tags.length - 1 && ",  "}
								</span>
							))}
						</p>
					)}
				</div>
				{user && user.uid == localStorage.getItem("uid") && (
					<button
						style={{
							backgroundColor: "red",
							color: "white",
							marginRight: "5px",
						}}
						onClick={handleDeletePhoto}
					>
						Delete photo
					</button>
				)}
			</div>
		</>
	);
}

export default Photo;

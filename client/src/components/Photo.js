import React, { useState, useEffect } from "react";
import { fetchUserByPid, fetchTagsByPid } from "../api";
import Likes from "./Likes";
import Comments from "./Comments";

function Photo({ photo }) {
	const [user, setUser] = useState(null);
	const [tags, setTags] = useState(null);
	const [newTag, setNewTag] = useState("");

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
		if (!newTag) return;
		await addTag(photo.pid, newTag);
		const fetchedTags = await fetchTagsByPid(photo.pid);
		setTags(fetchedTags.tags);
		setNewTag("");
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
				{user && user.uid === localStorage.getItem("uid") && (
					<div style={{ display: "flex", alignItems: "center" }}>
						<div>
							<button> Add </button>
							<input
								type="text"
								placeholder="Add tag"
								style={{ marginRight: "3px", marginLeft: "5px" }}
							/>
						</div>
					</div>
				)}
				<div style={{ display: "flex", alignItems: "center" }}>
					<p style={{ marginRight: "5px" }}>Tags:</p>
					{tags && (
						<p style={{ display: "flex" }}>
							{tags.map((tag, index) => (
								<span key={index}>
									{tag.tag}
									{index !== tags.length - 1 && ", "}
								</span>
							))}
						</p>
					)}
				</div>
			</div>
		</>
	);
}

export default Photo;

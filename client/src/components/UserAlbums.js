import React, { useEffect, useState } from "react";
import { fetchAddAlbum, fetchAlbumsBySearch } from "../api/albums";
import Popup from "./Popup";
import Album from "./Album";

function AlbumRow({ album, onItemClick }) {
	return (
		<div
			onClick={() => onItemClick(album)}
			style={{
				padding: "0px",
				cursor: "pointer",
				transition: "background-color 0.2s ease-in-out",
				borderRadius: "1px",
				margin: "1px 0",
			}}
		>
			<h3
				style={{
					display: "inline-block",
					marginRight: "10px",
					color: "#3478f6",
					textDecoration: "none",
					margin: 0,
					padding: 2,
				}}
			>
				{album.aname ? album.aname : "Album Name"}
			</h3>
		</div>
	);
}

function Albums({ albums, onItemClick }) {
	return (
		<div style={{ maxHeight: "180px", overflowY: "auto" }}>
			{albums.map((album) => (
				<AlbumRow key={album.aid} album={album} onItemClick={onItemClick} />
			))}
		</div>
	);
}

function UserAlbums({ user }) {
	const [albums, setAlbums] = useState([]);
	const [album, setAlbum] = useState(null);
	const [showPopup, setShowPopup] = useState(false);
	const [newAlbumName, setNewAlbumName] = useState("");

	const handleAlbumClick = (album) => {
		setAlbum(album);
		setShowPopup(true);
	};

	const handleClosePopup = () => {
		setShowPopup(false);
		setAlbum(null);
	};

	const handleAddAlbum = async () => {
		async function createNewAlbum() {
			await fetchAddAlbum(localStorage.getItem("uid"), newAlbumName);
			const fetchedData = await fetchAlbumsBySearch(user.uid);
			setAlbums(fetchedData.albums);
			setNewAlbumName("");
			location.reload();
		}
		if (newAlbumName && newAlbumName.trim() != "") {
			createNewAlbum();
		}
	};

	const handleInputChange = async (e) => {
		setNewAlbumName(e.target.value);
	};

	useEffect(() => {
		const fetchAlbums = async () => {
			const fetchedData = await fetchAlbumsBySearch(user.uid);
			setAlbums(fetchedData.albums);
		};
		fetchAlbums();
	}, [user]);

	return (
		<div
			style={{
				padding: "20px",
				borderRadius: "10px",
				boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
				backgroundColor: "white",
				alignItems: "center",
				overflow: "auto",
			}}
		>
			<h1 style={{ maxWidth: "90%" }}>Albums</h1>
			<Albums albums={albums} onItemClick={handleAlbumClick} />
			{user && user.uid == localStorage.getItem("uid") && (
				<div style={{ display: "flex", marginTop: "0px" }}>
					<input
						type="text"
						value={newAlbumName}
						style={{
							padding: "5px",
							border: "1px solid #ddd",
							borderRadius: "5px",
							marginBottom: "10px",
							maxWidth: "70%",
						}}
						onChange={(e) => handleInputChange(e)}
					/>
					<button
						onClick={handleAddAlbum}
						style={{
							height: "26.5px",
							display: "inline-block",
							marginLeft: "5px",
						}}
					>
						Add
					</button>
				</div>
			)}
			<Popup onClose={handleClosePopup} isOpen={showPopup}>
				{album && <Album album={album} />}
			</Popup>
		</div>
	);
}

export default UserAlbums;

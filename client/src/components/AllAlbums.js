import React, { useEffect, useState } from "react";
import { fetchAllAlbums } from "../api/albums";
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

function AllAlbums() {
	const [albums, setAlbums] = useState([]);
	const [album, setAlbum] = useState(null);
	const [showPopup, setShowPopup] = useState(false);

	const handleAlbumClick = (album) => {
		setAlbum(album);
		setShowPopup(true);
	};

	const handleClosePopup = () => {
		setShowPopup(false);
		setAlbum(null);
	};

	useEffect(() => {
		const fetchData = async () => {
			const fetchedData = await fetchAllAlbums();
			setAlbums(fetchedData.albums);
		};
		fetchData();
	}, []);

	return (
		<>
			<div
				style={{
					padding: "20px",
					borderRadius: "10px",
					boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
					backgroundColor: "white",
					maxHeight: "90%",
				}}
			>
				<h1 style={{ maxWidth: "90%" }}>All Albums</h1>
				<Albums albums={albums} onItemClick={handleAlbumClick} />
				<Popup onClose={handleClosePopup} isOpen={showPopup}>
					{album && <Album album={album} />}
				</Popup>
			</div>
		</>
	);
}

export default AllAlbums;

import React, { useEffect, useState } from "react";
import { fetchAllPhotos, fetchUserByPid } from "../api";
import Popup from "./Popup";
import Photo from "./Photo";

function PhotoRow({ photo, onItemClick }) {
	const [user, setUser] = useState(null);

	useEffect(() => {
		async function fetchUser() {
			const fetchedUser = await fetchUserByPid(photo.pid);
			setUser(fetchedUser);
		}
		fetchUser();
	}, []);

	return (
		<div
			onClick={() => onItemClick(photo)}
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
				{photo.caption ? photo.caption : "Photo"}
			</h3>
		</div>
	);
}

function Photos({ photos, onItemClick }) {
	return (
		<div style={{ maxHeight: "180px", overflowY: "auto" }}>
			{photos.map((photo) => (
				<PhotoRow key={photo.pid} photo={photo} onItemClick={onItemClick} />
			))}
		</div>
	);
}

function AllPhotos() {
	const [photos, setPhotos] = useState([]);
	const [showPopup, setShowPopup] = useState(false);
	const [photo, setPhoto] = useState(null);

	const handlePhotoClick = (photo) => {
		setPhoto(photo);
		setShowPopup(true);
	};

	const handleClosePopup = async () => {
		const fetchedData = await fetchAllPhotos();
		setPhotos(fetchedData.photos);
		setShowPopup(false);
		setPhoto(null);
	};

	useEffect(() => {
		const fetchPhotos = async () => {
			const fetchedData = await fetchAllPhotos();
			setPhotos(fetchedData.photos);
		};
		fetchPhotos();
	}, []);

	return (
		<>
			<div
				style={{
					padding: "20px",
					borderRadius: "10px",
					boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
					backgroundColor: "white",
				}}
			>
				<h1>Photos</h1>
				<Photos photos={photos} onItemClick={handlePhotoClick} />
				<Popup onClose={handleClosePopup} isOpen={showPopup}>
					{photo && <Photo photo={photo} />}
				</Popup>
			</div>
		</>
	);
}

export default AllPhotos;

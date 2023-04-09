import React, { useEffect, useState } from "react";
import { fetchAllPhotos } from "../api/photos";
import { fetchUserByPid } from "../api/users";
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
				margin: "0px",
			}}
		>
			<h3
				style={{
					display: "inline-block",
					marginRight: "10px",
					color: "#3478f6",
					textDecoration: "none",
					margin: "0px",
					padding: 2,
				}}
			>
				{photo.caption ? photo.caption : "Photo"}
			</h3>
			{user && (
				<h6
					style={{
						display: "inline-block",
						fontSize: "14px",
						color: "#999",
						margin: "0px",
						padding: 0,
					}}
				>
					By {user.fname} {user.lname}
				</h6>
			)}
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
					maxHeight: "90%",
				}}
			>
				<h1>All Photos</h1>
				<Photos photos={photos} onItemClick={handlePhotoClick} />
				<Popup onClose={handleClosePopup} isOpen={showPopup}>
					{photo && <Photo photo={photo} />}
				</Popup>
			</div>
		</>
	);
}

export default AllPhotos;

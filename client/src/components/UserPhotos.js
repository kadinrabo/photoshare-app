import React, { useEffect, useState } from "react";
import {
	fetchUniqueTagsByUid,
	fetchPhotosByUidTag,
	fetchPhotosByUid,
	fetchUserByPid,
} from "../api";
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

function UserPhotos({ user }) {
	const [photos, setPhotos] = useState([]);
	const [showPopup, setShowPopup] = useState(false);
	const [photo, setPhoto] = useState(null);
	const [tags, setTags] = useState(null);
	const [tagStates, setTagStates] = useState(null);

	const handlePhotoClick = (photo) => {
		setPhoto(photo);
		setShowPopup(true);
	};

	const handleClosePopup = async () => {
		const fetchedTags = await fetchUniqueTagsByUid(user.uid);
		setTags(fetchedTags.tags);
		setTagStates(fetchedTags.tags.map(() => false));
		const fetchedData = await fetchPhotosByUid(user.uid);
		setPhotos(fetchedData.photos);
		setShowPopup(false);
		setPhoto(null);
	};

	const handleTagClick = async (e, index, tag) => {
		e.preventDefault();
		const newTagStates = tagStates.map((state, i) =>
			i === index ? !state : false
		);
		setTagStates(newTagStates);
		const fetchedData = await fetchPhotosByUidTag(user.uid, tag);
		setPhotos(fetchedData.photos);
	};

	useEffect(() => {
		async function fetchTags() {
			const fetchedTags = await fetchUniqueTagsByUid(user.uid);
			setTags(fetchedTags.tags);
			setTagStates(fetchedTags.tags.map(() => false));
		}
		fetchTags();
	}, [user]);

	useEffect(() => {
		const fetchPhotos = async () => {
			const fetchedData = await fetchPhotosByUid(user.uid);
			setPhotos(fetchedData.photos);
		};
		fetchPhotos();
	}, [user]);

	return (
		<div
			style={{
				width: "200px",
				height: "500",
				padding: "20px",
				borderRadius: "10px",
				boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
				backgroundColor: "white",
				overflow: "auto",
			}}
		>
			<h1>Photos</h1>
			<Photos photos={photos} onItemClick={handlePhotoClick} />
			{tags && (
				<p style={{ display: "flex", flexWrap: "wrap" }}>
					{tags.map((tag, index) => (
						<a
							key={index}
							href="#"
							style={{
								textDecoration: "none",
								color: tagStates[index] ? "blue" : "grey",
								whiteSpace: "nowrap",
								marginRight: "5px",
							}}
							onClick={(e) => handleTagClick(e, index, tag.tag)}
						>
							{tag.tag}
							{index !== tags.length - 1 && ", "}
						</a>
					))}
				</p>
			)}
			<Popup onClose={handleClosePopup} isOpen={showPopup}>
				{photo && <Photo photo={photo} />}
			</Popup>
		</div>
	);
}

export default UserPhotos;

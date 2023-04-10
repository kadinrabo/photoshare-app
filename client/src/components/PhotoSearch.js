import { useState, useEffect } from "react";
import Popup from "./Popup";
import {
	fetchAllPhotos,
	fetchPhotosByTag,
	fetchPhotosByUid,
	fetchPhotosByUidTags,
} from "../api/photos";
import { fetchUserByPid, fetchUsersBySearch } from "../api/users";
import Photo from "./Photo";

function SearchResult({ photo, onItemClick }) {
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
			<h5
				style={{
					display: "inline-block",
					marginRight: "10px",
					color: "#3478f6",
					textDecoration: "none",
					margin: "0px",
					padding: "0px",
				}}
			>
				{photo.caption ? photo.caption : "Photo"}
			</h5>
			{user && (
				<h6
					style={{
						display: "inline-block",
						fontSize: "14px",
						color: "#999",
						margin: "0px",
						padding: "2px",
					}}
				>
					By {user.fname} {user.lname}
				</h6>
			)}
		</div>
	);
}

function SearchResults({ photos, onItemClick }) {
	return (
		<div style={{ maxHeight: "180px", overflowY: "auto" }}>
			{photos.map((photo) => (
				<SearchResult key={photo.pid} photo={photo} onItemClick={onItemClick} />
			))}
		</div>
	);
}

function PhotoSearch() {
	const [query, setQuery] = useState("");
	const [photos, setPhotos] = useState([]);
	const [showPopup, setShowPopup] = useState(false);
	const [photo, setPhoto] = useState(null);
	const [showMyPhotos, setshowMyPhotos] = useState(false);
	const [loggedInUser, setLoggedInUser] = useState(null);
	const uid = localStorage.getItem("uid");

	useEffect(() => {
		async function fetchUser() {
			const user = await fetchUsersBySearch(uid);
			if (user) {
				setLoggedInUser(user);
			}
		}
		fetchUser();
	}, [uid]);

	const handleQueryChange = (event) => {
		setQuery(event.target.value);
	};

	const handleResultClick = (photo) => {
		setPhoto(photo);
		setShowPopup(true);
	};

	const handleClosePopup = () => {
		setShowPopup(false);
		setPhoto(null);
	};

	const handleToggleChange = async () => {
		setshowMyPhotos(!showMyPhotos);
	};

	useEffect(() => {
		const fetchResults = async () => {
			if (showMyPhotos) {
				const cleaned = query.replace(/^[\s,#]+/, "");
				if (cleaned.trim() === "") {
					const fetchedData = await fetchPhotosByUid(
						localStorage.getItem("uid")
					);
					setPhotos(fetchedData.photos);
				} else if (
					cleaned.indexOf("#") !== -1 ||
					!(cleaned.split(",").length === 1 || cleaned.split(",").length > 1)
				) {
					setPhotos([]);
				} else {
					if (/,,/g.test(cleaned)) {
						setPhotos([]);
					} else if (!(cleaned.slice(-1) === ",")) {
						const fetchedData = await fetchPhotosByUidTags(
							cleaned.replace(/\s+/g, ",")
						);
						setPhotos(fetchedData.photos);
					} else {
						const fetchedData = await fetchPhotosByUidTags(
							cleaned.slice(0, -1).replace(/\s+/g, ",")
						);
						setPhotos(fetchedData.photos);
					}
				}
			} else {
				const cleaned = query.replace(/^[\s,#]+/, "");
				if (cleaned.trim() === "") {
					const fetchedData = await fetchAllPhotos();
					setPhotos(fetchedData.photos);
				} else if (
					cleaned.indexOf("#") !== -1 ||
					!(cleaned.split(",").length === 1 || cleaned.split(",").length > 1)
				) {
					setPhotos([]);
				} else {
					if (/,,/g.test(cleaned)) {
						setPhotos([]);
					} else if (!(cleaned.slice(-1) === ",")) {
						const fetchedData = await fetchPhotosByTag(
							cleaned.replace(/\s+/g, ",")
						);
						setPhotos(fetchedData.photos);
					} else {
						const fetchedData = await fetchPhotosByTag(
							cleaned.slice(0, -1).replace(/\s+/g, ",")
						);
						setPhotos(fetchedData.photos);
					}
				}
			}
		};
		fetchResults();
	}, [query, showMyPhotos]);

	return (
		<div
			style={{
				padding: "20px",
				borderRadius: "10px",
				boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
				backgroundColor: "white",
			}}
		>
			<div style={{ display: "flex", alignItems: "center" }}>
				<h1 style={{ padding: "0px", marginRight: "10px" }}>Photo Search</h1>
				{localStorage.getItem("uid") && loggedInUser && (
					<button
						onClick={handleToggleChange}
						style={{
							backgroundColor: showMyPhotos ? "#3478f6" : "gray",
							color: "white",
							padding: "8px 12px",
							borderRadius: "4px",
							cursor: "pointer",
						}}
					>
						{showMyPhotos ? "My Photos" : "All Photos"}
					</button>
				)}
			</div>
			<input
				type="text"
				value={query}
				onChange={handleQueryChange}
				style={{
					padding: "5px",
					border: "1px solid #ddd",
					borderRadius: "5px",
					marginBottom: "10px",
					maxWidth: "90%",
				}}
				placeholder="sunset beach"
			/>
			<SearchResults photos={photos} onItemClick={handleResultClick} />
			<Popup onClose={handleClosePopup} isOpen={showPopup}>
				{photo && <Photo photo={photo} />}
			</Popup>
		</div>
	);
}

export default PhotoSearch;

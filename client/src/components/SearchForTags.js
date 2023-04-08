import { useState, useEffect } from "react";
import Popup from "./Popup";
import { fetchPhotosByTag } from "../api/photos";
import { fetchUserByPid } from "../api/users";
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
				margin: "1px 0",
			}}
		>
			<h5
				style={{
					display: "inline-block",
					marginRight: "10px",
					color: "#3478f6",
					textDecoration: "none",
					margin: 0,
					padding: 0,
				}}
			>
				{photo.caption ? photo.caption : "Photo"}
			</h5>
			{user && (
				<h7
					style={{
						display: "inline-block",
						fontSize: "14px",
						color: "#999",
						padding: 3,
					}}
				>
					By {user.fname} {user.lname}
				</h7>
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

function SearchForTags() {
	const [query, setQuery] = useState("");
	const [photos, setPhotos] = useState([]);
	const [showPopup, setShowPopup] = useState(false);
	const [photo, setPhoto] = useState(null);

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

	useEffect(() => {
		const fetchResults = async () => {
			if (
				query.trim() === "" ||
				query.indexOf("#") !== -1 ||
				!(query.split(",").length === 1 || query.split(",").length > 1)
			) {
				setPhotos([]);
			} else {
				if (!(query.slice(-1) === ",")) {
					const fetchedData = await fetchPhotosByTag(query);
					setPhotos(fetchedData.photos);
				}
			}
		};
		fetchResults();
	}, [query]);

	return (
		<div
			style={{
				padding: "20px",
				borderRadius: "10px",
				boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
				backgroundColor: "white",
			}}
		>
			<h1 style={{ padding: "0px" }}>Search by tag (no #)</h1>
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
			/>
			<SearchResults photos={photos} onItemClick={handleResultClick} />
			<Popup onClose={handleClosePopup} isOpen={showPopup}>
				{photo && <Photo photo={photo} />}
			</Popup>
		</div>
	);
}

export default SearchForTags;

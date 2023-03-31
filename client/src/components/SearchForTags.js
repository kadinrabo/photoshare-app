import { useState, useEffect } from "react";
import Popup from "./Popup";
import { fetchPhotosByTag } from "../api";
import Photo from "./Photo";

function SearchResult({ photo, onItemClick }) {
	return (
		<div
			onClick={() => onItemClick(photo)}
			style={{
				padding: "2px",
				cursor: "pointer",
				transition: "background-color 0.2s ease-in-out",
				borderRadius: "5px",
				margin: "5px 0",
			}}
		>
			{photo.pid} {photo.aid}
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
	};

	useEffect(() => {
		const fetchResults = async () => {
			if (
				query.trim() === "" ||
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
				width: "200px",
				height: "250px",
				padding: "20px",
				borderRadius: "10px",
				boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
				backgroundColor: "white",
			}}
		>
			<p style={{ padding: "0px" }}>Search for photos by tag</p>
			<input
				type="text"
				value={query}
				onChange={handleQueryChange}
				style={{
					padding: "5px",
					border: "1px solid #ddd",
					borderRadius: "5px",
					marginBottom: "10px",
				}}
			/>
			<SearchResults photos={photos} onItemClick={handleResultClick} />
			<Popup onClose={handleClosePopup} isOpen={showPopup}>
				{photo && (
					// Show the other photo information here with photo object
					<Photo photo={photo} />
				)}
			</Popup>
		</div>
	);
}

export default SearchForTags;

import React, { useState, useEffect } from "react";
import storage from "../storage.js";
const { v4: uuidv4 } = require("uuid");
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { fetchAlbumsBySearch, createNewPhoto } from "../api.js";

function UploadPhoto() {
	const [file, setFile] = useState("");
	const [albumOptions, setAlbumOptions] = useState([]);
	const [albumId, setAlbumId] = useState(null);
	const [caption, setCaption] = useState("");
	const [selectedAlbum, setSelectedAlbum] = useState(false);

	function handleChange(event) {
		setFile(event.target.files[0]);
	}
	const handleCaptionChange = (event) => {
		setCaption(event.target.value);
	};
	const handleRadioChange = (event) => {
		setAlbumId(event.target.value);
		setSelectedAlbum(true);
	};

	const handleUpload = async () => {
		if (!file) {
			alert("Please upload an image first!");
		} else if (!albumOptions) {
			alert("Please create an album first!");
		} else if (!selectedAlbum) {
			alert("Please select an album to upload the photo to.");
		} else {
			const storageRef = ref(storage, `${file.name}-${uuidv4()}`);
			const uploadTask = uploadBytesResumable(storageRef, file);
			uploadTask.on(
				() => {
					getDownloadURL(uploadTask.snapshot.ref).then(async (url) => {
						await createNewPhoto(albumId, url, caption);
					});
				},
				(err) => console.log(err)
			);
		}
	};

	useEffect(() => {
		const fetchResults = async () => {
			const fetchedData = await fetchAlbumsBySearch(
				localStorage.getItem("uid")
			);
			setAlbumOptions(fetchedData.albums);
		};
		fetchResults();
	}, []);

	return (
		<div
			style={{
				position: "fixed",
				bottom: "47rem",
				right: "1rem",
				width: "300px",
				backgroundColor: "#fff",
				padding: "1rem",
				boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
				borderRadius: "4px",
			}}
		>
			<button onClick={handleUpload}>Post</button>
			<input type="file" onChange={handleChange} accept="/image/*" />
			<div style={{ maxHeight: "150px", overflowY: "auto" }}>
				{albumOptions.map((option) => (
					<label key={option.aid} style={{ display: "block" }}>
						<input
							type="radio"
							name="option"
							value={option.aid}
							onChange={handleRadioChange}
						/>
						{option.aname}
					</label>
				))}
			</div>
			<input
				type="text"
				value={caption}
				onChange={handleCaptionChange}
				placeholder="Add a caption"
			/>
		</div>
	);
}
export default UploadPhoto;

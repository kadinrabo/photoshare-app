import { useState, useEffect } from "react";
import { storage } from "../api/firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { fetchAlbumsBySearch } from "../api/albums";
import { createNewPhoto } from "../api/photos";

function UploadPhoto() {
	const [imgUrl, setImgUrl] = useState(null);
	const [progresspercent, setProgresspercent] = useState(0);
	const [albumOptions, setAlbumOptions] = useState([]);
	const [caption, setCaption] = useState("");
	const { v4: uuidv4 } = require("uuid");
	const [albumId, setAlbumId] = useState(null);
	const [selectedAlbum, setSelectedAlbum] = useState(false);

	const handleCaptionChange = (event) => {
		setCaption(event.target.value);
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

	const handleRadioChange = (event) => {
		setAlbumId(event.target.value);
		setSelectedAlbum(true);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const file = e.target[0]?.files[0];
		if (!file) {
			alert("Please upload an image first!");
			return;
		} else if (!albumOptions || !selectedAlbum) {
			alert("Please create and/or select an album first!");
			return;
		}
		const pdata = uuidv4();
		const storageRef = ref(storage, `files/${file.name}-${pdata}`);
		const uploadTask = uploadBytesResumable(storageRef, file);

		uploadTask.on(
			"state_changed",
			(snapshot) => {
				const progress = Math.round(
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100
				);
				setProgresspercent(progress);
				if (progress == 100) {
					setTimeout(() => {
						location.reload();
					}, 5000);
				}
			},
			(error) => {
				alert(error);
			},
			() => {
				getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
					setImgUrl(downloadURL);
					try {
						await createNewPhoto(albumId, pdata, caption);
					} catch (error) {
						console.log(error);
					}
				});
			}
		);
	};

	return (
		<div
			style={{
				display: "inline-block",
				boxShadow: "0 0 10px rgba(0,0,0,0.5)",
				borderRadius: "10px",
				padding: "20px",
			}}
		>
			<h1 style={{ maxWidth: "90%" }}>Photo Upload</h1>
			<div className="App">
				<input
					type="text"
					value={caption}
					onChange={handleCaptionChange}
					placeholder="Add a caption"
					style={{
						padding: "5px",
						border: "1px solid #ddd",
						borderRadius: "5px",
						marginBottom: "10px",
						maxWidth: "90%",
					}}
				/>
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
				<form onSubmit={handleSubmit} className="form">
					<input type="file" />
					<button type="submit">Upload</button>
				</form>
				{!imgUrl && (
					<div className="outerbar">
						<div className="innerbar">{progresspercent}%</div>
					</div>
				)}
				{imgUrl && <img src={imgUrl} alt="uploaded file" height={200} />}
			</div>
		</div>
	);
}
export default UploadPhoto;

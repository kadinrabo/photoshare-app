import React, { useState, useEffect } from "react";
import { fetchPhotosByAid } from "../api/photos";
import { ref, getDownloadURL, listAll } from "firebase/storage";
import { getStorage } from "firebase/storage";
import { fetchUserByAid } from "../api/users";
import { fetchDeleteAlbumByAid } from "../api/albums";

function Album({ album }) {
	const [photos, setPhotos] = useState([]);
	const imagesListRef = ref(getStorage(), "files/");
	const [user, setUser] = useState(null);
	const [imageUrl, setImageUrl] = useState(null);

	useEffect(() => {
		const getPhotos = async () => {
			const fetchedData = await fetchPhotosByAid(album.aid);
			setPhotos(fetchedData.photos);
		};
		getPhotos();
	}, [album.aid]);

	useEffect(() => {
		async function fetchUser() {
			const fetchedUser = await fetchUserByAid(album.aid);
			setUser(fetchedUser);
		}
		fetchUser();
	}, [album.aid]);

	const handleDeleteAlbum = async () => {
		await fetchDeleteAlbumByAid(album.aid);
		window.location.reload();
	};

	useEffect(() => {
		listAll(imagesListRef).then((response) => {
			response.items.forEach((item) => {
				getDownloadURL(item).then((url) => {
					photos.forEach((photo) => {
						if (url.toString().includes(photo.pdata)) {
							setImageUrl(url);
						}
					});
				});
			});
		});
	}, [photos, imagesListRef]);

	return (
		<div>
			<h1>{album.aname}</h1>
			{photos.length <= 0 ? (
				<p>No photos yet</p>
			) : (
				photos.map((photo) => (
					<img
						style={{ maxWidth: "30%", maxHeight: "40%" }}
						key={photo.pid}
						src={
							imageUrl && imageUrl.toString().includes(photo.pdata)
								? imageUrl
								: "image not loaded"
						}
						alt={photo.caption}
					/>
				))
			)}
			{user && user.uid == localStorage.getItem("uid") && (
				<button
					style={{
						backgroundColor: "red",
						color: "white",
						marginRight: "5px",
					}}
					onClick={handleDeleteAlbum}
				>
					Delete album
				</button>
			)}
		</div>
	);
}

export default Album;

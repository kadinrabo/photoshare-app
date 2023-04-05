import React, { useState, useEffect } from "react";
import { fetchPhotosByAid } from "../api";

function Album({ album }) {
	const [photos, setPhotos] = useState([]);

	useEffect(() => {
		const getPhotos = async () => {
			const fetchedData = await fetchPhotosByAid(album.aid);
			setPhotos(fetchedData.photos);
		};
		getPhotos();
	}, [album.aid]);

	return (
		<div>
			<h1>{album.aname}</h1>
			{photos.length <= 0 ? (
				<p>No photos yet</p>
			) : (
				photos.map((photo) => (
					<img
						style={{ maxWidth: "50%", maxHeight: "50%" }}
						key={photo.pid}
						src={photo.pdata}
						alt={photo.caption}
					/>
				))
			)}
		</div>
	);
}

export default Album;

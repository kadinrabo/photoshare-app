import Albums from "../models/Albums";

export async function fetchAllAlbums() {
	try {
		const response = await fetch(`http://localhost:8080/albums`);
		const data = await response.json();
		const albums = new Albums(data);
		return albums;
	} catch (error) {
		console.log(error);
	}
}

export async function fetchAlbumsBySearch(searchText) {
	try {
		const response = await fetch(`http://localhost:8080/albums/${searchText}`);
		const data = await response.json();
		const albums = new Albums(data);
		return albums;
	} catch (error) {
		console.log(error);
	}
}

export async function fetchAddAlbum(uid, aname) {
	const newAlbum = { uid, aname };
	try {
		await fetch("http://localhost:8080/albums", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newAlbum),
		});
	} catch (error) {
		console.error(error);
	}
}

export async function fetchDeleteAlbumByAid(aid) {
	try {
		await fetch(`http://localhost:8080/albums/aid=${aid}`, {
			method: "DELETE",
		});
	} catch (error) {
		console.error(error);
	}
}

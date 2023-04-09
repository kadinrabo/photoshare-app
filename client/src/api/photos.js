import Photos from "../models/Photos";

export async function fetchPhotosByTag(tag) {
	try {
		const response = await fetch(`http://localhost:8080/photos/${tag}`);
		const data = await response.json();
		const photos = new Photos(data);
		return photos;
	} catch (error) {
		console.log(error);
	}
}

export async function createNewPhoto(aid, pdata, caption) {
	const newPhoto = { aid, pdata, caption };
	try {
		await fetch("http://localhost:8080/photos", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newPhoto),
		});
	} catch (error) {
		console.error(error);
	}
}

export async function fetchDeletePhotoByPid(pid) {
	try {
		await fetch(`http://localhost:8080/photos/pid=${pid}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
		});
	} catch (error) {
		console.error(error);
	}
}

export async function fetchPhotosByUidTag(uid, tag) {
	try {
		const response = await fetch(
			`http://localhost:8080/photos/${uid}/${tag.substring(1)}`
		);
		const data = await response.json();
		const photos = new Photos(data);
		return photos;
	} catch (error) {
		console.log(error);
	}
}

export async function fetchPhotosByUidTags(tag) {
	const uid = localStorage.getItem("uid");
	try {
		const response = await fetch(
			`http://localhost:8080/photos/fix/${tag}/${uid}`
		);
		const data = await response.json();
		const photos = new Photos(data);
		return photos;
	} catch (error) {
		console.log(error);
	}
}

export async function fetchPhotosByUid(uid) {
	try {
		const response = await fetch(`http://localhost:8080/photos/uid=${uid}`);
		const data = await response.json();
		const photos = new Photos(data);
		return photos;
	} catch (error) {
		console.log(error);
	}
}

export async function fetchPhotosByAid(aid) {
	try {
		const response = await fetch(`http://localhost:8080/photos/aid=${aid}`);
		const data = await response.json();
		const photos = new Photos(data);
		return photos;
	} catch (error) {
		console.log(error);
	}
}

export async function fetchAllPhotos() {
	try {
		const response = await fetch(`http://localhost:8080/photos`);
		const data = await response.json();
		const photos = new Photos(data);
		return photos;
	} catch (error) {
		console.log(error);
	}
}

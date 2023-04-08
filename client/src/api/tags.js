import Tags from "../models/Tags";

export async function fetchAllTagsByUser(uid) {
	try {
		const response = await fetch(`http://localhost:8080/tags/${uid}`);
		const data = await response.json();
		const tags = new Tags(data);
		return tags;
	} catch (error) {
		console.log(error);
	}
}

export async function fetchAddTag(tag, pid) {
	const newTag = { tag };
	try {
		await fetch(`http://localhost:8080/tags/pid=${pid}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newTag),
		});
	} catch (error) {
		console.error(error);
	}
}

export async function fetchTagsByPid(pid) {
	try {
		const response = await fetch(`http://localhost:8080/tags/pid=${pid}`);
		const data = await response.json();
		const tags = new Tags(data);
		return tags;
	} catch (error) {
		console.log(error);
	}
}

export async function fetchUniqueTagsByUid(uid) {
	try {
		const response = await fetch(`http://localhost:8080/tags/uid=${uid}`);
		const data = await response.json();
		const tags = new Tags(data);
		return tags;
	} catch (error) {
		console.log(error);
	}
}

export async function deletePhotoBy(pid) {
	try {
		const response = await fetch(`http://localhost:8080/tags/pid=${pid}`);
		const data = await response.json();
		const tags = new Tags(data);
		return tags;
	} catch (error) {
		console.log(error);
	}
}

export async function fetchTop10PopularTags() {
	try {
		const response = await fetch(`http://localhost:8080/tags`);
		const data = await response.json();
		const tags = new Tags(data);
		return tags;
	} catch (error) {
		console.log(error);
	}
}

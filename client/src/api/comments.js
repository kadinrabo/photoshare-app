import Comments from "../models/Comments";

export async function fetchCommentsByPid(pid) {
	try {
		const response = await fetch(`http://localhost:8080/comments/pid=${pid}`);
		const data = await response.json();
		const comments = new Comments(data);
		return comments;
	} catch (error) {
		console.log(error);
	}
}

export async function fetchAddComment(uid, ctext, pid) {
	const newComment = { uid, ctext, pid };
	try {
		await fetch(`http://localhost:8080/comments/pid=${pid}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newComment),
		});
	} catch (error) {
		console.error(error);
	}
}

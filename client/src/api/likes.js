export async function fetchAddLikeByPid(pid, uid) {
	const newLike = { pid, uid };
	try {
		await fetch("http://localhost:8080/likes", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newLike),
		});
	} catch (error) {
		console.error(error);
	}
}

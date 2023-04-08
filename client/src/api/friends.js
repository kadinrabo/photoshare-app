import Users from "../models/Users";
import HasFriend from "../models/HasFriend";

export async function fetchAddFriend(uid, fid) {
	const newFriend = { uid, fid };
	try {
		await fetch("http://localhost:8080/friends", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newFriend),
		});
	} catch (error) {
		console.error(error);
	}
}

export async function fetchFollowingByUid(uid) {
	try {
		const response = await fetch(`http://localhost:8080/friends/uid=${uid}`);
		const data = await response.json();
		const friends = new Users(data);
		return friends;
	} catch (error) {
		console.log(error);
	}
}

export async function fetchFolllowersByUid(uid) {
	try {
		const response = await fetch(`http://localhost:8080/friends/uidf=${uid}`);
		const data = await response.json();
		const friends = new Users(data);
		return friends;
	} catch (error) {
		console.log(error);
	}
}

export async function fetchHasFriendByUidFid(uid, fid) {
	try {
		const response = await fetch(`http://localhost:8080/friends/${uid}/${fid}`);
		const data = await response.json();
		if (data[0]) {
			const hasFriend = new HasFriend(data[0]);
			return hasFriend;
		} else {
			return null;
		}
	} catch (error) {
		console.log(error);
	}
}

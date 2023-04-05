import Photos from "./models/Photos";
import User from "./models/User";
import Users from "./models/Users";
import Albums from "./models/Albums";
import Comments from "./models/Comments";
import Tags from "./models/Tags";
import HasFriend from "./models/HasFriend";

export async function fetchUsersBySearch(searchText) {
	try {
		const response = await fetch(`http://localhost:8080/users/${searchText}`);
		const data = await response.json();
		// One user is being searched for
		if (/^\d+$/.test(searchText) || /^\S+@\S+\.\S+$/.test(searchText)) {
			const user = new User(data[0]);
			return user;
		}
		// Multiple user query
		else {
			const users = new Users(data);
			return users;
		}
	} catch (error) {
		console.log(error);
	}
}

export async function fetchUserByPid(pid) {
	try {
		const response = await fetch(`http://localhost:8080/users/pid=${pid}`);
		const data = await response.json();
		const user = new User(data[0]);
		return user;
	} catch (error) {
		console.log(error);
	}
}

export async function fetchLikersByPid(pid) {
	try {
		const response = await fetch(
			`http://localhost:8080/users/haslikepid=${pid}`
		);
		const data = await response.json();
		const users = new Users(data);
		return users;
	} catch (error) {
		console.log(error);
	}
}

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

export async function fetchAddFriend(uid, fid) {
	// uid is the uid of the currently logged in user (localStorage)
	// fid must be the uid of the user being friended
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
	// Actual uid (from localStorage). For the list of friends
	try {
		const response = await fetch(`http://localhost:8080/friends/uid=${uid}`);
		const data = await response.json();
		const friends = new Users(data);
		return friends;
	} catch (error) {
		console.log(error);
	}
}

export async function fetchFollowedByUidF(uid) {
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
	// uid is the uid of the currently logged in user (localStorage)
	// fid is the uid of the user we're checking if they're friends with
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

export async function createNewUser(
	email,
	fname,
	lname,
	pass,
	dob,
	gender,
	home
) {
	const newUser = { email, fname, lname, pass, dob, gender, home };
	try {
		await fetch("http://localhost:8080/users", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newUser),
		});
	} catch (error) {
		console.error(error);
	}
}

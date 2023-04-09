import Users from "../models/Users";
import User from "../models/User";
import MayLikePhotos from "../models/MayLikePhotos";
import bcrypt from "bcryptjs";

export async function fetchUsersBySearch(searchText) {
	try {
		const response = await fetch(`http://localhost:8080/users/${searchText}`);
		const data = await response.json();
		if (!data || data.length == 0) {
			return null;
		}
		if (/^\d+$/.test(searchText) || /^\S+@\S+\.\S+$/.test(searchText)) {
			const user = new User(data[0]);
			return user;
		} else {
			const users = new Users(data);
			return users;
		}
	} catch (error) {
		console.log(error);
	}
}

export async function fetchAllUsers() {
	try {
		const response = await fetch(`http://localhost:8080/users/all=all`);
		const data = await response.json();
		const users = new Users(data);
		return users;
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

export async function fetchUserByAid(aid) {
	try {
		const response = await fetch(`http://localhost:8080/users/aid=${aid}`);
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

export async function fetchUserRecommendationsByUid(uid) {
	try {
		const response = await fetch(`http://localhost:8080/users/uid=${uid}`);
		const data = await response.json();
		const users = new Users(data);
		return users;
	} catch (error) {
		console.log(error);
	}
}

export async function fetchPhotosMayLikeByUid(uid) {
	try {
		const response = await fetch(
			`http://localhost:8080/users/maylikeuid=${uid}`
		);
		const data = await response.json();
		const photos = new MayLikePhotos(data);
		return photos;
	} catch (error) {
		console.log(error);
	}
}

export async function fetchUpdateUserByUid(uid, uData) {
	try {
		await fetch(`http://localhost:8080/users/uid=${uid}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(uData),
		});
	} catch (error) {
		console.error(error);
	}
}

export async function createNewUser(
	email,
	fname,
	lname,
	passw,
	dob,
	gender,
	home
) {
	const pass = bcrypt.hashSync(passw, 10);
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

export async function fetchTop10CScore() {
	try {
		const response = await fetch(`http://localhost:8080/users`);
		const data = await response.json();
		const tags = new Users(data);
		return tags;
	} catch (error) {
		console.log(error);
	}
}

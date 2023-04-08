import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { fetchUsersBySearch } from "../api/users";

function Auth(Component) {
	return function AuthenticatedComponent(props) {
		const [user, setUser] = useState(null);
		const history = useHistory();

		useEffect(() => {
			const uid = window.localStorage.getItem("uid");
			async function fetchUserData() {
				const fetchedUser = await fetchUsersBySearch(uid);
				setUser(fetchedUser);
			}
			if (!uid) {
				history.push("/");
			} else {
				fetchUserData();
			}
		}, [history]);

		if (!user) {
			return <div>Loading...</div>;
		}

		return <Component {...props} />;
	};
}

export default Auth;

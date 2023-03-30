import User from "./User";

class Users {
	constructor(usersData) {
		this.users = usersData.map((userData) => new User(userData));
	}
}

export default Users;

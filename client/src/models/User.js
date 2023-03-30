class User {
	constructor(data) {
		this.uid = data.uid;
		this.email = data.email;
		this.fname = data.fname;
		this.lname = data.lname;
		this.pass = data.pass;
		this.dob = data.dob;
		this.gender = data.gender || null;
		this.home = data.home || null;
	}
}

export default User;

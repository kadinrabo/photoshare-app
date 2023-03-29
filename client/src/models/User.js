class User {
  constructor(data) {
    this.uid = data.uid || (() => {throw new Error('uid is required!')})();
    this.email = data.email || (() => {throw new Error('email is required!')})();
    this.fname = data.fname || (() => {throw new Error('fname is required!')})();
    this.lname = data.lname || (() => {throw new Error('lname is required!')})();
    this.pass = data.pass || (() => {throw new Error('pass is required!')})();
    this.dob = data.dob || (() => {throw new Error('dob is required!')})();
    this.gender = data.gender || null;
    this.home = data.home || null;
  }
}

export default User;
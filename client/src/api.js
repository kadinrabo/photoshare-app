import User from './models/User';
import Users from './models/Users';

export async function fetchUsersBySearch(searchText)
{
  try {
    const response = await fetch(`http://localhost:8080/users/${searchText}`)
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

export async function createNewUser(email, fname, lname, pass, dob, gender, home) {
  const newUser = { email, fname, lname, pass, dob, gender, home };
  try {
    await fetch('http://localhost:8080/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUser)
    });
  } catch (error) {
    console.error(error);
  }
}
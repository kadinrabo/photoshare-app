import User from './models/User';

async function fetchUser(userId) {
  try {
    // get the response
    const response = await fetch(`http://localhost:8080/users/${userId}`);
    // wait for the promise containing the data
    const data = await response.json();
    const user = new User(data);
    return user;
  } catch (error) {
    console.error(error);
  }
}

export default fetchUser;

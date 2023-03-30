import User from './models/User';

export async function fetchUserByUid(userId) {
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

export async function fetchUserByEmail(userEmail) {
  try {
    // get the response
    const response = await fetch(`http://localhost:8080/users/${userEmail}`);
    // wait for the promise containing the data
    const data = await response.json();
    const user = new User(data);
    return user;
  } catch (error) {
    console.error(error);
  }
}

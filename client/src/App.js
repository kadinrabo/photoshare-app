import React, { useEffect, useState } from "react";
import './App.css';
import fetchUser from './api';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUserData() {
      const fetchedUser = await fetchUser(1);
      setUser(fetchedUser);
    }

    fetchUserData();
  }, []);

  return (
    <div>
      {user && (
        <div>
          <h1>Uid: {user.uid}</h1>
          <p>First Name: {user.fname}</p>
          <p>Last Name: {user.lname}</p>
        </div>
      )}
    </div>
  );
}

export default App;

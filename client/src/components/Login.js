import React, { useEffect, useState } from 'react';
import fetchUser from '../api';

function Login() {
    const [user, setUser] = useState(null);
    
    useEffect(() => {
        async function fetchUserData() {
            const fetchedUser = await fetchUser(1);
            setUser(fetchedUser);
        }

        fetchUserData();
    }, []);

    const [text, setText] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(`Submitted text: ${text}`);
        window.localStorage.setItem('uid', text);
        const data = JSON.parse(localStorage.getItem('uid'));
        console.log(`Local storage has user uid: ${data}`);
  }
  const handleChange = (event) => {
    setText(event.target.value);
  }

    return (
        <div>
            <h1>Login page here</h1>
            {user ? (<p>Api active!</p>) : (<p>Api broken?</p>)}
            <form onSubmit={handleSubmit}>
                <label> Enter some text: <input type="text" value={text} onChange={handleChange} />
                </label>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default Login;
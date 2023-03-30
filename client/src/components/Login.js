import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { fetchUserByEmail } from '../api';

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const history = useHistory();

    useEffect(() => {
        async function fetchUserData() {
            const fetchedUser = await fetchUserByEmail(email);
            setUser(fetchedUser);
        }
        if (formSubmitted && email && password) {
            fetchUserData();
        }
    }, [formSubmitted, email, password]);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (email !== '' && password !== '') {
            setFormSubmitted(true);
        }
    };

    useEffect(() => {
        if (user !== null && user.pass === password) {
            history.push('/home');
            window.localStorage.setItem('uid', user.uid);
        }
    }, [user, password]);

    return (
        <div>
            <h1>Photoshare App</h1>
            <h2>Login:</h2>
            <form onSubmit={handleSubmit}>
                <label> Email:
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </label>
                <br />
                <label> Password:
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
                <br />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default Login;

import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { fetchUsersBySearch } from '../api';

function Login() {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [user, setUser] = useState(null);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const history = useHistory();

    useEffect(() => {
        async function fetchUserData() {
            const fetchedUser = await fetchUsersBySearch(email);
            setUser(fetchedUser);
        }
        if (formSubmitted && email && pass) {
            fetchUserData();
        }
    }, [formSubmitted, email, pass]);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (email !== '' && pass !== '') {
            setFormSubmitted(true);
        }
    };

    const handleSignUp = () => {
        history.push('/signup');
    };

    useEffect(() => {
        if (user !== null && user.pass === pass) {
            history.push('/home');
            window.localStorage.setItem('uid', user.uid);
        }
    }, [user, pass]);

    return (
        <div>
            <h1>Photoshare App</h1>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <label> Email:
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </label>
                <br />
                <label> Password:
                    <input type="pass" value={pass} onChange={(e) => setPass(e.target.value)} />
                </label>
                <br />
                <button type="submit">Sign In</button>
                <button type="button" onClick={handleSignUp}>Sign Up</button>
            </form>
        </div>
    );
}

export default Login;

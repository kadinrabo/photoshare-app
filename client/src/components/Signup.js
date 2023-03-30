import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { createNewUser, fetchUserByEmail } from '../api';

function Signup() {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [user, setUser] = useState(null);
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [dob, setDob] = useState('');
    const [gender, setGender] = useState('');
    const [home, setHome] = useState('');
    const [formSubmitted, setFormSubmitted] = useState(false);
    const history = useHistory();
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    useEffect(() => {
        async function createUserData() {
            // Create the user
            await createNewUser(email, fname, lname, pass, dob, gender, home);
            // Fetch the user
            const fetchedUser = await fetchUserByEmail(email);
            setUser(fetchedUser);
        }
        if (formSubmitted && fname && lname && dob && email && pass) {
            createUserData();
        }
    }, [formSubmitted, fname, lname, dob, email, pass]);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (fname !== '' && lname !== '' && dob !== '' && email !== '' && pass !== '' && regex.test(dob) && emailRegex.test(email)) {
            setFormSubmitted(true);
        }
    };

    const handleLogIn = () => {
        history.push('/');
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
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <label> First name:
                    <input type="fname" value={fname} onChange={(e) => setFname(e.target.value)} />
                </label>
                <br />
                <label> Last name:
                    <input type="lname" value={lname} onChange={(e) => setLname(e.target.value)} />
                </label>
                <br />
                <label> Date of birth (YYYY-MM-DD):
                    <input type="dob" value={dob} onChange={(e) => setDob(e.target.value)} />
                </label>
                <br />
                <br />
                <label> Gender:
                    <input type="gender" value={gender} onChange={(e) => setGender(e.target.value)} />
                </label>
                <br />
                <br />
                <label> Hometown: 
                    <input type="home" value={home} onChange={(e) => setHome(e.target.value)} />
                </label>
                <br />
                <label> Email:
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </label>
                <br />
                <label> Password:
                    <input type="pass" value={pass} onChange={(e) => setPass(e.target.value)} />
                </label>
                <br />
                <button type="submit">Sign Up</button>
                <button type="button" onClick={handleLogIn}>Log In</button>
            </form>
        </div>
    );
}

export default Signup;
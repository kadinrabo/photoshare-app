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

    return (
        <div>
            <h1>Login page here</h1>
            {user ? (<p>Api active!</p>) : (<p>Api broken?</p>)}
        </div>
    );
}

export default Login;
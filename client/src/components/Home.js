import React, { useEffect, useState } from 'react';
import { fetchUserByUid } from '../api';
import Auth from './Auth';

function Home() {
    const [user, setUser] = useState(null);
    
    useEffect(() => {
        async function fetchUserData() {
            const fetchedUser = await fetchUserByUid(1);
            setUser(fetchedUser);
        }

        fetchUserData();
    }, []);

    return (
        <div>
            <h1>Welcome to home!</h1>
            {user ? (<p>Api active!</p>) : (<p>Api broken?</p>)}
        </div>
    );
}

export default Auth(Home);
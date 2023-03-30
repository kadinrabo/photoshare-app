import React, { useEffect, useState } from 'react';
import { fetchUserByUid } from '../api';

function Signup() {
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
            <h1>Sign up page here</h1>
            {user ? (<p>Api active!</p>) : (<p>Api broken?</p>)}
        </div>
    );
}

export default Signup;
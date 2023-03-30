import React, { useEffect, useState } from 'react';
import { fetchUserByUid } from '../api';
import Auth from './Auth';
import Navbar from './Navbar';

function Home() {
    return (
        <>
            <Navbar/>
            <h1> Home </h1>
        </>
    );
}

export default Auth(Home);
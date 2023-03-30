import React, { useEffect, useState } from 'react';
import { fetchUserByUid } from '../api';
import Auth from './Auth';
import Navbar from './Navbar';

function Profile() {
    return (
        <>
            <Navbar/>
            <h1> Profile </h1>
        </>
    );
}

export default Auth(Profile);
import React, { useEffect, useState } from 'react';
import Auth from './Auth';
import Navbar from './Navbar';
import Popup from './Popup';
import Searcher from './Searcher';

function Home() {
    const [showPopup, setShowPopup] = useState(false);
    const handleShowPopup = () => {
        setShowPopup(true);
    };
    const handleClosePopup = () => {
        setShowPopup(false);
    };

    return (
        <>
            <Navbar/>
            <h1 style={{padding: '20px'}}> Home </h1>
            <div style={{padding: '20px'}}>
                <Searcher />
            </div>
        </>
    );
}

export default Auth(Home);
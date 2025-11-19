import React, { useState, useRef, useEffect } from "react";
import './friendReviews.css';

function FriendReviews(){
    const username = localStorage.getItem("username");
    
    return(
        <div className="welcomeHeader">
            <span id="welcomeMessage" >Welcome Back <a href="/profile">{username}</a>, here is what your friends have been watching</span>
        </div>
    );
}

export default FriendReviews;
import React, { useState, useRef, useEffect } from "react";
import './friendReviews.css';

function FriendReviews(){
    return(
        <div className="outWelcomeHeader">
            <span id="outWelcomeMessage"><a href="/login">Sign In/Register</a> to See Your Friend's Reviews</span>
        </div>
    );
}

export default FriendReviews;
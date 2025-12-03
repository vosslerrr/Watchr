import React, { useState, useRef, useEffect } from "react";
import './welcomeMessage.css';

function WelcomeMessage(){
    return(
        <div className="outWelcomeHeader">
            <span id="outWelcomeMessage"><a href="/login">Sign In/Register</a> to See Your Friend's Reviews</span>
        </div>
    );
}

export default WelcomeMessage;
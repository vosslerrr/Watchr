import "./UserInfo.css"
import React, { useState, useEffect } from 'react';
import { getUserDetails } from "../../../../utils/api";
import { useParams } from "react-router-dom";

function UserInfo(){
    const { username } = useParams();
    const [numFollowers, setNumFollowers] = useState('');
    const [numFollowing, setNumFollowing] = useState('');
    
    useEffect(() => {
        async function load(){
            const res = await getUserDetails(username);

            setNumFollowers(res.followers.length);
            setNumFollowing(res.following.length);
        }
        
        load();
    }, []);

    return(
        <div className="UserInfo">
            <img id="avatar" src="/user-default.png" />
            <span id="username">{username}</span>
            <span className="avgRating">
                <span id="avgNum">9.5</span>
                <span id="avgText">Avg Rating</span>   
            </span>
            <span className="followers">
                <span id="numFollowers">{numFollowers}</span>
                <span id="textFollowers">Followers</span>
            </span>
            <span className="following">
                <span id="numFollowing">{numFollowing}</span>
                <span id="textFollowing">Following</span>
            </span>
        </div>
    );
}

export default UserInfo;
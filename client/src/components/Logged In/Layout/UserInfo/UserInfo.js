import "./UserInfo.css"
import React, { useState, useEffect } from 'react';
import { getUserDetails, getUserReviews, putNewUsername } from "../../../../utils/api";
import { useParams } from "react-router-dom";

function UserInfo(){
    const { username } = useParams();
    const [numFollowers, setNumFollowers] = useState('');
    const [numFollowing, setNumFollowing] = useState('');
    const [ratings, setRatings] = useState(0);
    const [count, setCount] = useState(0);
    
    useEffect(() => {
        async function load(){
            const res = await getUserDetails(username);

            setNumFollowers(res.followers.length);
            setNumFollowing(res.following.length);

            const reviews = await getUserReviews(username);

            var totalRating = 0;
            reviews.map(review => {
                totalRating += review.rating;
            })

            setRatings(totalRating);
            setCount(reviews.length);
        }
        
        load();
    }, []);


    return(
        <div className="UserInfo">
            <img id="avatar" src="/user-default.png" />
            <div className="usernameLayout">
                <span id="username">{username}</span>
                <img id="editIcon" src="/edit-icon.png"></img>
            </div>

            <div className="avgRating">
                <span id="avgNum">{(ratings/count).toFixed(2)}<img src="/rating-star.png"></img></span>
                <span id="avgText">Avg Rating</span>   
            </div>

            <div className="followers">
                <span id="numFollowers">{numFollowers}</span>
                <span id="textFollowers">Followers</span>
            </div>

            <div className="following">
                <span id="numFollowing">{numFollowing}</span>
                <span id="textFollowing">Following</span>
            </div>
            
        </div>
    );
}

export default UserInfo;
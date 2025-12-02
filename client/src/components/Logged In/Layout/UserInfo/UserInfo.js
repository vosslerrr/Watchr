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
    const [popupOpen, setPopupOpen] = useState(false);
    const [newusername, setNewUsername] = useState('');
    
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

    const closePopup = () => {
        setPopupOpen(false);
        setNewUsername('');
    };

    const onChange = e => setNewUsername(e.target.value);

    const onSubmit = async e => {
        e.preventDefault();

        if(username == newusername){ return window.alert("Same username."); }

        const res = await putNewUsername(username, newusername);

        if(res.msg){ return window.alert("Username taken"); }

        localStorage.setItem('username', newusername);
        window.location.href = '/'; 
    };

    return(
        <div className="UserInfo">
            <img id="avatar" src="/user-default.png" />
            <div className="usernameLayout">
                <span id="username">{username}</span>
                <a href="#" id="editIcon" onClick={() => setPopupOpen(true)}>
                    <img src="/edit-icon.png"></img>
                </a>
            </div>

            <div className={popupOpen ? "edit-username-open" : "edit-username"}>
                <button type="button" id="exitButtonUsername" onClick={closePopup}>x</button>
                <form className="newUsernameForm" onSubmit={onSubmit}>
                    <input type="text" name="newusername" value={newusername} onChange={onChange} required></input>
                    <input type="submit"></input>
                </form>
            </div>

            <div id="leftSide">
                <div className="avgRating">
                    <span id="avgNum">
                        {(ratings/count).toFixed(2)}
                        <img src="/rating-star.png"></img>
                    </span>
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
            
        </div>
    );
}

export default UserInfo;
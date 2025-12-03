import "./UserInfo.css"
import React, { useState, useEffect } from 'react';
import { getUserDetails, getUserReviews, putNewUsername } from "../../../../utils/api";
import { useParams } from "react-router-dom";

function UserInfo(){
    const { username } = useParams();
    const [avatarURL, setAvatarURL] = useState('');
    const [numFollowers, setNumFollowers] = useState('');
    const [numFollowing, setNumFollowing] = useState('');
    const [ratings, setRatings] = useState(0);
    const [count, setCount] = useState(0);
    const [editpopupOpen, setEditPopupOpen] = useState(false);
    const [newusername, setNewUsername] = useState('');
    const [avatarpopupOpen, setAvatarPopupOpen] = useState(false);
    const [currAvatar, setCurrAvatar] = useState('');
    const [newAvatar, setNewAvatar] = useState('');
    
    useEffect(() => {
        async function load(){
            const res = await getUserDetails(username);

            setAvatarURL(res.avatarURL);
            setCurrAvatar(res.avatarURL);
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

    const closeEditPopup = () => {
        setEditPopupOpen(false);
        setNewUsername('');
    };

    const closeAvatarPopup = () => {
        setAvatarPopupOpen(false);
        setNewAvatar('');
        setCurrAvatar(avatarURL);
    };

    const onChange = e => setNewUsername(e.target.value);

    const onSubmitUsername = async e => {
        e.preventDefault();

        if(username == newusername){ return window.alert("Same username."); }

        const res = await putNewUsername(username, newusername);

        if(res.msg){ return window.alert("Username taken"); }

        localStorage.setItem('username', newusername);
        window.location.href = '/'; 
    };

    const onSubmitAvatar = async e => {
        e.preventDefault();
    };

    return(
        <div className="UserInfo">
            <a href="#" id="changeAvatar" onClick={() => setAvatarPopupOpen(true)}>
                <img id="avatar" src={avatarURL}/>
            </a>

            <div className="usernameLayout">
                <span id="username">{username}</span>
                <a href="#" id="editIcon" onClick={() => setEditPopupOpen(true)}>
                    <img src="/edit-icon.png"></img>
                </a>
            </div>
            
            <div className={editpopupOpen ? "edit-username-open" : "edit-username"}>
                <button type="button" id="exitButtonUsername" onClick={closeEditPopup}>x</button>
                <form className="newUsernameForm" onSubmit={onSubmitUsername}>
                    <input type="text" name="newusername" value={newusername} onChange={onChange} required></input>
                    <input type="submit"></input>
                </form>
            </div>
     
            <div className={avatarpopupOpen ? "change-avatar-open" : "change-avatar"}>
                <button type="button" id="exitButtonAvatar" onClick={closeAvatarPopup}>x</button>
                <form className="newAvatarForm" onSubmit={onSubmitAvatar}>
                    <img id="popupAvatar" src={currAvatar}></img>
                    <input type="file" name="avatarFile" id="avatarFile" value={newAvatar} required></input>
                    <input type="submit" id="avatarSubmit"></input>
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
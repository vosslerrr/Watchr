import "./UserInfo.css"
import React, { useState, useEffect } from 'react';
import { getUserDetails, getUserReviews, postNewAvatar, putNewUsername, putNewFollower, putRemoveFollower } from "../../../../utils/api";
import { useParams } from "react-router-dom";
import { Navigate, useNavigate } from "react-router";

function UserInfo(){
    const { username } = useParams();
    const navigate = useNavigate();
    const [avatarURL, setAvatarURL] = useState('');
    const [numFollowers, setNumFollowers] = useState('');
    const [numFollowing, setNumFollowing] = useState('');
    const [ratings, setRatings] = useState(0);
    const [count, setCount] = useState(0);
    const [editpopupOpen, setEditPopupOpen] = useState(false);
    const [newusername, setNewUsername] = useState('');
    const [avatarpopupOpen, setAvatarPopupOpen] = useState(false);
    const [currAvatar, setCurrAvatar] = useState(null);
    const [newAvatar, setNewAvatar] = useState(null);
    const [currUser, setCurrUser] = useState(true);
    const [isFollowing, setIsFollowing] = useState(false);
    
    useEffect(() => {
        async function load(){
            const res = await getUserDetails(username);
            const loggedInUserDetails = await getUserDetails(localStorage.getItem("username"));

            setAvatarURL(res.avatarURL);
            setCurrAvatar(res.avatarURL);
            setNumFollowers(res.followers.length);
            setNumFollowing(res.following.length);

            if(res.followers.includes(loggedInUserDetails._id)){ setIsFollowing(true); }

            const reviews = await getUserReviews(username);

            var totalRating = 0;
            reviews.map(review => {
                totalRating += review.rating;
            })

            setRatings(totalRating);
            setCount(reviews.length);

            if(username != localStorage.getItem("username")){ setCurrUser(false); }
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

    const onEditChange = e => setNewUsername(e.target.value);

    const onAvatarChange = e => {
        setNewAvatar(e.target.files[0]); 
        setCurrAvatar(URL.createObjectURL(e.target.files[0]));
    };

    const onSubmitUsername = async e => {
        e.preventDefault();

        if(username == newusername){ return window.alert("Same username."); }

        const res = await putNewUsername(username, newusername);

        if(res.msg){ return window.alert("Username taken"); }

        localStorage.setItem('username', newusername);
        window.location.reload(); 
    };

    const onSubmitAvatar = async e => {
        e.preventDefault();

        if (!newAvatar) return alert("No file selected.");

        await postNewAvatar(username, newAvatar);

        setNewAvatar(null);
        document.getElementById("avatarFile").value = "";

        window.location.reload();
    };

    const followUser = async (target) => {
        await putNewFollower(localStorage.getItem("username"), target);
        window.location.reload();
    }

    const unfollowUser = async (target) => {
        await putRemoveFollower(localStorage.getItem("username"), target);
        window.location.reload();
    }

    const goToFollower = () => navigate(`/user/${username}/followers`);
    const goToFollowing = () => navigate(`/user/${username}/following`);

    return(
        <>
        {currUser ? (
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
                        <input type="text" name="newusername" value={newusername} onChange={onEditChange} required></input>
                        <input type="submit"></input>
                    </form>
                </div>
        
                <div className={avatarpopupOpen ? "change-avatar-open" : "change-avatar"}>
                    <button type="button" id="exitButtonAvatar" onClick={closeAvatarPopup}>x</button>
                    <form className="newAvatarForm" onSubmit={onSubmitAvatar}>
                        <img id="popupAvatar" src={currAvatar}></img>
                        <input type="file" name="avatar" id="avatarFile" accept="image/*" onChange={onAvatarChange} required></input>
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
                        <span id="numFollowers" onClick={() => goToFollower()}>{numFollowers}</span>
                        <span id="textFollowers" onClick={() => goToFollower()}>Followers</span>
                    </div>

                    <div className="following">
                        <span id="numFollowing" onClick={() => goToFollowing()}>{numFollowing}</span>
                        <span id="textFollowing" onClick={() => goToFollowing()}>Following</span>
                    </div>
                </div>
                
            </div>
        ) : (
            <div className="currUserInfo">
                <a id="currchangeAvatar">
                    <img id="curravatar" src={avatarURL}/>
                </a>

                <div className="currusernameLayout">
                    <span id="currusername">{username}</span>
                    {isFollowing ? (
                        <a onClick={(e) => {unfollowUser(username)}}>
                            <img id="unfollowButton" src="/unfollowButton.png"></img>
                        </a> 
                    ) : (
                        <a onClick={(e) => {followUser(username)}}>
                            <img id="followButton" src="/followButton.png"></img>
                        </a>
                    )}
                </div>

                <div id="currleftSide">
                    <div className="curravgRating">
                        <span id="curravgNum">
                            {((ratings/count) || 0).toFixed(2)}
                            <img src="/rating-star.png"></img>
                        </span>
                        <span id="curravgText">Avg Rating</span>   
                    </div>

                    <div className="currfollowers">
                        <span id="currnumFollowers" onClick={() => goToFollower()}>{numFollowers}</span>
                        <span id="currtextFollowers" onClick={() => goToFollower()}>Followers</span>
                    </div>

                    <div className="currfollowing">
                        <span id="currnumFollowing" onClick={() => goToFollowing()}>{numFollowing}</span>
                        <span id="currtextFollowing" onClick={() => goToFollowing()}>Following</span>
                    </div>
                </div>
                        
            </div>
        )}
        </>  
    );
}

export default UserInfo;
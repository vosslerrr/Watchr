import './followingList.css';
import { getUserDetails, getFollowingUsers } from "../../../../utils/api"
import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

function FollowingList(){
    const { username } = useParams();
    const currUser = localStorage.getItem("username");
    const navigate = useNavigate();
    const [friends, setFriends] = useState([]);
    const [friendAvatars, setFriendAvatars] = useState([]);

    useEffect(() => {
        async function loadFriends(){
            const res = await getFollowingUsers(username);

            setFriends(res);
        }

        loadFriends();
    }, [username]);

    useEffect(() => {
        async function loadFriendAvatars(){
            const avatarPromises = friends.map(async (user) => {
                const res = await getUserDetails(user);
                return res.avatarURL;
            });

            const avatarArray = await Promise.all(avatarPromises);

            setFriendAvatars(avatarArray);
        }

        loadFriendAvatars();
    }, [friends]);

    const goToProfile = (username) => navigate(`/user/${username}`);

    return(
        <div className="FollowingList">
            <h2 id="followingHeader">Following</h2>

            <div className="followingWrapper">
                {friends.length === 0 ? (
                    username === currUser ? (
                        <div className="noFollowing">You are not following anyone</div>
                    ) : (
                        <div className="noFollowing">This user is not following anyone</div>
                    )
                ) : (
                    friends.map((friend, index) => (
                        <div className="followingLayout">
                            <img className="friendAvatar" src={friendAvatars[index]} onClick={() => goToProfile(friend)}></img>
                            <span className="friendUsername" onClick={() => goToProfile(friend)}>{friend}</span>
                        </div>
                    )
                ))}
            </div>
        </div>
    );
}

export default FollowingList;
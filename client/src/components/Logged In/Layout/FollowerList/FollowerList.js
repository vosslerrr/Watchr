import './followerList.css';
import { getUserDetails, getFollowerUsers } from "../../../../utils/EC2api"
import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

function FollowerList(){
    const { username } = useParams();
    const currUser = localStorage.getItem("username");
    const navigate = useNavigate();
    const [friends, setFriends] = useState([]);
    const [friendAvatars, setFriendAvatars] = useState([]);

    useEffect(() => {
        async function loadFriends(){
            const res = await getFollowerUsers(username);

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
        <div className="FollowerList">
            <h2 id="followerHeader">Followers</h2>

            <div className="followerWrapper">
                {friends.length === 0 ? (
                    username === currUser ? (
                        <div className="noFollowers">No one is following you</div>
                    ) : (
                        <div className="noFollowers">This user has no followers</div>
                    )
                ) : (
                    friends.map((friend, index) => (
                        <div className="followerLayout">
                            <img className="followerAvatar" src={friendAvatars[index]} onClick={() => goToProfile(friend)}></img>
                            <span className="followerUsername" onClick={() => goToProfile(friend)}>{friend}</span>
                        </div>
                    )
                ))}
            </div>
        </div>
    );
}

export default FollowerList;
import "./UserInfo.css"

function UserInfo(){
    return(
        <div className="UserInfo">
            <img id="avatar" src="DOG.png" />
            <span id="username">Username</span>
            <span className="avgRating">
                <span id="avgNum">9.5</span>
                <span id="avgText">Avg Rating</span>   
            </span>
            <span className="followers">
                <span id="numFollowers">10</span>
                <span id="textFollowers">Followers</span>
            </span>
            <span className="following">
                <span id="numFollowing">10</span>
                <span id="textFollowing">Following</span>
            </span>
        </div>
    );
}

export default UserInfo;
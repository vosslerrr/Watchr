import "./userReviews.css"; 

function UserReviews(){
    return(
        <div className="UserReviews">
            <div className="Header">
                <span id="reviewHeader">Recent Reviews</span>
                <a id="seeAll" href="/">See All</a>
            </div>
        </div>
    );
}

export default UserReviews;
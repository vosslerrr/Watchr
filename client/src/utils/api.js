export async function getPopularMovies() {
    const res = await fetch("http://localhost:5000/routes/tmdb/popular");
    return res.json();
}

export async function getUpcomingMovies() {
    const res = await fetch("http://localhost:5000/routes/tmdb/upcoming");
    return res.json();
}

export async function getMovieDetails(movie_id){
    const res = await fetch(`http://localhost:5000/routes/tmdb/details/${movie_id}`);
    return res.json();
}

export async function getMovieCredits(movie_id){
    const res = await fetch(`http://localhost:5000/routes/tmdb/credits/${movie_id}`);
    return res.json();
}

export async function logInUser(username, password){
    const res = await fetch("http://localhost:5000/routes/auth/login", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });
    return res.json();
}

export async function registerUser(username, password){
    const res = await fetch("http://localhost:5000/routes/auth/register", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });
    return res.json();
}

export async function getUserDetails(username){
    const res = await fetch(`http://localhost:5000/routes/user/details/${username}`);
    return res.json();
}

export async function postUserReview(username, movie_id, reviewPara, rating){
    const res = await fetch(`http://localhost:5000/routes/user/newreview/${username}/${movie_id}`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reviewPara, rating })
    });
    return res.json();
}

export async function searchMovies(query) {
    if(!query) return [];
    const res = await fetch(`http://localhost:5000/routes/tmdb/search/${query}`);
    const data = await res.json();
    return data;
}

export async function searchUsers(currentUser, query) {
    if (!query) return [];
    const res = await fetch(
        `http://localhost:5000/routes/user/search/${currentUser}/${query}`
    );
    return res.json();
}
export async function getUserReviews(username){
    const res = await fetch(`http://localhost:5000/routes/user/reviews/${username}`);
    return res.json();
}

import React, { useState, useRef, useEffect } from "react";
import "./navBar.css";
import { useNavigate } from "react-router";
import { searchMovies, getMovieCredits, searchUsers, getUserDetails } from "../../../../utils/api";
import { Link } from "react-router-dom";

function NavBar() {
    const [isOpen, setIsOpen] = useState(false);
    const profRef = useRef(null);

    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);

    const dropdownRef = useRef(null);
    const inputRef = useRef(null);
    const modeDropdownRef = useRef(null);

    const [searchMode, setSearchMode] = useState("movies");
    const [modeDropdownOpen, setModeDropdownOpen] = useState(false);

    const navigate = useNavigate();
    const username = localStorage.getItem("username");
    const [avatarURL, setAvatarURL] = useState('');

    useEffect(() => {
        async function load(){
            const res = await getUserDetails(username);

            setAvatarURL(res.avatarURL);
        }

        load();
    }, []);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (profRef.current && !profRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        const delayDebounce = setTimeout(async () => {
            if (query.trim().length === 0) {
                setResults([]);
                return;
            }

            if (searchMode === "users") {
                const users = await searchUsers(username, query);
                setResults(users);
                return;
            }

            let movies = await searchMovies(query);
            const q = query.toLowerCase();

            movies.sort((a, b) => {
                const aT = a.title?.toLowerCase() || "";
                const bT = b.title?.toLowerCase() || "";

                if (aT === q && bT !== q) return -1;
                if (aT !== q && bT === q) return 1;

                if (aT.startsWith(q) && !bT.startsWith(q)) return -1;
                if (!aT.startsWith(q) && bT.startsWith(q)) return 1;

                if (aT.includes(q) && !bT.includes(q)) return -1;
                if (!aT.includes(q) && bT.includes(q)) return 1;

                if (b.vote_count !== a.vote_count) return b.vote_count - a.vote_count;
                if (b.popularity !== a.popularity) return b.popularity - a.popularity;
                if (b.vote_average !== a.vote_average) return b.vote_average - a.vote_average;

                return (
                    parseInt(b.release_date || "0") -
                    parseInt(a.release_date || "0")
                );
            });

            const topFive = movies.slice(0, 5);

            const withDirectors = await Promise.all(
                topFive.map(async (movie) => {
                    const credits = await getMovieCredits(movie.id);
                    const directorObj = credits.crew?.find((p) => p.job === "Director");

                    return {
                        ...movie,
                        director: directorObj?.name || "Unknown",
                    };
                })
            );

            setResults(withDirectors);
        }, 300);

        return () => clearTimeout(delayDebounce);
    }, [query, searchMode]);

    useEffect(() => {
        const handleClickOutsideDropdown = (e) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(e.target) &&
                inputRef.current &&
                !inputRef.current.contains(e.target)
            ) {
                setResults([]);
            }
        };
        document.addEventListener("mousedown", handleClickOutsideDropdown);
        return () =>
            document.removeEventListener("mousedown", handleClickOutsideDropdown);
    }, []);

    useEffect(() => {
        const handleClickOutsideModeDropdown = (e) => {
            if (
                modeDropdownRef.current &&
                !modeDropdownRef.current.contains(e.target) &&
                !document.getElementById("modeSelectorBtn")?.contains(e.target)
            ) {
                setModeDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutsideModeDropdown);
        return () =>
            document.removeEventListener("mousedown", handleClickOutsideModeDropdown);
    }, []);

    const goToMovie = (id) => {
        setResults([]);
        setQuery("");
        navigate(`/movie/${id}`);
    };

    const goToUser = (username) => {
        setResults([]);
        setQuery("");
        navigate(`/user/${username}`);
    };

    return (
        <div className="navBar">
            <div className="left">
                <div id="navLogo">
                    <a href="/"><img src="/Watchr_LOGO.png" alt="Watchr Logo" /></a>
                </div>

                <div id="menu">
                    <button id="dropbtn">
                        <img src="/hamburger-icon.png" alt="" />
                        <span> Menu</span>
                    </button>
                    <div id="dropdown-content">
                        <a href="/">Home</a>
                        <a href="/movies">Movies</a>
                        <a href="/watchlist" id="watchlistOption">Watchlist</a>
                    </div>
                </div>
            </div>

            <div className="middle">
                <div id="searchBar">
                    <input
                        ref={inputRef}
                        type="search"
                        placeholder={searchMode === "movies" ? "Search Movies" : "Search Users"}
                        id="search-input"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        autoComplete="off"
                    />

                    <div
                        id="modeSelectorBtn"
                        className="searchModeSelector"
                        onClick={(e) => {
                            e.stopPropagation();
                            setModeDropdownOpen((prev) => !prev);
                        }}
                    >
                        {searchMode === "movies" ? "Movies" : "Users"} ▼
                    </div>

                    {modeDropdownOpen && (
                        <div className="searchModeDropdown" ref={modeDropdownRef}>
                            <div
                                onClick={() => {
                                    setSearchMode("movies");
                                    setModeDropdownOpen(false);
                                }}
                            >
                                Movies
                            </div>
                            <div
                                onClick={() => {
                                    setSearchMode("users");
                                    setModeDropdownOpen(false);
                                }}
                            >
                                Users
                            </div>
                        </div>
                    )}

                    {results.length > 0 && (
                        <div id="searchDropdown" ref={dropdownRef}>
                            {searchMode === "movies" &&
                                results.map((movie) => (
                                    <div
                                        key={movie.id}
                                        className="searchItem"
                                        onClick={() => goToMovie(movie.id)}
                                    >
                                        <img
                                            src={
                                                movie.poster_path
                                                    ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
                                                    : "/no-image.png"
                                            }
                                            className="searchPoster"
                                        />
                                        <span className="searchTitle">{movie.title}</span>
                                        <span className="searchDate">
                                            {movie.release_date?.slice(0, 4)}
                                        </span>
                                        <span className="searchDirector">
                                            Directed By: {movie.director}
                                        </span>
                                    </div>
                                ))}

                            {searchMode === "users" &&
                                results.map((user) => (
                                    <div
                                        key={user.username}
                                        className="userSearchItem"
                                        onClick={() => goToUser(user.username)}
                                    >
                                        <img
                                            src={user.avatarURL}
                                            className="userSearchAvatar"
                                        />
                                        <span className="userSearchName">
                                            {user.username}
                                        </span>
                                        {user.isFollowing ? (
                                            <span className="followingTag">Following</span>
                                        ) : (
                                            <span className="notFollowingTag">Not Following</span>
                                        )}
                                    </div>
                                ))}
                        </div>
                    )}
                </div>
            </div>

            <div className="right">
                <div id="log">
                    <button id="logBtn">
                        <span>LOG</span>
                        <img src="/log-icon.png"/>
                    </button>
                </div>

                <div id="profile" ref={profRef}>
                    <button
                        id="profBtn"
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsOpen((prev) => !prev);
                        }}
                    >
                        <img src={avatarURL}/>
                    </button>

                {isOpen && (
                    <div id="profile-menu">
                        <div id="profile-header">
                            <div id="profile-name">{username}</div>
                        </div>
                        <Link to={`/user/${username}`}>Profile</Link>
                        <a href="/">Settings</a>
                        <a onClick={(e) => {
                            localStorage.removeItem("token");
                            window.location.href='/';
                        }} id="logoutButton">Sign Out</a>
                    </div>
                )}
                </div>
            </div>
        </div>
    );
}

export default NavBar;

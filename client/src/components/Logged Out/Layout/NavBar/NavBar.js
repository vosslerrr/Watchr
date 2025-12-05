import "./navBar.css"
import { useNavigate } from "react-router";
import { searchMovies, getMovieCredits, searchUsers } from "../../../../utils/EC2api";
import { Link } from "react-router-dom";
import React, { useState, useRef, useEffect } from "react";
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
        <div className="outNavBar">
            <div className="outLeft">
                <div id="outNavLogo">
                    <a href="/"><img src="/Watchr_LOGO.png" alt="Watchr Logo" /></a>
                </div>

                <div id="outMenu">
                    <button id="outdropbtn">
                        <img src="/hamburger-icon.png" />
                        <span> Menu</span>
                    </button>
                    <div id="outdropdown-content">
                        <a href="/">Home</a>
                        <a href="/movies">Movies</a>
                        <a href="/watchlist" id="outWatchlistOption">Watchlist</a>
                    </div>
                </div>
            </div>

            <div className="outMiddle">
                <div id="outSearchBar" method="get" action="/movie.html">
                    <input
                        ref={inputRef}
                        type="search"
                        placeholder={searchMode === "movies" ? "Search Movies" : "Search Users"}
                        id="outsearch-input"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        autoComplete="off"
                    />
                    <div
                        id="outModeSelectorBtn"
                        className="outSearchModeSelector"
                        onClick={(e) => {
                            e.stopPropagation();
                            setModeDropdownOpen((prev) => !prev);
                        }}
                    >
                        {searchMode === "movies" ? "Movies" : "Users"} 
                    </div>
                   
                        <div className="outSearchModeDropdown" >
                            <div>
                                Movies
                            </div>
                            
                        </div>
                    

                    {results.length > 0 && (
                        <div id="outSearchDropdown" ref={dropdownRef}>
                            {searchMode === "movies" &&
                                results.map((movie) => (
                                    <div
                                        key={movie.id}
                                        className="outSearchItem"
                                        onClick={() => goToMovie(movie.id)}
                                    >
                                        <img
                                            src={
                                                movie.poster_path
                                                    ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
                                                    : "/no-image.png"
                                            }
                                            className="outSearchPoster"
                                        />
                                        <span className="outSearchTitle">{movie.title}</span>
                                        <span className="outSearchDate">
                                            {movie.release_date?.slice(0, 4)}
                                        </span>
                                        <span className="outSearchDirector">
                                            Directed By: {movie.director}
                                        </span>
                                    </div>
                                ))}
                        </div>
                    )}
                </div>
            </div>

            <div className="outRight">
                <div id="outLog">
                    <a href="/login" id="outLogBtn"><img src="/log-icon.png" /> LOG</a>
                </div>
            </div>
        </div>
    );
}

export default NavBar;

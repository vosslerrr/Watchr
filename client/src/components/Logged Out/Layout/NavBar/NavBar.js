import "./navBar.css"

function NavBar(){   
    return (
        <div className="outNavBar">
            <div className="outLeft">
                <div id="outNavLogo">
                    <a href="/"><img src="/Watchr_LOGO.png" alt="Watchr Logo" /></a> 
                </div>

                <div id="outMenu">
                    <button id="outdropbtn">
                        <img src="/hamburger-icon.png"/>
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
                        type="search"
                        placeholder="Search Movies"
                        id="outsearch-input"  
                    />
                </div>
            </div>

            <div className="outRight">
                <div id="outLog">
                    <a href="/login" id="outLogBtn"><img src="/log-icon.png"/> LOG</a>
                </div>
            </div>
        </div>
    );
}

export default NavBar;
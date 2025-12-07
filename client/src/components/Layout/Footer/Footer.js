import "./footer.css";
import { FaInstagram, FaYoutube, FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-left">
                <span>© {new Date().getFullYear()} Watchr</span>
            </div>

            <div className="footer-middle">
                <span>Built for movie lovers. Data powered by TMDB.</span>
            </div>

            <div className="footer-icons">
                <FaFacebook className="footer-icon" />
                <FaInstagram className="footer-icon" />
                <FaXTwitter className="footer-icon" />
                <FaYoutube className="footer-icon" />
            </div>
        </footer>
    );
}

export default Footer;

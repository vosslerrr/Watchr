import React, { useState } from 'react';
import { logInUser } from '../../../utils/api';
import './login.css';
function LogIn() {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [message, setMessage] = useState('');
    const { username, password } = formData;
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
    const onSubmit = async e => {
        e.preventDefault();
        const res = await logInUser(username, password);
        if (res.msg == null) {
            setMessage(res.msg);
        }
        localStorage.setItem('token', res.token);
        localStorage.setItem('username', username);
        window.location.href = '/';
    };
    return (
        <div className="loginWrapper">
            <div className="auth-form">
                <a href="/"><img id="loginLogo" src="/Watchr_LOGO.png" alt="Watchr Logo" /></a>
                <form onSubmit={onSubmit}>
                    <input type="text" placeholder="Username" name="username" value={username} onChange={onChange} required />
                    <input type="password" placeholder="Password" name="password" value={password} onChange={onChange} required />
                    <button type="submit">Login</button>
                </form>
                <p className="message">{message}</p>
            </div>
            <span id="registerMessage">Don't have an account? <a href="/register">Register now!</a></span>
        </div>
    );
}
export default LogIn;

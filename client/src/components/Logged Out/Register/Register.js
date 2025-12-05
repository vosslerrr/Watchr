import React, { useState } from 'react';
import './register.css';
import { registerUser } from '../../../utils/api';

function Register() {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        confirmPassword: ''
    });
    const [message, setMessage] = useState('');
    const { username, password, confirmPassword } = formData;
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
    const onSubmit = async e => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage("Passwords Do Not Match");
            return;
        }
        const res = await registerUser(username, password);
        if (res.msg) {
            setMessage(res.msg);
            return;
        }
        localStorage.setItem('token', res.token);
        localStorage.setItem('username', username);
        window.location.href = '/';
    };
    return (
        <div className="registerWrapper">
            <div className="auth-form">
                <a href="/"><img id="registerLogo" src="/Watchr_LOGO.png" alt="Watchr Logo" /></a>
                <form onSubmit={onSubmit}>
                    <input type="text" placeholder="Username" name="username" value={username} onChange={onChange} required />
                    <input type="password" placeholder="Password" name="password" value={password} onChange={onChange} required />
                    <input type="password" placeholder="Confirm Password" name="confirmPassword" value={confirmPassword} onChange={onChange} required />
                    <button type="submit">Register</button>
                </form>
                <p className="message">{message}</p>
            </div>

            <span id="loginMessage">
                Already have an account? <a href="/login">Log in</a>
            </span>
        </div>
    );
}
export default Register;

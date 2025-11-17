import React, { useState } from 'react';
import { logInUser } from '../../../utils/api'; //change back to EC2api when finished testing
import './login.css';

function LogIn(){
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
        
        if(res.msg == null)
        {
            localStorage.setItem('token', res.token);
            localStorage.setItem('username', username);
            window.location.href = '/';
        }
        else{ setMessage(res.msg); }
    };

    return (
        <div>
            <div className="auth-form">
                <h2>Login</h2>
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
};

export default LogIn;
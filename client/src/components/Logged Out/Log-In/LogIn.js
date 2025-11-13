import React, { useState } from 'react';
import { logInUser } from '../../../utils/EC2api';
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
            window.location.href = '/';
        }
        else{ setMessage(res.msg); }
    };

    return (
        <div className="auth-form">
            <h2>Login</h2>
            <form onSubmit={onSubmit}>
                <input type="text" placeholder="Username" name="username" value={username} onChange={onChange} required />
                <input type="password" placeholder="Password" name="password" value={password} onChange={onChange} required />
                <button type="submit">Login</button>
            </form>
            <p className="message">{message}</p>
        </div>
    );
};

export default LogIn;
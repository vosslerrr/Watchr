import './settings.css';
import React, { useState, useEffect } from 'react';
import { getUserDetails, postNewAvatar, putNewUsername, deleteUserAccount } from "../../../../utils/EC2api"
import { useNavigate } from "react-router";

function Settings(){
    const username = localStorage.getItem("username");
    const navigate = useNavigate();
    const [avatarURL, setAvatarURL] = useState('');
    const [newusername, setNewUsername] = useState('');
    const [newAvatar, setNewAvatar] = useState(null);

    useEffect(() => {
        async function load(){
            const res = await getUserDetails(username);

            setAvatarURL(res.avatarURL);
        }

        load();
    }, [username]);

    const onEditChange = e => setNewUsername(e.target.value);

    const onAvatarChange = e => {
        setNewAvatar(e.target.files[0]); 
        setAvatarURL(URL.createObjectURL(e.target.files[0]));
    };

    const onSubmitAvatar = async e => {
        e.preventDefault();

        if (!newAvatar) return alert("No file selected.");

        await postNewAvatar(username, newAvatar);

        e.target.reset();

        window.location.reload();
    };
    
    const onSubmitUsername = async e => {
        e.preventDefault();

        if(username == newusername){ return window.alert("Same username."); }

        const res = await putNewUsername(username, newusername);

        if(res.msg){ return window.alert("Username taken"); }

        localStorage.setItem('username', newusername);
        window.location.reload(); 
    };

    const deleteAccount = async () => {
        const confirmed = window.confirm("Are you sure you want to delete your account? This action cannot be undone.");

        if (!confirmed) return;
        
        await deleteUserAccount(username);
        localStorage.removeItem("token");
        window.location.href='/';
    };

    return(
        <div className="Settings">
            <div id="settingsUsername">
                Username: {username}
                <form className="settingsNewUsernameForm" onSubmit={onSubmitUsername}>
                    <input type="text" name="newusername" value={newusername} onChange={onEditChange} required></input>
                    <input type="submit"></input>
                </form>
            </div>
            
            <div id="settingsAvatar">
                <img src={avatarURL}></img>
                <form className="settingsNewAvatar" onSubmit={onSubmitAvatar}>
                    <input type="file" name="avatar" id="settingsAvatarFile" accept="image/*" onChange={onAvatarChange} style={{ display: "none" }} required></input>
                    <label htmlFor="settingsAvatarFile" id="settingsUploadBtn">Choose File</label>
                    <input type="submit" id="settingsAvatarSubmit" style={{ display: "none" }}></input>
                    <label htmlFor="settingsAvatarSubmit" id="settingsSubmitBtn">Submit</label>
                </form>
            </div>
            <button id="settingsDelete" onClick={deleteAccount}>Delete account</button>
        </div>
    );
}

export default Settings;
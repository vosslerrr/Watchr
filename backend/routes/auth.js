import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/User.js";
dotenv.config({path: "../.env"});

const router = express.Router();

router.post("/register", async(req,res) => {
    const { username, password } = req.body;

    let user = await User.findOne({ username });
    if(user.username == username) {
        return res.json({ msg: 'User already exists' });
    }

    user = new User({ username, password });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = {
        user: { 
            id: user._id,
            username: user.username 
        }
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" }); 
    res.json({ token });
});

router.post('/login', async (req,res) => {
    const { username, password } = req.body;
    
    let user = await User.findOne({ username });
    if (!user) {
        return res.json({ msg: 'Invalid Username' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.json({ msg: 'Invalid Password' });
    }

    const payload = {
        user: { 
            id: user._id,
            username: user.username 
        }
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" }); 
    res.json({ token });
});

export default router;
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatarURL: { type: String, default: "https://dobigbtv3u257qjo.public.blob.vercel-storage.com/user-default.png" },
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
});

const User = mongoose.model("User", UserSchema);

export default User;
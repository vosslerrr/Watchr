import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import tmdbRoutes from "./routes/tmdb.js";
import authRoutes from "./routes/auth.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors({origin: "*",}));

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.error(err));

app.use("/routes/tmdb", tmdbRoutes);
app.use("/routes/auth", authRoutes);

app.listen(5000, '0.0.0.0', () => console.log("Server running at port 5000"));

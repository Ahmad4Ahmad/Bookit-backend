import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
import authRoute from "./routes/authRoute.js";
import usersRoute from "./routes/usersRoute.js";
import hotelsRoute from "./routes/hotelsRoute.js";
import roomsRoute from "./routes/roomsRoute.js";
import cookieParser from "cookie-parser";

const app = express();
const port = process.env.PORT || 3000;
const connect = async () =>
{
    try
    {
        await mongoose.connect(process.env.MONGO_URI);
    }
    catch (error)
    {
        throw error;
    }
};

// Enable CORS middleware
app.use(function(req, res, next)
{
    const allowedOrigins = ["", "http://localhost:5173"];
    const origin = req.headers.origin;
  
    if (allowedOrigins.includes(origin)) {
      res.setHeader('Access-Control-Allow-Origin', origin);
    }

    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    // Handle preflight requests
    // if (req.method === 'OPTIONS') {
    //     res.sendStatus(200);
    // } else {
    //     next();
    // }
    next();
});

app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);
app.use((error, req, res, next) =>
{
    const errorStatus = error.status || 500;
    const errorMessage = error.message || "Something went wrong!";

    return res.status(errorStatus).json(errorMessage);
});

app.listen(port, () => 
{
    connect();
    console.log("connected");
});
import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import fs from 'fs';  // Import fs to interact with the file system
import userRouter from "./routes/userRoute.js";
import 'dotenv/config'
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import addressRouter from "./routes/addressRoute.js";
// import profileRouter from "./routes/profileRoute.js";
// app config
const app = express();
const port = 4000;
// middleware
app.use(express.json());
app.use(cors());

// Static folder to serve uploaded files
app.use('/images', express.static('uploads'));
// db connection
connectDB();

// api endpoints
app.use("/api/food", foodRouter);
app.use("/api/user", userRouter);
app.use("/api/cart",cartRouter);
app.use("/api/order",orderRouter);
app.use("/api/address",addressRouter);
// app.use("/api/profile",profileRouter);

app.get("/",(req,res) => {
   res.send("API Working");
});


// Start the server
app.listen(port, () => {
    console.log(`Server Started on http://localhost:${port}`);
});



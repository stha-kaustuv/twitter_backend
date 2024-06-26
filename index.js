import express from "express";
import dotenv from "dotenv";
import databaseConnection from "./config/database.js";
import cookieParser from "cookie-parser";
import userRoute from "./routes/userRoute.js";
import cors from "cors";
dotenv.config({
    path:".env"
})
databaseConnection();
const app= express();

//middlewares handles the request and response between client and server
app.use(express.urlencoded({
    extended:true
}));
app.use(express.json()); 
app.use(cookieParser());
const corsOptions = {
    origin:"http://localhost:3000",
    credentials:true
}
app.use(cors(corsOptions));

//api
app.use(userRoute);







app.listen(process.env.PORT,() =>{
    console.log(`Server Listen at port ${process.env.PORT}`);
})
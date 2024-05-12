import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
import mongoose from "mongoose";
import passRoute from "./Routes/pass.route.js";
dotenv.config();

const app = express()
app.use(cors()) 
const port = 3000
app.use(express.json());
app.use('/',passRoute)

mongoose
.connect(process.env.MONGODB_URL)
.then(() => {
    console.log("Database connected successfully!!")
    app.listen(port,() => {
        console.log("App is listening on port:",port)
    })
})
.catch((err) => {
    console.log(err)
})


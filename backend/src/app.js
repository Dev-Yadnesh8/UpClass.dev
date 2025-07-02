import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();

app.use(cors({
    origin : process.env.CORS_ORIGIN || "*",
    credentials :true
}));

app.use(express.json({limit: "16kb"}));
app.use(express.urlencoded({extended:true})); // "extended" true allows nested objects
app.use(cookieParser());

// Routes
import userRouter from "./routes/user.route.js";
import courseRouter from "./routes/course.route.js";
import purchaseRouter from "./routes/purchase.route.js";
import commentRouter from "./routes/comment.route.js";

app.use("/api/v1/user",userRouter);
app.use("/api/v1/courses",courseRouter);
app.use("/api/v1/purchases",purchaseRouter);
app.use("/api/v1/comment",commentRouter);


export {app}
import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRouter from "./routes/user.routes.js";
import postRouter from "./routes/post.routes.js";
import path from "path";
import cors from "cors"

import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const uploadPath = path.join(__dirname, 'uploads')
dotenv.config();

const app = express();
app.use(cors())
app.use(express.json());

app.use('/uploads',express.static(uploadPath))

app.use("/api/v1/auth", userRouter);
app.use("/api/v1/post", postRouter);

connectDB();

const port = 8000;

app.listen(port, () => {
  console.log(`server is run ${port}`);
});

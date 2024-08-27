import express from "express";
import dotenv from "dotenv";
import authRouters from "./routes/auth.routes.js";
import messageRouters from "./routes/message.routes.js";
import connectToMongoDb from "./db/connectToMongoDB.js";
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();
app.use(express.json());
app.use(cookieParser());
const port = process.env.PORT || 8080;

app.use("/api/auth", authRouters);
app.use("/api/message", messageRouters);
app.listen(port, () => {
  connectToMongoDb();
  console.log(`Server running at http://localhost:${port}`);
});

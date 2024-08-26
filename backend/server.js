import express from "express";
import dotenv from "dotenv";
import authRouters from "./routes/auth.routes.js";
import connectToMongoDb from "./db/connectToMongoDB.js";
const app = express();
dotenv.config();
app.use(express.json());

const port = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.send("Hello, Vite!");
});
app.use("/api/auth", authRouters);
app.listen(port, () => {
  connectToMongoDb();
  console.log(`Server running at http://localhost:${port}`);
});

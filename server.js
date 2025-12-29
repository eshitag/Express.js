import express from "express";
import "dotenv/config";
import connectDB from "./config/db.js";
import analyzeRouter from "./routes/analyze.js";
import messageRouter from "./routes/message.js";
const port = process.env.PORT;
const mongoUri = process.env.DB_URI;
const app = express();

//Middleware
app.use(express.json());
const myLogger = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
};
app.use(myLogger);

//Routes
app.use("/analyze", analyzeRouter);
app.use("/message", messageRouter);

//Health check
app.get("/", (req, res) => {
  res.json({ status: "Fraud signal API running" });
});

//Connect to MongoDB
connectDB(mongoUri);

//Start server
app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
});

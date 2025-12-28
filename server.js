import express from "express";
const port = 3000;
const app = express();

//in-built middleware
app.use(express.json());

//cutsom middleware
const myLogger = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
};
app.use(myLogger);

//Route
app.post("/analyze", (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  const isFraudMessage = (str) => {
    const suspiciousSymbols = ["0", "1", "@", "$"];
    for (let char of text) {
      if (suspiciousSymbols.includes(char)) {
        return true;
      }
    }
    return false;
  };

  const fraudIndicators = [];

  if (isFraudMessage(message)) {
    fraudIndicators.push("symbol subsitution detected");
  }

  res.json({ message, fraudIndicators });
});

//Health check
app.get("/", (req, res) => {
  res.json({ status: "Fraud signal API running" });
});

app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
});

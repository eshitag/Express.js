import express from "express";
const port = 5001;
const app = express();

//in-built middleware
app.use(express.json());

//cutsom middleware
// const myLogger = (req, res, next) => {
//   console.log(`${req.method} ${req.url}`);
//   next();
// };
// app.use(myLogger);

const urgencyLanguageCheck = (message) => {
  const urgencyWords = ["now", "urgent", "blocked", "immediately"];
  const lowerMessage = message.toLowerCase();
  for (let word of urgencyWords) {
    if (lowerMessage.includes(word)) {
      return { score: 30, reasons: ["urgent language detected"] };
    }
  }

  return {
    score: 0,
    reasons: [],
  };
};

const symbolSubstitutionCheck = (message) => {
  const suspiciousSymbols = ["0", "1", "@", "$"];
  const words = message.split(" ");

  for (let word of words) {
    let hasLetter = false;
    let hasSymbol = false;

    for (let char of word) {
      if (/[a-zA-Z]/.test(char)) hasLetter = true;
      if (suspiciousSymbols.includes(char)) hasSymbol = true;
    }
    if (hasLetter && hasSymbol) {
      return {
        score: 40,
        reasons: ["symbol substitution detected"],
      };
    }
  }

  return { score: 0, reasons: [] };
};

//Route
app.post("/analyze", (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }
  const check1 = symbolSubstitutionCheck(message);
  const check2 = urgencyLanguageCheck(message);

  const fraudScore = check1.score + check2.score;
  const reasons = [...check1.reasons, ...check2.reasons];

  let fraudLevel = "low";
  if (fraudScore > 30 && fraudScore <= 70) fraudLevel = "medium";
  if (fraudScore > 70) fraudLevel = "high";

  res.json({
    message,
    fraudScore,
    fraudLevel,
    reasons,
  });
});

//Health check
app.get("/", (req, res) => {
  res.json({ status: "Fraud signal API running" });
});

app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
});

import express from "express";
const port = 5001;
const app = express();
//Middleware
app.use(express.json());
const myLogger = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
};
app.use(myLogger);
// ----------------------
// FRAUD RULE FUNCTIONS
// ----------------------
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

const otpCheck = (message) => {
  const otpWords = ["otp", "verify with code", "enter pin", "confirm identity"];
  const lowerMessage = message.toLowerCase();

  for (let phrase of otpWords) {
    if (lowerMessage.includes(phrase)) {
      return { score: 30, reasons: ["OTP or verification requested"] };
    }
  }

  return { score: 0, reasons: [] };
};

const personalInfoCheck = (message) => {
  const infoWords = [
    "send your phone number",
    "account number",
    "your email",
    "credentials",
  ];
  const lowerMessage = message.toLowerCase();

  for (let phrase of infoWords) {
    if (lowerMessage.includes(phrase)) {
      return { score: 30, reasons: ["request for personal information"] };
    }
  }

  return { score: 0, reasons: [] };
};

const deliveryCheck = (message) => {
  const deliveryWords = [
    "confirm delivery",
    "track your package",
    "sign for delivery",
  ];
  const lowerMessage = message.toLowerCase();

  for (let phrase of deliveryWords) {
    if (lowerMessage.includes(phrase)) {
      return { score: 20, reasons: ["delivery confirmation request"] };
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

  //Run all checks
  const checks = [
    symbolSubstitutionCheck(message),
    urgencyLanguageCheck(message),
    otpCheck(message),
    personalInfoCheck(message),
    deliveryCheck(message),
  ];

  // Aggregate results
  const fraudScore = checks.reduce((sum, c) => sum + c.score, 0);
  const reasons = checks.flatMap((c) => c.reasons);

  // Determine fraud level
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

// ----------------------
// FRAUD RULE FUNCTIONS
// ----------------------
export const urgencyLanguageCheck = (message) => {
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

export const symbolSubstitutionCheck = (message) => {
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

export const otpCheck = (message) => {
  const otpWords = ["otp", "verify with code", "enter pin", "confirm identity"];
  const lowerMessage = message.toLowerCase();

  for (let phrase of otpWords) {
    if (lowerMessage.includes(phrase)) {
      return { score: 30, reasons: ["OTP or verification requested"] };
    }
  }

  return { score: 0, reasons: [] };
};

export const personalInfoCheck = (message) => {
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

export const deliveryCheck = (message) => {
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

export const financialPressureCheck = (message) => {
  const phrases = ["pay now", "limited time", "penalty", "late fee"];
  const lowerMessage = message.toLowerCase();
  for (let phrase of phrases) {
    if (lowerMessage.includes(phrase)) {
      return { score: 30, reasons: ["financial pressure detected"] };
    }
  }
  return { score: 0, reasons: [] };
};

export const impersonationCheck = (message) => {
  const brands = ["paypal", "amazon", "bank", "irs", "cra"];
  const lowerMessage = message.toLowerCase();
  for (let brand of brands) {
    if (lowerMessage.includes(brand) && lowerMessage.includes("account")) {
      return { score: 30, reasons: ["possible brand impersonation"] };
    }
  }
  return { score: 0, reasons: [] };
};

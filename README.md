# Fraud Signal API

A Node.js + Express + MongoDB backend that analyzes text messages (SMS, WhatsApp, emails) for potential fraud. It flags messages based on common indicators like symbol substitution, urgency language, OTP requests, personal info requests, and delivery confirmations. Comes with a simple HTML + Tailwind frontend to test messages and view stored analysis results.
## Project Structure
```
└── 📁Fraud-Detector
    └── 📁config
        ├── db.js
    └── 📁frontend
        ├── index.html
    └── 📁middleware
        ├── logger.js
    └── 📁models
        ├── Message.js
    └── 📁routes
        ├── analyze.js
        ├── message.js
    └── 📁test
        ├── messages.md
    └── 📁utils
        ├── fraudRules.js
    ├── .gitignore
    ├── package-lock.json
    ├── package.json
    ├── projectDescription.txt
    ├── README.md
    └── server.js
```
# Features

Detect suspicious symbol substitutions (e.g., "ver!fy" instead of "verify")

Detect urgent language ("now", "urgent", "immediately")

Detect OTP or verification requests

Detect requests for personal information

Detect delivery or package confirmations

Store analyzed messages in MongoDB

Simple frontend for analyzing and viewing messages

# Tech Stack

Backend: Node.js, Express

Database: MongoDB (via Mongoose)

Frontend: HTML, JavaScript, Tailwind CSS (via CDN)

# Installation

Clone the repo
npm install
Setup MongoDB --
DB_URI=mongodb://localhost:27017/fraud-signal
PORT=5001
npm start

# Usage

Open frontend/index.html in your browser (or run via live server extension).

Enter a message in the textarea and click Analyze.

Click Fetch Stored Messages to see all analyzed messages from MongoDB.

The analysis shows:

fraudScore (numeric)

fraudLevel (low, medium, high)

reasons (why the message is flagged)

# Roadmap / Next Steps

Add more fraud detection rules (links, financial pressure, impersonation)

Color-coded UI for fraud levels

React + Tailwind SPA frontend for real-time message analysis

Unit tests for fraud rules

# Contribution

Feel free to fork, open issues, or submit PRs to improve detection rules, frontend, or testing.

# License

MIT © Eshita Gupta

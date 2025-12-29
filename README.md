# Fraud Signal API

Project Structure
fraud-signal-api/
├─ server.js
├─ config/
│ └─ db.js # MongoDB connection
├─ models/
│ └─ Message.js # Mongoose schema
├─ routes/
│ └─ analyze.js # /analyze route
│ └─ messages.js # /messages route
├─ middleware/
│ └─ logger.js # request logging
├─ utils/
│ └─ fraudRules.js # all fraud detection functions
└─ package.json

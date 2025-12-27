Problem:
Why does this exist?
-- With increasing phishing attacks, fraudulent messages, and automated communications from bots or call centers, it’s difficult to identify what is authentic. Users need a simple way to flag suspicious messages and assess their risk.

User:
Who would use this?
SaaS platforms or internal tools that want to automatically flag suspicious messages for users.

Could be integrated with messaging apps, email scanners, or internal communication systems.

Core features (max 5):

- Feature 1 - Message analysis: Detect inconsistencies, symbols disguised as letters, suspicious URLs, or urgent phrases.

- Feature 2 - Fraud scoring: Assign a fraud score and categorize as low, medium, or high risk.

- Feature 3 - Reason reporting: Provide reasons why a message was flagged (e.g., “contains symbol substitutions”).

- Feature 4 - Message storage: Store analyzed messages in MongoDB for auditing or later retrieval.

- Feature 5 - Basic retrieval endpoint: Fetch past analyzed messages with fraud level and reasons.

What I am intentionally NOT building:

-- Automatic ML-based predictions (only rule-based scoring for now).

-- Real-time integration with email/SMS/WhatsApp services (input will be JSON or sample messages).

-- Full frontend dashboard (optional later for stretch goal).

Tech choices:
Why Express? - Strengthen backend skills and create RESTful APIs.
Why Mongo DB? - Flexible storage for messages with varied content, non-relational format works well for logs and message metadata.

Stretch Goals for later

-- Add support for multiple languages.
-- Integrate a simple dashboard to visualize flagged messages.
-- Export reports (CSV/JSON) of suspicious messages.

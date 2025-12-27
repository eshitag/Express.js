# Fraud Signal API

# Overview

Fraud Signal API is a backend service that analyzes incoming text-based messages (SMS, WhatsApp, email content) and flags potentially fraudulent communication using a rule-based scoring system. The goal is to help SaaS platforms or internal tools assess message authenticity before users interact with suspicious content.

# Problem Statement

With the rise of phishing attacks, scam messages, and automated communication through bots and call centers, it has become increasingly difficult to determine whether a message is legitimate. Fraudulent messages often use disguised characters, suspicious links, and urgent language to manipulate users.

This project exists to provide a lightweight, explainable fraud-detection API that can flag suspicious messages and clearly explain why they are considered risky.

# Target Users

SaaS platforms that want to integrate fraud or phishing detection as a feature

Internal tools used by support, operations, or compliance teams

Developers looking for a simple API to assess message risk

This project is designed as an API-first service, not a consumer-facing application.

# Core Features

Message Analysis

Analyze incoming message text for suspicious patterns such as:

Symbols disguised as letters (e.g., 0 → O, 1 → l)

Inconsistent formatting

Suspicious or malformed URLs

Urgent or manipulative language

Fraud Scoring System
Assign a numerical risk score based on predefined rules and classify messages as:

Low risk

Medium risk

High risk

Explainable Results
Return clear reasons explaining why a message was flagged, making the decision transparent and understandable.

Message Storage
Store analyzed messages, scores, and reasons in MongoDB for auditing and future reference.

Message Retrieval
Provide an endpoint to retrieve previously analyzed messages and their fraud levels.

# What This Project Does NOT Include (Intentional Scope Limits)

Machine learning or AI-based predictions (rule-based logic only)

Real-time integration with SMS, email, or WhatsApp services

User authentication or role-based access control

Full frontend dashboard (API testing will be done via Postman)

These exclusions help keep the project focused, achievable, and easy to extend later.

# Technology Stack

Node.js + Express
Used to build a RESTful API and strengthen backend development skills.

MongoDB
Chosen for its flexible, non-relational schema, which is well-suited for storing varied message content and metadata.

Postman
Used to test and demonstrate API functionality.

# Future scope

Easily extensible to ML, dashboards, or third-party integrations in the future

Introduce ML-based fraud detection

Add a minimal dashboard for visualization

Support multilingual message analysis

Export flagged messages as reports

# Status

🚧 MVP – Rule-based fraud detection API in progress

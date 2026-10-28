# IntelliLearn

Intelligent Detection and Personalized Resolution of Student Learning Gaps

IntelliLearn is a web application designed to identify students' learning gaps through diagnostic assessments and provide targeted revision recommendations.

## Features

- Diagnostic assessments in Mathematics, Physics, Computer Networking, and AI & Neural Networks
- Concept-level performance analysis
- Rule-based learning-gap detection
- Personalized revision recommendations
- Student authentication and assessment history

## Technology Stack

- Frontend: React.js, Vite, JavaScript, CSS
- Backend: Node.js, Express.js
- Database: PostgreSQL
- Authentication: JWT and bcrypt
- AI/Ml: Rule-based analysis

## Project Structure

- `src/` — Frontend application
- `public/` — Public assets
- `server/` — Backend API and database schema

## Getting Started

Install dependencies in the project root:

```bash
npm install
npm run dev
```

For the backend, open a separate terminal:

```bash
cd server
npm install
npm start
```

Configure the required environment variables in `server/.env` before starting the backend. Never commit secrets or database credentials to GitHub.

## Current Status

This prototype uses predefined diagnostic questions and transparent rules to identify potential learning gaps. Machine-learning-based diagnosis is a possible future enhancement.
The Blog Automation System has been successfully created. This project automates the process of scraping blog articles, enhancing them with AI-generated content based on Google Search results, and displaying them in a premium React frontend.

Project Overview
The system consists of three main components:

Backend (Node.js/Express + SQLite): Replaces the Laravel requirement due to local environment constraints. It handles scraping the "BeyondChats" blog, storing articles, and serving CRUD APIs.
Automation Script (Node.js): Fetches articles from the backend, searches for related content (using DuckDuckGo as a fallback for Google), scrapes references, and uses an LLM (mocked or real via API key) to rewrite the content.
Frontend (React + Vite): A responsive, dark-mode web application that displays the original and AI-updated articles side-by-side.
Key Features
Smart Scraping: Automatically detects the last page of the blog to find the oldest articles.
AI Enhancement: Updates articles with new information and citations.
Premium UI: Custom CSS design with glassmorphism effects and responsive layout.
Robust Architecture: Modular design separating concerns between data fetching, processing, and presentation.
How to Run
1. Backend

bash
cd backend
npm install
node server.js
Server runs on http://localhost:3000

2. Automation Script

bash
cd script
npm install
# Optional: Create .env with GEMINI_API_KEY=your_key for real AI
node index.js
3. Frontend

bash
cd frontend
npm install
npm run dev
Frontend runs on http://localhost:5173
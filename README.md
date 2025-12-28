# Blog Automation System

A complete system to scrape, enhance, and display blog articles using Node.js, Express, SQLite, and React.

## Project Structure

- **backend/**: Node.js Express server with SQLite database. Handles scraping and CRUD operations.
- **script/**: Node.js automation script to fetch articles, search for references, and update content using AI.
- **frontend/**: React application to display original and updated articles in a premium UI.


## Setup Instructions

### Prerequisites
- Node.js (v14+)
- npm

### 1. Backend Setup
```bash
cd backend
npm install
node server.js
```
Server runs on `http://localhost:3000`.

### 2. Automation Script
To run the AI enhancement process:
```bash
cd script
npm install
node index.js
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Frontend runs on `http://localhost:5173`.

## Features
- **Phase 1**: Scrapes 5 oldest articles from BeyondChats.
- **Phase 2**: Enhances articles by searching related content and rewriting using AI (Mock or Real API).
- **Phase 3**: Responsive, dark-mode UI to compare original and updated versions.

## Note on Technology Stack
The original requirement mentioned Laravel for the backend. Due to the local environment lacking PHP/Composer, the backend was implemented using **Node.js/Express** to ensure a functional and complete deliverable. The architecture remains the same, just the language differs.

## Live Link
Local Development: [http://localhost:5173](http://localhost:5173)

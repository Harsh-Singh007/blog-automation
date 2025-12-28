# Deployment Guide

This project can be deployed to Vercel. However, since it uses SQLite, data persistence is not guaranteed on Vercel's serverless environment.

## Prerequisites
1. Create a GitHub repository and push this code.
2. Sign up for [Vercel](https://vercel.com).

## Deployment Steps

### 1. Backend Deployment (Vercel)
The backend is configured to run as a serverless function.
1. Go to Vercel Dashboard -> Add New Project.
2. Import your GitHub repository.
3. **IMPORTANT**: In "Root Directory" settings, click "Edit" and select `backend`.
4. Deploy.
5. Once deployed, copy the **Domain** (e.g., `https://your-backend.vercel.app`).

### 2. Frontend Deployment (Vercel)
1. Go to Vercel Dashboard -> Add New Project.
2. Import the **same** GitHub repository again.
3. **IMPORTANT**: In "Root Directory" settings, click "Edit" and select `frontend`.
4. In "Environment Variables":
   - Key: `VITE_API_URL`
   - Value: `https://your-backend.vercel.app/api` (Replace with your actual backend URL from Step 1).
5. Deploy.

## Important Note on Database
Since Vercel Serverless functions are ephemeral and read-only (except `/tmp`), the SQLite database will be reset frequently.
- For a permanent solution, consider using a cloud database like **Turso**, **Neon**, or **Supabase** and update `backend/database.js` to connect to it.
- Alternatively, deploy the backend to **Render** or **Railway** which support persistent disks (paid) or at least don't reset as aggressively as serverless functions.

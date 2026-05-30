# Recipe Sharing Platform

A simple full-stack recipe sharing web application built with Node.js, Express, MongoDB, and React + Vite.

## Features
- User registration and login with JWT
- Recipe create, edit, delete for authenticated users
- Search and filter recipes by keyword and tag
- Like/unlike recipes and add comments
- Image upload support for recipes
- Responsive UI for desktop and mobile

## Setup

### Backend
1. `cd backend`
2. `npm install`
3. Create a `.env` file with:
   - `PORT=4000`
   - `MONGODB_URI=mongodb://127.0.0.1:27017/recipe_sharing`
   - `JWT_SECRET=your_secret`
4. `npm run dev`

### Frontend
1. `cd frontend`
2. `npm install`
3. `npm run dev`

### Docker / Production
1. `docker compose up --build`
2. Frontend will be available at `http://localhost:5173`
3. Backend API will be available at `http://localhost:4000`

If you want production traffic routed through a single host, add an HTTP reverse proxy or use a hosted container platform.

## Notes
- The app uses JWT authentication and stores the token in local storage for demo purposes.
- Logout invalidates the JWT in a simple in-memory blacklist while the server is running.

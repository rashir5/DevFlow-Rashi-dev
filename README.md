# DevFlow

DevFlow is a full-stack developer journal for logging daily work, lessons learned, and blockers.

Live app: [https://dev-flow-puce.vercel.app/](https://dev-flow-puce.vercel.app/)

Repository: [https://github.com/jabhandari/devflow](https://github.com/jabhandari/devflow)

## About

DevFlow helps developers keep a simple daily record of their progress. Users can add an entry for a date, save it to MongoDB, and review previous entries in a dashboard.

![DevFlow Screenshot](./screenshots/img1.png)

## Features

- Create or update a daily development entry
- Track what you worked on, what you learned, and blockers
- View saved entries in reverse chronological order
- Light and dark theme toggle
- Client-side loading and error states
- Express API error responses with clear messages

## Built With

### Frontend

- React
- Vite
- JavaScript
- CSS
- Fetch API

### Backend

- Node.js
- Express
- Mongoose
- JWT authentication
- bcryptjs
- validator
- dotenv
- nodemon

### Database

- MongoDB

## Project Structure

```text
devflow/
  client/
    src/
      components/
        EntryForm.jsx
        EntryTable.jsx
      pages/
        Dashboard.jsx
      App.jsx
      main.jsx
    vite.config.js

  server/
    controllers/
      authController.js
    models/
      Entry.js
      User.js
    routes/
      authRoutes.js
      entryRoutes.js
    server.js

  screenshots/
```

## Getting Started

### Prerequisites

- Node.js
- npm
- MongoDB connection string, either local MongoDB or MongoDB Atlas

### Installation

Clone the repository:

```bash
git clone https://github.com/jabhandari/devflow.git
cd devflow
```

Install backend dependencies:

```bash
cd server
npm install
```

Install frontend dependencies:

```bash
cd ../client
npm install
```

## Environment Variables

Create a `.env` file inside `server/`:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

For local frontend development, the client defaults to `http://localhost:5000`. To use a different backend URL, create `client/.env`:

```env
VITE_API_URL=http://localhost:5000
```

## Running Locally

Start the backend:

```bash
cd server
npm run dev
```

Start the frontend in a second terminal:

```bash
cd client
npm run dev
```

Open:

```text
http://localhost:5173
```

## API Endpoints

The Express server mounts routes directly at `/auth` and `/entries`.

### Health Check

```http
GET /
```

### Authentication

```http
POST /auth/register
POST /auth/login
```

### Entries

```http
GET /entries
POST /entries
```

`POST /entries` creates or updates an entry for the submitted date.

Example entry payload:

```json
{
  "date": "2026-07-30",
  "workedOn": "Split dashboard components",
  "learned": "Kept page state separate from reusable UI",
  "blockers": "None"
}
```

## Deployment

- Frontend: Vercel
- Backend: Render
- Database: MongoDB

## Future Improvements

- Edit and delete entries from the dashboard
- Markdown support
- Tags and filtering
- Productivity analytics
- Automated tests and CI

## Author

Juhi Bhandari  
Software Developer  
Toronto, Canada

GitHub: [https://github.com/jabhandari](https://github.com/jabhandari)

# MERN Job Portal

A full-stack Job Portal web application built using the MERN Stack (MongoDB, Express.js, React.js, Node.js).

## Features

### Authentication
- User Registration
- User Login
- JWT Authentication
- Protected Routes

### Candidate Features
- View All Jobs
- Search Jobs
- View Job Details
- Apply for Jobs
- My Applications Page
- Dynamic User Profile
- Edit Profile
- Skills Management

### Recruiter Features
- Recruiter Dashboard
- Create New Jobs
- View Posted Jobs
- Delete Jobs
- View Applicants
- Accept Applications
- Reject Applications

### UI Features
- Responsive Design
- Tailwind CSS
- Modern Dashboard UI
- Mobile Friendly Layout
- Loading States
- Search Functionality

## Tech Stack

### Frontend
- React.js
- React Router DOM
- Axios
- Tailwind CSS

### Backend
- Node.js
- Express.js
- JWT Authentication
- bcryptjs

### Database
- MongoDB
- Mongoose

## Project Structure

```bash
job-portal/
│
├── frontend/
│   ├── src/
│   ├── pages/
│   ├── components/
│   └── App.jsx
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── server.js
│
└── README.md
```

## Installation

### Clone Repository

```bash
git clone https://github.com/your-username/job-portal.git
```

### Backend Setup

```bash
cd backend
npm install
npm start
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

## Environment Variables

Create a .env file in backend folder.

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

## API Endpoints

### User Routes

```bash
POST /api/users/register
POST /api/users/login
GET /api/users/profile
PUT /api/users/profile
```

### Job Routes

```bash
GET /api/jobs
GET /api/jobs/:id
POST /api/jobs/create
DELETE /api/jobs/:id
GET /api/jobs/my/jobs
```

### Application Routes

```bash
POST /api/applications/apply
GET /api/applications/my
GET /api/applications/job/:jobId
PUT /api/applications/status/:applicationId
```

## Future Improvements

- Resume Upload
- Profile Photo Upload
- Email Notifications
- Admin Dashboard
- AI Resume Analyzer
- AI Job Recommendations
- Dark Mode

## Author

Deepak Deodatt Mishra

BCA Student | MERN Stack Developer | Powerlifter

## Live Demo

Frontend: Coming Soon

Backend API: Coming Soon

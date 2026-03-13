# 🚀 Campus Air

![MERN](https://img.shields.io/badge/Stack-MERN-green)
![React](https://img.shields.io/badge/Frontend-React%20%2B%20Vite-blue)
![Node](https://img.shields.io/badge/Backend-Node.js-brightgreen)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-green)
![License](https://img.shields.io/badge/License-MIT-yellow)
![Status](https://img.shields.io/badge/Status-Active-success)
![PRs](https://img.shields.io/badge/PRs-Welcome-orange)

A **modern campus communication platform** built with the **MERN Stack**
that allows colleges to manage **events, announcements, alerts, and
student notifications in real-time**.

Campus Air is designed to streamline communication between
**administrators and students** through a centralized dashboard with
**real‑time updates, email alerts, and analytics**.

------------------------------------------------------------------------

# 🌐 Live Architecture

    Frontend  →  React + Vite + Tailwind + shadcn UI
    Backend   →  Node.js + Express
    Database  →  MongoDB Atlas
    Auth      →  Google OAuth + Email Auth
    Images    →  Cloudinary
    Realtime  →  Socket.io
    Emails    →  Nodemailer
    Scheduler →  Node Cron
    Deployment→  Vercel + Render

------------------------------------------------------------------------

# ✨ Features

## 🔐 Authentication

-   Google OAuth Login
-   Email / Password Signup & Login
-   Secure JWT authentication
-   Protected routes
-   Session management

## 📢 Announcement System

-   Admins can publish announcements
-   Students receive updates instantly
-   Email notifications for important posts

## 📅 Event Management

-   Create campus events
-   Add date, time, description, and location
-   Event calendar view
-   Upcoming events preview

## 🚨 Alert System

-   High / Medium / Low priority alerts
-   Animated alert banners
-   Real‑time alert notifications
-   Dismiss alerts with persistence

## 🔔 Real‑Time Notifications

-   Instant notifications using **Socket.io**
-   Notification bell system
-   Activity updates without refresh

## 📊 Admin Dashboard

-   Modern SaaS style dashboard
-   Statistics cards
-   Event / announcement overview
-   Student management panel

## 👨‍🎓 Student Management

-   CSV upload for student lists
-   Department and year data
-   Admin controlled access

## ☁️ Cloud Storage

-   Event images uploaded to **Cloudinary**
-   Secure image hosting

## 📧 Email System

-   Automated email notifications
-   Event reminders
-   Alert messages

------------------------------------------------------------------------

# 🖥️ UI Highlights

-   Modern **SaaS dashboard UI**
-   **shadcn UI components**
-   Responsive design
-   Sidebar navigation
-   Animated statistics
-   Interactive landing page
-   Premium Tailwind styling

------------------------------------------------------------------------

# 🗂 Project Structure

    Campus-Air
    │
    ├── backend
    │   ├── config
    │   ├── controllers
    │   ├── middleware
    │   ├── models
    │   ├── routes
    │   ├── uploads
    │   └── server.js
    │
    ├── frontend
    │   ├── components
    │   │   ├── landing
    │   │   └── ui
    │   ├── pages
    │   ├── services
    │   ├── context
    │   ├── hooks
    │   └── App.jsx

------------------------------------------------------------------------

# ⚙️ Environment Variables

### Backend `.env`

    PORT=5000
    MONGO_URI=

    GOOGLE_CLIENT_ID=
    GOOGLE_CLIENT_SECRET=

    SESSION_SECRET=
    JWT_SECRET=

    CLOUD_NAME=
    CLOUD_API_KEY=
    CLOUD_API_SECRET=

    EMAIL_USER=
    EMAIL_PASS=

    CLIENT_URL=http://localhost:5173

### Frontend `.env`

    VITE_API_URL=http://localhost:5000

------------------------------------------------------------------------

# 🚀 Installation

## 1️⃣ Clone the Repository

``` bash
git clone https://github.com/Nitesh-N-D/Campus-Air.git
cd Campus-Air
```

------------------------------------------------------------------------

## 2️⃣ Backend Setup

``` bash
cd backend
npm install
npm run dev
```

------------------------------------------------------------------------

## 3️⃣ Frontend Setup

``` bash
cd frontend
npm install
npm run dev
```

------------------------------------------------------------------------

# 🔑 Google OAuth Setup

1.  Go to **Google Cloud Console**
2.  Create OAuth credentials
3.  Add authorized redirect:

```{=html}
<!-- -->
```
    http://localhost:5000/auth/google/callback

Add keys in `.env`.

------------------------------------------------------------------------

# 📸 Screenshots

## Dashboard

Modern admin dashboard with analytics and actions.
<img width="1763" height="2049" alt="image" src="https://github.com/user-attachments/assets/7d5f66dc-bc58-45e0-88ae-30e3d6e64f7a" />

## Landing Page

Interactive landing page with animations and event preview.
<img width="1763" height="4167" alt="image" src="https://github.com/user-attachments/assets/65cbcc2a-402c-4788-9230-939845bb28e4" />

------------------------------------------------------------------------

# 📦 Deployment

Frontend:

    Vercel

Backend:

    Render

Database:

    MongoDB Atlas

Image Storage:

    Cloudinary

------------------------------------------------------------------------

# 🛠 Tech Stack

### Frontend

-   React
-   Vite
-   Tailwind CSS
-   shadcn UI
-   React Router

### Backend

-   Node.js
-   Express.js
-   MongoDB
-   Mongoose

### Integrations

-   Passport.js (Google OAuth)
-   Nodemailer
-   Socket.io
-   Node Cron
-   Cloudinary

------------------------------------------------------------------------

# 📈 Future Improvements

-   Event registration system
-   Department filtering
-   Student profile pages
-   Dark mode
-   Mobile push notifications
-   AI event recommendations

------------------------------------------------------------------------

# 🤝 Contributing

Contributions are welcome!

1.  Fork the repository
2.  Create a new branch
3.  Submit a pull request

------------------------------------------------------------------------

# 👨‍💻 Author

**N.D. Nitesh**\
Computer Science Engineering Student\
Madras Institute of Technology

GitHub: https://github.com/Nitesh-N-D

------------------------------------------------------------------------

# ⭐ Support

If you like this project, please ⭐ the repository to support
development.

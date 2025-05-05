# 🎯 Creator Dashboard – VertxAI MERN Stack Developer Assignment

A full-stack web application where content creators can manage their profiles, interact with a personalized content feed, and earn credit points. Designed for the VertxAI assignment to demonstrate proficiency with the MERN stack and deployment best practices.

## 📌 Project Description

The **Creator Dashboard** empowers users (creators) to:
- Register and log in securely.
- Earn and manage credit points.
- Interact with aggregated content from social platforms.
- Access a personalized dashboard with dynamic features.

Admins have extended control to manage users and monitor platform activity.

---

## ⚙️ Features

### 🔐 1. User Authentication
- Register/Login using JWT-based authentication.
- Role-based access: `User` and `Admin`.
- Secure API route protection and session handling.

### 💳 2. Credit Points System
- Earn points for:
  - Daily logins
  - Completing user profile
  - Engaging with feed content
- Dashboard for real-time credit tracking.
- Admin panel to:
  - View credit history
  - Manually update user credits

### 🌐 3. Feed Aggregator
- Content fetched from **Reddit** and **Twitter APIs**.
- Scrollable, user-personalized content feed.
- User interactions:
  - **Save** posts to profile
  - **Share** (via link copy/simulation)
  - **Report** inappropriate content

### 📊 4. Dashboard
- **User Dashboard**:
  - Displays credit balance, saved posts, and activity logs
- **Admin Dashboard**:
  - View user metrics and feed interaction analytics

### 🚀 5. Deployment
- **Backend**: Node.js + Express.js deployed on netlify
- **Frontend**: React.js + Tailwind CSS hosted on netlify

---

## 🛠️ Tech Stack

- **Frontend**: React, Tailwind CSS, Vite, TypeScript
- **Backend**: Node.js, Express.js, MongoDB
- **Auth**: JWT, Role-Based Access Control
- **APIs Used**: Twitter API, Reddit API
- **Deployment**: netlify

---


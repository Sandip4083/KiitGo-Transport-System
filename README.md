# 🚍 KIITGO – Smart Bus Service Management System

> A full-stack, responsive web application designed for students and faculty of KIIT University to easily find, track, and manage campus bus transportation. 

🌍 **Live Demo:** [https://kiit-go-transport-system.vercel.app](https://kiit-go-transport-system.vercel.app/)

![Vercel](https://img.shields.io/badge/Vercel-Deployed-black?style=for-the-badge&logo=vercel)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)

## ✨ Key Features

- **🚌 Bus Route Finder:** Search for buses using source and destination. Features include an autocomplete dropdown, a quick-swap button, and dynamic reverse-route generation. The UI is **fully responsive** and optimized for both mobile and web devices.
- **🔐 Role-Based Authentication:** Secure user and admin login/registration system with password validation and `bcrypt` hashing. Registration supports any valid email address for universal onboarding.
- **📢 Live Complaint Box:** Users can submit transportation-related issues. The system features **real-time notifications** (polling) to alert users when the Admin resolves their complaint.
- **📞 Contact Portal:** Direct messaging portal embedded with the KIIT University Google Maps location.
- **👨‍💼 Dedicated Admin Dashboard:** Separate protected panel for admins to add/remove users, track/resolve complaints, and view contact submissions.

---

## 🛠️ Tech Stack

- **Frontend:** React 19 (Create React App), React Router 7, Font Awesome, plain CSS.
- **Backend:** Node.js, Express.js 5 (Configured as **Vercel Serverless Functions**).
- **Database:** MongoDB Atlas (Mongoose ODM).
- **Security:** `bcryptjs` for secure password hashing.

---

## 🗄️ Database Architecture (MongoDB)

| Collection | Description | Fields |
|------------|-------------|--------|
| **Users** | Platform users and admins. Uses an auto-incrementing `userId`. | `userId`, `name`, `email`, `password`, `role` |
| **Complaints** | User-submitted issues regarding buses. | `name`, `roll`, `issue`, `status` (pending/resolved), `notified` |
| **Contacts** | Form submissions from the contact page. | `name`, `email`, `message`, `date` |

---

## 🚀 Live Deployment Information

This project is fully configured to be deployed on **Vercel** with a unified codebase:
- The React SPA is served securely.
- The Express backend is mapped via `vercel.json` to run as Serverless Functions out of the `/api` directory.
- Connected seamlessly to MongoDB Atlas cloud database.

---

## 💻 Local Development Setup

To run this project locally on your machine, follow these steps:

### 1. Clone the repository
```bash
git clone https://github.com/Sandip4083/KiitGo-Transport-System.git
cd KiitGo-Transport-System
```

### 2. Install Dependencies
```bash
npm install
```
*(Note: Because the backend is configured serverless style for Vercel, backend dependencies like mongoose and express are kept in the root package.json).*

### 3. Setup Environment Variables
Create a `.env` file in the root directory and add your secure MongoDB connection string:
```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/kiitgo
```

### 4. Run the Development Server
Since Vercel handles the API routing in production, to run the serverless function locally during development alongside React, you can use the Vercel CLI:
```bash
npm i -g vercel
vercel dev
```
*(Or you can start React (`npm start`) on Port 3000 and the Express backend (`node api/index.js`) on Port 5000 separately, provided you map the frontend API calls appropriately.)*

---

## 👨‍💻 Developed By

**Sandip Kumar Sah**  
*Full Stack Developer (MERN Stack)*

---

*Built with ❤️ for KIIT University.*

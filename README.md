# KIITGO – Smart Bus Service Management System 🚍

KIITGO is a full-stack web application designed to manage and streamline bus services within KIIT University. The platform provides features for bus route management, student complaints, contact support, and admin operations through a modern web interface.

---

## 🔧 Tech Stack

### Frontend

- React (Create React App)
- React Router
- Font Awesome
- Emotion (CSS-in-JS)
- Axios

### Backend

- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- bcryptjs (Password hashing)
- Nodemailer (Email services)
- CORS & dotenv

---

## ✨ Features

- 🚌 _Bus Route Management_
- 🧑‍🎓 _Student Complaint System_
- 📞 _Contact & Support Module_
- 🔐 _Authentication & Authorization (JWT)_
- 👨‍💼 _Admin Management_
- 📊 _Excel-based Data Handling_
- 📬 _Email Notifications_

---

## 📂 Project Structure

KIITGO_clean/
│
├── kiitgo-backend/ # Backend (Node + Express + MongoDB)
│ ├── db.js
│ ├── busRoute.js
│ ├── complaint.js
│ ├── contact.js
│ ├── addAdmin.js
│ └── dummy_bus_routes.json
│
├── src/ # Frontend (React)
├── public/
├── package.json
└── README.md

---

## 🚀 Installation & Setup

### Prerequisites

- Node.js (v18+ recommended)
- MongoDB (local or Atlas)
- Git

---

### 1️⃣ Clone the Repository

bash
git clone https://github.com/your-username/KIITGO-Bus-Service.git
cd KIITGO-Bus-Service

### 2️⃣ Frontend Setup

bash
npm install
npm start

Runs the app at:

http://localhost:3000

### 3️⃣ Backend Setup

bash
cd kiitgo-backend
npm install
node index.js

Make sure to create a .env file inside kiitgo-backend:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
EMAIL_USER=your_email
EMAIL_PASS=your_email_password

---

## 🔐 Authentication Flow

- JWT-based authentication
- Passwords securely hashed using bcryptjs
- Admin-only protected routes

---

## 📈 Future Improvements

- Role-based access control
- Live bus tracking
- Mobile app integration
- Dashboard analytics
- Deployment with Docker

---

## 🤝 Contribution

Contributions are welcome!

1. Fork the repository
2. Create a new branch
3. Commit your changes
4. Open a Pull Request

---

## 📄 License

This project is licensed under the ISC License.

---

## 👨‍💻 Author

Developed by _KIITGO Team_
Built for academic and institutional use at KIIT University.

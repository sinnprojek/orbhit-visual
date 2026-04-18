# 🚀 Orbhit Visual Portfolio

A full-stack web application built to showcase **photography and videography documentation** in a modern, responsive, and user-friendly interface.

This platform is **publicly accessible for viewing portfolio content only**, while content management is restricted to an internal admin system.

Developed using **React (Vite)** for the frontend and **Node.js + Express + MongoDB** for the backend, with media storage powered by **Cloudinary**.

---

## 🎯 Purpose

This project is designed to:

* Present **visual documentation (photo & video projects)** to the public
* Provide a **clean and professional portfolio interface**
* Separate **public access (read-only)** and **admin access (content management)**

---

## 🎨 Frontend Overview (Public View)

The interface emphasizes **visual storytelling and user experience**, ensuring visitors can explore content smoothly.

### ✨ Features

* 📸 **Dynamic Gallery**

  * Displays images & videos from database
  * Optimized via Cloudinary CDN

* 🗂️ **Category Filtering**

  * Event
  * Trip
  * Meet & Greet

* 📱 **Responsive Design**

  * Works across desktop, tablet, and mobile

* 🎬 **Smooth Animations**

  * Powered by Framer Motion

* 🧭 **Clean Layout**

  * Structured navigation for better UX

---

## 🔒 Access Control

### 🌐 Public Access (Read-Only)

Users can only:

```bash
GET /api/documentations
GET /api/documentations/:id
```

---

### 🔐 Admin Access (Restricted)

Only authorized admin can:

```bash
POST /api/upload
POST /api/documentations
PUT /api/documentations/:id
DELETE /api/documentations/:id
```

Authentication:

```bash
x-admin-password: your_admin_password
```

⚠️ Admin features are **not exposed to public users**.

---

## 📦 Tech Stack

### Frontend

* React (Vite)
* Tailwind CSS
* Framer Motion

### Backend

* Node.js
* Express.js
* MongoDB Atlas (Mongoose)
* Cloudinary
* Multer

---

## ⚙️ Requirements

* Node.js (v18+)
* npm / yarn
* MongoDB Atlas account
* Cloudinary account

---

## 🔧 Installation & Setup

### 1. Clone Repository

```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
```

---

## 🖥️ Backend Setup

```bash
cd backend
npm install
```

Create `.env` inside `backend/`:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
ADMIN_PASSWORD=your_admin_password

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Run backend:

```bash
node server.js
```

---

## 🌐 Frontend Setup

```bash
npm install
npm run dev
```

Frontend:

```
http://localhost:5173
```

Backend:

```
http://localhost:5000
```

---

## 🧪 Running the System

1. Start backend
2. Start frontend
3. Open browser → `http://localhost:5173`

---

## 📁 Project Structure

```
project-root/
│
├── backend/                  # Backend (API & database)
├── public/                   # Static assets
├── src/                      # Frontend (React)
│   ├── auth/                 # Admin authentication
│   ├── components/
│   │   ├── sections/
│   │   ├── ui/
│   ├── data/
│   ├── layouts/
│   ├── pages/
│   │   ├── admin/            # Admin-only pages
│   ├── utils/
│
└── README.md
```

---

## ☁️ Cloudinary Setup

1. Create account at https://cloudinary.com
2. Copy credentials from dashboard
3. Paste into `.env`

---

## 🗄️ MongoDB Setup

1. Create cluster in MongoDB Atlas
2. Add IP access:

```
0.0.0.0/0
```

3. Create database user
4. Copy connection string → `.env`

---

## ⚠️ Security Notes

* `.env` is **not included in repository**
* Never expose:

  * MongoDB URI
  * Cloudinary API Secret
  * Admin password

---

## ✨ Features Summary

* Public portfolio (read-only)
* Admin-controlled content management
* Media upload via Cloudinary
* Dynamic data from MongoDB
* Responsive UI with animation

---

## 👨‍💻 Developer

**sinnprojek**

Responsible for:

* Full-stack development (frontend & backend)
* API design & implementation
* Database integration (MongoDB)
* Media handling (Cloudinary)
* UI development (React + Tailwind)

---

## 🏢 Client / Project Owner

**Orbhit Visual**
Creative Photography & Videography Portfolio

---

## 🤝 Project Context

This application was developed as a **portfolio website for Orbhit Visual**:

* Public users can view documentation
* Orbhit Visual manages content via admin system
* Developer is responsible for building the system

---

## 📜 License

This project is created for:

* Portfolio purposes
* Educational use
* Client-based development

All media content belongs to **Orbhit Visual**.

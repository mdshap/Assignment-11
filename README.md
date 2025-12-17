# 🎓 Scholar Stream
### A Modern Scholarship Management Platform

![Scholar Stream](https://img.shields.io/badge/Scholar-Stream-green?style=for-the-badge)
![MERN](https://img.shields.io/badge/MERN-Stack-success?style=for-the-badge)
![Firebase](https://img.shields.io/badge/Firebase-Authentication-orange?style=for-the-badge)
![Stripe](https://img.shields.io/badge/Stripe-Payments-blueviolet?style=for-the-badge)

---

## 🚀 Live Links
- 🌐 **Live Website:** https://zingy-starship-a00546.netlify.app/
- 🖥️ **Backend API:** https://assignment-11-sever.onrender.com/

---

## 📌 Project Overview

**Scholar Stream** is a full-stack scholarship management system that enables students to discover scholarships, apply online, complete secure payments, track application status, and submit reviews.

Admins and moderators can manage scholarships, applications, reviews, and analytics through a secure dashboard.

---

## ✨ Features

### 👨‍🎓 Student
- Browse & search scholarships  
- View detailed scholarship information  
- Secure application payment (Stripe)  
- Apply for scholarships  
- Track application status  
- Submit reviews after completion  
- Manage profile, applications & reviews  

### 🛡️ Admin / Moderator
- Add, update & delete scholarships  
- Manage applications (approve / reject)  
- Provide feedback to applicants  
- Analytics dashboard  
- Role-based access control  

---

## 🧱 Tech Stack

### 🌐 Frontend
- React.js  
- React Router  
- Tailwind CSS  
- DaisyUI  
- Framer Motion  
- Recharts  
- Axios  
- React Hot Toast  

### 🖥️ Backend
- Node.js  
- Express.js  
- MongoDB  
- JWT Authentication  
- Stripe Payment Gateway  

### 🔐 Authentication
- Firebase Authentication  
  - Email & Password  
  - Google Sign-In  

---

## 💳 Payment Integration
- Secure payments using **Stripe**
- Payment intent handled on backend
- Application status updates after successful payment

---

## 🗂️ Database Collections
- Users  
- Scholarships  
- Applications  
- Reviews  

---

## 🔐 Environment Variables

### 📁 Client (`.env`)
```env
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key

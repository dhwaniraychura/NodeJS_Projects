# 🏢 Smart Society Management System

A comprehensive MERN stack web application designed to automate and simplify residential society operations. The system provides a centralized platform for administrators, residents, security staff, and maintenance staff to efficiently manage society activities.

---

## 📌 Project Overview

The Smart Society Management System digitizes day-to-day society operations such as:

- Resident management
- Visitor tracking
- Complaint management
- Maintenance billing
- Facility booking
- Notices and announcements
- Polls and voting
- Dashboard analytics
- Notifications

The platform improves communication, transparency, security, and operational efficiency within residential communities.

---

# 🚀 Features

## 🔐 Authentication & Authorization

- User Registration
- Login & Logout
- JWT Authentication
- Password Encryption using Bcrypt
- Role-Based Access Control (RBAC)

---

## 👨‍👩‍👧 Resident Management

- Add Residents
- Edit Residents
- Delete Residents
- View Resident Details
- Flat Allocation
- Family Member Management
- Vehicle Registration
- Profile Management

---

## 🚶 Visitor Management

- Visitor Entry Registration
- Resident Approval
- Visitor History
- Entry and Exit Tracking
- Delivery Personnel Tracking

Visitor Flow:

```
Visitor Arrives
       ↓
Security Registers Visitor
       ↓
Resident Approval
       ↓
Entry Granted
       ↓
Exit Recorded
```

---

## 🛠 Complaint Management

Residents can raise complaints related to:

- Electrical Issues
- Plumbing Problems
- Water Supply Issues
- Cleaning Services
- Security Concerns
- Parking Issues
- Lift Maintenance

Complaint Status Flow:

```
Open
 ↓
Assigned
 ↓
In Progress
 ↓
Resolved
 ↓
Closed
```

---

## 💰 Maintenance Billing

- Monthly Bill Generation
- Invoice Management
- Payment Tracking
- Due Amount Monitoring
- Penalty Calculation

Bill Status:

- Pending
- Paid
- Overdue

---

## 🏊 Facility Booking System

Facilities Available:

- Club House
- Gymnasium
- Community Hall
- Swimming Pool
- Sports Court
- Garden Area

Features:

- Availability Check
- Online Booking
- Booking Approval
- Booking Cancellation
- Booking History

---

## 📢 Notice Management

- Society Notices
- Emergency Alerts
- Event Announcements
- Meeting Notifications
- Maintenance Schedules

---

## 🗳 Poll & Voting System

- Create Polls
- Online Voting
- Result Tracking
- Resident Participation

Examples:

- Society Event Planning
- Budget Approval
- Vendor Selection
- Community Decisions

---

## 📊 Dashboard & Analytics

### Admin Dashboard

- Total Residents
- Occupied Flats
- Visitor Statistics
- Complaint Statistics
- Revenue Summary
- Facility Usage Reports

### Resident Dashboard

- Pending Bills
- Active Complaints
- Upcoming Bookings
- Recent Notices
- Visitor Requests

### Security Dashboard

- Visitor Logs
- Entry/Exit Records

### Maintenance Dashboard

- Assigned Complaints
- Progress Updates

---

## 🔔 Notification System

- Visitor Approval Requests
- Complaint Updates
- Payment Reminders
- Booking Confirmations
- Society Announcements

---

# 👥 User Roles

### Admin

- Manage residents
- Manage complaints
- Publish notices
- Generate bills
- View reports
- Monitor visitors

### Resident

- View profile
- Raise complaints
- Pay bills
- Book facilities
- Approve visitors
- View notices

### Security Staff

- Register visitors
- Verify approvals
- Track visitor entries and exits

### Maintenance Staff

- View assigned complaints
- Update progress
- Resolve issues

---

# 🛠 Tech Stack

## Frontend

- React.js
- React Router DOM
- Bootstrap
- Axios
- Redux Toolkit

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Bcrypt
- Multer
- Nodemailer

## Database

- MongoDB Atlas

---

# 📂 Project Structure

```
Smart-Society-Management-System
│
├── backend
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── uploads
│   ├── utils
│   └── server.js
│
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── layouts
│   │   ├── redux
│   │   ├── services
│   │   └── App.jsx
│
└── README.md
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/yourusername/smart-society-management-system.git
```

---

## Backend Setup

```bash
cd backend
npm install
npm start
```

Server runs on:

```
http://localhost:5000
```

---

## Frontend Setup

```bash
cd frontend
npm install
npm start
```

Frontend runs on:

```
http://localhost:3000
```

---

# Environment Variables

Create a `.env` file inside backend:

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

EMAIL_USER=your_email

EMAIL_PASS=your_password
```

---

# API Endpoints

## Authentication

```
POST /api/auth/register
POST /api/auth/login
```

## Residents

```
GET /api/residents
GET /api/residents/:id
PUT /api/residents/:id
DELETE /api/residents/:id
```

## Visitors

```
POST /api/visitors
GET /api/visitors
```

## Complaints

```
POST /api/complaints
GET /api/complaints
PUT /api/complaints/:id
```

## Notices

```
POST /api/notices
GET /api/notices
```

---

# Future Enhancements

- Real-Time Notifications using Socket.IO
- Online Payment Gateway Integration
- QR-Based Visitor Entry System
- Mobile Application
- SMS Notifications
- AI-based Complaint Categorization
- Report Generation (PDF/Excel)

---

# Learning Outcomes

This project demonstrates:

- MERN Stack Development
- REST API Development
- Authentication & Authorization
- Role-Based Access Control
- Database Relationships
- State Management with Redux Toolkit
- File Upload Management
- Dashboard Development
- Production Deployment

---

# Developed By

**Dhwani Raychura**

Smart Society Management System using MERN Stack.
# ScreenShots
<img width="1917" height="554" alt="image" src="https://github.com/user-attachments/assets/33fd5c7b-2ce8-4f02-b400-d80c0d71dec8" />
<img width="1919" height="910" alt="image" src="https://github.com/user-attachments/assets/3d9d5eaa-f0be-47b1-acc6-9df5a6f1cc88" />
<img width="1918" height="912" alt="image" src="https://github.com/user-attachments/assets/46b66a44-8a26-414f-91d9-c47b10ef568f" />

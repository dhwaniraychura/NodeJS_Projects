
Project Overview
Corona Admin Dashboard — a Node.js + EJS server-side web application that provides an admin panel with authentication, a dashboard, and full user/admin CRUD management.

Tech Stack
LayerTechnologyRuntimeNode.jsFrameworkExpress.jsView EngineEJS (Embedded JavaScript templates)DatabaseMongoDB (via Mongoose)AuthCookie-based (cookie-parser)Passwordbcrypt (hashing)File UploadMulterDev ToolNodemon

Project Structure
corona-node-final/
├── app.js                  ← Entry point, server setup
├── config/
│   └── db.js               ← MongoDB connection
├── middleware/
│   └── authMiddleware.js   ← Cookie-based auth guard
├── models/
│   └── adminModels.js      ← Mongoose User schema + Multer config
├── controllers/
│   ├── userController.js   ← Auth + CRUD logic
│   └── dashboardController.js
├── routes/
│   ├── index.js            ← Public & protected page routes
│   └── userRoutes.js       ← User CRUD routes (/users/*)
├── views/                  ← EJS templates
│   ├── pages/
│   │   ├── dashboard.ejs
│   │   ├── admin/          ← addAdmin, editAdmin, viewAdmin
│   │   └── samples/        ← login, register, error pages
│   └── partials/           ← header, footer, navbar, sidebar
└── public/                 ← Static assets (CSS, JS, images, vendors)

How It Works
Authentication is cookie-based. When a user logs in successfully, the server sets a cookie named admin with the user's MongoDB _id. The authMiddleware checks for this cookie on every protected route — if missing, it redirects to /login. Logout clears the cookie.
User Model (adminModels.js) stores: username, email, password (hashed), gender, dob, role, city, and avtar (profile image path). Multer is configured as a static method on the model to handle avatar uploads saved to public/assets/images/avatars/.
Routes are split into two files:

index.js — handles auth (/login, /register, /logout) and general pages (dashboard, forms, tables)
userRoutes.js — handles all user CRUD at /users/* (add, view, edit, update, delete)

Controllers (userController.js) handle all the business logic: finding users, hashing passwords with bcrypt, managing file uploads, and rendering EJS views with appropriate data or error messages.

How to Run
bash# Install dependencies
npm install

# Start (production)
npm start

# Start (development with auto-reload)
npm run dev
The server runs on http://localhost:8001 and connects to a local MongoDB database named adminPanel.
# Screenshot 
<img width="1600" height="866" alt="WhatsApp Image 2026-05-13 at 6 53 37 AM" src="https://github.com/user-attachments/assets/062d7d86-2843-4f19-963f-2b8597021242" />
<img width="1600" height="853" alt="WhatsApp Image 2026-05-13 at 6 53 37 AM (1)" src="https://github.com/user-attachments/assets/970b945d-5c5a-41ac-8911-dc704ac5e0bb" />
<img width="1600" height="853" alt="WhatsApp Image 2026-05-13 at 6 53 38 AM" src="https://github.com/user-attachments/assets/b3e6f251-b41e-4388-b87d-882151435763" />


=======
# NodeJS_Projects


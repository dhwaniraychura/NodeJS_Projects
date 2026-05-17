# Corona Admin Dashboard

A full-stack **Node.js + EJS** admin panel with cookie-based authentication and complete user/admin CRUD management, built on the **Corona** admin template.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js |
| Framework | Express.js |
| View Engine | EJS (Embedded JavaScript Templates) |
| Database | MongoDB (via Mongoose) |
| Authentication | Cookie-based (`cookie-parser`) |
| Password Hashing | bcrypt |
| File Upload | Multer |
| Dev Tooling | Nodemon |

---

## Project Structure

```
corona-node-final/
├── app.js                        ← Entry point & server setup
├── config/
│   └── db.js                     ← MongoDB connection
├── middleware/
│   └── authMiddleware.js         ← Cookie-based auth guard
├── models/
│   └── adminModels.js            ← Mongoose User schema + Multer config
├── controllers/
│   ├── userController.js         ← Auth + CRUD business logic
│   └── dashboardController.js    ← Dashboard rendering
├── routes/
│   ├── index.js                  ← Public & protected page routes
│   └── userRoutes.js             ← User CRUD routes (/users/*)
├── views/                        ← EJS templates
│   ├── pages/
│   │   ├── dashboard.ejs
│   │   ├── admin/                ← addAdmin, editAdmin, viewAdmin
│   │   └── samples/              ← login, register, error pages
│   └── partials/                 ← header, footer, navbar, sidebar
└── public/                       ← Static assets (CSS, JS, images, vendors)
```

---

## Features

- **Authentication** — Register, login, and logout with cookie-based sessions
- **Protected Routes** — All dashboard and CRUD pages require an active session cookie
- **User Management** — Full CRUD: add, view, edit, update, and delete admin users
- **Avatar Upload** — Profile image upload via Multer, saved to `public/assets/images/avatars/`
- **Password Hashing** — All passwords hashed with bcrypt (salt rounds: 10)
- **Responsive UI** — Built on the Corona admin template with Bootstrap, Chart.js, and more

---

## How Authentication Works

1. On successful login, the server sets a cookie named `admin` containing the user's MongoDB `_id`.
2. `authMiddleware.js` checks for this cookie on every protected route — if missing, it redirects to `/login`.
3. Logout clears the `admin` cookie and redirects to `/login`.

---

## User Model Fields

| Field | Type | Notes |
|---|---|---|
| `username` | String | Required |
| `email` | String | Required, unique, lowercase |
| `password` | String | Required, stored as bcrypt hash |
| `gender` | String | Optional |
| `dob` | String | Optional |
| `role` | String | Optional |
| `city` | String | Optional |
| `avtar` | String | Path to uploaded profile image |

---

## Routes

### Public Routes
| Method | Path | Description |
|---|---|---|
| GET | `/login` | Login page |
| POST | `/login-user` | Handle login form submission |
| GET | `/register` | Register page |
| POST | `/register-user` | Handle register form submission |
| GET | `/logout` | Clear session cookie and redirect |

### Protected Routes (require `admin` cookie)
| Method | Path | Description |
|---|---|---|
| GET | `/` | Dashboard |
| GET | `/users/add` | Add user form |
| POST | `/users/add` | Create new user (with optional avatar) |
| GET | `/users/view` | List all users |
| GET | `/users/edit/:id` | Edit user form |
| POST | `/users/update/:id` | Update user (with optional avatar) |
| GET | `/users/delete/:id` | Delete user |

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- A running MongoDB instance or a MongoDB Atlas connection string

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd corona-node-final

# Install dependencies
npm install
```

### Configuration

Update the MongoDB connection string in `config/db.js`:

```js
await mongoose.connect('your-mongodb-connection-string');
```

### Running the App

```bash
# Production
npm start

# Development (auto-reload with nodemon)
npm run dev
```

The server starts on **http://localhost:8001**.

---

## Screenshots

> Login Page, Dashboard, and User Management views.
<img width="1894" height="867" alt="image" src="https://github.com/user-attachments/assets/df11a1b3-f135-4eab-b2c1-454b5e2bcc5c" />

---

## Dependencies

```json
{
  "bcrypt": "^6.0.0",
  "cookie-parser": "^1.4.7",
  "ejs": "^3.1.10",
  "express": "^4.22.1",
  "mongoose": "^8.23.1",
  "multer": "^1.4.5-lts.1"
}
```

Dev dependency: `nodemon ^3.1.14`

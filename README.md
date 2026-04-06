# ✦ TaskFlow — Todo Management System

A clean, real-time task management web application built with **Node.js**, **Express**, and **EJS**. Manage your tasks with priorities, statuses, and a beautiful dashboard — all in one place.

---

## 🚀 Features

- 📋 **Dashboard** — View all tasks with stats (Total, Pending, In Progress, Completed)
- ➕ **Add Tasks** — Create tasks with title, description, and priority level
- ✏️ **Edit Tasks** — Update task details anytime
- 🗑️ **Delete Tasks** — Remove tasks with confirmation prompt
- 🔄 **Status Flow** — Cycle tasks through `Pending → In Progress → Completed`
- 🎨 **Priority Badges** — Visual indicators for High, Medium, and Low priority
- 📱 **Responsive UI** — Works on desktop and mobile

---

## 🛠️ Tech Stack

| Layer      | Technology          |
|------------|---------------------|
| Runtime    | Node.js             |
| Framework  | Express.js v4       |
| Templating | EJS                 |
| Styling    | Bootstrap 5 + Custom CSS |
| Icons      | Bootstrap Icons     |
| Dev Tool   | Nodemon             |

---

## 📁 Project Structure

```
TodoApp/
├── views/
│   ├── partials/
│   │   └── header.ejs       # Navbar & HTML head
│   ├── dashboard.ejs        # Main dashboard page
│   ├── add-task.ejs         # Add new task form
│   └── edit-task.ejs        # Edit task form
├── public/
│   └── css/
│       └── style.css        # Custom styles
├── app.js                   # Express server & routes
├── package.json
└── README.md
```

## 📜 Available Scripts

| Command         | Description                          |
|-----------------|--------------------------------------|
| `npm start`     | Start server with Node.js            |
| `npm run dev`   | Start server with Nodemon (auto-reload) |

---

## 🔗 Routes

| Method | Route           | Description              |
|--------|-----------------|--------------------------|
| GET    | `/`             | Dashboard                |
| GET    | `/add`          | Show Add Task form       |
| POST   | `/add`          | Submit new task          |
| GET    | `/edit/:id`     | Show Edit Task form      |
| POST   | `/edit/:id`     | Submit task update       |
| POST   | `/delete/:id`   | Delete a task            |
| POST   | `/status/:id`   | Cycle task status        |

---

## 📌 Task Priority Levels

| Priority | Description                        |
|----------|------------------------------------|
| 🔴 High   | Urgent tasks that need immediate attention |
| 🟡 Medium | Important but not time-critical    |
| 🟢 Low    | Can be done when time permits      |

---

## 📌 Task Status Flow

```
Pending  →  In Progress  →  Completed  →  Pending (cycles)
```

---



---

> Built with ❤️ using Node.js & Express
ScreenShots
<img width="1919" height="912" alt="image" src="https://github.com/user-attachments/assets/56b0324b-6fb3-46ca-9cae-b96f0df09efb" />
<img width="1919" height="907" alt="image" src="https://github.com/user-attachments/assets/584dfa0e-442c-4e60-babd-37f36744d02d" />
<img width="1919" height="906" alt="image" src="https://github.com/user-attachments/assets/a6effd26-3535-4822-a9bf-a8c9de53af54" />



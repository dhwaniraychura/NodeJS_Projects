# 📚 Book Store Management System

A full-stack web application for managing a book store's inventory, built with **Node.js**, **Express.js**, **MongoDB**, **EJS**, and **Multer**.

---

## 🚀 Features

- ✅ **Add Books** — Add new books with title, author, category, price, quantity, description, and cover image
- 📖 **View All Books** — Browse the entire inventory in a responsive card grid with search and filter
- ✏️ **Edit Books** — Update any book's details or replace its cover image
- 🗑️ **Delete Books** — Permanently remove a book and its associated image
- 🖼️ **Image Upload** — Upload book cover images via Multer (stored in `/uploads`)
- 📊 **Dashboard Stats** — Total books, inventory value, and categories at a glance
- 🔍 **Search & Filter** — Search by title/author; filter by category

---

## 🗂️ Folder Structure

```
bookstore/
├── app.js                    # Entry point — Express server setup
├── package.json
├── README.md
│
├── config/
│   └── multerConfig.js       # Multer storage & file-filter config
│
├── models/
│   └── Book.js               # Mongoose schema & model
│
├── controllers/
│   └── bookController.js     # CRUD logic (getAllBooks, postAddBook, updateBook, deleteBook …)
│
├── routes/
│   └── bookRoutes.js         # Express router
│
├── views/
│   ├── partials/
│   │   ├── header.ejs        # Shared nav/head
│   │   └── footer.ejs        # Shared footer/scripts
│   ├── index.ejs             # Dashboard — list all books
│   ├── add.ejs               # Add book form
│   ├── edit.ejs              # Edit book form
│   ├── view.ejs              # Single book detail
│   └── 404.ejs               # Not found page
│
├── public/
│   ├── css/style.css         # Stylesheet
│   └── js/main.js            # Client-side scripts
│
└── uploads/                  # Book cover images (auto-created)
```

---

## 🗄️ MongoDB Schema

```js
const bookSchema = new mongoose.Schema({
  title:       { type: String, required: true, maxlength: 200 },
  author:      { type: String, required: true, maxlength: 100 },
  category:    { type: String, enum: ['Fiction','Non-Fiction','Science','Technology',
                  'Finance','Self-Help','Biography','History','Children',
                  'Comics','Romance','Mystery','Other'] },
  price:       { type: Number, required: true, min: 0 },
  quantity:    { type: Number, required: true, min: 0, default: 0 },
  description: { type: String, maxlength: 1000 },
  image:       { type: String, default: null }   // path to uploaded file
}, { timestamps: true });
```

---

## ⚙️ Installation & Setup

### Prerequisites
- Node.js v18+
- MongoDB running locally on port `27017`
- nodemon (installed as dev dependency)

### Steps

```bash
# 1. Clone the repo
git clone https://github.com/<your-username>/bookstore-management-system.git
cd bookstore-management-system

# 2. Install dependencies
npm install

# 3. Start MongoDB (if not already running)
mongod

# 4. Run with nodemon (development)
npm run dev

# 5. Open browser
http://localhost:3000
```

---

## 📡 API Routes

| Method | Route              | Description        |
|--------|--------------------|--------------------|
| GET    | `/`                | Dashboard — all books |
| GET    | `/books/add`       | Add book form      |
| POST   | `/books/add`       | Save new book      |
| GET    | `/books/:id`       | View single book   |
| GET    | `/books/:id/edit`  | Edit book form     |
| PUT    | `/books/:id`       | Update book        |
| DELETE | `/books/:id`       | Delete book        |

---

## 🛠️ Tech Stack

| Layer      | Technology          |
|------------|---------------------|
| Runtime    | Node.js             |
| Framework  | Express.js          |
| Database   | MongoDB + Mongoose  |
| Templating | EJS                 |
| File Upload| Multer              |
| Dev Server | Nodemon             |

---

## 📸 Screenshots

> Add screenshots of your running app here after launch.

---

## 👤 Author

Book Store Management System — Built for academic submission.

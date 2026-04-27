# 🎬 Netflix Clone — Movie App

A full-stack movie management web application built with **Node.js**, **Express**, **MongoDB**, and **EJS** templating. Styled with a Netflix-inspired dark UI using pure custom CSS.

---

## 📸 Features

- 🏠 **Home Page** — Centered hero banner + Trending Now movie grid
- ➕ **Add Movie** — Upload movie poster + fill all details
- 📋 **View Movies** — Table view of all movies with Edit & Delete actions
- 🎬 **Movie Detail Page** — Full detail view (poster + info layout)
- ✏️ **Edit Movie** — Pre-filled form to update movie details
- 🗑️ **Delete Movie** — Remove a movie from the database
- 📁 **Image Upload** — Poster images stored locally via Multer

---

## 🛠️ Tech Stack

| Layer      | Technology              |
|------------|-------------------------|
| Runtime    | Node.js                 |
| Framework  | Express.js v5           |
| Database   | MongoDB + Mongoose      |
| Templating | EJS                     |
| Styling    | Custom CSS (no framework)|
| File Upload| Multer                  |
| Dev Tool   | Nodemon                 |
| Config     | dotenv                  |

---

## 📁 Project Structure

```
MovieApp/
├── app.js                        # Entry point
├── .env                          # Environment variables
├── package.json
│
├── config/
│   └── db.js                     # MongoDB connection
│
├── controllers/
│   └── movieControllers.js       # All route logic
│
├── models/
│   └── movieModel.js             # Mongoose schema
│
├── routes/
│   └── movieRoutes.js            # All route definitions
│
├── views/
│   ├── header.ejs                # Shared header
│   ├── footer.ejs                # Shared footer
│   ├── index.ejs                 # Home page
│   ├── addMovie.ejs              # Add movie form
│   ├── viewMovie.ejs             # All movies table
│   ├── movieDetail.ejs           # Single movie detail
│   └── editMovie.ejs             # Edit movie form
│
└── public/
    └── assets/
        ├── css/
        │   ├── style.css         # Custom CSS
        │   └── fonts.css         # Jost font
        ├── fonts/                # Local font files
        ├── image/                # Static images (banner etc.)
        └── uploads/              # Uploaded movie posters
```

---

## ⚙️ Installation & Setup

### 1. Clone or Extract the Project

```bash
unzip MovieApp_redesigned.zip
cd MovieApp_new
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root folder (one already exists):

```env
PORT=9000
MONGO_URI=mongodb://localhost:27017/movieApp
```

> For **MongoDB Atlas**, replace `MONGO_URI` with your Atlas connection string.

### 4. Start MongoDB

Make sure MongoDB is running locally:

```bash
# On Windows
net start MongoDB

# On Mac/Linux
mongod
```

### 5. Run the App

```bash
npm start
```

The app will start at **http://localhost:9000**

---

## 🌐 Routes

| Method | Route                | Description            |
|--------|----------------------|------------------------|
| GET    | `/`                  | Home page              |
| GET    | `/add-movie`         | Show add movie form    |
| POST   | `/insertMovie`       | Save new movie         |
| GET    | `/view-movie`        | List all movies        |
| GET    | `/movie/:id`         | Movie detail page      |
| GET    | `/edit-movie/:id`    | Show edit form         |
| POST   | `/update-movie/:id`  | Update movie data      |
| GET    | `/delete/:id`        | Delete a movie         |

---

## 🗄️ Movie Schema (MongoDB)

```js
{
  title:       String,   // required
  releaseYear: String,   // required
  genre:       [String], // comma separated → array
  duration:    String,   // e.g. "2h 30m"
  language:    [String], // comma separated → array
  actors:      [String], // comma separated → array
  directors:   [String], // comma separated → array
  rating:      String,   // e.g. "8.5"
  description: String,   // required
  poster:      String,   // filename stored in /uploads
  createdAt:   Date,     // auto (timestamps)
  updatedAt:   Date      // auto (timestamps)
}
```

---

## 🔍 Checking Data in MongoDB Compass

1. Download & install **MongoDB Compass** from https://www.mongodb.com/try/download/compass
2. Open Compass and connect using:
   ```
   mongodb://localhost:27017
   ```
3. Open the **`movieApp`** database
4. Click the **`moviemodels`** collection
5. All your movies will be listed there ✅

---

## 📦 Dependencies

```json
{
  "dotenv":   "^16.4.5",
  "ejs":      "^5.0.2",
  "express":  "^5.2.1",
  "mongoose": "^9.4.1",
  "multer":   "^2.1.1",
  "nodemon":  "^3.1.14"
}
```

---

## 🚀 Scripts

```bash
npm start       # Start with nodemon (auto-restart on changes)
```

---

## 📝 Notes

- Movie **poster images** are stored in `public/assets/uploads/`
- When **editing** a movie, leave the poster field empty to keep the existing poster
- Genre, Language, Actors, and Directors fields accept **comma-separated** values
- The app uses **EJS** partials (`header.ejs`, `footer.ejs`) shared across all pages

---

## 👨‍💻 Built With

- Node.js + Express for the backend
- MongoDB + Mongoose for the database
- EJS for server-side HTML rendering
- 100% Custom CSS — no Bootstrap or Tailwind
- Multer for file/image uploads
- Nodemon for development auto-restart

---
## Screen Shots
<img width="1898" height="874" alt="image" src="https://github.com/user-attachments/assets/17e3c7bd-e8aa-41ad-88f4-cc70d0cde2b8" />
<img width="921" height="872" alt="image" src="https://github.com/user-attachments/assets/36be0326-9cb3-4ec7-b3ae-b3a27b5e3ab5" />
<img width="1901" height="861" alt="image" src="https://github.com/user-attachments/assets/35ee9bdd-df61-4e78-9c9e-85ee3f6d9666" />
<img width="1919" height="871" alt="image" src="https://github.com/user-attachments/assets/038751dc-2d0f-4ee3-90b1-3d24ff019c7f" />
<img width="1898" height="861" alt="image" src="https://github.com/user-attachments/assets/788305fa-9ee8-4a3b-a237-30922f876437" />





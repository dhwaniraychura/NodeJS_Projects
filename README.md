# The Hearth Book — Recipe Sharing Platform

A full-stack recipe sharing platform built with Node.js, Express, MongoDB (Mongoose), and EJS. Features JWT-based authentication via cookies, role-based access control, multi-user recipe management, and a dark culinary-themed UI.

## Features

- **Authentication**: Register/login with hashed passwords (bcrypt), JWT issued as an HTTP-only cookie, logout clears the cookie.
- **Role-Based Access**: `user` and `admin` roles stored in the JWT payload. Admins can edit/delete any recipe or comment; users can only manage their own.
- **Multiuser Support**: Every user has their own recipe collection (`User.recipes`), with "My Recipes" and "All Recipes" views.
- **Recipes**: Full CRUD (create, view, edit, delete) with title, description, ingredients, instructions, cooking time, category, and image.
- **Comments**: Authenticated users can comment on recipes; authors/admins can delete comments.
- **Culinary Theme**: Dark, editorial design using Playfair Display + DM Sans, saffron/paprika accents, recipe cards, and a styled navbar.

## Project Structure

```
recipe-app/
├── server.js                 # App entry point
├── .env                       # Environment variables
├── models/
│   ├── User.js
│   ├── Recipe.js
│   └── Comment.js
├── controllers/
│   ├── authController.js
│   └── recipeController.js
├── middleware/
│   └── auth.js               # JWT verification, requireAuth, requireRole
├── routes/
│   ├── authRoutes.js
│   └── recipeRoutes.js
├── views/
│   ├── partials/
│   │   ├── head.ejs
│   │   ├── navbar.ejs
│   │   └── footer.ejs
│   ├── recipeList.ejs
│   ├── myRecipes.ejs
│   ├── recipeForm.ejs
│   ├── recipeItem.ejs
│   ├── login.ejs
│   ├── register.ejs
│   └── error.ejs
└── public/
    ├── css/style.css
    └── images/default-recipe.svg
```

## Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Configure environment** — edit `.env`:
   ```
   MONGO_URI=mongodb://127.0.0.1:27017/recipe-platform
   JWT_SECRET=your_secret_key
   PORT=3000
   ```
   Use a MongoDB Atlas connection string if you don't have local MongoDB.

3. **Start MongoDB** (if running locally):
   ```bash
   mongod
   ```

4. **Run the server**:
   ```bash
   npm start
   ```

5. Visit `http://localhost:3000` — it redirects to `/recipes`.

## Usage Notes

- **Register** at `/register`. You can choose "Home Cook" (user) or "Admin Chef" (admin) — in production, restrict admin signup further (e.g. invite codes).
- **Login** at `/login` issues a JWT stored in an HTTP-only cookie (`token`), valid for 1 day.
- **Logout** at `/logout` clears the cookie.
- **My Recipes** (`/recipes/my`) shows only the logged-in user's recipes.
- **All Recipes** (`/recipes`) is public and shows everyone's recipes.
- Only the recipe's author or an `admin` can edit/delete a recipe or its comments.

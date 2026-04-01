# 🖥️ Custom Server Builder

A Node.js HTTP server built using only the built-in `http`, `fs`, and `url` modules — no Express, no third-party frameworks.

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) v14 or higher

### Run the Server

```bash
node server.js
```

Server starts at **http://localhost:8005**

---

## 📁 Project Structure

```
project/
├── server.js
└── pages/
    ├── index.html
    ├── about.html
    ├── contact.html
    ├── services.html
    ├── user.html
    ├── status.html
    └── 404.html
```

---

## 📬 Routes

| Route | Method | Response Type | Status Code | Description |
|-------|--------|---------------|-------------|-------------|
| `/` | GET | HTML | 200 | Home page |
| `/about` | GET | HTML | 200 | About page |
| `/contact` | GET | HTML | 200 | Contact page |
| `/services` | GET | HTML | 200 | Services page |
| `/user?name=Rahul` | GET | HTML | 200 | User page with query param |
| `/api/status` | GET | JSON | 200 | Live server status |
| `/*` | GET | HTML | 404 | Page not found |

---

## ⚡ Features

- ✅ Built-in `http` module — no Express
- ✅ HTML files served using `fs.readFile`
- ✅ Query parameter handling — `/user?name=Dhwani`
- ✅ Template replacement — `{{name}}` and `{{status}}` placeholders
- ✅ JSON response — `/api/status`
- ✅ Custom 404 page
- ✅ 500 error handling

---

## 🔍 How Query Parameter Works

When you visit:
```
http://localhost:8005/user?name=Rahul
```

Server reads the name from URL:
```javascript
const name = parsedURL.query.name || "Guest";
```

Then replaces `{{name}}` in `user.html` with `Dhwani`:
```javascript
const html = data.toString().replace("{{name}}", name);
```

---

## 🔍 How to Check Status Codes

Status codes are not visible directly in the browser. To see them:

1. Open browser and go to `http://localhost:8005/api/status`
2. Press `F12` to open DevTools
3. Go to **Network** tab
4. Refresh the page `Ctrl + R`
5. Click on **api/status**
6. You will see `Status Code: 200 OK`

---

## 🗂️ Modules Used

| Module | Purpose |
|--------|---------|
| `http` | Create the server |
| `fs` | Read HTML files |
| `url` | Parse URL and query parameters |

> No `npm install` needed — all modules are built into Node.js!

---


---

*Built with ❤️ using Node.js — no frameworks, no dependencies.*
<img width="1919" height="853" alt="image" src="https://github.com/user-attachments/assets/ba4cee30-5244-47fc-a167-64f99d572ce9" />
<img width="1064" height="706" alt="image" src="https://github.com/user-attachments/assets/8f781cd6-4553-46a5-90c2-ca8aaf02bb16" />
<img width="1096" height="690" alt="image" src="https://github.com/user-attachments/assets/50942de1-2d34-4171-917a-e97373133b2d" />
<img width="983" height="755" alt="image" src="https://github.com/user-attachments/assets/ea8518dc-845a-4e6e-a7d7-f3a8178da6ee" />
<img width="1107" height="491" alt="image" src="https://github.com/user-attachments/assets/60333030-eb1a-4d24-a04d-49facc86b9a2" />




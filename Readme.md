# Blog App

A modern, production-ready **Blog Web Application** built with **Node.js, Express, MySQL, and EJS**.  
The app supports **full CRUD operations** for blog posts, **auto-creates the database and tables** if they don’t exist, and features a **clean, modern UI**.

---

## 🚀 Features

### Core Features
- Create, Read, Update, Delete (CRUD) blog posts
- Read single post or all posts
- Optional pagination for listing posts
- Auto database & table creation on startup
- Default admin user creation
- RESTful API endpoints for integration

### UI Features
- Modern and clean design using **TailwindCSS**
- Responsive layout
- Simple navigation for creating and viewing posts

### Database
- **MySQL** (local for development, ready for AWS RDS)
- Tables: `users` & `posts`
- Foreign key relationship between posts and users

---

## 📦 Tech Stack

- **Backend:** Node.js (latest LTS)
- **Framework:** Express.js
- **Database:** MySQL
- **Database Driver:** mysql2 (promise-based)
- **Templating:** EJS
- **Styling:** TailwindCSS
- **Environment Variables:** dotenv
- **Development:** nodemon

---

## 🗄 Database Schema

### `users` table
| Column      | Type          | Notes                    |
|------------ |---------------|--------------------------|
| id          | INT           | Primary Key, Auto Increment |
| name        | VARCHAR(100)  | User name                |
| email       | VARCHAR(100)  | Unique                   |
| created_at  | TIMESTAMP     | Default CURRENT_TIMESTAMP |

### `posts` table
| Column      | Type         | Notes                         |
|------------ |-------------|-------------------------------|
| id          | INT          | Primary Key, Auto Increment   |
| title       | VARCHAR(255) | Not null                      |
| content     | TEXT         | Not null                      |
| user_id     | INT          | Foreign Key → users.id        |
| created_at  | TIMESTAMP    | Default CURRENT_TIMESTAMP     |

---

## ⚙️ Installation & Setup

1. **Clone the repo**
```bash
git clone <your-repo-url>
cd blog-app
```
## Install dependencies
```bash
npm install
Configure environment variables (.env file)
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=blogdb
DB_PORT=3306
PORT=5000
Run the application
npm run dev
```

The app will auto-create the database and tables if they do not exist.
Open your browser at: http://localhost:5000

### 🛣️ API Endpoints
Method	Route	Description
GET	/api/posts	Get all posts (with pagination)
GET	/api/posts/:id	Get single post by ID
POST	/api/posts	Create a new post
PUT	/api/posts/:id	Update a post by ID
DELETE	/api/posts/:id	Delete a post by ID
### 💡 Notes
Default admin user is created automatically (name: Admin User, email: admin@example.com)
The app is production-ready and can easily be migrated to AWS RDS.
Port conflict is handled gracefully with auto-increment retry logic.
###🖌 UI
Modern, minimalistic design using TailwindCSS
Clean forms for creating posts
Responsive layout

### 🔥 Future Improvements
User authentication & authorization (JWT)
Edit/Delete posts via UI
Dark mode toggle
Docker setup + AWS deployment
AI-powered blog generator

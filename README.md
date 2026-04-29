# mern-task-be-api-v4
MERN Task API

# 🧩 MERN Task Management API (Auth + Admin + User)

A robust Node.js + Express backend application that provides authentication, role-based access (Admin & User), and task management features. This API is designed to be used with any frontend (React, Angular, etc.) or as a standalone service.

---

## 🚀 Features

### 🔐 Authentication

* User registration & login
* JWT-based authentication
* Password hashing using bcrypt
* Secure protected routes

### 👥 Role-Based Access

* **Admin**

  * Manage all users
  * View all tasks
  * Delete/update any task
* **User**

  * Register & login
  * Create, update, delete own tasks
  * View personal tasks only

### 📋 Task Management

* Create tasks
* Update tasks
* Delete tasks
* Mark tasks as completed
* Filter tasks (optional enhancement)

---

## 🛠️ Tech Stack

* Node.js
* Express.js
* MongoDB + Mongoose
* JSON Web Token (JWT)
* bcryptjs

---

## 📁 Project Structure

```
project-root/
│
├── controllers/
│   ├── authController.js
│   ├── taskController.js
│   └── userController.js
│
├── middleware/
│   ├── authMiddleware.js
│   └── roleMiddleware.js
│
├── models/
│   ├── User.js
│   └── Task.js
│
├── routes/
│   ├── authRoutes.js
│   ├── taskRoutes.js
│   └── userRoutes.js
│
├── config/
│   └── db.js
│
├── .env
├── server.js
└── package.json
```

---

## ⚙️ Installation & Setup

### 1. Clone the repository

```
git clone https://github.com/yraviui/mern-task-be-api-v4.git
cd your-repo-name
```

### 2. Install dependencies

```
npm install
```

### 3. Create `.env` file

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### 4. Run the server

```
npm run dev
```

Server will start at:

```
http://localhost:5000
```

---

## 🔑 API Endpoints

### Auth Routes

| Method | Endpoint           | Description   |
| ------ | ------------------ | ------------- |
| POST   | /api/auth/register | Register user |
| POST   | /api/auth/login    | Login user    |

---

### User Routes (Admin Only)

| Method | Endpoint       | Description   |
| ------ | -------------- | ------------- |
| GET    | /api/users     | Get all users |
| DELETE | /api/users/:id | Delete user   |

---

### Task Routes

#### User

| Method | Endpoint       | Description    |
| ------ | -------------- | -------------- |
| GET    | /api/tasks     | Get user tasks |
| POST   | /api/tasks     | Create task    |
| PUT    | /api/tasks/:id | Update task    |
| DELETE | /api/tasks/:id | Delete task    |

#### Admin

| Method | Endpoint       | Description   |
| ------ | -------------- | ------------- |
| GET    | /api/tasks/all | Get all tasks |

---

## 🔒 Middleware

* **authMiddleware**

  * Verifies JWT token
  * Protects private routes

* **roleMiddleware**

  * Restricts access based on roles (Admin/User)

---

## 🧪 Testing

You can test APIs using:

* Postman
* Thunder Client (VS Code)

---

## 📌 Future Enhancements

* Pagination & search
* Task priority & deadlines
* Email notifications
* Refresh tokens
* Docker support

---

## 🤝 Contributing

Contributions are welcome! Feel free to fork this repo and submit a pull request.

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

Developed by Ravi prakash Yalavarthi

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub!

# 📝 Task Manager - Full Stack

A beautiful, feature-rich task manager application built with React, Node.js, Express, and SQLite.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen.svg)
![React](https://img.shields.io/badge/react-18.0.0-blue.svg)

## ✨ Features

- ✅ Create, read, update, and delete tasks
- 📁 Organize tasks by category (Personal, Work, Shopping, Health, Other)
- 🎯 Set priority levels (Low, Medium, High)
- 📅 Add due dates with overdue warnings
- ✔️ Mark tasks as completed
- 🎨 Beautiful glassmorphic UI with smooth animations
- 💾 Persistent storage with SQLite database
- 🔍 Filter tasks by status and category
- 📊 Real-time statistics dashboard

## 🛠️ Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **SQLite3** - Lightweight database
- **CORS** - Cross-origin resource sharing

### Frontend (Coming Soon)
- **React** - UI library
- **Tailwind CSS** - Styling
- **Lucide React** - Icons

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
   git clone https://github.com/pvirguez/task-manager-fullstack.git
   cd task-manager-fullstack
```

2. **Install backend dependencies**
```bash
   cd backend
   npm install
```

3. **Start the backend server**
```bash
   npm run dev
```
   
   The backend will run on `http://localhost:5000`

### Frontend Setup (Coming Soon)
```bash
cd frontend
npm install
npm start
```

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/tasks` | Get all tasks |
| `POST` | `/api/tasks` | Create a new task |
| `PUT` | `/api/tasks/:id` | Update a task |
| `DELETE` | `/api/tasks/:id` | Delete a task |

### Example API Request

**Create a new task:**
```bash
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Buy groceries",
    "category": "Shopping",
    "priority": "high",
    "dueDate": "2024-12-15"
  }'
```

## 📁 Project Structure
```
task-manager-fullstack/
├── backend/
│   ├── database.js      # Database configuration
│   ├── server.js        # Express API server
│   └── package.json     # Backend dependencies
├── frontend/            # React app (coming soon)
├── .gitignore
└── README.md
```

## 🗄️ Database Schema

### Tasks Table
```sql
CREATE TABLE tasks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  text TEXT NOT NULL,
  completed BOOLEAN DEFAULT 0,
  category TEXT,
  priority TEXT,
  dueDate TEXT,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
)
```

## 🎯 Roadmap

- [x] Backend API with Express
- [x] SQLite database integration
- [x] CRUD operations for tasks
- [ ] React frontend
- [ ] User authentication
- [ ] Task search functionality
- [ ] Task editing
- [ ] Dark/light mode toggle
- [ ] Task sharing/collaboration
- [ ] Mobile responsive design
- [ ] Deploy to production

## 🤝 Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

## 📝 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Pedro Virguez**
- GitHub: [@pvirguez](https://github.com/pvirguez)

---

⭐ If you found this project helpful, please consider giving it a star!

Built with ❤️ as a learning project
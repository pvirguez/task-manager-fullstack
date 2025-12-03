const sqlite3 = requiere('sqlite3').verbose();
const path = require('path');

// Create DB files
const dbPath = path.join(__dirname, 'task.db');
const db = new sqlite3.Database(dbPath);

// Create tasks table if it dosen't exist
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS taks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            text TEXT NOT NULL,
            completed BOOLEAN DEFAULT 0,
            category TEXT,
            priority TEXT,
            dueDate TEXT,
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
        )
        
    `);
});

module.exports = db;
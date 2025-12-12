const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Create DB files
const dbPath = path.join(__dirname, 'task.db');
const db = new sqlite3.Database(dbPath);

// Create tasks table if it doesn't exist
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS tasks (
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
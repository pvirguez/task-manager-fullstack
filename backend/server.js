const express = require('express');
const cors = require('cors');
const db = require('./database');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json()); // Parse JSON request bodies

// GET all tasks
app.get('/api/tasks', (req, res) => {
  db.all('SELECT * FROM tasks ORDER BY createdAt DESC', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// POST create a new task
app.post('/api/tasks', (req, res) => {
  const { text, category, priority, dueDate } = req.body;
  
  db.run(
    'INSERT INTO tasks (text, category, priority, dueDate) VALUES (?, ?, ?, ?)',
    [text, category, priority, dueDate],
    function(err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ id: this.lastID, text, category, priority, dueDate, completed: 0 });
    }
  );
});

// PUT update a task (toggle completed or edit)
app.put('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { completed, text, category, priority, dueDate } = req.body;
  
  let query = 'UPDATE tasks SET ';
  let params = [];
  
  if (completed !== undefined) {
    query += 'completed = ? ';
    params.push(completed ? 1 : 0);
  }
  
  query += 'WHERE id = ?';
  params.push(id);
  
  db.run(query, params, function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Task updated', changes: this.changes });
  });
});

// DELETE a task
app.delete('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  
  db.run('DELETE FROM tasks WHERE id = ?', [id], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Task deleted', changes: this.changes });
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
import React, { useState, useEffect } from 'react';
import { Check, Trash2, Plus, Calendar, AlertCircle } from 'lucide-react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [category, setCategory] = useState('Personal');
  const [priority, setPriority] = useState('medium');
  const [dueDate, setDueDate] = useState('');
  const [loading, setLoading] = useState(true);

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api/tasks';

  // Fetch tasks from backend
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setTasks(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      setLoading(false);
    }
  };

  // Add a new task
  const addTask = async () => {
    if (inputValue.trim()) {
      try {
        const response = await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            text: inputValue,
            category,
            priority,
            dueDate
          })
        });
        const newTask = await response.json();
        setTasks([newTask, ...tasks]);
        setInputValue('');
        setDueDate('');
      } catch (error) {
        console.error('Error adding task:', error);
      }
    }
  };

  // Toggle task completion
  const toggleTask = async (id, completed) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: completed ? 0 : 1 })
      });
      setTasks(tasks.map(task =>
        task.id === id ? { ...task, completed: !completed } : task
      ));
    } catch (error) {
      console.error('Error toggling task:', error);
    }
  };

  // Delete a task
  const deleteTask = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
      });
      setTasks(tasks.filter(task => task.id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return 'text-red-500';
      case 'medium': return 'text-yellow-500';
      case 'low': return 'text-green-500';
      default: return 'text-gray-500';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-2xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 sm:p-6 md:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 md:mb-8 text-center">
          Task Manager
        </h1>

        {/* Add Task Form */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 sm:p-6 mb-4 sm:mb-6 border border-white/20">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addTask()}
            placeholder="What needs to be done?"
            className="w-full bg-white/5 text-white px-4 py-3 text-base rounded-lg mb-4 border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-purple-300"
          />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-4">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="bg-white/5 text-white px-4 py-3 text-base rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="Personal">Personal</option>
              <option value="Work">Work</option>
              <option value="Shopping">Shopping</option>
              <option value="Health">Health</option>
              <option value="Other">Other</option>
            </select>

            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="bg-white/5 text-white px-4 py-3 text-base rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>

            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="bg-white/5 text-white px-4 py-3 text-base rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          
          <button
            onClick={addTask}
            className="w-full bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg font-medium transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
          >
            <Plus size={20} />
            Add Task
          </button>
        </div>

        {/* Task List */}
        <div className="space-y-3">
          {tasks.length === 0 ? (
            <div className="text-center py-12 text-purple-300">
              <p className="text-lg">No tasks yet!</p>
              <p className="text-sm mt-2">Add your first task above</p>
            </div>
          ) : (
            tasks.map(task => (
              <div
                key={task.id}
                className={`bg-white/10 backdrop-blur-lg rounded-xl p-3 sm:p-4 border border-white/20 transition-all hover:bg-white/15 ${
                  task.completed ? 'opacity-60' : ''
                }`}
              >
                <div className="flex items-start gap-2 sm:gap-3">
                  <button
                    onClick={() => toggleTask(task.id, task.completed)}
                    className={`mt-0.5 sm:mt-1 w-7 h-7 sm:w-6 sm:h-6 rounded-lg border-2 flex items-center justify-center transition-all flex-shrink-0 ${
                      task.completed
                        ? 'bg-green-500 border-green-500'
                        : 'border-purple-400 hover:border-purple-300'
                    }`}
                  >
                    {task.completed && <Check size={16} className="text-white" />}
                  </button>

                  <div className="flex-1 min-w-0">
                    <p className={`text-white text-sm sm:text-base break-words ${task.completed ? 'line-through' : ''}`}>
                      {task.text}
                    </p>

                    <div className="flex flex-wrap gap-2 mt-2 items-center">
                      <span className="px-2 py-1 bg-white/10 rounded text-xs text-purple-300 border border-white/20">
                        {task.category}
                      </span>

                      <span className={`flex items-center gap-1 text-xs ${getPriorityColor(task.priority)}`}>
                        <AlertCircle size={12} />
                        {task.priority}
                      </span>

                      {task.dueDate && (
                        <span className="flex items-center gap-1 text-xs text-purple-300">
                          <Calendar size={12} />
                          {new Date(task.dueDate).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => deleteTask(task.id)}
                    className="text-red-400 hover:text-red-300 transition-colors p-2 sm:p-2 hover:bg-red-500/10 rounded-lg flex-shrink-0"
                  >
                    <Trash2 size={20} className="sm:w-[18px] sm:h-[18px]" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

let tasks = [];
let idCounter = 1;

// Create Task
app.post('/tasks', (req, res) => {
  const { name, description } = req.body;
  if (!name) return res.status(400).json({ error: 'Task name is required' });
  const newTask = { id: idCounter++, name, description };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// Get Tasks
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// Update Task
app.put('/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id == req.params.id);
  if (!task) return res.status(404).json({ error: 'Task not found' });
  task.name = req.body.name || task.name;
  task.description = req.body.description || task.description;
  res.json(task);
});

// Delete Task
app.delete('/tasks/:id', (req, res) => {
  const index = tasks.findIndex(t => t.id == req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Task not found' });
  const deleted = tasks.splice(index, 1);
  res.json(deleted[0]);
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

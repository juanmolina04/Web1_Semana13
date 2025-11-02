const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../data/tasks.json');

// Lee las tareas desde el archivo JSON
function readTasks() {
  if (!fs.existsSync(filePath)) return [];
  const data = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(data || '[]');
}

// Guarda las tareas en el archivo JSON
function writeTasks(tasks) {
  fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));
}

// GET /tasks
exports.getAll = (req, res) => {
  const { status } = req.query;
  let tasks = readTasks();
  if (status) tasks = tasks.filter(t => t.status === status);
  res.json(tasks);
};

// GET /tasks/:id
exports.getById = (req, res) => {
  const tasks = readTasks();
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) return res.status(404).json({ message: 'Task not found' });
  res.json(task);
};

// POST /tasks
exports.create = (req, res) => {
  const { title, description } = req.body;
  if (!title) return res.status(400).json({ message: 'Title is required' });

  const tasks = readTasks();
  const newTask = {
    id: tasks.length ? Math.max(...tasks.map(t => t.id)) + 1 : 1,
    title,
    description: description || '',
    status: 'todo', // por defecto
  };
  tasks.push(newTask);
  writeTasks(tasks);
  res.status(201).json(newTask);
};

// PUT /tasks/:id
exports.update = (req, res) => {
  const { title, description, status } = req.body;
  const tasks = readTasks();
  const idx = tasks.findIndex(t => t.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ message: 'Task not found' });

  tasks[idx] = {
    id: tasks[idx].id,
    title: title || '',
    description: description || '',
    status: status || 'todo',
  };

  writeTasks(tasks);
  res.json(tasks[idx]);
};

// PATCH /tasks/:id/status
exports.updateStatus = (req, res) => {
  const { status } = req.body;
  const valid = ['todo', 'doing', 'done'];
  if (!valid.includes(status))
    return res.status(400).json({ message: 'Invalid status' });

  const tasks = readTasks();
  const idx = tasks.findIndex(t => t.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ message: 'Task not found' });

  tasks[idx].status = status;
  writeTasks(tasks);
  res.json(tasks[idx]);
};

// DELETE /tasks/:id
exports.remove = (req, res) => {
  const tasks = readTasks();
  const idx = tasks.findIndex(t => t.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ message: 'Task not found' });

  tasks.splice(idx, 1);
  writeTasks(tasks);
  res.json({ message: 'Task deleted successfully' });
};

// GET /tasks/summary
exports.getSummary = (req, res) => {
  const tasks = readTasks();
  const summary = {
    todo: tasks.filter(t => t.status === 'todo').length,
    doing: tasks.filter(t => t.status === 'doing').length,
    done: tasks.filter(t => t.status === 'done').length,
  };
  res.json(summary);
};

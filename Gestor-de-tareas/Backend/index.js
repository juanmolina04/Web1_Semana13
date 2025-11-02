const express = require('express');
const cors = require('cors');
const tasksRouter = require('./routes/tasks');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use('/tasks', tasksRouter);

// Servir una raíz básica
app.get('/', (req, res) => {
  res.send('API de tareas funcionando ✅');
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

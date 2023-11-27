const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

// Lista de tareas
let tasks = [
  { id: 1, description: 'Sacar al perro', completed: false },
  { id: 2, description: 'Estudiar React', completed: true },
];

// Crear una nueva tarea
app.post('/tasks', (req, res) => {
  const { description } = req.body;
  const newTask = { id: tasks.length + 1, description, completed: false };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// Actualizar una tarea
app.put('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = tasks.find(task => task.id === taskId);

  if (!task) {
    res.status(404).json({ error: 'Tarea no encontrada' });
  } else {
    task.description = req.body.description || task.description;
    task.completed = req.body.completed || task.completed;
    res.status(200).json(task);
  }
});

// Eliminar una tarea
app.delete('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  tasks = tasks.filter(task => task.id !== taskId);
  res.status(204).end();
});

// Listar todas las tareas
app.get('/tasks', (req, res) => {
  res.status(200).json(tasks);
});

// Obtener tareas completas e incompletas
app.get('/tasks/completed', (req, res) => {
  const completedTasks = tasks.filter(task => task.completed);
  const incompleteTasks = tasks.filter(task => !task.completed);
  res.status(200).json({ completed: completedTasks, incomplete: incompleteTasks });
});

// Obtener una sola tarea
app.get('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = tasks.find(task => task.id === taskId);

  if (!task) {
    res.status(404).json({ error: 'Tarea no encontrada' });
  } else {
    res.status(200).json(task);
  }
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
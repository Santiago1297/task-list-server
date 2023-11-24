const express = require('express');
const router = express.Router();

// Lista de tareas
const tasks = [
  {
    id: '123456',
    isCompleted: false,
    description: 'Walk the dog',
  },
  {
    id: '234567',
    isCompleted: true,
    description: 'Study React',
  },
];

// Ruta para listar tareas completas
router.get('/completed', (req, res) => {
  const completedTasks = tasks.filter(task => task.isCompleted === true);
  res.json(completedTasks);
});

// Ruta para listar tareas incompletas
router.get('/incomplete', (req, res) => {
  const incompleteTasks = tasks.filter(task => task.isCompleted === false);
  res.json(incompleteTasks);
});

module.exports = router;
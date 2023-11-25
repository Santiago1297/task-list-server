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

// Middleware para gestionar errores en parámetros de la ruta
router.use((req, res, next) => {
  const validParams = ['completed', 'incomplete'];
  const param = req.params[0];

  if (!validParams.includes(param)) {
    return res.status(400).json({ error: 'Parámetros de la ruta incorrectos' });
  }

  next();
});

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
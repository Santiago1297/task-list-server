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

// Middleware para gestionar errores en solicitudes POST y PUT
router.use((req, res, next) => {
  if ((req.method === 'POST' || req.method === 'PUT') && Object.keys(req.body).length === 0) {
    return res.status(400).json({ error: 'Cuerpo de la solicitud vacío' });
  }

  const { description } = req.body;
  if (req.method === 'POST' && (!description || typeof description !== 'string')) {
    return res.status(400).json({ error: 'Información no válida o atributos faltantes para crear las tareas' });
  }

  next();
});

// Ruta para crear una nueva tarea (POST)
router.post('/', (req, res) => {
  const description = req.body.description;

  // if (!description) {
  //   return res.status(400).json({ error: 'La descripción de la tarea es obligatoria' });
  // }
  
  const newTask = {
    id: Math.random().toString(), // Se genera un ID aleatorio
    isCompleted: false,
    description,
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

// Ruta para eliminar una tarea por su ID (DELETE)
router.delete('/:id', (req, res) => {
  const taskId = req.params.id;
  const taskIndex = tasks.findIndex(task => task.id === taskId);

  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Tarea no encontrada' });
  }

  const deletedTask = tasks.splice(taskIndex, 1)[0];
  res.json(deletedTask);
});

// Ruta para actualizar una tarea por su ID (UPDATE)
router.put('/:id', (req, res) => {
  const taskId = req.params.id;
  const { description, isCompleted } = req.body;
  const task = tasks.find(task => task.id === taskId);

  if (!task) {
    return res.status(404).json({ error: 'Tarea no encontrada' });
  }

  if (description) {
    task.description = description;
  }

  if (isCompleted !== undefined) {
    task.isCompleted = isCompleted;
  }

  res.json(task);
});

module.exports = router;

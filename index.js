const express = require('express');
const app = express();
const port = 3000;

// Importa el enrutador de listas
const listViewRouter = require('./list-view-router');
const listEditRouter = require('./list-edit-router');

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

// Ruta principal para listar todas las tareas
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// Se asocia el enrutador de List View Router y List Edit Router
app.use('/listview', listViewRouter);
app.use('/tasks/edit', listEditRouter);

app.listen(port, () => {
  console.log(`Servidor Express escuchando en el puerto ${port}`);
});
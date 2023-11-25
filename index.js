const express = require('express');
const app = express();
const port = 3000;

// Importa el enrutador de listas
const listViewRouter = require('./list-view-router');
const listEditRouter = require('./list-edit-router');

// Middleware para gestionar solicitudes por métodos HTTP válidos
app.use((req, res, next) => {
  if (req.method === 'GET' || req.method === 'POST' || req.method === 'PUT' || req.method === 'DELETE') {
    next();
  } else {
    res.status(400).json({ error: 'Método HTTP no válido' });
  }
});

app.use(express.json());

// Se asocia el enrutador de List View Router y List Edit Router
app.use('/view', listViewRouter);
app.use('/edit', listEditRouter);

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
app.get('/', (req, res) => {
  res.json(tasks);
});

app.listen(port, () => {
  console.log(`Servidor Express escuchando en el puerto ${port}`);
});
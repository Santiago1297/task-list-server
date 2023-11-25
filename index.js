const express = require('express');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = 3000;

// Importa el enrutador de listas
const listViewRouter = require('./list-view-router');
const listEditRouter = require('./list-edit-router');
const authRouter = require('./auth-router');

// Middleware para gestionar solicitudes por métodos HTTP válidos
app.use((req, res, next) => {
  if (req.method === 'GET' || req.method === 'POST' || req.method === 'PUT' || req.method === 'DELETE') {
    next();
  } else {
    res.status(400).json({ error: 'Método HTTP no válido' });
  }
});

app.use(express.json());

// Middleware para proteger rutas con JWT
app.use('/protected', authenticateToken);

// Se asocia el enrutador de List View Router y List Edit Router
app.use('/view', listViewRouter);
app.use('/edit', listEditRouter);
app.use('/login', authRouter);

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

// Middleware para verificar el token JWT
function authenticateToken(req, res, next) {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ error: 'Acceso no autorizado' });

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ error: 'Token no válido' });

    req.user = user;
    next();
  });
}
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(helmet());

// Ruta base
app.get('/', (req, res) => {
  res.send('API EMPLIFI funcionando correctamente');
});

// Ejecutar servidor
app.listen(4000, () => {
  console.log('Backend EMPLIFI corriendo en http://localhost:4000');
});

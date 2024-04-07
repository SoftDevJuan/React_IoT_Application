import app from "./app.js";
import { connectDB } from './db.js'
import cors from 'cors'

const PORT = 3000;

// Habilita CORS
app.use(cors());

const server = app.listen(PORT, '0.0.0.0', () => {
  connectDB();
  const address = server.address();
  const protocol = 'http';  // Asumimos que estamos usando HTTP localmente
  const host = address.address === '::' ? 'localhost' : address.address;

  console.log(`Servidor en ${protocol}://${host}:${address.port}`);
});

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import eventRoutes from './routes/eventRoutes.js';
import registrationRoutes from './routes/registrationRoutes.js';
import 'dotenv/config';

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/events', eventRoutes);
app.use('/api/registrations', registrationRoutes);

app.get('/', (req, res) => {
  res.send('Campus Event Manager API running securely...');
});

app.use((req, res) => {
  res.status(404).json({ message: 'Requested URI endpoint route path structural context invalid' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server executing securely in active status on port: ${PORT}`);
});
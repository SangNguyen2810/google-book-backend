import express from 'express';
import bookRoutes from './src/routes/book.route';
import cors from 'cors';

const app = express();
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST'],
}));

app.use(express.json());  // Parse JSON request body

app.use('/api', bookRoutes);

export default app;
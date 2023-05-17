import express from 'express';
import mongoose, { ConnectOptions } from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import authRoutes from './routes/authRoutes';
import todoRoutes from './routes/todoRoutes';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGO_URI!, {useNewUrlParser: true, useUnifiedTopology: true } as ConnectOptions)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => console.error('MongoDB connection error:', error));

app.use(express.json());
console.log(path.join(__dirname, 'openapi'));

app.use('/openapi', express.static(path.join(__dirname, 'openapi')));

app.use('/api/auth', authRoutes);
app.use('/api/todos', todoRoutes);

app.use((req, res) => {
  res.status(404).json({ message: `Route '${req.url}' does not exists or parameter is not provided` });
});

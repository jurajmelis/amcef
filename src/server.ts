import express from 'express';
import mongoose, { ConnectOptions } from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import todoRoutes from './routes/todo';

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
app.use('/api/auth', authRoutes);
app.use('/api/todo', todoRoutes);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

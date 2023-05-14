import express, { Request, Response } from 'express';
import authMiddleware, { AuthenticatedRequest } from '../middleware/auth';
import ToDo, { IToDo } from '../model/ToDo';
import mongoose from 'mongoose';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const todos = await ToDo.find({});

    res.status(200).json({ todos });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/create', authMiddleware, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { title, description, deadline } = req.body;

    const newToDo: IToDo = new ToDo({
      title,
      description,
      deadline,
      createdBy: req.user?.username,
      users: [req.user?.id],
    });

    await newToDo.save();

    res.status(201).json({ message: 'ToDo created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.put('/addUser/:id', authMiddleware, async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;
    const { id } = req.params;
    const updatedToDo = await ToDo.findById(id);
    if (!updatedToDo) {
      return res.status(404).json({ message: 'updatedToDo not found' });
    }
    updatedToDo?.users.push(userId);
    updatedToDo?.save();
    res.status(200).json({ message: 'users updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.put('/addItem/:id', authMiddleware, async (req: Request, res: Response) => {
  try {
    const { fieldName, fieldType, fieldValue } = req.body;
    const { id } = req.params;

    const updatedToDo = await ToDo.findById(id).select('-_id');
    if (!updatedToDo) {
      return res.status(404).json({ message: 'updatedToDo not found' });
    }
    ToDo.schema.add({[fieldName]: fieldType });
    const UpdatedToDo = mongoose.model<IToDo>('ToDo', ToDo.schema);
    const todoFields = { ...updatedToDo?.toObject(), [fieldName]: fieldValue };
    const todo = new UpdatedToDo(todoFields);
    await todo.save();

    res.status(200).json({ message: 'Field appended successfully' });
  } catch (error) {
    console.error('Error appending field:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

export default router;

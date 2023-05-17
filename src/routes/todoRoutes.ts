import express, { Request, Response } from 'express';
import authMiddleware, { AuthenticatedRequest } from '../middleware/auth';
import * as todoService from '../services/todoService';

const router = express.Router();

router.get('/allToDo', async (req: Request, res: Response) => {
  try {
    const todos = await todoService.getAllToDos();

    res.status(200).json({ todos });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


router.post('/toDo', authMiddleware, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { title, description, deadline } = req.body;

    if (!title || !description || !deadline) {
      return res.status(400).json({ message: 'Missing title, description, or deadline in request body' });
    }

    await todoService.createToDo(title, description, deadline, req.user?.username, req.user?.id);

    res.status(201).json({ message: 'ToDo created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.put('/users/:id', authMiddleware, async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;
    const { id } = req.params;

    if (!userId) {
      return res.status(400).json({ message: 'Missing userId in request body' });
    }

    await todoService.updateUserInToDo(userId, id);

    res.status(200).json({ message: 'Users updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.put('/fields/:id', authMiddleware, async (req: Request, res: Response) => {
  try {
    const { fieldName, fieldType, fieldValue } = req.body;
    const { id } = req.params;

    if (!fieldName || !fieldType || !fieldValue) {
      return res.status(400).json({ message: 'Missing fieldName, fieldType or fieldValue in request body'});
    }

    await todoService.appendFieldToToDo(fieldName, fieldType, fieldValue, id);

    res.status(200).json({ message: 'Field appended successfully' });
  } catch (error) {
    console.error('Error appending field:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

export default router;

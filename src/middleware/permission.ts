import { Request, Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../middleware/auth';
import ToDo from '../model/ToDo';

const checkUserPermission = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const todo = await ToDo.findById(id);
  
      if (!todo) {
        return res.status(404).json({ message: 'ToDo not found' });
      }

      const userId = req.user?.id;
      if (!todo.users.includes(userId)) {
        return res.status(403).json({ message: `User ${userId} is not authorized.` });
      }
  
      next();
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  export default checkUserPermission;
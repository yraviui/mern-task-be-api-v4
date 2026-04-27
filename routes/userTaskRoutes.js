import express from 'express';

import { getUserTasksController, getUserTaskByIdController, updateUserTaskByIdController } from '../controller/userTasksController.js';
import { requireSignIn } from '../middlewares/authMiddlewares.js';

const router = express.Router();

// user - get tasks assigned to them - // User route (place BEFORE /:id)
router.get('/tasks', requireSignIn, getUserTasksController);
router.get('/tasks/:id', requireSignIn, getUserTaskByIdController);
router.put('/tasks/:id', requireSignIn, updateUserTaskByIdController);


export default router;
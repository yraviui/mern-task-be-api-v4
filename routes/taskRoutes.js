import express from 'express';

import { createTaskController, getTasksController, getTaskByIdController, updateTaskController, deleteTaskController } from '../controller/taskController.js';
import { isAdmin, requireSignIn } from '../middlewares/authMiddlewares.js';
import { getUsersController } from '../controller/userTasksController.js';

const router = express.Router();

router.get('/users', requireSignIn, isAdmin, getUsersController);

router.post('/tasks', requireSignIn, isAdmin, createTaskController);
router.get('/tasks', requireSignIn, getTasksController);

// user - get tasks assigned to them - // User route (place BEFORE /:id)
// router.get('/user/tasks', requireSignIn, getUserTasksController);

router.get('/tasks/:id', requireSignIn, isAdmin, getTaskByIdController);
router.put('/tasks/:id', requireSignIn, isAdmin, updateTaskController);
router.delete('/tasks/:id', requireSignIn, isAdmin, deleteTaskController);



export default router;
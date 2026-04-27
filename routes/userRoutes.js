import express from 'express';

import { registerController, loginController } from '../controller/authController.js';
import { isAdmin, requireSignIn } from '../middlewares/authMiddlewares.js';

const router = express.Router();

router.post('/register', registerController)
router.post('/login', loginController)

// protected route for testing
router.get('/user-auth', requireSignIn, (req, res) => {
    res.status(200).send({ ok: true });
})

// admin protected route for testing
router.get('/admin-auth', requireSignIn, isAdmin, (req, res) => {
    res.status(200).send({ ok: true });
})


export default router;
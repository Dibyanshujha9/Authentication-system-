import {Router} from 'express';
import * as userController from '../controllers/user.controller.js';
import {body} from 'express-validator';
import * as authMiddleware from '../middleware/auth.middleware.js';

const router = Router();
// for register 
router.post('/register',
    body('email').isEmail().withMessage('Email must be a valid email address'),
    body('password').isLength({ min: 3 }).withMessage('Password must be at least 3 characters long'),
    userController.createUserController);

// for login 
router.post('/login',
    body('email').isEmail().withMessage('Email must be a valid email address'),
    body('password').isLength({ min: 3 }).withMessage('Password must be at least 3 characters long'),
    userController.loginController);

// for profile 
router.get('/profile', authMiddleware.authUser, userController.profileController);

// for logout 
router.get('/logout', authMiddleware.authUser, userController.logoutController);


export default router;
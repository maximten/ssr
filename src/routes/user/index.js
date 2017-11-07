import express from 'express';
import UserController from '../../controllers/user';

const router = express.Router();

router.route('/')
.get(UserController.self);

router.route('/register/')
.post(UserController.register);

router.route('/login/')
.post(UserController.login);

export default router;

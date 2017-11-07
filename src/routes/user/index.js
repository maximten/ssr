import express from 'express';
import UserController from '../../controllers/user';

const router = express.Router();

router.route('/register/')
.post(UserController.register);

export default router;

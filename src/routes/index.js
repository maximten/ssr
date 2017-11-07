import express from 'express';
import postsRoutes from './posts';
import userRoutes from './user';

const router = express.Router();

router.use('/posts', postsRoutes);
router.use('/user', userRoutes);

export default router;

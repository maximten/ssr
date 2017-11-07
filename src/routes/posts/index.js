import express from 'express';
import PostsController from '../../controllers/posts';

const router = express.Router();

router.route('/')
.get(PostsController.query)
.post(PostsController.add);

export default router;

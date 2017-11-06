import express from 'express';
import controllers from '../../controllers';

const router = express.Router();

router.route('/')
.get(controllers.postsController.query)
.post(controllers.postsController.add);

export default router;

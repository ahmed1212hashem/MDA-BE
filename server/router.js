import express from 'express';
import { StatusCodes } from 'http-status-codes';
import userRouter from './users/routers/index.js';
import emailRouter from './email/routes/index.js';
import lessonRouter from './lessons/routers/index.js';
import courseRouter from './courses/routers/index.js';


const router = express.Router();

router.use('/users', userRouter);
router.use('/email', emailRouter);
router.use('/lessons', lessonRouter);
router.use('/courses', courseRouter);


router.use('/health', (req, res) => {
  const data = {
    uptime: process.uptime(),
    date: new Date()
  };

  res.status(StatusCodes.OK).send(data);
});

export default router;

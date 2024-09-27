import { Router } from 'express'
import { allCourse, courseId, login, signup } from '../controllers/userController';
import userMiddleware from '../middleware/userMiddleware';

const userRouter = Router();


userRouter.post("/login", login as any );
userRouter.post("/signup", signup as any );
userRouter.get("/courses", allCourse as any );
userRouter.post("/course/:id", userMiddleware as any, courseId as any );



export default userRouter;
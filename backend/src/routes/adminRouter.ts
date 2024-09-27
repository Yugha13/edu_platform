import { RequestHandler, Router } from 'express'
import adminMiddleware from '../middleware/adminMiddleware';
import { allCourse, deleteCourse, login, updateCourse } from '../controllers/adminController';


const adminRouter = Router();


adminRouter.post("/login", login as any);

adminRouter.use(adminMiddleware as RequestHandler);

adminRouter.get("/courses", allCourse as any);
adminRouter.put("/course/:id", updateCourse as any);
adminRouter.delete("/course/:id", deleteCourse as any);



export default adminRouter;

import {Router} from 'express'
import authRouter from '../controllers/auth/auth.route';
import adminRouter from '../controllers/admin/admin.route';
import userRouter from '../controllers/user/user.route';
import PayRoute from '../controllers/payment/payment.route';
import CourseRouter from '../controllers/course/course.route';


const router = Router()

router.use('/auth', authRouter)
router.use('/admin', adminRouter)
router.use('/users', userRouter)
router.use('/payment', PayRoute)
router.use('/course',CourseRouter)




export default router;
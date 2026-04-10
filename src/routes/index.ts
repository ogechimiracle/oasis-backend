
import {Router} from 'express'
import authRouter from '../controllers/auth/auth.route';
import adminRouter from '../controllers/admin/admin.route';
import userRouter from '../controllers/user/user.route';

const router = Router()

router.use('/auth', authRouter)
router.use('/admin', adminRouter)
router.use('/users', userRouter)




export default router;
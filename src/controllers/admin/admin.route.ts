import {Router} from 'express'
import { assignRoleController, addCoursCategory, getCourseCategory, createCourse, getCourses, publishCourse, delCourse, adminCourseById, getPendingCourses, getArchivedCourses, getContacts, getStat } from './admin.controller'
import { validate } from '../../middlewares/validate'
import { courseValidation } from '../../validations/course.schema'
import { upload } from '../../middlewares/upload.middleware'
import { transformCourseData } from '../../middlewares/transform.middleware'
import { get } from 'node:http'


const adminRouter = Router()

adminRouter.get('/getStat', getStat)
adminRouter.post('/assignRole', assignRoleController)
adminRouter.post('/addCategory', addCoursCategory )
adminRouter.get('/getCategory', getCourseCategory)
adminRouter.get('/getCourse', getCourses)
adminRouter.post('/addCourse',upload.single('thumbnail'), transformCourseData, validate(courseValidation),  createCourse)
adminRouter.put('/publishCourse/:id', publishCourse)
adminRouter.delete('/deleteCourse/:id', delCourse)
adminRouter.get('/courseById/:id', adminCourseById)
adminRouter.get('/pendingCourses', getPendingCourses)
adminRouter.get('/archivedCourses', getArchivedCourses)
adminRouter.get('/contacts', getContacts)


export default adminRouter
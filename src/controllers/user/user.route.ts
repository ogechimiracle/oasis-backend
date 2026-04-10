import { Router } from "express";
import { ContactMessage, CourseById, getActiveCourse } from "./user.controller";
import { validate } from "../../middlewares/validate";
import { contactValidation } from "../../validations/contact.schema";


const userRouter = Router()

userRouter.get('/courseById/:id', CourseById)
userRouter.get('/activeCourses', getActiveCourse) 
userRouter.post('/contact', validate(contactValidation), ContactMessage)

export default userRouter
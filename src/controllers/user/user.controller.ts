import { Request, Response } from "express";
import { getCourseById, getCourses, SaveContactMessage } from "./user.service";
import { stat } from "node:fs";
import { success } from "zod";




export const CourseById = async (req: Request, res: Response) => {
 try {
    const {id} = req.params
    const result = await getCourseById(id as string)
    res.status(200).json({
        data: result, success: true
    })
 } catch (error:any) {
    res.status(400).json({
        message:error.message, success:false
    })
 }
}


export const getActiveCourse = async(req:Request, res:Response)=>{
    try {
        const courses = await getCourses()
        res.status(200).json({
            data: courses, success: true
        })
     } catch (error:any) {
        res.status(400).json({
            message:error.message, success:false
        })
     }
}


export const ContactMessage = async(req:Request, res:Response)=>{
  try {
    const {name, email, subject, message} = req.body    
    const result = await SaveContactMessage({name, email, subject, message})
    res.status(200).json({
      message:"Message Successfully Sent",
      success:true,
    })
    } catch (error:any) {
    res.status(400).json({
      message:error.message, success:false
    })
  }
}
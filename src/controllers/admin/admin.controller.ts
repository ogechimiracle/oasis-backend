
import { Request, Response } from "express";
import { assignRoleService, addCategory, getCategory, getCourse, addCourse, activateCourse, deleteCourse, adminGetCourseById, adminGetPendingCourses, adminGetArchivedCourses, adminGetContactMessages, adminGetStatistics } from "./admin.service";
import { success } from "zod";


export const getStat = async(req: Request, res: Response) => {
  try {
    const stats =  await adminGetStatistics()
    res.status(200).json({
      stats,
      success: true
    })
  } catch (error:any) {
    res.status(400).json({
      message: error.message,
    });
  }
}

export const assignRoleController = async (
  req: Request,
  res: Response
) => {
  try {
    const { userId, roleName } = req.body;

    const result = await assignRoleService(userId, roleName);

    res.status(200).json({
      message: "Role assigned successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const addCoursCategory = async(req:Request, res:Response)=>{
  try {
    const {name, slug} = req.body
    const result = await addCategory(name,slug)
    res.status(200).json({
      message:"Category Successfully Added",
      data:result,
      success:true
    })
  } catch (error:any) {
    res.status(400).json({
      message:error.message, success:false
    })
  }
}


export const getCourseCategory = async (req:Request, res:Response)=>{
  try {
    const resut = await getCategory()
    res.status(200).json({
      data:resut,
      success:true
    });
  } catch (error:any) {
    res.status(400).json({
      message:error.message, success:false
    })
  }
}


export const getCourses =async(req:Request, res:Response)=>{
  try {
    const courses = await getCourse()
    res.status(200).json({
      data:courses,
      success:true
    })
  } catch (error:any) {
    res.status(400).json({
      message:error.message, success:false
    })
  }
}


export const createCourse = async(req:Request, res:Response)=>{
  try {
    const file = req.file;

    const data = {
      ...req.body,
      thumbnail: file?.filename || undefined,
    };

    const course = await addCourse(data);
    res.status(201).json({
      message: "Course created successfully",
      data: course,
      success: true
    });
  } catch (error:any) {
    res.status(400).json({
      message:error.message, success:false
    })
  }
}


export const publishCourse = async(req:Request, res:Response)=>{
  try {
    const {id} = req.params 
    const course = await activateCourse(id as string)
    res.status(200).json({
      message: "Course published successfully",
      data: course,
      success: true
    });
  } catch (error:any) {
    res.status(400).json({
      message:error.message, success:false
    })
  }
}


export const delCourse = async(req:Request, res:Response)=>{
  try {
    const {id} = req.params
    const course = await deleteCourse(id as string)
    res.status(200).json({
      message: "Course deleted successfully",
      data: course,
      success: true
    });
  } catch (error:any) {
    res.status(400).json({
      message:error.message, success:false
    })
  }
}


export const adminCourseById = async (req:Request, res:Response)=>{
  try {
    const {id} = req.params 
    const result = await adminGetCourseById(id as string)
    res.status(200).json({
      data: result, success: true
    })
  } catch (error:any) {
    res.status(400).json({
      message:error.message, success:false
    })
  } 
}


export const getPendingCourses = async(req:Request, res:Response)=>{
  try {
    const courses = await adminGetPendingCourses()
    res.status(200).json({
      data:courses,
      success:true
    })
  } catch (error:any) {
    res.status(400).json({
      message:error.message, success:false
    })
  } 
}


export const getArchivedCourses = async(req:Request, res:Response)=>{
  try {
    const courses = await adminGetArchivedCourses()
    res.status(200).json({
      data:courses,
      success:true
    })
  } catch (error:any) {
    res.status(400).json({
      message:error.message, success:false
    })
  }
}


export const getContacts = async (req:Request, res:Response)=>{

  try {
    const contact = await adminGetContactMessages()
    res.status(200).json({
      data:contact,
      success: true
    })
  } catch (error:any) {
      res.status(400).json({
        message:error.message, success:false
      })
  }

}
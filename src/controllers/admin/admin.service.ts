
import { prisma } from "../../lib/prisma";
import { CreateCourseInput } from "../../interface/course.interface";


export const adminGetStatistics = async()=>{
   const [totalUsers, totalCourses, totalCategories] = await Promise.all([
    prisma.user.count(),
    prisma.course.count(),
    prisma.category.count(),
  ]);
  return {
    totalUsers,
    totalCourses,
    totalCategories
  }
}

export const assignRoleService = async (
  userId: string,
  roleName: string
) => {

  // find role
  const role = await prisma.role.findUnique({
    where: { name: roleName },
  });

  if (!role) {
    throw new Error("Role not found");
  }

  // check if already assigned
  const existingRole = await prisma.userRole.findUnique({
    where: {
      userId_roleId: {
        userId,
        roleId: role.id,
      },
    },
  });

  if (existingRole) {
    throw new Error("User already has this role");
  }

  // assign role
  const userRole = await prisma.userRole.create({
    data: {
      userId,
      roleId: role.id,
    },
    include: {
      role: true,
    },
  });

  return userRole;
};


export const addCategory = async (name: string, slug?: string) => {
  const existingCategory = await prisma.category.findFirst({
    where: { name },
  });

  if (existingCategory) {
    throw new Error("Category already exists");
  }

  const category = await prisma.category.create({
    data: { name, slug },
  });

  return category;
};


export const getCategory = async()=>{
  const category = await prisma.category.findMany()
  return category;
}


export const getCourse = async ()=>{
  const course = await prisma.course.findMany()
  return course
}

export const addCourse =async (data: CreateCourseInput)=>{
    const course = await prisma.course.create({
    data: {
      categoryId: data.category, // 🔥 important mapping
      title: data.title,
      slug: data.slug,
      briefDefinition: data.briefDefinition,
      prerequisite: data.prerequisite,
      keyAreas: data.keyAreas,
      outcomes: data.outcomes,
      jobRoles: data.jobRoles,
      industries: data.industries,
      duration: data.duration,
      cost: data.cost,
      paid: data.paid,
      thumbnail: data.thumbnail,
      level: data.level,
      createdBy: data.createdBy,
    },
  });
    return course
}

export const activateCourse= async(id:string)=>{

  const course = await prisma.course.update({
    where:{id},
    data:{
      status: "published"
    }
  })
  return course
}


export const deleteCourse = async(id:string)=>{
  const course = await prisma.course.delete({
    where:{id}
  })
  return course
}


export const adminGetCourseById = async (id:string)=>{
  const course = await prisma.course.findUnique({
    where:{id},
   
  })

  return course
}

export const  adminGetPendingCourses = async ()=>{
  const courses = await prisma.course.findMany({
    where:{status:"draft"},
    include:{category:true}
  })
  return courses
}

export const adminGetArchivedCourses = async ()=>{
  const courses = await prisma.course.findMany({
    where:{status:"archived"},
    include:{category:true}
  })
  return courses
}


export const adminGetContactMessages = async ()=>{
  const contacts = await prisma.contact.findMany()
  return contacts
}
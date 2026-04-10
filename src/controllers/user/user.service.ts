import { prisma } from "../../lib/prisma";
import { ContactMessageInput } from "../../interface/course.interface";


export const getCourseById = async (courseId: string) => {
  const course = await prisma.course.findUnique({
    where: { id: courseId },
    include: {
      category: true,
    },
  });
  return course;
};


export const getCourses = async ()=>{
  const courses = await prisma.course.findMany({
    where: { status: "published" },
    include:{category:true}
  })
  return courses;
}


export const SaveContactMessage = async (data: ContactMessageInput) => {
    const contact = await prisma.contact.create({
        data: {
            name: data.name,
            email: data.email,
            subject: data.subject,
            message: data.message
        }
    })
    return contact;
}
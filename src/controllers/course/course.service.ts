import { prisma } from "../../lib/prisma";

export const getCategoriesService = async () => {
  return await prisma.category.findMany({
    where: { courses: { some: { status: "published" } } },
    include: {
      _count: { select: { courses: { where: { status: "published" } } } },
    },
    orderBy: { name: "asc" },
  });
};

export const getCategoryBySlugService = async (categorySlug: string) => {
  return await prisma.category.findFirst({
    where: { slug: categorySlug, courses: { some: { status: "published" } } },
    include: {
      _count: { select: { courses: { where: { status: "published" } } } },
    },
  });
};

export const getCoursesByCategoryService = async (categorySlug: string) => {
  return await prisma.course.findMany({
    where: { status: "published", category: { slug: categorySlug } },
    select: {
      id: true,
      title: true,
      slug: true,
      briefDefinition: true,
      prerequisite: true,
      duration: true,
      cost: true,
      paid: true,
      thumbnail: true,
      level: true,
      createdAt: true,
      category: { select: { id: true, name: true, slug: true } },
    },
    orderBy: { createdAt: "desc" },
  });
};



export const getCourseBySlugService = async (
  categorySlug: string,
  courseSlug: string,
) => {
  return await prisma.course.findFirst({
    where: {
      slug: courseSlug,
      status: "published",
      category: { slug: categorySlug },
    },
    include: { category: { select: { id: true, name: true, slug: true } } },
  });
};

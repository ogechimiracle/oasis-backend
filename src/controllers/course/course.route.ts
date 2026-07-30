import { Router } from "express";

import {
     getCategories,
     getCategoryBySlug,
     getCoursesByCategory,
     getCourseBySlug,
} from "./course.controller";

const CourseRouter = Router();

CourseRouter.get(
     "/categories",
     getCategories
);

CourseRouter.get(
     "/categories/:categorySlug",
     getCategoryBySlug
);

CourseRouter.get(
     "/categories/:categorySlug/courses",
     getCoursesByCategory
);

CourseRouter.get(
     "/categories/:categorySlug/courses/:courseSlug",
     getCourseBySlug
);

export default CourseRouter;
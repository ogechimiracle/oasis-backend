
import { Request, Response } from "express";

import {
    getCategoriesService,
    getCategoryBySlugService,
    getCoursesByCategoryService,
    getCourseBySlugService,
} from "./course.service";


/**
 * GET /api/categories
 *
 * Get all categories that contain
 * at least one published course.
 */
export const getCategories = async (
    req: Request,
    res: Response
) => {
    try {
        const categories =
            await getCategoriesService();

        return res.status(200).json({
            success: true,
            message:
                "Categories fetched successfully",
            data: categories,
        });

    } catch (error) {
        console.error(
            "Error fetching categories:",
            error
        );

        return res.status(500).json({
            success: false,
            message:
                "Failed to fetch categories",
        });
    }
};


/**
 * GET /api/categories/:categorySlug
 *
 * Get a single category by slug.
 */
export const getCategoryBySlug = async (
    req: Request,
    res: Response
) => {
    try {
        const { categorySlug } = req.params;

        if (!categorySlug) {
            return res.status(400).json({
                success: false,
                message:
                    "Category slug is required",
            });
        }

        const category =
            await getCategoryBySlugService(
                categorySlug as string
            );

        if (!category) {
            return res.status(404).json({
                success: false,
                message:
                    "Category not found",
            });
        }

        return res.status(200).json({
            success: true,
            message:
                "Category fetched successfully",
            data: category,
        });

    } catch (error) {
        console.error(
            "Error fetching category:",
            error
        );

        return res.status(500).json({
            success: false,
            message:
                "Failed to fetch category",
        });
    }
};


/**
 * GET /api/categories/:categorySlug/courses
 *
 * Get all published courses
 * in a specific category.
 */
export const getCoursesByCategory = async (
    req: Request,
    res: Response
) => {
    try {
        const { categorySlug } = req.params;

        if (!categorySlug) {
            return res.status(400).json({
                success: false,
                message:
                    "Category slug is required",
            });
        }

        const category =
            await getCategoryBySlugService(
                categorySlug as string
            );

        if (!category) {
            return res.status(404).json({
                success: false,
                message:
                    "Category not found",
            });
        }

        const courses =
            await getCoursesByCategoryService(
                categorySlug as string
            );

        return res.status(200).json({
            success: true,
            message:
                "Courses fetched successfully",
            data: courses,
        });

    } catch (error) {
        console.error(
            "Error fetching courses by category:",
            error
        );

        return res.status(500).json({
            success: false,
            message:
                "Failed to fetch courses",
        });
    }
};


/**
 * GET /api/categories/:categorySlug/courses/:courseSlug
 *
 * Get a single published course.
 */
export const getCourseBySlug = async (
    req: Request,
    res: Response
) => {
    try {
        const {
            categorySlug,
            courseSlug,
        } = req.params;

        if (!categorySlug || !courseSlug) {
            return res.status(400).json({
                success: false,
                message:
                    "Category slug and course slug are required",
            });
        }

        const course =
            await getCourseBySlugService(
                categorySlug as string,
                courseSlug as string
            );

        if (!course) {
            return res.status(404).json({
                success: false,
                message:
                    "Course not found",
            });
        }

        return res.status(200).json({
            success: true,
            message:
                "Course fetched successfully",
            data: course,
        });

    } catch (error) {
        console.error(
            "Error fetching course:",
            error
        );

        return res.status(500).json({
            success: false,
            message:
                "Failed to fetch course",
        });
    }
};


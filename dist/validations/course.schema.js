import z from "zod";
export const courseValidation = z.object({
    category: z.string().min(1, "Category is required"),
    title: z.string().min(3, "Title must be at least 3 characters"),
    slug: z.string().optional(),
    briefDefinition: z.string().min(10, "Brief definition too short"),
    prerequisite: z.string().optional(),
    keyAreas: z.array(z.string()).min(1, "this field is required"),
    outcomes: z.array(z.string()).min(1, "this field is required"),
    jobRoles: z.array(z.string()).min(1, "this field is required"),
    industries: z.array(z.string()).min(1, "this field is required"),
    duration: z.string().optional(),
    cost: z
        .number()
        .optional()
        .transform((val) => (val ? Number(val) : null)),
    paid: z.boolean(),
    thumbnail: z.any().optional(),
    level: z.enum(["beginner", "intermediate", "advanced"]),
});

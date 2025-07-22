import { z } from "zod";

const courseSchema = z.object({
  title: z.string().trim().min(3).max(70),
  description: z.string().trim(),
  whatYouWillLearnHtml: z.string().optional(),
  prerequisitesHtml: z.string().optional(),
  price: z.coerce.number().min(0, "Price must be a positive number"),
});

class CourseValidator {
  static validateCourse(data) {
    const result = courseSchema.safeParse(data);
    if (!result.success) {
      const errors = result.error.errors.reduce((acc, err) => {
        const field = err.path[0];
        acc[field] = err.message;
        return acc;
      }, {});
      return { success: false, errors };
    }
    return { success: true, data: result.data };
  }
}

export default CourseValidator;

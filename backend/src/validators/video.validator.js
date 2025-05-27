import {z} from "zod";

const videoSchema = z.object({
    title : z.string().trim().min(3,"Title must be greater than 3 characters").max(50),
});

class VideoValidator {
  static validateVideoData(data) {
    const result = videoSchema.safeParse(data);
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

export default VideoValidator;
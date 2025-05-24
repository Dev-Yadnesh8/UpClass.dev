import { z } from "zod";

const passwordSchema = z.string().min(6, "Password must be at least 6 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(/[@$!%*?&]/, "Password must contain at least one special character");

const signUpSchema = z.object({
    username : z.string().min(3,"Username must be atleast 3 characters").max(20,"username cannot exceed 20 characters"),
    email : z.string().email("Please enter a valid email"),
    password : passwordSchema
});

class UserValidator {
    static validateSignUp(data){
        const result = signUpSchema.safeParse(data);
        if(!result.success){
            const errors = result.error.errors.reduce((acc,err)=>{
                const field = err.path[0];
                acc[field] = err.message;
                return acc;
            },{});
            return { success : false ,errors}
        }
        return {success : true , data : result.data};
    }
}

export default UserValidator;


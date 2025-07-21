import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "../../components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { signUpSchema } from "../../utils/validators/auth";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";
import toast from "react-hot-toast";
import { axiosInstance, SIGN_UP_ENPOINT } from "../../utils/api";
import handleApiError from "../../utils/api/handle_api_error";

function SignUp() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(signUpSchema) });

  const onSubmit = async (data) => {
    console.log(data);
    try {
      setIsLoading(true);
      const response = await axiosInstance.post(SIGN_UP_ENPOINT, data);
      const result = response.data;
      if (!result.success) {
        console.log("ERROR-IN-SIGN_UP", result.message);
        toast.error(result.message);
      } else {
        toast.success(result.message);
        navigate("/verify-email", { replace: true });
      }
    } catch (error) {
      handleApiError(error, SIGN_UP_ENPOINT, "Failed to create account");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center bg-darkBg px-4 mt-20">
      <div className="w-full max-w-md bg-footer-Bg/30 backdrop-blur-md border border-footer-Bg/40 rounded-2xl p-8 shadow-xl">
        <h2 className="text-3xl font-bold text-white text-center">
          Create Your Account
        </h2>
        <p className="text-gray-400 text-center mt-2 text-sm">
          Join UpClass.dev and start your teaching journey today
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
          <Input
            label="Username"
            name="username"
            placeholder="johndoe"
            variant="solid"
            {...register("username")}
            error={errors.username?.message}
          />
          <Input
            label="Email"
            name="email"
            placeholder="example@gmail.com"
            variant="solid"
            {...register("email")}
            error={errors.email?.message}
          />

          <Input
            label="Password"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            variant="solid"
            {...register("password")}
            error={errors.password?.message}
            rightIcon={
              <span
                className="cursor-pointer"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? (
                  <MdOutlineVisibility />
                ) : (
                  <MdOutlineVisibilityOff />
                )}
              </span>
            }
          />

          <Button
            className="w-full"
            text={isLoading ? "Creating Account..." : "Create Account"}
            type="submit"
            disabled={isLoading}
          />

          <p className="text-sm text-gray-400 text-center mt-4 ">
            Already have an account?{" "}
            <Button
              text="Sign In"
              onClick={() => navigate("/sign-in", { replace: true })}
              variant="text"
            />
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignUp;

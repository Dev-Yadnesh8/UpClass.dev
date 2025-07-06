import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button, Input } from "../../components";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { signInSchema } from "../../utils/validators/auth";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { signIn } from "../../features/auth/authSlice";
import { axiosInstance, SIGN_IN_ENPOINT } from "../../utils/api";
import handleApiError from "../../utils/helper/handle_api_error";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const form = location.state?.form?.pathname || "/";
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const response = await axiosInstance.post(SIGN_IN_ENPOINT, data);
      const result = response.data;
      console.log("RESULT--", result);

      if (!result.success) {
        toast.error(result.message);
      } else {
        toast.success(result.message);
        dispatch(
          signIn({ ...result.data.user, accessToken: result.data.accessToken })
        );
        console.log("FROM", form);

        navigate(form, { replace: true });
      }
    } catch (error) {
      handleApiError(
        error,
        SIGN_IN_ENPOINT,
        "We couldn’t log you in. Please verify your credentials and try again."
      );
    }
  
  };

  return (
    <div className="flex items-center justify-center bg-darkBg px-4 mt-20">
      <div className="w-full max-w-md bg-footer-Bg/30 backdrop-blur-md border border-footer-Bg/40 rounded-2xl p-8 shadow-xl">
        <h2 className="text-3xl font-bold text-white text-center">
          Welcome Back
        </h2>
        <p className="text-gray-400 text-center mt-2 text-sm">
          Sign in to your UpClass.dev account
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
          <Input
            label="Email or Username"
            name="identifier"
            placeholder="example@gmail.com / johndoe"
            variant="solid"
            {...register("identifier")}
            error={errors.identifier?.message}
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

          <div className="flex justify-end text-sm">
            <Button text="Forget password" variant="text" />
          </div>

          <Button text="Login" type="submit" className="w-full mt-2" />

          <p className="text-sm text-gray-400 text-center mt-4">
            Don't have an account?{" "}
            <Button
              text="Sign Up"
              onClick={() => navigate("/sign-up", { replace: true })}
              variant="text"
            />
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;

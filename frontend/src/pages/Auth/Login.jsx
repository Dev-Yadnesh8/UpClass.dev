import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button, Input } from "../../components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { signInSchema } from "../../utils/validators/auth";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { signIn } from "../../features/auth/authSlice";

function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = (data) => {
    console.log(data);
    const url = `${import.meta.env.VITE_BASE_URL}/user/sign-in`;

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        console.log(response);

        return response.json();
      })
      .then((result) => {
        if (result.success) {
          console.log("Successfull");
          toast.success(result.message);
          navigate("/home", { replace: true });
          const user = result.data.user;
          localStorage.setItem(
            "auth",
            JSON.stringify({ isAuthenticated: true, user })
          );
          localStorage.setItem("accessToken", result.data.accessToken);
          localStorage.setItem("refreshToken", result.data.refreshToken);

          dispatch(signIn({ ...user }));
        } else {
          console.log("Error ");
          console.log(result.message);
          toast.error(result.message);
        }
      })
      .catch((error) => {
        console.error("Error occurred when hitting API:", error);

        if (error.response) {
          // Server responded with a status outside the 2xx range
          const message =
            error.response.data?.message ||
            "Something went wrong on the server.";
          toast.error(message);
        } else if (error.request) {
          // Request was made but no response received
          toast.error(
            "No response from server. Please check your internet connection."
          );
        } else {
          // Error in setting up the request
          toast.error("Request setup failed. Try again.");
        }
      });
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

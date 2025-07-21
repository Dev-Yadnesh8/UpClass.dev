import { useState } from "react";
import { Button, Input } from "../../components";
import { useNavigate, useParams } from "react-router-dom";
import { CHANGE_PASS_ENPOINT } from "../../utils/api/api_enpoints";
import handleApiError from "../../utils/api/handle_api_error";
import { axiosInstance } from "../../utils/api";
import toast from "react-hot-toast";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPasswordSchema } from "../../utils/validators/auth";
import { useForm } from "react-hook-form";

function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(resetPasswordSchema) });

  const onSubmit = async ({ password }) => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.post(
        `${CHANGE_PASS_ENPOINT}/${token}`,
        {
          newPassword: password,
        }
      );

      const result = response.data;
      if (!result.success) {
        toast.error(result.message);
        return;
      }

      toast.success(result.message);
      navigate("/sign-in", { replace: true }); // optional: go to login page
    } catch (error) {
      handleApiError(error, CHANGE_PASS_ENPOINT, "Failed to reset password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center px-4 mt-20">
      <div className="w-full max-w-md bg-darkerBg text-white p-6 rounded-2xl shadow-xl border border-white/10">
        <h1 className="text-2xl font-semibold mb-2">Reset your password</h1>
        <p className="text-sm text-white/60 mb-6">
          Enter a new secure password to regain access to your account.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <Input
            label="New Password"
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
            type="submit"
            className="w-full"
            text={isLoading ? "Updating..." : "Update Password"}
            disabled={isLoading}
          />
        </form>

        <p className="text-center text-sm text-white/60 mt-6">
          Remembered your password?{" "}
          <Button
            text="Login"
            variant="text"
            onClick={() => navigate("/sign-in", { replace: true })}
          />
        </p>
      </div>
    </div>
  );
}

export default ResetPassword;

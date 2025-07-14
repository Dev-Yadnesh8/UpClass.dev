import { useState } from "react";
import { Button, Input } from "../../components";
import { useNavigate } from "react-router-dom";
import { FORGOT_PASS_ENPOINT } from "../../utils/api/api_enpoints";
import handleApiError from "../../utils/helper/handle_api_error";
import { axiosInstance } from "../../utils/api";
import toast from "react-hot-toast";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Sending password reset link to:", email);
    try {
      setLoading(true);
      const response = await axiosInstance.post(FORGOT_PASS_ENPOINT, {
        email,
      });
      const result = response.data;

      if (!result.success) {
        console.log(result.message);
        return toast.error(result.message);
      }
      toast.success(result.message);
      navigate(-1);
    } catch (error) {
      console.error("Error", error);

      handleApiError(error, FORGOT_PASS_ENPOINT, "Error while verifying email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center px-4 mt-20">
      <div className="w-full max-w-md bg-darkerBg text-white p-6 rounded-2xl shadow-xl border border-white/10">
        <h1 className="text-2xl font-semibold mb-2">Forgot Password?</h1>
        <p className="text-sm text-white/60 mb-6">
          Enter your registered email address and we’ll send you a link to reset
          your password.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            label="Email"
          />

          <Button
            type="submit"
            isDisabled={loading}
            className="w-full"
            text={loading ? "Sending..." : "Send Reset Link"}
          />
        </form>

        <p className="text-center text-sm text-white/60 mt-6">
          Remember your password?{" "}
          <Button text={"Login"} variant="text" onClick={() => navigate(-1)} />
        </p>
      </div>
    </div>
  );
}

export default ForgotPassword;

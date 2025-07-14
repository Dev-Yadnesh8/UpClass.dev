import { useRef, useState } from "react";
import { Button } from "../../components";
import toast from "react-hot-toast";
import handleApiError from "../../utils/helper/handle_api_error";
import { VERIFY_EMAIL_ENPOINT } from "../../utils/api/api_enpoints";
import { axiosInstance } from "../../utils/api";
import { useNavigate } from "react-router-dom";

function VerifyEmail() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/^[a-zA-Z0-9]{0,1}$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move to next input
      if (value && index < otp.length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpCode = otp.join("");
    console.log("Submitted OTP:", otpCode);
    try {
      const response = await axiosInstance.post(VERIFY_EMAIL_ENPOINT, {
        verificationToken: otpCode,
      });
      const result = response.data;

      if (!result.success) {
        console.log(result.message);
        return toast.error(result.message);
      }
      toast.success(result.message);
      navigate("/sign-in", { replace: true });
    } catch (error) {
      handleApiError(
        error,
        VERIFY_EMAIL_ENPOINT,
        "Error while verifying email"
      );
    }
  };

  return (
    <div className=" flex items-center justify-center px-4 mt-20">
      <div className="w-full max-w-md bg-darkerBg text-white p-6 rounded-2xl shadow-xl border border-white/10">
        <h1 className="text-2xl font-semibold mb-2">Verify your email</h1>
        <p className="text-sm text-white/60 mb-6">
          We’ve sent a 6-character verification code to your email. Enter it
          below to continue.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-between gap-2">
            {otp.map((char, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                maxLength="1"
                value={char}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-12 h-12 text-center text-lg rounded-md bg-footer-Bg/30 text-white outline-none focus:ring-2 focus:ring-footer-Bg border border-white/10"
              />
            ))}
          </div>

          <Button type="submit" className="w-full" text="Verify" />
        </form>

        <p className="text-center text-sm text-white/60 mt-4">
          Didn’t get the code?{" "}
          <span className="text-purple cursor-pointer hover:underline">
            Resend
          </span>
        </p>
      </div>
    </div>
  );
}

export default VerifyEmail;

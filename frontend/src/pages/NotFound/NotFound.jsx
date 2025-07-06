import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "../../components";

export default function NotFound() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-darkBg text-white px-6">
      <h1 className="text-6xl font-extrabold text-purple mb-4">404</h1>
      <h2 className="text-2xl md:text-3xl font-semibold mb-2">
        Page Not Found
      </h2>
      <p className="text-gray-400 text-center max-w-md mb-6">
        Oops! The page you're looking for doesn’t exist or might have been
        removed.
      </p>

      <Button
        text="Go Home"
        variant="gradient"
        className="px-6 py-2"
        onClick={() =>
          navigate("/", { replace: true, state: { from: location } })
        }
      />
    </div>
  );
}

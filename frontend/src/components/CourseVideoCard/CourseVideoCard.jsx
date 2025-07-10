// components/CourseVideoCard.jsx
import { FaCheckCircle, FaRegClock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { formatDuration } from "../../utils/formatter/formatter";
import { useSelector } from "react-redux";

function CourseVideoCard({ video }) {
  const navigate = useNavigate();
  const {user} = useSelector((state)=>state.auth);
  
  console.log("Video in Course video summary card",video);
  

  return (
    <div
      onClick={() => navigate(`video/${video._id}`)}
      className="relative bg-darkBg rounded-lg cursor-pointer overflow-hidden hover:scale-[1.01] transition border border-footer-Bg"
    >
      <div className="w-full aspect-video overflow-hidden relative rounded-lg">
        {/* Background Image */}
        <img
          src={
            "https://images.unsplash.com/photo-1684503830891-27e71ff697e3?q=80&w=802&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          alt={video.title}
          className="w-full h-full object-cover object-center"
        />

        {/* Centered Title Overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/40">
          <p className="text-white text-lg font-semibold text-center px-2 bg-footer-Bg/60 rounded-2xl p-2">
            {video.title}
          </p>
        </div>
      </div>

      {/* Watched Check Icon */}
      {video.isWatched.length > 0 && video.isWatched.includes(user._id) && (
        <FaCheckCircle className="absolute top-2 right-2 text-green-400 text-lg bg-black rounded-full" />
      )}

      {/* Info */}
      <div className="p-4">
        <h2 className="font-semibold text-base mb-1 line-clamp-2">
          {video.title}
        </h2>
        <p className="text-xs text-gray-400 flex gap-x-1 items-center">
          <FaRegClock className="text-gray-400" />

          {formatDuration(video.duration)}
        </p>
      </div>
    </div>
  );
}

export default CourseVideoCard;

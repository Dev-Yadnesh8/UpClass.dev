import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import IconButton from "../Button/IconButton";
import CourseVisibilityBadge from "../Badge/CourseVisibilityBadge";

export default function AdminCourseCard({ course, onEdit, onDelete }) {
  const navigate = useNavigate();

  return (
    <div className="bg-darkBg rounded-xl border border-footer-Bg overflow-hidden flex flex-col relative group">
      {/* Thumbnail */}
      <div className="w-full aspect-video overflow-hidden">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Visibility Tag */}
      <div className="absolute top-2 left-2">
        <CourseVisibilityBadge
          className={`${
            course.visibility === "PUBLIC" ? "bg-green-600" : "bg-yellow-600"
          } text-white text-xs`}
        >
          {course.visibility}
        </CourseVisibilityBadge>
      </div>

      {/* Content */}
      <div className="flex flex-col justify-between flex-1 p-5 gap-4">
        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-white line-clamp-1">
            {course.title}
          </h2>
          <p className="text-gray-400 text-sm line-clamp-2">
            {course.description}
          </p>
        </div>

        <div className="flex gap-2 mt-auto">
          <IconButton
          tooltip={"Edit"}
            onClick={onEdit}
            icon={<FaEdit />}
          />
          <IconButton
          tooltip={"Delete"}
            onClick={onDelete}
            icon={<FaTrash />}
          />
        </div>
      </div>
    </div>
  );
}

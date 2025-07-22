import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import IconButton from "../Button/IconButton";
import CourseVisibilityBadge from "../Badge/CourseVisibilityBadge";
import Button from "../Button/Button";

export default function AdminCourseCard({
  course,
  onEdit,
  onDelete,
  onManageContent,
}) {
  const navigate = useNavigate();

  return (
    <div className="bg-darkBg rounded-xl border border-footer-Bg/50 shadow-md overflow-hidden flex flex-col relative transition-transform hover:scale-[1.02] hover:shadow-lg group">
      {/* Thumbnail */}
      <div className="w-full aspect-video overflow-hidden">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Visibility Badge */}
      <div className="absolute top-3 left-3 z-10">
        <CourseVisibilityBadge
          className={`px-2 py-1 rounded-md text-white text-xs shadow ${
            course.visibility === "PUBLIC" ? "bg-green-600" : "bg-yellow-600"
          }`}
        >
          {course.visibility}
        </CourseVisibilityBadge>
      </div>

      {/* Action Icons */}
      <div className="absolute top-3 right-3 flex gap-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="bg-black/60 backdrop-blur-sm text-white text-center p-2 rounded-full hover:bg-black/80 transition">
          {" "}
          <IconButton tooltip="Edit" onClick={onEdit} icon={<FaEdit />} />
        </div>
         <div className="bg-black/60 backdrop-blur-sm text-white text-center p-2 rounded-full hover:bg-black/80 transition">
        <IconButton tooltip="Delete" onClick={onDelete} icon={<FaTrash />} />
        </div>
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

        <Button
          text="📚 Manage Content"
          onClick={onManageContent}
          variant="filled"
          className="w-full mt-2"
        />
      </div>
    </div>
  );
}

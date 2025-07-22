import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";

export default function CreateCourseCard() {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate("/admin/manage-courses/create")}
      className="cursor-pointer h-full w-full bg-darkBg rounded-xl border-2 border-dashed border-gray-600 flex flex-col justify-center items-center aspect-video p-6 hover:border-white hover:bg-[#1f1f1f] transition-all"
    >
      <FaPlus className="text-3xl text-white mb-2" />
      <p className="text-white text-sm font-medium">Create New Course</p>
    </div>
  );
}

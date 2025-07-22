import { FaVideo } from "react-icons/fa";

export default function AddVideoCard({ onClick }) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer h-10 w-full bg-darkBg rounded-xl border-2 border-dashed border-gray-600 flex flex-col justify-center items-center aspect-video p-6 hover:border-white/25 hover:bg-darkerBg transition-all"
    >
      <FaVideo className="text-3xl text-white mb-2" />
      <p className="text-white text-sm font-medium">Add New Video</p>
    </div>
  );
}

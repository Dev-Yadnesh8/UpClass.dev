import { FaTrash, FaEdit } from "react-icons/fa";
import { formatDuration } from "../../utils/formatter/formatter";
import IconButton from "../Button/IconButton";

export default function AdminVideoCard({ video,onDelete, onEdit }) {

  return (
    <div className="flex justify-between items-center border border-footer-Bg p-4 rounded-lg bg-footer-Bg/10">
      <div className="flex flex-col gap-1">
        <h3 className="text-white font-semibold">{video.title}</h3>
        <p className="text-sm text-gray-400">
          {formatDuration(video.duration)}
        </p>
      </div>

      <div className="flex gap-3 items-center">
        <IconButton className="text-deep-blue" onClick={() => onEdit(video)} icon={<FaEdit />} />
        <IconButton className="text-red-500" onClick={onDelete} icon={<FaTrash />} />
      </div>
    </div>
  );
}

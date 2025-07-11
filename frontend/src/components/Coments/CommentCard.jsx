import { FaPencilAlt, FaTrash } from "react-icons/fa";

function CommentCard({ comment, onEdit, onDelete }) {
  return (
    <div className="w-full bg-darkerBg border border-white/10 rounded-xl p-4 mb-4">
      <div className="flex items-center justify-between mb-1">
        <div className="text-sm font-semibold text-white/90">
          {comment.username}
        </div>
        <div className="flex items-center gap-x-2 text-white/50 text-xs">
          <span>{new Date(comment.updatedAt).toLocaleString()}</span>
          {onEdit && (
            <button
              onClick={onEdit}
              className="hover:text-green-500 cursor-pointer transition"
              title="Edit comment"
            >
              <FaPencilAlt size={14} />
            </button>
          )}
          {onDelete && (
            <button
              onClick={onDelete}
              className="hover:text-red-500 cursor-pointer transition"
              title="Delete comment"
            >
              <FaTrash size={14} />
            </button>
          )}
        </div>
      </div>
      <p className="text-sm text-white/60 mt-1">{comment.comment}</p>
    </div>
  );
}

export default CommentCard;

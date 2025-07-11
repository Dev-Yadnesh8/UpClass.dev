import { FaPencilAlt, FaTrash } from "react-icons/fa";
import Button from "../Button/Button";
import Avatar from "../Avatar/Avatar";

function CommentCard({
  comment,
  onEdit,
  onDelete,
  isEditing,
  editingText,
  setEditingText,
  onSave,
  onCancel,
}) {
  return (
    <div className="w-full bg-darkerBg border border-white/10 rounded-xl p-4 mb-4 flex gap-x-4">
      {/* Avatar */}
      <Avatar username={comment.username} />

      {/* Comment Content */}
      <div className="flex-1">
        {/* Header: username, date, actions */}
        <div className="flex justify-between items-start">
          <div>
            <div className="text-sm font-semibold text-white/90">
              {comment.username}
            </div>
            <div className="text-xs text-white/50">
              {new Date(comment.updatedAt).toLocaleString()}
            </div>
          </div>

          <div className="flex gap-x-2 mt-1">
            {onEdit && (
              <Button
                variant="none"
                onClick={onEdit}
                className="text-white/40 hover:text-green-400 transition"
                text={<FaPencilAlt size={13} />}
              />
            )}
            {onDelete && (
              <Button
                variant="none"
                onClick={onDelete}
                className="text-white/40 hover:text-red-400 transition"
                text={<FaTrash size={13} />}
              />
            )}
          </div>
        </div>

        {/* Body */}
        {isEditing ? (
          <div className="mt-3 space-y-2">
            <textarea
              value={editingText}
              onChange={(e) => setEditingText(e.target.value)}
              className="w-full min-h-[80px] p-2 rounded-md bg-footer-Bg/50 text-white focus:outline-none focus:ring-0 border-none shadow-none resize-none"
              placeholder="Edit your comment..."
            />
            <div className="flex gap-2 justify-end">
              <Button text="Cancel" variant="outline" onClick={onCancel} />
              <Button
                text="Save"
                variant="solid"
                onClick={onSave}
                isDisabled={editingText.trim() === ""}
              />
            </div>
          </div>
        ) : (
          <p className="text-sm text-white/80 mt-3 leading-relaxed">
            {comment.comment}
          </p>
        )}
      </div>
    </div>
  );
}

export default CommentCard;

import { useLocation, useParams } from "react-router-dom";
import useApi from "../../hooks/useApi";
import {
  ALL_COURSES_ENPOINT,
  COMMENTS_ENPOINT,
} from "../../utils/api/api_enpoints";
import { Button, CommentCard, CommentsForm } from "../../components";
import { axiosPrivateInstance } from "../../utils/api/axios";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

function VideoPlayerPage() {
  const { courseId, id } = useParams();
  const { user } = useSelector((state) => state.auth);
  const [isCommentLoading, setIsCommentLoading] = useState(true);
  const [comments, setComments] = useState();
  const { loading, data, error } = useApi(
    `${ALL_COURSES_ENPOINT}/${courseId}/videos/${id}`
  );
  const [isWatchedByUser, setIsWatchedByUser] = useState(false);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingText, setEditingText] = useState("");

  const markVideoAsComplete = async () => {
    console.log("Marking as completed");
    try {
      const response = await axiosPrivateInstance.patch(
        `${ALL_COURSES_ENPOINT}/${courseId}/videos/markWatch/${id}`
      );
      const result = response.data;
      if (!result.success) {
        return toast.error("Failed to mark video as watched.");
      }
      setIsWatchedByUser((prev) => !prev);
      toast.success(result?.message);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteComment = async (commentId) => {
    console.log("Deleting comment");
    try {
      const response = await axiosPrivateInstance.delete(
        `${COMMENTS_ENPOINT}/${data?._id}/${commentId}`
      );
      const result = response.data;
      if (!result.success) {
        return toast.error("Failed to delete comment.");
      }
      toast.success(result?.message);
      setComments((prev) => prev.filter((c) => c._id !== commentId));
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditComment = async (commentId) => {
    try {
      const response = await axiosPrivateInstance.patch(
        `${COMMENTS_ENPOINT}/${data._id}/${commentId}`,
        { commentText: editingText }
      );
      const result = response.data;
      if (!result.success) return toast.error(result.message);

      // Update comment locally
      setComments((prev) =>
        prev.map((c) =>
          c._id === commentId
            ? {
                ...c,
                comment: editingText,
                updatedAt: new Date().toISOString(),
              }
            : c
        )
      );
      setEditingCommentId(null);
      setEditingText("");
      toast.success(result.message);
    } catch (error) {
      console.error("Error updating comment:", error);
    }
  };

  {
    /* FETCH COMMENTS */
  }
  useEffect(() => {
    if (!data?._id) return;
    (async () => {
      try {
        setIsCommentLoading(true);
        const response = await axiosPrivateInstance.get(
          `${COMMENTS_ENPOINT}/${data?._id}`
        );
        const result = response.data;
        if (!result.success) {
          setIsCommentLoading(false);
          return console.log("failed to get comments", result.message);
        }
        console.log("Comments", result);

        setComments(result.data);
      } catch (error) {
      } finally {
        setIsCommentLoading(false);
      }
    })();
  }, [data]);
  {
    /* TRACK IS WATCHED STATUS */
  }
  useEffect(() => {
    console.log("Data--", data);
    if (data && user?._id) {
      setIsWatchedByUser(data?.isWatched.includes(user._id));
    }

    console.log("Is watched by user", isWatchedByUser);
  }, [data]);

  if (loading)
    return <p className="text-center text-white mt-10">Loading...</p>;
  if (error)
    return (
      <p className="text-center text-red-400 mt-10">Failed to load video</p>
    );

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 text-white">
      <video
        src={data?.videoFile}
        controls
        className="w-full rounded-lg shadow-xl mb-6"
      />
      <span className="flex justify-between items-center mb-2.5">
        <h1 className="text-2xl font-bold mb-4">{data?.title}</h1>
        <Button
          text={isWatchedByUser ? "Unmark as watched" : "Mark as watched"}
          variant="outline"
          onClick={markVideoAsComplete}
        />
      </span>

      {/* Comments Section */}
      <div className="border border-footer-Bg my-3.5"></div>

      <h2 className="text-xl font-semibold mb-4 text-white">Comments</h2>

      {isCommentLoading && (
        <p className="text-sm text-white/60">Loading comments...</p>
      )}

      <CommentsForm videoId={data?._id} setComments={setComments} />

      <div className="mt-30 space-y-4">
        {comments?.length > 0 ? (
          comments.map((comment) => {
            const isAuthor = comment.commentedBy === user._id;
            return (
              <CommentCard
                key={comment._id}
                comment={comment}
                onEdit={
                  isAuthor &&
                  (() => {
                    setEditingCommentId(comment._id);
                    setEditingText(comment.comment);
                  })
                }
                onDelete={isAuthor && (() => deleteComment(comment._id))}
                isEditing={editingCommentId === comment._id}
                editingText={editingText}
                setEditingText={setEditingText}
                onSave={() => handleEditComment(comment._id)}
                onCancel={() => {
                  setEditingCommentId(null);
                  setEditingText("");
                }}
              />
            );
          })
        ) : (
          <p className="text-sm text-white/50  text-center">
            No comments yet. Be the first to add one!
          </p>
        )}
      </div>
    </div>
  );
}

export default VideoPlayerPage;

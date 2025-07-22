import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { axiosPrivateInstance } from "../../utils/api/axios";
import AdminVideoCard from "../../components/CourseVideoCard/AdminVideoCard";
import { ALL_COURSES_ENPOINT } from "../../utils/api/api_enpoints";
import useApi from "../../hooks/useApi";
import { AddVideoCard } from "../../components";
import handleApiError from "../../utils/api/handle_api_error";
import { useEffect, useState } from "react";

function ManageCourseContent() {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const { loading, data, error } = useApi(
    `${ALL_COURSES_ENPOINT}/${courseId}/videos`
  );
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    if (data) {
      setVideos(data);
    }
  }, [data]);

  async function handleDelete(videoId) {
    try {
      const response = await axiosPrivateInstance.delete(
        `${ALL_COURSES_ENPOINT}/${courseId}/videos/${videoId}`
      );

      const result = response.data;
      if (!result.success) {
        toast.error(result.message);
        return;
      }
      setVideos((prev) => prev.filter((v) => v._id !== videoId));
      toast.success(result.message);
    } catch (error) {
      handleApiError(error, `${ALL_COURSES_ENPOINT}/${courseId}/videos`);
    }
  }

  if (loading || !data) {
    return (
      <p className="text-white text-center mt-10">
        ⏳ Loading course content...
      </p>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 text-white">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold">
            📚 Manage Content -{" "}
            <span className="text-primary">{data?.title}</span>
          </h2>
          <p className="text-sm text-gray-400">Add, edit or remove videos</p>
        </div>
        {/* Add video card (acts like a button) */}
        <AddVideoCard onClick={() => navigate("video/add")} />
      </div>

      {/* Video List */}
      {videos.length === 0 ? (
        <div className="text-center text-gray-400 mt-10">
          <p className="text-lg">No videos added yet.</p>
          <p className="text-sm">Start by adding a video above ⬆️</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {videos.map((video) => (
            <AdminVideoCard
              key={video._id}
              video={video}
              courseId={courseId}
              onEdit={() => navigate(`video/edit/${video._id}`)}
              onDelete={() => handleDelete(video._id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ManageCourseContent;

import toast from "react-hot-toast";
import { axiosPrivateInstance } from "../../utils/api/axios";
import { ALL_COURSES_ENPOINT } from "../../utils/api/api_enpoints";
import handleApiError from "../../utils/api/handle_api_error";

import { useNavigate, useParams } from "react-router-dom";
import { VideoForm } from "../../components";
import useApi from "../../hooks/useApi";

export default function EditVideo() {
  const { courseId, videoId } = useParams();
  const navigate = useNavigate();

  const { loading, data, error } = useApi(
    `${ALL_COURSES_ENPOINT}/${courseId}/videos/${videoId}`
  );
  console.log("COURSE DATA", data);

  const handleEdit = async (formData) => {
    console.log("EDIT FORM DATA", formData);
    try {
      const response = await axiosPrivateInstance.patch(
        `${ALL_COURSES_ENPOINT}/${courseId}/videos/${videoId}`,
        formData
      );

      const result = response.data;
      if (!result.success) {
        toast.error(result.message);
        return;
      }

      toast.success(result.message);
      setTimeout(() => navigate(-1), 800);
    } catch (error) {
      handleApiError(error, `${ALL_COURSES_ENPOINT}/${courseId}/videos`);
    }
  };

  if (loading || !data) {
    return (
      <p className="text-white text-center mt-6">Loading video details...</p>
    );
  }

  if (error) {
    return (
      <p className="text-red-500 text-center mt-6">
        Failed to fetch video details.
      </p>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 rounded-xl shadow-lg text-white">
      <h2 className="text-2xl font-bold mb-6 text-center">🎬 Edit Video</h2>
      <VideoForm
        onSubmit={handleEdit}
        mode="edit"
        defaultValues={{
          title: data.title,
          videoUrl: data.videoUrl,
        }}
      />
    </div>
  );
}

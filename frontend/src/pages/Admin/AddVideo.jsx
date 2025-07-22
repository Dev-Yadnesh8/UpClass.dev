import toast from "react-hot-toast";
import { axiosPrivateInstance } from "../../utils/api/axios";
import { ALL_COURSES_ENPOINT } from "../../utils/api/api_enpoints";
import handleApiError from "../../utils/api/handle_api_error";

import { useNavigate, useParams } from "react-router-dom";
import { VideoForm } from "../../components";

export default function AddVideo() {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const handleCreate = async (formData) => {
    try {
      const response = await axiosPrivateInstance.post(
        `${ALL_COURSES_ENPOINT}/${courseId}/videos`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      const result = response.data;
      if (!result.success) {
        toast.error(result.message);
        return;
      }

      toast.success(result.message);
      navigate(-1);
    } catch (error) {
      handleApiError(error, `${ALL_COURSES_ENPOINT}/${courseId}/videos`);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 rounded-xl shadow-lg text-white">
      <h2 className="text-2xl font-bold mb-6 text-center">
        🎬 Upload New Video
      </h2>
      <VideoForm onSubmit={handleCreate} />
    </div>
  );
}

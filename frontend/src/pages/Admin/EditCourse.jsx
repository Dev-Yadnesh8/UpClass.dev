import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { axiosPrivateInstance } from "../../utils/api/axios";
import {
  ALL_COURSES_ENPOINT,
  EDIT_COURSE_ENDPOINT,
} from "../../utils/api/api_enpoints";
import handleApiError from "../../utils/api/handle_api_error";
import { CourseForm } from "../../components";
import useApi from "../../hooks/useApi";

export default function EditCourse() {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const { loading, data, error } = useApi(`${ALL_COURSES_ENPOINT}/${courseId}`);
  console.log("COURSE DATA", data);

  const handleUpdate = async (formData) => {
    try {
      const { data } = await axiosPrivateInstance.patch(
        `${EDIT_COURSE_ENDPOINT}/${courseId}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (!data.success) {
        toast.error(data.message);
        return;
      }

      toast.success("Course updated successfully!");
      navigate(-1);
    } catch (error) {
      handleApiError(error, EDIT_COURSE_ENDPOINT);
    }
  };

  if (loading)
    return <p className="text-center text-white">Loading course data...</p>;
  if (error)
    return <p className="text-center text-red-400">Failed to load course.</p>;
  if (!data) return null;

  return (
    <div className="max-w-3xl mx-auto p-6 rounded-xl shadow-lg text-white">
      <h2 className="text-2xl font-bold mb-6 text-center">✏️ Edit Course</h2>
      <CourseForm defaultValues={data} onSubmit={handleUpdate} mode="edit" />
    </div>
  );
}

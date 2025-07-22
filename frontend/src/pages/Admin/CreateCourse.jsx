import toast from "react-hot-toast";
import { axiosPrivateInstance } from "../../utils/api/axios";
import { CREATE_COURSE_ENDPOINT } from "../../utils/api/api_enpoints";
import handleApiError from "../../utils/api/handle_api_error";
import { CourseForm } from "../../components";

export default function CreateCourse() {
  const handleCreate = async (formData) => {
    try {
      const response = await axiosPrivateInstance.post(
        CREATE_COURSE_ENDPOINT,
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
    } catch (error) {
      handleApiError(error, CREATE_COURSE_ENDPOINT);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 rounded-xl shadow-lg text-white">
      <h2 className="text-2xl font-bold mb-6 text-center">
        🎓 Create New Course
      </h2>
      <CourseForm onSubmit={handleCreate} />
    </div>
  );
}

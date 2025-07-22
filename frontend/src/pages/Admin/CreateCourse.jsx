import { useForm } from "react-hook-form";
import { useState } from "react";
import toast from "react-hot-toast";
import { axiosInstance } from "../../utils/api";
import { Button, Input, RTE } from "../../components";
import { axiosPrivateInstance } from "../../utils/api/axios";
import { CREATE_COURSE } from "../../utils/api/api_enpoints";
import handleApiError from "../../utils/api/handle_api_error";

function CreateCourse() {
  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const thumbnailFile = watch("thumbnail")?.[0];

  const onSubmit = async (data) => {
    console.log("thumbnailFile:", thumbnailFile);

    if (!thumbnailFile) {
      toast.error("Thumbnail is required");
      return;
    }

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("visibility", data.visibility);
    formData.append("whatYouWillLearnHtml", data.whatYouWillLearnHtml);
    formData.append("prerequisitesHtml", data.prerequisitesHtml);
    formData.append("thumbnail", thumbnailFile);

    try {
      //   console.log("COURSE-FORM-DATA", formData);
      console.log("FORMDATA:");
      for (let pair of formData.entries()) {
        console.log(`${pair[0]}:`, pair[1]);
      }

      const response = await axiosPrivateInstance.post(
        CREATE_COURSE,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const result = response.data;
      if (!result.success) {
        console.error(result.message);
        toast.error(result.message);
        return;
      }
      toast.success(result.message);
      reset();
      setThumbnailPreview(null);
    } catch (error) {
      console.error("ERROR-CREATING COURSE", error);

      handleApiError(error, CREATE_COURSE);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6  rounded-xl shadow-lg text-white">
      <h2 className="text-2xl font-bold mb-6 text-center">
        🎓 Create New Course
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Section 1: Course Info */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-200">
            📘 Course Details
          </h3>

          <Input
            label="Title"
            placeholder="e.g. JavaScript Mastery"
            {...register("title", { required: "Title is required" })}
            error={errors.title?.message}
          />

          <Input
            label="Description"
            multiline
            placeholder="Write a compelling course description"
            {...register("description", {
              required: "Description is required",
            })}
            error={errors.description?.message}
          />

          <Input
            label="Price (₹)"
            type="number"
            step="0.01"
            placeholder="Enter course price"
            {...register("price", { required: "Price is required" })}
            error={errors.price?.message}
          />

          <div>
            <label className="block text-sm mb-1">Visibility</label>
            <select
              {...register("visibility")}
              className="w-full px-3 py-2 rounded bg-footer-Bg/20 border border-footer-Bg/50 focus:border-footer-Bg focus:ring-footer-Bg text-white"
            >
              <option value="PUBLIC">🌐 Public</option>
              <option value="PRIVATE">🔒 Private</option>
            </select>
          </div>
        </div>

        {/* Section 2: Thumbnail */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-gray-200">🖼️ Thumbnail</h3>
          <Input
            label="Thumbnail Image"
            type="file"
            accept="image/*"
            {...register("thumbnail", { required: "Thumbnail is required" })}
            error={errors.thumbnail?.message}
            onChange={(e) => {
              console.log("E", e);

              setThumbnailPreview(URL.createObjectURL(e.target.files[0]));
            }}
          />
          {thumbnailPreview && (
            <img
              src={thumbnailPreview}
              alt="Preview"
              className="mt-2 rounded-lg w-full max-w-xs h-36 object-cover border border-gray-600"
            />
          )}
        </div>

        {/* Section 3: Course Content */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-200">
            📚 Content Info
          </h3>

          <RTE
            label="What You Will Learn"
            name="whatYouWillLearnHtml"
            control={control}
          />

          <RTE
            label="Prerequisites"
            name="prerequisitesHtml"
            control={control}
          />
        </div>

        {/* Button */}
        <div className="pt-4">
          <Button
            type="submit"
            disabled={isSubmitting}
            text={
              isSubmitting ? (
                <span className="flex items-center gap-2">
                  <span className="loader w-4 h-4 border-2 border-t-white rounded-full animate-spin" />
                  Creating...
                </span>
              ) : (
                "🚀 Create Course"
              )
            }
          />
        </div>
      </form>
    </div>
  );
}

export default CreateCourse;

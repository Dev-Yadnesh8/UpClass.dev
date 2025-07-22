// components/CourseForm.jsx
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Input from "../Input/Input";
import RTE from "../RTE/RTE";
import Button from "../Button/Button";

export default function CourseForm({
  defaultValues = {},
  onSubmit,
  mode = "create",
}) {
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues,
  });

  const [thumbnailPreview, setThumbnailPreview] = useState(
    defaultValues.thumbnail || null
  );
  const thumbnailFile = watch("thumbnail")?.[0];

  useEffect(() => {
    if (defaultValues) {
      for (const [key, value] of Object.entries(defaultValues)) {
        if (key !== "thumbnail") setValue(key, value);
      }
    }
  }, [defaultValues, setValue]);

  const internalSubmit = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("visibility", data.visibility);
    formData.append("whatYouWillLearnHtml", data.whatYouWillLearnHtml);
    formData.append("prerequisitesHtml", data.prerequisitesHtml);
    const file = data.thumbnail?.[0];
    if (file) {
      formData.append("thumbnail", file);
    }

    await onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit(internalSubmit)} className="space-y-6">
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

        <div className="space-y-1 mb-2.5">
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Visibility
          </label>
          <div className="flex gap-3 mt-1">
            <label
              className={`cursor-pointer px-4 py-2 rounded-full border text-sm transition-all
        ${
          watch("visibility") === "PUBLIC"
            ? "bg-footer-Bg text-white border-footer-Bg"
            : "bg-transparent text-gray-300 border-gray-600"
        }`}
            >
              <input
                type="radio"
                value="PUBLIC"
                {...register("visibility")}
                className="hidden"
              />
              🌐 Public
            </label>

            <label
              className={`cursor-pointer px-4 py-2 rounded-full border text-sm transition-all
        ${
          watch("visibility") === "PRIVATE"
            ? "bg-footer-Bg text-white border-footer-Bg"
            : "bg-transparent text-gray-300 border-gray-600"
        }`}
            >
              <input
                type="radio"
                value="PRIVATE"
                {...register("visibility")}
                className="hidden"
              />
              🔒 Private
            </label>
          </div>
        </div>
      </div>

      {/* Thumbnail */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-gray-200">🖼️ Thumbnail</h3>
        <Input
          label="Thumbnail Image"
          type="file"
          accept="image/*"
          {...register("thumbnail", {
            required: mode === "create" ? "Thumbnail is required" : false,
          })}
          error={errors.thumbnail?.message}
          onChange={(e) => {
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

      {/* Content */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-200">📚 Content Info</h3>

        <RTE
          label="What You Will Learn"
          name="whatYouWillLearnHtml"
          control={control}
        />

        <RTE label="Prerequisites" name="prerequisitesHtml" control={control} />
      </div>

      <div className="pt-4">
        <Button
          type="submit"
          isDisabled={isSubmitting}
          text={
            isSubmitting ? (
              <span className="flex items-center gap-2">
                <span className="loader w-4 h-4 border-2 border-t-white rounded-full animate-spin" />
                Saving...
              </span>
            ) : mode === "create" ? (
              "🚀 Create Course"
            ) : (
              "💾 Update Course"
            )
          }
        />
      </div>
    </form>
  );
}

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Input from "../Input/Input";
import Button from "../Button/Button";

export default function VideoForm({ defaultValues = {}, onSubmit, mode = "create" }) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues,
  });

  const [videoPreview, setVideoPreview] = useState(null);
  const videoFile = watch("videoFile")?.[0];

  useEffect(() => {
    if (defaultValues) {
        // setVideoPreview(defaultValues?.videoFile);
      for (const [key, value] of Object.entries(defaultValues)) {
        if (key !== "videoFile") setValue(key, value);
      }
    }
  }, [defaultValues, setValue]);

  const internalSubmit = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    const file = data.videoFile?.[0];
    if (file) {
      formData.append("videoFile", file);
    }


   if(mode ==="create"){
     await onSubmit(formData);
   }else{
     await onSubmit(data);
   }
  };

  return (
    <form onSubmit={handleSubmit(internalSubmit)} className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-200">🎬 Video Details</h3>

        <Input
          label="Title"
          placeholder="e.g. Introduction to React"
          {...register("title", { required: "Title is required" })}
          error={errors.title?.message}
        />

        {mode === "create" && <Input
          label="Upload Video"
          type="file"
          accept="video/*"
          {...register("videoFile", {
            required: mode === "create" ? "Video file is required" : false,
          })}
          error={errors.video?.message}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) setVideoPreview(URL.createObjectURL(file));
          }}
        />}

        {videoPreview && (
          <video
            controls
            src={videoPreview}
            className="w-full mt-3 rounded border border-gray-700 max-w-xl"
          />
        )}
      </div>

      <div className="pt-2">
        <Button
          type="submit"
          isDisabled={isSubmitting}
          text={
            isSubmitting ? (
              <span className="flex items-center gap-2">
                <span className="loader w-4 h-4 border-2 border-t-white rounded-full animate-spin" />
                Uploading...
              </span>
            ) : mode === "create" ? (
              "Add Video"
            ) : (
              "Update Video"
            )
          }
        />
      </div>
    </form>
  );
}

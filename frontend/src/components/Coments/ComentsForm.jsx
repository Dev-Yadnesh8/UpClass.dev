import { useState } from "react";
import Button from "../Button/Button";
import Input from "../Input/Input";
import { useForm } from "react-hook-form";
import { axiosPrivateInstance } from "../../utils/api/axios";
import { COMMENTS_ENPOINT } from "../../utils/api/api_enpoints";
import toast from "react-hot-toast";

function CommentsForm({ videoId ,setComments }) {
  const { register, handleSubmit, watch, reset } = useForm();
  const commentValue = watch("commentText");

  async function addComment(data) {
    console.log("Submitting comment");
    try {
      const response = await axiosPrivateInstance.post(
        `${COMMENTS_ENPOINT}/${videoId}`,
        data
      );
      const result = response.data;
      if (!result.success) {
        return console.error(result.message);
      }
      console.log("Adding comment result", result);
      toast.success(result.message);
      setComments((prev)=>[...prev,result?.data]);
      reset()
    } catch (error) {
      console.error("Error adding comment", error);
    }
  }

  return (
    <form onSubmit={handleSubmit(addComment)} className="h-16 w-full">
      <Input
        label="Add a comment"
        name="comment"
        placeholder=""
        variant="solid"
        {...register("commentText", {
          required: true,
        })}
      />
      <div className="flex justify-end mt-3 gap-x-1.5">
        <Button text={"Cancel"} onClick={() => reset()} />
        <Button
          text="Comment"
          type="submit"
          isDisabled={!commentValue?.trim()}
        />
      </div>
    </form>
  );
}

export default CommentsForm;

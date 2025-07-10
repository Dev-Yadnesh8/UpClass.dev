import { useLocation, useParams } from "react-router-dom";
import useApi from "../../hooks/useApi";
import { ALL_COURSES_ENPOINT } from "../../utils/api/api_enpoints";
import { Button } from "../../components";
import { axiosPrivateInstance } from "../../utils/api/axios";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

function VideoPlayerPage() {
  const { courseId, id } = useParams();
  const { user } = useSelector((state) => state.auth);
  const { loading, data, error } = useApi(
    `${ALL_COURSES_ENPOINT}/${courseId}/videos/${id}`
  );
  const [isWatchedByUser, setIsWatchedByUser] = useState(false);

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

  useEffect(() => {
    console.log("Data--", data);
    if (data && user?._id) {
      setIsWatchedByUser(data?.isWatched.includes(user._id));
    }

    console.log("Is watched by user",isWatchedByUser);
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

      {/* Comments Placeholder */}
      <div className="bg-zinc-800 rounded-lg p-5 min-h-[200px]">
        <p className="text-gray-400 italic">Comments section coming soon...</p>
      </div>
    </div>
  );
}

export default VideoPlayerPage;

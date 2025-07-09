import { useLocation, useParams } from "react-router-dom";
import useApi from "../../hooks/useApi";
import { ALL_COURSES_ENPOINT } from "../../utils/api/api_enpoints";


function VideoPlayerPage() {
 
   const  {courseId,id} = useParams();
   const {loading,data,error} = useApi(`${ALL_COURSES_ENPOINT}/${courseId}/videos/${id}`);

  if (loading) return <p className="text-center text-white mt-10">Loading...</p>;
  if (error || !data) return <p className="text-center text-red-400 mt-10">Failed to load video</p>;

  console.log(data);
  

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 text-white">
      <video
        src={data?.videoFile}
        controls
        className="w-full rounded-lg shadow-xl mb-6"
      />
      <h1 className="text-2xl font-bold mb-4">{data.title}</h1>

      {/* Comments Placeholder */}
      <div className="bg-zinc-800 rounded-lg p-5 min-h-[200px]">
        <p className="text-gray-400 italic">Comments section coming soon...</p>
      </div>
    </div>
  );
}

export default VideoPlayerPage;

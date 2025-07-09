import { useParams } from "react-router-dom";
import useApi from "../../hooks/useApi";
import { ALL_COURSES_ENPOINT } from "../../utils/api/api_enpoints";
import { CourseVideoCard } from "../../components";


function CourseContent() {
  const { id } = useParams();
  const { isLoading, data, error } = useApi(`${ALL_COURSES_ENPOINT}/${id}/videos`);

  if (isLoading) return <p className="text-center text-white mt-10">Loading course...</p>;
  if (error || !data) return <p className="text-center text-red-400 mt-10">Error loading videos.</p>;
  if (data.length <= 0) return <p className="text-center text-white mt-10">No Content Yet</p>;

  return (
    <div className="max-w-[120rem] mx-auto p-5 text-white">
      <h1 className="text-2xl font-bold mb-6">Course Videos</h1>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {data.map((video) => (
          <CourseVideoCard key={video._id} video={video} />
        ))}
      </div>
    </div>
  );
}

export default CourseContent;

import { useParams } from "react-router-dom";
import useApi from "../../hooks/useApi";
import { ALL_COURSES_ENPOINT } from "../../utils/api/api_enpoints";
import { FiLock, FiUnlock } from "react-icons/fi";

function CourseDetails() {
  const { id } = useParams();
  const { loading, data, error } = useApi(`${ALL_COURSES_ENPOINT}/${id}`);

  if (loading)
    return <p className="text-center text-white mt-10">Loading...</p>;
  if (error || !data)
    return (
      <p className="text-center text-red-400 mt-10">Error loading course</p>
    );

  const course = data;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 text-white">
      {/* Banner */}
      <div className="flex flex-col lg:flex-row gap-10">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="rounded-xl w-full lg:w-[50%] h-64 object-cover"
        />

        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
          <p className="text-gray-400 mb-4">{course.description}</p>
          <p className="text-purple font-semibold text-xl mb-4">
            ₹{course.price}
          </p>
        </div>
      </div>

      {/* Learnings / HTML Content (Without Sanitization) */}
      {course.whatYouWillLearn && (
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">What you'll learn</h2>
          <div
            className="prose prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: course.whatYouWillLearn }}
          />
        </div>
      )}
    </div>
  );
}

export default CourseDetails;

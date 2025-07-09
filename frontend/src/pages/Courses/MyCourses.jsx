import { replace, useNavigate } from "react-router-dom";
import { CourseWithProgressCard } from "../../components";
import useApi from "../../hooks/useApi";
import { PURCHASED_COURSES_ENPOINT } from "../../utils/api/api_enpoints";

function MyCourses() {
  const navigate = useNavigate();
  const { isLoading, data, error } = useApi(PURCHASED_COURSES_ENPOINT);
  console.log(data);

  return (
    <div className="max-w-[120rem] mx-auto my-8 px-3.5">
      {/* Greeting */}
      <h1 className="text-2xl font-bold text-white mb-4">My Courses</h1>
      <p className="text-sm text-gray-400 mb-6">
        You are enrolled in {data?.length}{" "}
        {data?.length === 1 ? "course" : "courses"}.
      </p>

      {/* States */}
      {isLoading && (
        <div className="text-center text-purple text-xl">Loading...</div>
      )}

      {error && <div className="text-center text-red-400 text-lg">{error}</div>}

      {/* Courses */}
      {!isLoading && !error && data?.length === 0 && (
        <p className="text-center text-gray-400 mt-11">
          No courses found.{" "}
          <span
            onClick={() => navigate("/", { replace: true })} // or your course listing route
            className="text-purple underline cursor-pointer"
          >
            Explore courses
          </span>{" "}
          to get started!
        </p>
      )}

      {!isLoading && !error && (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 mt-10">
          {data?.map((course) => (
            <CourseWithProgressCard
              key={course._id}
              course={course}
              onClick={() => navigate(`${course.courseId}`)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default MyCourses;

import { useSelector } from "react-redux";

import { CourseCard } from "../../components";
import { capitalizeFirstLetter } from "../../utils/formatter/formatter";
import useApi from "../../hooks/useApi";
import { ALL_COURSES_ENPOINT } from "../../utils/api/api_enpoints";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const { isLoading, data, error } = useApi(ALL_COURSES_ENPOINT);
  console.log("All courses",data);
  

  return (
    <div className="max-w-[120rem] mx-auto my-8 px-3.5">
      {/* Greeting */}
      <div className="mb-10 text-left">
        <h1 className="text-3xl md:text-4xl font-bold">
          Welcome
          {user?.username
            ? `, ${capitalizeFirstLetter(user?.username)}`
            : " Guest User"}{" "}
          👋
        </h1>
        <p className="text-gray-400 mt-2">
          Explore all your available courses below
        </p>
      </div>

      {/* States */}
      {isLoading && (
        <div className="text-center text-purple text-xl">
          Loading Courses...
        </div>
      )}

      {error && <div className="text-center text-red-400 text-lg">{error}</div>}

      {/* Courses */}
      {!isLoading && !error && data?.length === 0 && (
        <p className="text-center text-gray-400">No courses found.</p>
      )}

      {!isLoading && !error && (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 mt-10">
          {data?.map((course) => (
            <CourseCard
              key={course._id}
              course={course}
              onClick={() => navigate(`course-details/${course._id}`)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

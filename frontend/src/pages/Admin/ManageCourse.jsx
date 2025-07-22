import { useNavigate } from "react-router-dom";
import useApi from "../../hooks/useApi";
import { ALL_COURSES_ENPOINT } from "../../utils/api/api_enpoints";
import {
  AdminCourseCard,
  CourseCard,
  CreateCourseCard,
} from "../../components";

function ManageCourse() {
  const navigate = useNavigate();

  const { isLoading, data, error } = useApi(ALL_COURSES_ENPOINT);

  return (
    <div className="max-w-[120rem] mx-auto my-8 px-3.5">
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
          <CreateCourseCard />

          {data?.map((course) => (
            <AdminCourseCard
              key={course._id}
              course={course}
              onEdit={() =>
                navigate(`/admin/manage-courses/edit/${course._id}`)
              }
              onDelete={() => handleDelete(course._id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ManageCourse;

import Button from "../Button/Button";

export default function CourseCard({ course, onClick }) {
  return (
    <div className="bg-footer-Bg/50 backdrop-blur-md rounded-xl border border-footer-Bg/50 overflow-hidden shadow-md hover:shadow-purple/30 transition-all duration-300 flex flex-col">
      {/* Thumbnail with 16:9 aspect ratio */}
      <div className="w-full aspect-video overflow-hidden">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col justify-between flex-1 p-5">
        <div>
          <h2 className="text-lg font-semibold text-white mb-2 line-clamp-1">
            {course.title}
          </h2>
          <p className="text-gray-400 text-sm line-clamp-3">
            {course.description}
          </p>
        </div>

        <div className="mt-4 flex justify-between items-center">
          <span className="text-purple font-bold text-lg">₹{course.price}</span>
          <Button
            text="View Course"
            variant="gradient"
            onClick={() => onClick(course._id)}
          />
        </div>
      </div>
    </div>
  );
}

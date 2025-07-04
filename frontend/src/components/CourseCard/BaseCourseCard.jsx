// BaseCourseCard.jsx
import Button from "../Button/Button";

export default function BaseCourseCard({ course, onClick, children }) {
  return (
    <div className="bg-darkBg rounded-xl border border-footer-Bg overflow-hidden flex flex-col">
      {/* Thumbnail */}
      <div className="w-full aspect-video overflow-hidden">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col justify-between flex-1 p-5 gap-4">
        {/* Title & Description */}
        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-white line-clamp-1">
            {course.title}
          </h2>
          <p className="text-gray-400 text-sm line-clamp-3">
            {course.description}
          </p>
        </div>

        {/* Slot for extra components like progress */}
        {children}

        

        {/* CTA Button */}
        <div className="mt-2 w-full">
          <Button
            text="View Course"
            variant="filled"
            className="w-full"
            onClick={() => onClick(course._id)}
          />
        </div>
      </div>
    </div>
  );
}

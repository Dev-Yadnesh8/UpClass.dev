import BaseCourseCard from "./BaseCourseCard";

export default function CourseWithProgressCard({ course,progress, onClick }) {


  return (
    <BaseCourseCard course={course} onClick={onClick}>
      <div className="mt-2">
        <div className="flex justify-between text-sm mb-1 text-gray-300">
          <span>Progress</span>
          <span>{progress}%</span>
        </div>
        <div className="w-full h-2 bg-footer-Bg rounded-full overflow-hidden">
          <div
            className="bg-gradient-to-r from-blue to-purple h-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </BaseCourseCard>
  );
}

import BaseCourseCard from "./BaseCourseCard";

export default function CourseCard({ course, onClick }) {
  return (
    <BaseCourseCard course={course} onClick={onClick}>
      <div className="mt-2 text-white font-bold text-lg">₹{course.price}</div>
    </BaseCourseCard>
  );
}

import { useNavigate, useParams } from "react-router-dom";
import useApi from "../../hooks/useApi";
import {
  ALL_COURSES_ENPOINT,
  PURCHASED_COURSES_ENPOINT,
} from "../../utils/api/api_enpoints";
import { Button } from "../../components";
import DOMPurify from "dompurify";
import { axiosPrivateInstance } from "../../utils/api/axios";
import toast from "react-hot-toast";
import handleApiError from "../../utils/api/handle_api_error";

function CourseDetails() {
  const { id } = useParams();
  const { loading, data, error } = useApi(`${ALL_COURSES_ENPOINT}/${id}`);
  const navigate = useNavigate();

  if (loading)
    return <p className="text-center text-white mt-10">Loading...</p>;

  if (error || !data)
    return (
      <p className="text-center text-red-400 mt-10">Error loading course</p>
    );

  const course = data;

  const onClickBuyNow = async () => {
    console.log("Clicking Buy now ");
    try {
      const response = await axiosPrivateInstance.post(
        `${PURCHASED_COURSES_ENPOINT}/${id}`
      );
      const result = response?.data;
      if (!result.success) {
        return toast.error(result.message);
      }
      toast.success(result.message);
      navigate(-1);
    } catch (error) {
      console.error(error);
      handleApiError(error,`${PURCHASED_COURSES_ENPOINT}/${id}`,"Error while purchasing course")
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 text-white space-y-16">
      {/* Banner Section */}
      <div className="flex flex-col lg:flex-row gap-10">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="rounded-2xl w-full lg:w-[45%] h-64 object-cover shadow-md"
        />

        <div className="flex-1 space-y-4">
          <h1 className="text-4xl font-extrabold leading-snug">
            {course.title}
          </h1>
          <p className="text-gray-300 text-lg">{course.description}</p>
          <p className="text-2xl font-semibold text-white">₹{course.price}</p>

          <Button onClick={onClickBuyNow} text="Buy Now" variant="filled" />
        </div>
      </div>

      {/* Learnings */}
      <section>
        <h2 className="text-3xl font-bold mb-6 border-b border-gray-600 pb-2">
          What You'll Learn
        </h2>
        <div
          className="pl-6 list-disc list-outside space-y-2 [&>ul]:list-disc [&>ul]:pl-6 [&>li]:mb-2 marker:text-gray-300"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(course.whatYouWillLearnHtml),
          }}
        />
      </section>

      {/* Prerequisites */}
      <section>
        <h2 className="text-3xl font-bold mb-6 border-b border-gray-600 pb-2">
          Prerequisites
        </h2>
        <div
          className="pl-6 list-disc list-outside space-y-2 [&>ul]:list-disc [&>ul]:pl-6 [&>li]:mb-2 marker:text-gray-300"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(course.prerequisitesHtml),
          }}
        />
      </section>
    </div>
  );
}

export default CourseDetails;

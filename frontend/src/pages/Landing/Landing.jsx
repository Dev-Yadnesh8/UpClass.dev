import { OfferingsCard } from "../../components/index.js";
import { offerings } from "../../data/offerings.js";

function Landing() {
 
  return (
    <div className=" font-poppins  flex justify-center px-4 py-12">
      <div className="w-full max-w-7xl text-white">
        {/* Hero Section */}
        <div className="text-center mb-16 px-4">
          <h3 className="text-md sm:text-lg text-gray-400 mb-4">
            Namaste Creator! Want to Launch Your Own Course Platform?
          </h3>

          <h1 className="text-3xl sm:text-5xl font-extrabold leading-tight">
            <span className="text-orange-500">Create.</span> Teach.{" "}
            <span className="text-green-500">Grow</span> — All in One Place.
          </h1>

          <p className="mt-6 text-gray-300 max-w-3xl mx-auto text-sm sm:text-base">
            UpClass.dev gives you the tools to build, launch, and scale your own
            online course business — no tech skills needed. From course creation
            and student management to payments and analytics, we’ve built the
            platform so you can focus on teaching. Start building your education
            empire today 🚀
          </p>
        </div>

        {/* Offerings Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-2 sm:px-6">
          {offerings.map((item, index) => {
            const Icon = item.icon;
            return (
              <OfferingsCard
                key={index}
                icon={<Icon className="text-[--color-purple] text-4xl" />}
                title={item.title}
                description={item.description}
              />
            );
          })}
        </div>

        {/* Mission & Values Section */}
        <div className="mt-34 px-4 text-center">
          <h3 className="text-3xl sm:text-4xl font-bold mb-10 text-white">
            We’re Empowering the Next Wave of Course Creators
          </h3>

          <div className="px-6 py-10 text-left w-full mx-auto ">
            {/* 🚀 Our Mission */}
            <h2 className="text-2xl sm:text-3xl font-semibold text-white">
              🚀 Our Mission
            </h2>
            <p className="text-gray-300 mt-4 leading-relaxed">
              UpClass.dev is a modern learning platform built to empower
              independent educators, developers, and creators to build, launch,
              and scale their own online course businesses — without needing to
              be tech experts.
              <br />
              <br />
              Founded by a developer passionate about learning by building,
              UpClass.dev is more than just software — it’s a platform that
              simplifies course creation while encouraging hands-on,
              project-based learning. Whether you're teaching frontend, backend,
              design, or dev tools, we give you full control and a beautiful
              experience for both you and your learners.
              <br />
              <br />
              We’re on a mission to make professional education accessible,
              creator-first, and completely customizable — because every
              educator deserves the tools to teach the world in their own way.
            </p>

            {/* 💡 Our Vision */}
            <h2 className="text-2xl sm:text-3xl font-semibold text-white mt-12">
              💡 Our Vision
            </h2>
            <p className="text-gray-300 mt-4 leading-relaxed">
              Our vision is to empower a new generation of creators, mentors,
              and developers to own their teaching platforms, share their
              knowledge at scale, and build sustainable careers doing what they
              love.
              <br />
              <br />
              We believe in democratizing edtech — giving independent
              instructors the same tools and design power as big course
              platforms, but without the gatekeeping. With UpClass.dev, anyone
              can turn their knowledge into impact.
              <br />
              <br />
              As we grow, we remain committed to open learning, modern tools,
              and building a supportive ecosystem for both educators and
              learners. This isn’t just a product — it’s a movement to make
              learning and teaching more personal, powerful, and accessible.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;

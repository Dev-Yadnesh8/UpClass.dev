import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import {
  AdminRoute,
  AuthGate,
  Layout,
  PrivateRoute,
} from "./components/index.js";
import {
  AddVideo,
  CourseContent,
  CourseDetails,
  CreateCourse,
  EditCourse,
  EditVideo,
  ForgotPassword,
  Login,
  ManageCourse,
  ManageCourseContent,
  MyCourses,
  NotFound,
  ResetPassword,
  SignUp,
  VerifyEmail,
  VideoPlayerPage,
} from "./pages/index.js";
import { Provider } from "react-redux";
import { store } from "./store/store.js";
import AuthRedirect from "./components/PrivateRoute/AuthRedirect.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<AuthGate />}>
      <Route path="/" element={<Layout />}>
        <Route index element={<AuthRedirect />} />

        {/* Public */}
        <Route path="sign-in" element={<Login />} />
        <Route path="sign-up" element={<SignUp />} />
        <Route path="verify-email" element={<VerifyEmail />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="reset-password/:token" element={<ResetPassword />} />

        {/* Private */}
        <Route element={<PrivateRoute />}>
          <Route path="courses" element={<MyCourses />} />
          <Route path="courses/:id" element={<CourseContent />} />
          <Route
            path="courses/:courseId/video/:id"
            element={<VideoPlayerPage />}
          />
          <Route path="course-details/:id" element={<CourseDetails />} />

          {/* Admin */}
          <Route element={<AdminRoute />}>
            <Route path="admin/manage-courses" element={<ManageCourse />} />
            <Route path="admin/manage-courses/create" element={<CreateCourse />} />
            <Route path="admin/manage-courses/edit/:courseId" element={<EditCourse />} />
            <Route path="admin/manage-courses/course/:courseId" element={<ManageCourseContent />} />
            <Route path="admin/manage-courses/course/:courseId/video/add" element={<AddVideo />} />
            <Route path="admin/manage-courses/course/:courseId/video/edit/:videoId" element={<EditVideo />} />
            {/* <Route path="admin/edit-course/:id" element={<EditCourse />} /> */}
            {/* <Route path="admin/add-videos/:id" element={<AddVideos />} /> */}
          </Route>
        </Route>

        {/* Catch all */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);

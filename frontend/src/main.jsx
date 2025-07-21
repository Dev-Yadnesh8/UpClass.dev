import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { AuthGate, Layout, PrivateRoute } from "./components/index.js";
import {
  CourseContent,
  CourseDetails,
  CreateCourse,
  ForgotPassword,
  Login,
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
        {/* PUBLIC ROUTES */}

        <Route path="sign-in" element={<Login />} />
        <Route path="sign-up" element={<SignUp />} />
        <Route path="verify-email" element={<VerifyEmail />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="reset-password/:token" element={<ResetPassword />} />

        {/* PRIVATE ROUTES */}

        <Route index element={<AuthRedirect />} />
        <Route element={<PrivateRoute />}>
          <Route path="courses" element={<MyCourses />} />
          <Route path="courses/:id" element={<CourseContent />} />
          <Route
            path="courses/:courseId/video/:id"
            element={<VideoPlayerPage />}
          />
          <Route path="course-details/:id" element={<CourseDetails />} />
        </Route>
        {/* ADMIN ROUTES */}
        <Route index element={<AuthRedirect />} />
        <Route element={<PrivateRoute />}>
          <Route path="create-course" element={<CreateCourse />} />
        </Route>

        {/* CATCH-ALL */}
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

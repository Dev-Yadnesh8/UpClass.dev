import { StrictMode, useEffect } from "react";
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
  CourseDetails,
  Login,
  MyCourses,
  NotFound,
  SignUp,
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

        {/* PRIVATE ROUTES */}

        <Route index element={<AuthRedirect />} />
        <Route element={<PrivateRoute />}>
          <Route path="my-courses" element={<MyCourses />} />
          <Route path="course-details/:id" element={<CourseDetails />} />
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

import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Layout, PrivateRoute } from "./components/index.js";
import { Home, Landing, Login, MyCourses, SignUp } from "./pages/index.js";
import { Provider } from "react-redux";
import { store } from "./store/store.js";
import App from "./App.jsx";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="" element={<Landing />} />
      <Route path="sign-in" element={<Login />} />
      <Route path="sign-up" element={<SignUp />} />
      <Route element={<PrivateRoute />}>
        <Route path="/home" element={<Home />} />
        <Route path="/my-courses" element={<MyCourses />} />
      </Route>
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <App>
        <RouterProvider router={router} />
      </App>
    </Provider>
  </StrictMode>
);

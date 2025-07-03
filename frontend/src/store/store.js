import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import allCoursesReducer from "../features/courses/allCoursesSlice";
import sidebarReducer from "../features/sidebar/sidebarSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    allCourses: allCoursesReducer,
    sidebar: sidebarReducer,
  },
});

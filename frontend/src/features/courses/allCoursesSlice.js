import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    courses : [],
    status: 'IDLE', // 'IDLE' , 'LOADING','SUCCESS','FAILED'
    error: null
}

export const allCoursesSlice = createSlice({
    name:"all-courses",
    initialState,
    reducers:{
        fetchCourses: (state,action)=>{
            state.courses = action.payload
        }
    }
});

const { fetchCourses} = allCoursesSlice.actions;

export default allCoursesSlice.reducer;
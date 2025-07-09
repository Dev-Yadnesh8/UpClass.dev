import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading : true,
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signIn: (state, action) => {
      state.user = action.payload;
      state.loading = false;
    },

    logout: (state, _) => {
      state.loading = false;
      state.user = null;
    },
    setLoading:(state,action)=>{
      state.loading = action.payload
    }
  },
});
export const { logout, signIn ,setLoading} = authSlice.actions;
export default authSlice.reducer;

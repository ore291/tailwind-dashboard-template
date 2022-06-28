import { createSlice } from '@reduxjs/toolkit';


const token = JSON.parse(localStorage.getItem("accessToken"));
const user = JSON.parse(localStorage.getItem("user"));

// const initialState = token
//   ? { isLoggedIn: true, user: user,error : false, errorMessage: "" , token : token}
//   : { isLoggedIn: false, user: null,error : false, errorMessage: "" };



const initialState =  {
  userData: user || null,
  token : token || null
} 

export const userSlice = createSlice({
  initialState,
  name: 'userSlice',
  reducers: {
    logout: () => initialState,
    setUser: (state, action) => {
      state.userData = action.payload;
    },
  },
});

export default userSlice.reducer;

export const { logout, setUser } = userSlice.actions;


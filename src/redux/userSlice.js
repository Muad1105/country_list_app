import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userLoginData: [],
  signedinUser: [],
};

const useeSlice = createSlice({
  name: "loginDetails",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      console.log("payload", action.payload);
      const newUserLoginData = [...state.userLoginData, action.payload];
      localStorage.setItem(
        "allUsersLoginData",
        JSON.stringify(newUserLoginData)
      );
      return {
        ...state,
        userLoginData: newUserLoginData,
      };
      state.userLoginData.push(action.payload);
    },
    signinUserData: (state, action) => {
      console.log(action.payload);
      const newUserLogin = [action.payload];
      localStorage.setItem("loggedinUser", JSON.stringify(newUserLogin));
      return {
        ...state,
        signedinUser: newUserLogin,
      };
    },
  },
});

export const { setCredentials, signinUserData } = useeSlice.actions;
export default useeSlice.reducer;

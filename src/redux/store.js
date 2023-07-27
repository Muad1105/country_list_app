import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
//accessing value from localStorage
const allUserLoginData = localStorage.getItem("allUsersLoginData");
const loggedinUser = localStorage.getItem("loggedinUser");
const initialState = {
  user: {
    userLoginData: allUserLoginData ? JSON.parse(allUserLoginData) : [],
    signedinUser: loggedinUser ? JSON.parse(loggedinUser) : [],
  },
};

const store = configureStore({
  reducer: { user: userReducer },
  preloadedState: initialState,
});

export default store;

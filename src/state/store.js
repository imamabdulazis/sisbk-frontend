import { configureStore } from "@reduxjs/toolkit";
import { contactSlice } from "./contact/contactSlice";
import { userSlice } from "./user/userSlice";

export default configureStore({
  reducer: {
    user: userSlice.reducer,
    contact: contactSlice.reducer,
  },
});

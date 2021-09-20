import { configureStore } from "@reduxjs/toolkit";
import { contactSlice } from "./contact/contactSlice";
import { materiSlice } from "./materi/materiSlice";
import { userSlice } from "./user/userSlice";

export default configureStore({
  reducer: {
    user: userSlice.reducer,
    contact: contactSlice.reducer,
    materi: materiSlice.reducer,
  },
});

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../../api/apiHandler";

export const signupUser = createAsyncThunk(
  "users/signupUsers",
  async (data, thunkAPI) => {
    try {
    } catch (error) {
      console.log("Error :", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const loginUser = createAsyncThunk(
  "users/login",
  async (data, thunkAPI) => {
    try {
      let response = API.post("/api/user/login", data);
      if ((await response).status === 200) {
        localStorage.setItem("token", response.token);
        return (await response).data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (error) {
      console.log("Error :", error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState: {
    username: "",
    email: "",
    name: "",
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: "",
  },
  reducers: {
    clearState: (state) => {
      state.isFetching = false;
      state.isFetching = false;
      state.isSuccess = false;
      return state;
    },
  },
  extraReducers: {
    [signupUser.fulfilled]: (state, { payload }) => {
      console.log(payload);
      state.isFetching = false;
      state.isSuccess = true;
      state.email = payload.data.email;
      state.username = payload.data.username;
    },
    [signupUser.pending]: (state) => {
      state.isFetching = true;
    },
    [signupUser.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.message;
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      state.email = payload.data.email;
      state.username = payload.data.username;
      state.isFetching = false;
      state.isSuccess = true;
    },
    [loginUser.pending]: (state) => {
      state.isFetching = true;
    },
    [loginUser.rejected]: (state, { payload }) => {
      console.log("payload", payload);
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.message;
    },
  },
});

export const { clearState } = userSlice.actions;

export const userSelector = (state) => state.user;

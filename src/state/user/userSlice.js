import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../../api/apiHandler";

export const signupUser = createAsyncThunk(
  "USER_SIGNUP",
  async (data, thunkAPI) => {
    let response = API.post("/api/user/signup", data);
    try {
      if ((await response).status === 200) {
        console.info((await response).data);
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

export const loginUser = createAsyncThunk(
  "USER_LOGIN",
  async (data, thunkAPI) => {
    try {
      let response = API.post("/api/user/login", data);
      console.info("RESPONSE", (await response).data);
      if ((await response).status === 200) {
        localStorage.setItem("token", (await response).data.token);
        localStorage.setItem("role", (await response).data.data.previlage);
        localStorage.setItem("user_id", (await response).data.data.id);
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

export const fetchUserById = createAsyncThunk(
  "USER_FETCH_BY_ID",
  async (id, thunkAPI) => {
    try {
      let response = API.get(`/api/user/${id}`);
      if ((await response).status === 200) {
        return (await response).data;
      } else {
        return thunkAPI.rejectWithValue(id);
      }
    } catch (error) {
      console.log("Error :", error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const fetchAllUser = createAsyncThunk(
  "USER_FETCH_ALL",
  async (thunkAPI) => {
    try {
      let response = API.get(`/api/user`);
      if ((await response).status === 200) {
        return (await response).data;
      } else {
        return thunkAPI.rejectWithValue(response);
      }
    } catch (error) {
      console.log("Error :", error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const deleteUserById = createAsyncThunk(
  "USER_DELETE_BY_ID",
  async (id, thunkAPI) => {
    try {
      let response = API.delete(`/api/user/${id}`);
      if ((await response).status === 200) {
        return (await response).data;
      } else {
        return thunkAPI.rejectWithValue(response);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const updateUserById = createAsyncThunk(
  "USER_UPDATE_BY_ID",
  async ({ id, data }, thunkAPI) => {
    try {
      console.log("DATAAA");
      let response = API.put(`/api/user/profile/${id}`, data);
      if ((await response).status === 200) {
        return (await response).data;
      } else {
        return thunkAPI.rejectWithValue(response);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState: {
    username: "",
    email: "",
    role: null,
    name: "",
    user: {},
    allUser: [],
    isFetching: false,
    isSuccess: false,
    isSuccessDelete: false,
    isError: false,
    errorMessage: "",
  },
  reducers: {
    clearState: (state) => {
      state.isFetching = false;
      state.isFetching = false;
      state.isSuccess = false;
      state.isSuccessDelete = false;
      state.isError = false;
      return state;
    },
  },
  extraReducers: {
    // register
    [signupUser.fulfilled]: (state, { payload }) => {
      console.log(payload);
      state.isFetching = false;
      state.isSuccess = true;
    },
    [signupUser.pending]: (state) => {
      state.isFetching = true;
    },
    [signupUser.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload?.message;
    },
    // login
    [loginUser.fulfilled]: (state, { payload }) => {
      state.email = payload?.data.email;
      state.username = payload?.data.username;
      state.role = payload?.data?.previlage;
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
      state.errorMessage = payload?.message;
    },
    // fetch by id
    [fetchUserById.fulfilled]: (state, { payload }) => {
      console.log(payload);
      state.user = payload.data;
      state.name = payload.data.name;
      state.isFetching = false;
      state.isError = false;
    },
    [fetchUserById.pending]: (state) => {
      state.isFetching = true;
    },
    [fetchUserById.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload?.message;
    },
    // get all
    [fetchAllUser.fulfilled]: (state, { payload }) => {
      console.log(payload);
      state.allUser = payload.data;
      state.isFetching = false;
      state.isError = false;
    },
    [fetchAllUser.pending]: (state) => {
      state.isFetching = true;
    },
    [fetchAllUser.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.message;
    },
    [deleteUserById.fulfilled]: (state, { payload }) => {
      state.isSuccess = true;
      state.isFetching = false;
      state.isError = false;
      state.isSuccessDelete = true;
    },
    [deleteUserById.pending]: (state) => {
      state.isFetching = true;
    },
    [deleteUserById.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.isSuccessDelete = false;
      state.errorMessage = payload.message;
    },
    [updateUserById.fulfilled]: (state, { payload }) => {
      state.isSuccess = true;
      state.isFetching = false;
      state.isError = false;
    },
    [updateUserById.pending]: (state) => {
      state.isFetching = true;
    },
    [updateUserById.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.message;
    },
  },
});

export const { clearState } = userSlice.actions;

export const userSelector = (state) => state.user;

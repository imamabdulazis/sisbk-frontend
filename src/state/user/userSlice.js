import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../../api/apiHandler";

export const signupUser = createAsyncThunk(
  "users/signupUsers",
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
  "users/login",
  async (data, thunkAPI) => {
    try {
      let response = API.post("/api/user/login", data);
      console.info("RESPONSE", (await response).data);
      if ((await response).status === 200) {
        localStorage.setItem("token", (await response).data.token);
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
  "user/fetchUserById",
  async (id, thunkAPI) => {
    try {
      let response = API.get(`/api/user/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
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
  "user/fetchAll",
  async (thunkAPI) => {
    try {
      let response = API.get(`/api/user`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
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

// export const deleteUser=createAsyncThunk('user')

export const userSlice = createSlice({
  name: "user",
  initialState: {
    username: "",
    email: "",
    name: "",
    user: {},
    allUser: [],
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
      state.errorMessage = payload.message;
    },
    // login
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
    // fetch by id
    [fetchUserById.fulfilled]: (state, { payload }) => {
      console.log(payload);
      state.user = payload.data;
      state.isFetching = false;
      state.isError = false;
    },
    [fetchUserById.pending]: (state) => {
      state.isFetching = true;
    },
    [fetchUserById.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.message;
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
  },
});

export const { clearState } = userSlice.actions;

export const userSelector = (state) => state.user;

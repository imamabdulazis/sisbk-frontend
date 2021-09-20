import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setAutoFreeze } from "immer";
import API from "../../api/apiHandler";

export const addMateri = createAsyncThunk(
  "ADD_NEW_MATERI",
  async (data, thunkAPI) => {
    try {
      let response = API.post("/api/materi", data);
      if ((await response).status === 200) {
        return (await response).data;
      } else {
        return thunkAPI.rejectWithValue(response?.data);
      }
    } catch (error) {
      console.log("Error :", error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getAllMateri = createAsyncThunk(
  "GET_ALL_MATERI",
  async (thunkAPI) => {
    try {
      let response = API.get("/api/materi");
      if ((await response).status === 200) {
        return (await response).data;
      } else {
        return thunkAPI.rejectWithValue(response.data);
      }
    } catch (error) {
      console.log("Error :", error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const updateMateri = createAsyncThunk(
  "UPDATE_DATA_MATERI",
  async ({ id, data }, thunkAPI) => {
    try {
      let response = API.put(`/api/materi/${id}`, data);
      if ((await response).status === 200) {
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

export const deleteMateri = createAsyncThunk(
  "DELETE_MATERI_BY_ID",
  async (id, thunkAPI) => {
    try {
      let response = API.delete(`/api/materi/${id}`);
      if ((await response).status === 200) {
        return (await response).data;
      } else {
        return thunkAPI.rejectWithValue(response.data);
      }
    } catch (error) {
      console.log("Error :", error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

//NEW JOIN MATERI BY STUDENT------------

export const materiSlice = createSlice({
  name: "materi",
  initialState: {
    materis: [],
    isSuccessUpdateMateri: false,
    isSuccessAddMateri: false,
    isSuccessDeleteMateri: false,
    isFetching: false,
    isSuccessFetch: false,
    isErrorFetch: false,
    errorMessage: "",
  },
  reducers: {
    clearState: (state) => {
      state.isSuccessUpdateMateri = false;
      state.isSuccessAddMateri = false;
      state.isFetching = false;
      state.errorMessage = "";
      state.isSuccessFetch = false;
      state.isErrorFetch = false;
      return state;
    },
  },
  extraReducers: {
    [getAllMateri.fulfilled]: (state, { payload }) => {
      state.materis = payload?.data;
      state.errorMessage = "";
      state.isSuccessFetch = true;
      state.isFetching = false;
    },
    [getAllMateri.pending]: (state) => {
      state.isFetching = true;
    },
    [getAllMateri.rejected]: (state, { payload }) => {
      state.isErrorFetch = true;
      state.isFetching = false;
      state.errorMessage = payload?.message;
      state.isSuccessFetch = false;
    },
    [addMateri.fulfilled]: (state, { payload }) => {
      state.isSuccessAddMateri = true;
      state.isFetching = false;
      state.isErrorFetch = false;
    },
    [addMateri.pending]: (state, { payload }) => {
      state.isFetching = true;
    },
    [addMateri.rejected]: (state, { payload }) => {
      state.isErrorFetch = true;
      state.isFetching = false;
      state.errorMessage = payload?.message;
      state.isSuccessAddMateri = false;
    },
    [updateMateri.fulfilled]: (state, { payload }) => {
      state.isErrorFetch = false;
      state.isSuccessUpdateMateri = true;
      state.isFetching = false;
    },
    [updateMateri.pending]: (state) => {
      state.isFetching = true;
    },
    [updateMateri.rejected]: (state, { payload }) => {
      state.isSuccessUpdateMateri = false;
      state.isErrorFetch = true;
      state.isFetching = false;
      state.errorMessage = payload?.message;
    },
    [deleteMateri.fulfilled]: (state) => {
      state.isSuccessDeleteMateri = true;
      state.isErrorFetch = false;
      state.isFetching = false;
    },
    [deleteMateri.pending]: (state) => {
      state.isFetching = true;
    },
    [deleteMateri.rejected]: (state, { payload }) => {
      state.isErrorFetch = true;
      state.errorMessage = payload?.message;
      state.isSuccessDeleteMateri = false;
    },
  },
});

export const { clearState } = materiSlice.actions;

export const materiSelector = (state) => state.materi;

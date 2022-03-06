import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../../api/apiHandler";

export const addNewContact = createAsyncThunk(
  "ADD_NEW_CONTACT",
  async (data, thunkAPI) => {
    try {
      let response = await API.post("/api/contact", data);
      if ((await response).status === 200) {
        return (await response).data;
      } else {
        return thunkAPI.rejectWithValue(response.data);
      }
    } catch (error) {
      // console.log("Error :", error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const fetchAllContact = createAsyncThunk(
  "FETCH_ALL_CONTACT",
  async (thunkAPI) => {
    try {
      let response = await API.get("/api/contact");
      if ((await response).status === 200) {
        return (await response).data;
      } else {
        return thunkAPI.rejectWithValue(response.data);
      }
    } catch (error) {
      // console.log("Error :", error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const updateContactByID = createAsyncThunk(
  "UPDATE_CONTACT_BY_ID",
  async ({ id, data }, thunkAPI) => {
    try {
      let response = await API.put(`/api/contact/${id}`, data);
      if ((await response).status === 200) {
        return (await response).data;
      } else {
        return thunkAPI.rejectWithValue(response.data);
      }
    } catch (error) {
      // console.log("Error :", error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const deleteContactByID = createAsyncThunk(
  "DELETE_CONTACT_BY_ID",
  async (id, thunkAPI) => {
    try {
      let response = await API.delete(`/api/contact/${id}`);
      if ((await response).status === 200) {
        return (await response).data;
      } else {
        return thunkAPI.rejectWithValue(response.data);
      }
    } catch (error) {
      // console.log("Error :", error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const contactSlice = createSlice({
  name: "contact",
  initialState: {
    contacts: [],
    isFetchingContact: false,
    isSuccessAddContact: false,
    isSuccessEditContact: false,
    isSuccessContact: false,
    isErrorContact: false,
    isSuccessDeleteContact: false,
    errorMessageContact: "",
  },
  reducers: {
    clearStateContact: (state) => {
      state.isFetchingContact = false;
      state.isSuccessContact = false;
      state.isSuccessAddContact = false;
      state.isSuccessEditContact = false;
      state.isSuccessDeleteContact = false;
      state.isErrorContact = false;
      return state;
    },
  },
  extraReducers: {
    [addNewContact.fulfilled]: (state, { payload }) => {
      state.isSuccessAddContact = true;
      state.isFetchingContact = false;
      state.isErrorContact = false;
    },
    [addNewContact.pending]: (state) => {
      state.isFetchingContact = true;
    },
    [addNewContact.rejected]: (state, { payload }) => {
      state.isErrorContact = true;
      state.isSuccessAddContact = false;
      state.isFetchingContact = false;
      state.errorMessageContact = payload?.message;
    },
    [updateContactByID.fulfilled]: (state, { payload }) => {
      state.isSuccessEditContact = true;
      state.isFetchingContact = false;
      state.isErrorContact = false;
    },
    [updateContactByID.pending]: (state) => {
      state.isFetchingContact = true;
    },
    [updateContactByID.rejected]: (state, { payload }) => {
      state.isErrorContact = true;
      state.isSuccessEditContact = false;
      state.isFetchingContact = false;
      state.errorMessageContact = payload?.message;
    },
    [fetchAllContact.fulfilled]: (state, { payload }) => {
      state.isFetchingContact = false;
      state.isSuccessContact = true;
      state.isErrorContact = false;
      state.contacts = payload.data;
    },
    [fetchAllContact.pending]: (state) => {
      state.isFetchingContact = true;
    },
    [fetchAllContact.rejected]: (state, { payload }) => {
      state.isFetchingContact = false;
      state.isSuccessContact = false;
      state.isErrorContact = true;
      state.errorMessageContact = payload?.message;
    },
    [deleteContactByID.fulfilled]: (state, { payload }) => {
      state.isSuccessDeleteContact = true;
      state.isFetchingContact = false;
      state.isErrorContact = false;
    },
    [deleteContactByID.pending]: (state) => {
      state.isFetchingContact = true;
    },
    [deleteContactByID.rejected]: (state, { payload }) => {
      state.isSuccessDeleteContact = false;
      state.isFetchingContact = false;
      state.isErrorContact = true;
      state.errorMessageContact = payload?.message;
    },
  },
});

export const { clearStateContact } = contactSlice.actions;

export const contactSelector = (state) => state.contact;

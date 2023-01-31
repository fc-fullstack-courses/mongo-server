import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as API from '../../api';
const SLICE_NAME = 'user';

const login = createAsyncThunk(
  `${SLICE_NAME}/login`,
  async (userData, thunkAPI) => {
    try {
      const {
        data: {
          data: { user },
        },
      } = await API.login(userData);

      return user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const registration = createAsyncThunk(
  `${SLICE_NAME}/registration`,
  async (userData, thunkAPI) => {
    try {
      const {
        data: {
          data: { user },
        },
      } = await API.registration(userData);

      return user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  data: null,
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    clearErrors: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    builder.addCase(registration.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(registration.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(registration.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

const { reducer, actions } = userSlice;
const { clearErrors } = actions;

export { clearErrors, login, registration };

export default reducer;

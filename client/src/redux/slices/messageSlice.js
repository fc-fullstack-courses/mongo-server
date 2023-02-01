import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as API from '../../api';

const SLICE_NAME = 'messages';

const getMessages = createAsyncThunk(
  `${SLICE_NAME}/getMessages`,
  async (options, thunkAPI) => {
    try {
      const {
        data: { data: messages },
      } = await API.getMessages(options);

      return messages;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  messages: [],
  isLoading: false,
  error: null,
};

const messageSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getMessages.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });

    builder.addCase(getMessages.fulfilled, (state, action) => {
      state.isLoading = false;
      state.messages = action.payload;
    });

    builder.addCase(getMessages.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export { getMessages };

export default messageSlice.reducer;

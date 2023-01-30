const { createSlice } = require('@reduxjs/toolkit');

const SLICE_NAME = 'user';

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
});

const { reducer, actions } = userSlice;
const { clearErrors } = actions;

export { clearErrors };

export default reducer;

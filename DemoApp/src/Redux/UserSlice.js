import AsyncStorage from '@react-native-async-storage/async-storage';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

import {LIVE_BASE_URL, TEST_BASE_URL} from '@env';

const baseUrl = LIVE_BASE_URL;
// const baseUrl = TEST_BASE_URL;

const initialState = {
  singleUser: null,
  isSuccess: false,
  isError: false,
  isLoading: false,
  message: '',
};

export const getUser = createAsyncThunk('user/get', async thunkAPI => {
  try {
    const response = await axios.get(baseUrl + '/users/2');
    return response.data.data;
  } catch (error) {
    if (error.response) {
      const obj = error.response.data;
      const objKey = Object.keys(obj)[0];
      let err = obj[objKey];
      // console.log('ACCOUNT ERROR RESP' + JSON.stringify(error.response));
      return thunkAPI.rejectWithValue(err);
    } else if (error.request) {
      // console.log('ACCT ERROR REQ' + error.request);
      return thunkAPI.rejectWithValue('something went terribly wrong');
    } else {
      const obj = error.response.data;
      const objKey = Object.keys(obj)[0];
      let err = obj[objKey];
      return thunkAPI.rejectWithValue(err);
    }
  }
});

export const updateUser = createAsyncThunk('user/update', async thunkAPI => {
  try {
    const response = await axios.patch(baseUrl + '/users/2');
    if (response.status === 200) {
      return 'Profile Updated Successfully';
    }
  } catch (error) {
    if (error.response) {
      const obj = error.response.data;
      const objKey = Object.keys(obj)[0];
      let err = obj[objKey];
      // console.log('ACCOUNT ERROR RESP' + JSON.stringify(error.response));
      return thunkAPI.rejectWithValue(err);
    } else if (error.request) {
      // console.log('ACCT ERROR REQ' + error.request);
      return thunkAPI.rejectWithValue('something went terribly wrong');
    } else {
      const obj = error.response.data;
      const objKey = Object.keys(obj)[0];
      let err = obj[objKey];
      return thunkAPI.rejectWithValue(err);
    }
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetUser: state => {
      (state.isError = false),
        (state.isLoading = false),
        (state.isSuccess = false),
        (state.message = '');
    },

    resetSingleUser: state => {
      state.singleUser = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getUser.pending, state => {
        state.isLoading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.singleUser = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })

      .addCase(updateUser.pending, state => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const {resetSingleUser, resetUser} = userSlice.actions;
export default userSlice.reducer;

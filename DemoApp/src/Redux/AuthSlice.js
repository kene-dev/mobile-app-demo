import AsyncStorage from '@react-native-async-storage/async-storage';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import {LIVE_BASE_URL} from '@env';

const baseUrl = LIVE_BASE_URL;

const initialState = {
  user: false,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: '',
};

// CREATE USER FUNCTION
export const createUser = createAsyncThunk(
  'auth/createUser',
  async (formData, thunkAPI) => {
    // console.log(formData);
    try {
      const response = await axios.post(baseUrl + '/users', formData);

      if (response.status === 201) {
        // console.log('user created successfully');
        // console.log('RESPONSE' + JSON.stringify(response.data));
        return;
      }
    } catch (error) {
      if (error.response) {
        const obj = error.response.data;
        const objKey = Object.keys(obj)[0];
        let err = obj[objKey];
        // console.log(err)
        return thunkAPI.rejectWithValue(err);
      } else if (error.request) {
        return thunkAPI.rejectWithValue('something went terribly wrong');
      } else {
        const obj = error.response.data;
        const objKey = Object.keys(obj)[0];
        let err = obj[objKey];
        return thunkAPI.rejectWithValue(err);
      }
    }
  },
);

// LOGIN USER FUNCTION
export const loginUser = createAsyncThunk(
  'auth/login',
  async (formData, thunkAPI) => {
    try {
      const response = await axios.post(baseUrl + '/login', formData);
      if (response.status === 200) {
        return response.data.token;
      }
    } catch (error) {
      if (error.response) {
        const obj = error.response.data;
        const objKey = Object.keys(obj)[0];
        let err = obj[objKey];
        // console.log(err)
        return thunkAPI.rejectWithValue(err);
      } else if (error.request) {
        return thunkAPI.rejectWithValue('something went terribly wrong');
      } else {
        const obj = error.response.data;
        const objKey = Object.keys(obj)[0];
        let err = obj[objKey];
        return thunkAPI.rejectWithValue(err);
      }
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: state => {
      (state.isError = false),
        (state.isLoading = false),
        (state.isSuccess = false),
        (state.message = '');
    },
    logOut: state => {
      state.user = null;
    },
  },
  extraReducers: builder => {
    builder
      // CREATE USER HANDLER
      .addCase(createUser.pending, state => {
        state.isLoading = true;
      })
      .addCase(createUser.fulfilled, state => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })

      // LOGIN USER HANDLER
      .addCase(loginUser.pending, state => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const {reset, logOut} = authSlice.actions;
export default authSlice.reducer;

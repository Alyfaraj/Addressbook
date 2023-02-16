import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {isPendingAction, isRejectedAction} from '.';
import auth from '@react-native-firebase/auth';
import {Alert} from 'react-native';
import {isEmpty} from 'lodash';

export const userLogin = createAsyncThunk(
  'user/userLogin',
  async ({email, password}, {rejectWithValue}) => {
    try {
      const res = await auth().signInWithEmailAndPassword(email, password);
      console.log(res.user);
      if (!isEmpty(res.user)) return res.user;
    } catch (error) {
      console.log('error', error);
      Alert.alert(error.code);

      return rejectWithValue(error);
    }
  },
);

export const userSignup = createAsyncThunk(
  'user/userSignup',
  async ({email, password}, {rejectWithValue}) => {
    try {
      const res = await auth().createUserWithEmailAndPassword(email, password);
      console.log(res);
      if (!isEmpty(res.user)) {
        Alert.alert('User Created Successfully!!');
        return res.user;
      }
    } catch (error) {
      console.log('error', error);
      if (error.code === 'auth/email-already-in-use') {
        Alert.alert('That email address is already in use!');
      }
      return rejectWithValue(error);
    }
  },
);

const initialState = {
  id: null,
  loggedIn: false,
  loaders: {
    userLogin: false,
    userSignup: false,
  },
};
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userLogout: () => initialState,
  },
  extraReducers: builder => {
    builder
      .addCase(userLogin.fulfilled, (state, action) => {
        state.id = action.payload.uid;
        state.loggedIn = true;
        state.loaders.userLogin = false;
        state.loaders.userSignup = false;
      })
      .addCase(userSignup.fulfilled, (state, action) => {
        state.id = action.payload.uid;
        state.loggedIn = true;
        state.loaders.userSignup = false;
      })
      .addMatcher(isPendingAction('user/'), (state, action) => {
        const type = action.type.split('/')[1];
        state.loaders[type] = true;
      })
      .addMatcher(isRejectedAction('user/'), (state, action) => {
        const type = action.type.split('/')[1];
        state.loaders[type] = false;
      });
  },
});

export const {userLogout} = userSlice.actions;
export default userSlice.reducer;

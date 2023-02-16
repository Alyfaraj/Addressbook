import {configureStore} from '@reduxjs/toolkit';
import {userSlice} from './user';
import {placesSlice} from './places';

import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const hasPrefix = (action, prefix) => action.type.startsWith(prefix);
export const isPending = action => action.type.endsWith('/pending');
export const isFulfilled = action => action.type.endsWith('/fulfilled');
export const isRejected = action => action.type.endsWith('/rejected');
export const isPendingAction = prefix => action => {
  return hasPrefix(action, prefix) && isPending(action);
};
export const isRejectedAction = prefix => action => {
  return hasPrefix(action, prefix) && isRejected(action);
};
export const isFulfilledAction = prefix => action => {
  return hasPrefix(action, prefix) && isFulfilled(action);
};

const reducers = combineReducers({
  user: userSlice.reducer,
  places: placesSlice.reducer,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['user'],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
});

export default store;

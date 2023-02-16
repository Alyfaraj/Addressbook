import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {isPendingAction, isRejectedAction} from '.';
import auth from '@react-native-firebase/auth';
import {Alert} from 'react-native';
import {isEmpty} from 'lodash';
import firestore from '@react-native-firebase/firestore';

export const addPlace = createAsyncThunk(
  'places/addPlace',
  async (data, {rejectWithValue, getState, dispatch}) => {
    const {id} = getState().user;
    await firestore()
      .collection('PLACES')
      .doc()
      .set({...data, userId: id})
      .then(() => {
        return Alert.alert('Place Added');
      })
      .catch(err => {
        console.log('error', err);
        Alert.alert(err);
        return rejectWithValue(err);
      });
  },
);

export const updatePlace = createAsyncThunk(
  'places/updatePlace',
  async ({updateData}, {rejectWithValue, getState, dispatch}) => {
    const {userId, id, name, phone, type, selectedLocation} = updateData;
    await firestore()
      .collection('PLACES')
      .doc(id)
      .update({userId, id, name, phone, type, selectedLocation})
      .then(() => {
        return Alert.alert('Place Updated');
      })
      .catch(err => {
        console.log('error', err);
        Alert.alert(err);
        return rejectWithValue(err);
      });
  },
);

export const deletePlace = createAsyncThunk(
  'places/deletePlace',
  async ({placeId}, {rejectWithValue, getState, dispatch}) => {
    const {id} = getState().user;
    await firestore()
      .collection('PLACES')
      .doc(placeId)
      .delete()
      .then(() => {
        Alert.alert('Place deleted');
        return;
      })
      .catch(err => {
        console.log('error', err);
        Alert.alert(err);
        return rejectWithValue(err);
      });
  },
);

export const getPlaces = createAsyncThunk(
  'places/getPlaces',
  async (arg, {rejectWithValue, getState, dispatch}) => {
    try {
      const {id} = getState().user;

      const unsubscribe = firestore()
        .collection('PLACES')
        .where('userId', '==', id)
        .onSnapshot(snap => {
          const list = snap.docs.map(doc => ({
            id: doc.id,
            ...doc._data,
          }));
          dispatch(getConvertedPlaces(list));
          return list;
        });

      return () => unsubscribe();
    } catch (error) {
      console.log('error', error);
      Alert.alert(error.code);
      return rejectWithValue(error);
    }
  },
);

const initialState = {
  list: [],
  loaders: {
    addPlace: false,
    getPlaces: false,
    updatePlace: false,
  },
};
export const placesSlice = createSlice({
  name: 'places',
  initialState,
  reducers: {
    getConvertedPlaces: (state, action) => {
      state.list = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getPlaces.fulfilled, (state, action) => {
        state.loaders.getPlaces = false;
      })
      .addCase(addPlace.fulfilled, (state, action) => {
        state.loaders.addPlace = false;
      })
      .addCase(updatePlace.fulfilled, (state, action) => {
        state.loaders.updatePlace = false;
      })
      .addCase(deletePlace.fulfilled, (state, action) => {
        state.loaders.deletePlace = false;
      })
      .addMatcher(isPendingAction('places/'), (state, action) => {
        const type = action.type.split('/')[1];
        state.loaders[type] = true;
      })
      .addMatcher(isRejectedAction('places/'), (state, action) => {
        const type = action.type.split('/')[1];
        state.loaders[type] = false;
      });
  },
});

export const {getConvertedPlaces} = placesSlice.actions;

export default placesSlice.reducer;

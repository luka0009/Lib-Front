import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { createSlice } from "@reduxjs/toolkit";

const name = JSON.parse(localStorage.getItem('user'));

const initialState = {
    isLoggedIn: false,
    name: name ? name.name : '',
    user: {
      name: '',
      email: '',
    },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    setName: (state, action) => {
      localStorage.setItem('name', JSON.stringify(action.payload));
      state.name = action.payload;
    },
    setUsers: (state, action) => {
        const profile = action.payload;
        state.user.name = profile.name;
        state.user.email = profile.email;
    },
  },
});

const persistConfig = {
  key: 'auth',
  storage,
};

const persistedReducer = persistReducer(persistConfig, authSlice.reducer);

export const store = configureStore({
  reducer: {
    auth: persistedReducer,
  },
});

export const {setLogin, setName, setUsers} = authSlice.actions;
export default authSlice.reducer;

export const persistor = persistStore(store);
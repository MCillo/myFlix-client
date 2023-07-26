import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from './reducers/movies';
import { useReducer } from 'react';

export const store = configureStore({
    reducer: { movies: moviesReducer, user: userReducer }
});

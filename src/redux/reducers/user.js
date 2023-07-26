import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: null,
    reducers: {
        setUser: (state, action) => action.payload,
        setToken: (state, action) => action.payload
    }
});

export const { setUser, setToken } = userSlice.actions;

export default userSlice.reducer;
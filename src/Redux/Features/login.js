import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from "axios";
import {user} from "../../utils/Server.js";

const initialState = {
    isAuthenticated: false,
    token:null,
    loading: false,
    errors:false
}

export const login = createAsyncThunk('auth/login', async (credentials) => {
    const response = await axios.post(`${user}/login`, credentials);
    return response.data.token;
});
export const loginSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        logout: (state) => {
            state.token = null;
            state.isAuthenticated = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.token = action.payload;
                localStorage.setItem("isAuthenticated", state.isAuthenticated);
                localStorage.setItem("token", state.token);
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
});

// Action creators are generated for each case reducer function
export const { logout } = loginSlice.actions;

export default loginSlice.reducer;
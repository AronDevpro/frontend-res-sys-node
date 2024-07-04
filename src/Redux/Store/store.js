import {configureStore} from "@reduxjs/toolkit";
import loginSliceReducar from "../Features/login.js";

const store = configureStore({
    reducer: {
        login: loginSliceReducar,
    }
})
export default store;
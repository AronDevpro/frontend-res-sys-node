import {configureStore} from "@reduxjs/toolkit";
import loginSliceReducar from "../Reducers/loginReducer.js";

const store = configureStore({
    reducer: {
        login: loginSliceReducar,
    }
})
export default store;
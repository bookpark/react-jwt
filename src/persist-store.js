import storage from 'redux-persist/lib/storage/session';
import {configureStore} from "@reduxjs/toolkit";
import {persistReducer} from "redux-persist";

const persistConfig = {
    key: 'root',
    storage,
}

function reducer(currentState, action) {
    if (currentState === undefined) {
        return ({
            Authorization: '',
            UserId: ''
        })
    }
    const newState = {...currentState};
    switch (action.type) {
        case "NEWTOKEN":
            newState.Authorization = action.data;
            break;
        case "USERID":
            newState.UserId = action.data;
    }
    return newState;
}

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
    reducer: persistedReducer,
})

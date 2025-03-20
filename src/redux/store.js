import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/userReducer";
import {
  nameModalReducer,
  emailModalReducer, 
} from "../reducers/modalReducer";

export const store = configureStore({
  reducer: {       
    //'name_modal':nameModalReducer,
    //'email_modal':emailModalReducer,    
    'user':userReducer,      
  },
});
//console.log(store.getState())
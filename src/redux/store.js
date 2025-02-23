import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/userReducer";
import deviceReducer from "./slice/deviceReducer";
import {
  nameModalReducer,
  emailModalReducer,
  phoneModalReducer,
  aboutMeModalReducer,
  termsModalReducer,  
} from "../reducers/modalReducer";

export const store = configureStore({
  reducer: {       
    'name_modal':nameModalReducer,
    'email_modal':emailModalReducer,
    'phone_modal':phoneModalReducer,
    'about_me_modal':aboutMeModalReducer,
    'terms_modal':termsModalReducer,    
    'user':userReducer,  
    'devices':deviceReducer,      
  },
});
//console.log(store.getState())
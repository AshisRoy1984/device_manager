const initialState = {
    show:false
}
export const nameModalReducer = (state = initialState, action)=>{
    switch(action.type){
        case "open_close_name" : return {...state, show:action.payload}        
        default: return state
    }
}
export const emailModalReducer = (state = initialState, action)=>{
    switch(action.type){
        case "open_close_email" : return {...state, show:action.payload}        
        default: return state
    }
}
export const phoneModalReducer = (state = initialState, action)=>{
    switch(action.type){
        case "open_close_phone" : return {...state, show:action.payload}        
        default: return state
    }
}
export const aboutMeModalReducer = (state = initialState, action)=>{
    switch(action.type){
        case "open_close_about_me" : return {...state, show:action.payload}        
        default: return state
    }
}
export const termsModalReducer = (state = initialState, action)=>{
    switch(action.type){
        case "open_close_terms" : return {...state, show:action.payload}        
        default: return state
    }
}


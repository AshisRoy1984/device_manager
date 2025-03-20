import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import Api from '../../config/Api';

// action ( from api )
export const fetchUser = createAsyncThunk("fetchUser", async ()=>{  
    const promise = new Promise( async (resolve, reject)=>{
        const res = await Api.user_row({
            'id':localStorage.getItem(process.env.REACT_APP_PREFIX + 'user_id'),
        });  
        if(res && res.status===200){
            resolve(res.data) 
        }
        else{
            resolve({}) 
        }        
    }).then( async(response)=>{          
        return response     
    })  
    return promise  
})

// Slice
const slice = createSlice({
    name: 'user',
    initialState: {
        isLoading:false,
        data: null,
        isError:false,
        abcxyz:null
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchUser.pending, (state,action)=>{
            state.isLoading = true
        })
        builder.addCase(fetchUser.fulfilled, (state,action) =>{
            state.isLoading = false
            state.data = action.payload
        })
        builder.addCase(fetchUser.rejected, (state,action)=>{
            console.log('error',action.payload)
            state.isError = true
        })
    },
    reducers: {
        loginSuccess: (state, action) => {
          state.abcxyz = action.payload;
        },
        logoutSuccess: (state, action) =>  {
          state.abcxyz = null;
        },
    },  
});
export default slice.reducer

// Actions ( normal )
export const { loginSuccess, logoutSuccess } = slice.actions
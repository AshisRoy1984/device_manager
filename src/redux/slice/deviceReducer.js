import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import Api from '../../config/Api';

// action ( from api )
export const fetchDevice = createAsyncThunk("fetchDevice", async (obj)=>{  
    const promise = new Promise( async (resolve, reject)=>{
        const res = await Api.devices({
            UserID:localStorage.getItem(process.env.REACT_APP_PREFIX + 'user_id'),
            page_number:obj.page_number ?? '1',
            DeviceName:obj.DeviceName ?? '',           
            Status:obj.Status ?? ''    
        });  
        if(res && res.status===200){
            resolve(res.data) 
        }
        else{
            resolve([]) 
        }        
    }).then( async(response)=>{          
        return response     
    })  
    return promise  
})

// Slice
const slice = createSlice({
    name: 'devices',
    initialState: {
        loader:false,        
        isError:false,  
        data:[],
        total:0,
        paginate:[]  
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchDevice.pending, (state,action)=>{
            state.loader = true
        })
        builder.addCase(fetchDevice.fulfilled, (state,action) =>{
            state.loader = false
            state.data = action.payload.data
            state.total = action.payload.total           
            state.paginate = action.payload.paginate
        })
        builder.addCase(fetchDevice.rejected, (state,action)=>{
            console.log('devices reducer error :',action.payload)
            state.isError = true
        })
    }   
});
export default slice.reducer

import axios from "axios";
import all_function from './all_function';

const baseURL = process.env.REACT_APP_USER_API_URL;
const axiosInstance = axios.create({
  baseURL: baseURL,
  //timeout: 20000,    
});
axiosInstance.interceptors.request.use(function (config) {
  let access_token = localStorage.getItem(process.env.REACT_APP_PREFIX + 'access_token') ?? '';
  //config.headers["Content-Type"] = "application/json";   
  config.headers["Authorization"] = "Bearer " + access_token;
  return config;
});
axiosInstance.interceptors.response.use(
  (response) => {
      return response;
  },
  (error) => {
      try {
          const { response } = error; 
          if(typeof response !== "undefined" && response.status === 401){  
            localStorage.removeItem(process.env.REACT_APP_PREFIX + 'access_token');	
            localStorage.removeItem(process.env.REACT_APP_PREFIX + 'refresh_token');            
            localStorage.removeItem(process.env.REACT_APP_PREFIX + 'user_id');            
          }
          return response
      } catch (err) {
          console.error('err:',err);
      }
      if(error){

        let code = error.code ?? '' // ERR_NETWORK
        let name = error.name ?? '' // AxiosError
        let message = error.message ?? '' // Network Error    
        
      }
      
  }
);

let headers1 = {
  "Content-Type":"application/json",
}  

let headers2 = {
  "Content-Type":"multipart/form-data",
}  
//=====

export default {

  //=== authentication apis ===
  token: async (obj) => {     
      return await axiosInstance.post(
        "/token/",
        {
          'username':obj.username,
          'password':obj.password,
        },
        {headers:headers1}                
      )
      .catch((err) => { console.log('err', err); });    
  },
  me: async () => {     
    return await axiosInstance.get(
      "/me/",
      {headers:headers1}        
    )
    .catch((err) => { console.log('err', err); });   
},
  register: async (obj) => { 
      return await axiosInstance.post(
        "/register",
        {
          'name':obj.name,
          'email':obj.email,
          'password':obj.password,
        },
        {headers:headers1}                
      )
      .catch((err) => { console.log('err', err); });    
  },
  forgot_password: async (obj) => { 
    return await axiosInstance.post(
      "/forgot-password",
      {
        'email':obj.email,        
      },  
      {headers:headers1}              
    )
    .catch((err) => { console.log('err', err); });    
  }, 
  reset_password: async (obj) => { 
    return await axiosInstance.post(
      "/reset-password",
      {        
        'user_id':obj.user_id,        
        'new_password':obj.new_password       
      },
      {headers:headers1}                
    )
    .catch((err) => { console.log('err', err); });    
  },  
  logout: async () => { 
      return await axiosInstance.get(
        "/logout", 
        {headers:headers1}               
      )
      .catch((err) => { console.log('err', err); });    
  },

  //=== user apis ===
  user_row: async (obj) => { 
      return await axiosInstance.get(
        "/users/"+obj.user_id+"/",
        {headers:headers1}        
      )
      .catch((err) => { console.log('err', err); }); 
  }, 
  update_name: async (obj) => { 
    return await axiosInstance.patch(
      "/users/update_name/"+obj.user_id,
      {
        'name':obj.name,         
      },     
      {headers:headers1}           
    )
    .catch((err) => { console.log('err', err); });    
  },   
  update_email: async (obj) => { 
    return await axiosInstance.patch(
      "/users/update_email/"+obj.user_id,
      {
        'email':obj.email,         
      }, 
      {headers:headers1}               
    )
    .catch((err) => { console.log('err', err); });       
  },   
  update_phone: async (obj) => { 
    return await axiosInstance.patch(
      "/users/update_phone/"+obj.user_id,
      {
        'phone':obj.phone,         
      },  
      {headers:headers1}              
    )
    .catch((err) => { console.log('err', err); });    
  },  
  update_about_me: async (obj) => { 
    return await axiosInstance.patch(
      "/users/update_about_me/"+obj.user_id,
      {
        'about_me':obj.about_me,         
      }, 
      {headers:headers1}               
    )
    .catch((err) => { console.log('err', err); });    
  },   
  upload_profile_image: async (obj) => { 
    return await axiosInstance.post(
      "/users/upload_profile_image/"+obj.user_id,
      obj.formData, 
      {headers:headers2}        
    )
    .catch((err) => { console.log('err', err); });    
  }, 

  //=== device apis ===  
  devices: async (obj) => { 
    return await axiosInstance.get(
      "/devices",
      {
        params: {
          UserID:obj.UserID,
          page_number: obj.page_number,
          DeviceName: obj.DeviceName,
          Status: obj.Status,  
        }
      },
      {headers:headers1}        
    )
    .catch((err) => { console.log('err', err); });    
  },
  delete_multiple_devices: async (obj) => { 
      return await axiosInstance.delete(
        "/devices/remove-multiple",
        {
          params: {
            UserID:obj.UserID,
            id: obj.id,           
          }
        },
        {headers:headers1}        
      )
      .catch((err) => { console.log('err', err); });    
  },
  device_row: async (obj) => { 
    return await axiosInstance.get(
      "/devices/"+obj.id,
      {headers:headers1}        
    )
    .catch((err) => { console.log('err', err); });    
 }, 
 create_device: async (obj) => { 
    return await axiosInstance.post(
      "/devices/",
      {        
        'UserID':obj.UserID,        
        'DeviceID':obj.DeviceID,  
        'DeviceName':obj.DeviceName,   
        'DeviceLocation':obj.DeviceLocation,   
        'Unit':obj.Unit,   
        'Status':obj.Status,   
        'Note':obj.Note, 
      },
      {headers:headers1}        
    )
    .catch((err) => { console.log('err', err); });    
  },  
  update_device: async (obj) => { 
    return await axiosInstance.patch(
      "/devices/update/"+obj.id,
      {        
        'UserID':obj.UserID,        
        'DeviceID':obj.DeviceID,  
        'DeviceName':obj.DeviceName,   
        'DeviceLocation':obj.DeviceLocation,   
        'Unit':obj.Unit,   
        'Status':obj.Status,   
        'Note':obj.Note, 
      },
      {headers:headers1}        
    )
    .catch((err) => { console.log('err', err); });    
  }, 

};

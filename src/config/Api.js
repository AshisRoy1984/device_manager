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

  //=== my profile ===
  update_profile: async (obj) => { 
    return await axiosInstance.patch(
      "/users/"+obj.id,
      {
        'username':obj.username,
        'email':obj.email,
        'phone':obj.phone,    
      },     
      {headers:headers1}           
    )
    .catch((err) => { console.log('err', err); });    
  },  
  update_password: async (obj) => {     
    return await axiosInstance.patch(
      "/users/"+obj.id,
      {
        'password':obj.password,        
      },     
      {headers:headers1}           
    )
    .catch((err) => { console.log('err', err); });    
  },

  //=== companies ===
  companies: async (obj) => { 
    return await axiosInstance.get(
      `/companies/${ obj.page ? '?page='+ obj.page : ''}`,
      {
        params: {
          name:obj.name,
          email:obj.email,
          phone:obj.phone,
          status:obj.status,
          page_number: obj.page_number,          
        }
      },
      {headers:headers1}        
    )
    .catch((err) => { console.log('err', err); });    
  },  
  delete_company: async (obj) => { 
      return await axiosInstance.delete(
        "/companies/"+obj.id,      
        {headers:headers1}        
      )
      .catch((err) => { console.log('err', err); });    
  },
  company_row: async (obj) => { 
      return await axiosInstance.get(
        "/companies/"+obj.id,
        {headers:headers1}        
      )
      .catch((err) => { console.log('err', err); }); 
  }, 
  create_company: async (obj) => { 
    return await axiosInstance.post(
      "/companies/",
      { 
        'company':obj.company,        
        'name':obj.name,        
        'email':obj.email,  
        'phone':obj.phone,   
        'address':obj.address,           
        'status':obj.status, 
      },
      {headers:headers1}        
    )
    .catch((err) => { console.log('err', err); });    
  },  
  update_company: async (obj) => { 
    return await axiosInstance.patch(
      "/companies/"+obj.id,
      { 
        'company':obj.company,               
        'name':obj.name,        
        'email':obj.email,  
        'phone':obj.phone,   
        'address':obj.address,           
        'status':obj.status, 
      },
      {headers:headers1}        
    )
    .catch((err) => { console.log('err', err); });    
  }, 

  //=== company-devices ===
  company_devices: async (obj) => { 
    return await axiosInstance.get(
      `/company-devices/${ obj.page ? '?page='+ obj.page : ''}`,
      {
        params: {
          company:obj.company,
          device_id:obj.device_id,
          device_name:obj.device_name,
          device_location:obj.device_location,
          unit:obj.unit,
          status:obj.status,
          page_number: obj.page_number,          
        }
      },
      {headers:headers1}        
    )
    .catch((err) => { console.log('err', err); });    
  },  
  delete_company_devices: async (obj) => { 
      return await axiosInstance.delete(
        "/company-devices/"+obj.id,      
        {headers:headers1}        
      )
      .catch((err) => { console.log('err', err); });    
  },
  company_device_row: async (obj) => { 
      return await axiosInstance.get(
        "/company-devices/"+obj.id,
        {headers:headers1}        
      )
      .catch((err) => { console.log('err', err); }); 
  }, 
  create_company_device: async (obj) => { 
    return await axiosInstance.post(
      "/company-devices/",
      { 
        'company':obj.company,               
        'device_id':obj.device_id,        
        'device_name':obj.device_name,  
        'device_location':obj.device_location,   
        'unit':obj.unit,   
        'note':obj.note, 
        'status':obj.status, 
      },
      {headers:headers1}        
    )
    .catch((err) => { console.log('err', err); });    
  },  
  update_company_device: async (obj) => { 
    return await axiosInstance.patch(
      "/company-devices/"+obj.id,
      {        
        'company':obj.company,               
        'device_id':obj.device_id,        
        'device_name':obj.device_name,  
        'device_location':obj.device_location,   
        'unit':obj.unit,   
        'note':obj.note, 
        'status':obj.status, 
      },
      {headers:headers1}        
    )
    .catch((err) => { console.log('err', err); });    
  }, 

  //=== users ===
  users: async (obj) => { 
    return await axiosInstance.get(
      `/users/${ obj.page ? '?page='+ obj.page : ''}`,
      {
        params: {
          username:obj.username,
          email:obj.email,
          phone:obj.phone,
          role:obj.role,
          status:obj.status,
          page_number: obj.page_number,          
        }
      },
      {headers:headers1}        
    )
    .catch((err) => { console.log('err', err); });    
  },  
  delete_user: async (obj) => { 
      return await axiosInstance.delete(
        "/users/"+obj.id,      
        {headers:headers1}        
      )
      .catch((err) => { console.log('err', err); });    
  },
  user_row: async (obj) => { 
      return await axiosInstance.get(
        "/users/"+obj.id,
        {headers:headers1}        
      )
      .catch((err) => { console.log('err', err); }); 
  }, 
  create_user: async (obj) => { 
    return await axiosInstance.post(
      "/users/",
      obj,
      {headers:headers1}        
    )
    .catch((err) => { console.log('err', err); });    
  },  
  update_user: async (obj, id) => { 
    return await axiosInstance.patch(
      "/users/"+id,
      obj,
      {headers:headers1}        
    )
    .catch((err) => { console.log('err', err); });    
  }, 

  //=== device-sensor-data  ===  
  device_sensor_data: async (obj) => { 
    return await axiosInstance.get(
      `/device-sensor-data/${ obj.page ? '?page='+ obj.page : ''}`,
      {
        params: {
          value:obj.value,
          time: obj.time,
          device: obj.device,          
        }
      },
      {headers:headers1}        
    )
    .catch((err) => { console.log('err', err); });    
  }, 
  delete_device_sensor_data: async (obj) => { 
    return await axiosInstance.delete(
      "/device-sensor-data/"+obj.id,      
      {headers:headers1}        
    )
    .catch((err) => { console.log('err', err); });    
  },
  device_sensor_data_row: async (obj) => { 
    return await axiosInstance.get(
      "/device-sensor-data/"+obj.id,
      {headers:headers1}        
    )
    .catch((err) => { console.log('err', err); });    
 }, 
 create_device_sensor_data: async (obj) => { 
    return await axiosInstance.post(
      "/device-sensor-data/",
      {        
        'device':obj.device,        
        'value':obj.value,  
        'note':obj.note,   
      },
      {headers:headers1}        
    )
    .catch((err) => { console.log('err', err); });    
  },  
  update_device_sensor_data: async (obj) => { 
    return await axiosInstance.patch(
      "/device-sensor-data/"+obj.id,
      {        
        'device':obj.device,        
        'value':obj.value,  
        'note':obj.note,   
      },
      {headers:headers1}        
    )
    .catch((err) => { console.log('err', err); });    
  }, 

  //=== permission  ===  
  permission: async (obj) => { 
    return await axiosInstance.get(
      `/normal-user-permissions/${ obj.page ? '?page='+ obj.page : ''}`,
      {
        params: {
          user:obj.user,         
        }
      },
      {headers:headers1}        
    )
    .catch((err) => { console.log('err', err); });    
  }, 
  delete_permission: async (obj) => { 
    return await axiosInstance.delete(
      "/normal-user-permissions/"+obj.id,      
      {headers:headers1}        
    )
    .catch((err) => { console.log('err', err); });    
  },
  permission_row: async (obj) => { 
    return await axiosInstance.get(
      "/normal-user-permissions/"+obj.id,
      {headers:headers1}        
    )
    .catch((err) => { console.log('err', err); });    
 }, 
 create_permission: async (obj) => { 
    return await axiosInstance.post(
      "/normal-user-permissions/",
      obj,
      {headers:headers1}        
    )
    .catch((err) => { console.log('err', err); });    
  },  
  update_permission: async (obj,id) => { 
    return await axiosInstance.patch(
      "/normal-user-permissions/"+id,
      obj,
      {headers:headers1}        
    )
    .catch((err) => { console.log('err', err); });    
  }, 

};

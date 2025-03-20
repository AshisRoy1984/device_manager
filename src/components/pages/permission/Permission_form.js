import React, { useState, useEffect } from 'react';
import reactDOM from 'react-dom'; 
import { Link, Navigate, useParams } from 'react-router-dom'; 
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Api from '../../../config/Api';
import validation from '../../../config/validation';
import Meta from '../../common/Meta'; 

const Permission_form = (props)=>{ 

  const { user } = useParams();  

  const metaData = {
    meta_title : 'Set Permissions',
    meta_description : '',
    meta_keywords : '',
  }  
  
  const modules = [

    {name :'can_create_users', title : 'Create Users', value: false },
    {name :'can_update_users', title : 'Update Users', value: false },
    {name :'can_delete_users', title : 'Delete Users', value: false },

    {name :'can_create_devices', title : 'Create Devices', value: false },
    {name :'can_update_devices', title : 'Update Devices', value: false },
    {name :'can_delete_devices', title : 'Delete Devices', value: false },

    {name :'can_create_sensor_data', title : 'Create Sensor Data', value: false },
    {name :'can_update_sensor_data', title : 'Update Sensor Data', value: false },
    {name :'can_delete_sensor_data', title : 'Delete Sensor Data', value: false },

  ]

  const __data = {}
  modules.map((doc,i) => {   
    __data[doc.name] = doc.value; 
  })

  const __errors = {}
  modules.map((doc,i) => {   
    __errors[doc.name] = ''; 
  })  

  const [data, set_data] = useState(__data)   
  const [id, set_id] = useState('')  
  const [userRow, set_userRow] = useState("")  
  const [disablebutton, set_disablebutton] = useState(false);   
  const [common_error, set_common_error] = useState("")  
  const [errors,set_errors] = useState(__errors) 
  const [submitted, set_submitted] = useState(false);  

  useEffect(() => {	
    fetchData(user)   
  },[]);  

  useEffect(() => {	
    fetchUser(user)   
  },[]);  

  const fetchData = async (user)=>{ 		
    try{				
      const res = await Api.permission({
        user:user,       
      });
      
      if( res && (res.status === 200) ){				
        let resData = res.data
        set_data({
          ...data,
          resData
        })	
        set_id(resData.id)			
      }			
    }
    catch (err) {
      console.log('err:', err)
    }        
  }	

  const fetchUser = async (user)=>{ 		
    try{				
      const res = await Api.user_row({id:user});      
      if( res && (res.status === 200) ){				
        let resData = res.data
        set_userRow(resData)				
      }			
    }
    catch (err) {
      console.log('err:', err)
    }        
  }	
  const handleChange = (e)=>{	
    const field_name  = e.target.name;
    const field_value = e.target.value;
    set_data({...data, [field_name]: field_value})
  }	 

  const validateForm = ()=>{		

    let errors  = {};  
    let isValid  = true; 

    set_errors(errors);	
    return isValid        
  }

  const handleSubmit = async(e)=>{
    e.preventDefault();  
    if(validateForm()){	
      set_disablebutton(true)      
      try{

        let obj = data

        if(id){            
            const res = await Api.update_permission(obj,id);            
            if( res && (res.status === 200) ){              
              set_submitted(true)
            } 
            else{ 
              const { status, message, error } = res.data;                
              set_common_error(message)
              set_errors(error)
              set_disablebutton(false)
            }
        }
        else{           
            const res = await Api.create_permission(obj);            
            if( res && (res.status === 200 || res.status === 201) ){
              set_submitted(true)  
            } 
            else {          
              const { status, message, error } = res.data;           
              set_common_error(message)
              set_errors(error)
              set_disablebutton(false)
            }
        }
       
      } 
      catch(err){
        set_common_error('err:', err)
        set_disablebutton(false)
      }   

    }			
  }	

  if( submitted ){
    return <Navigate  to='/users' />			
  }

  let sl_no  = 1;


  return (   
    <> 
    <Meta metaData={metaData} />
    <HelmetProvider>
    <Helmet>	
    </Helmet>				
    </HelmetProvider>
    <div className="pagetitle">
        <h1>
        {
            userRow &&
            <>
            {
              id ? `Edit permission for : ${userRow.username}` : `Add permission for : ${userRow.username}`
            }  
            </>                
        } 
        </h1>
        <nav>
        <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/"><i className="bi bi-house-door"></i></Link></li>
            <li className="breadcrumb-item"><Link to="/users">users</Link></li>
            <li className="breadcrumb-item active">
            {
              id ? 'Edit permission' : 'Add permission'
            }      
            </li>
        </ol>
        </nav>
    </div>    

    <section className="section dashboard">
        <div className="row">
            <div className="col-lg-8">               
                <div className="card">
                  <div className="card-body my-3">

                    {common_error &&            
                        <div className="alert alert-danger alert-dismissible fade show p-2">
                          {common_error}
                          <button type="button" className="btn-close" style={{padding:"12px"}} 
                          onClick={() => set_common_error('')}></button>
                        </div> 
                    }   
                    <form method="post" onSubmit={handleSubmit}>  
                   
                        <div className="mb-3">
                            <div className="table-responsive">
                                <table className="table table-hover table-striped">
                                    <thead>
                                        <tr className="table-active">
                                            <th scope="col" className="text-uppercase">#</th> 
                                            <th scope="col" className="text-uppercase">Module</th>                                            
                                            <th scope="col" className="text-uppercase">Permission</th> 
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {
                                      modules.map((doc,i)=>{
                                        return(
                                          <tr key={i}>
                                            <td>{sl_no++}</td>                                        
                                            <td>{doc.title}</td>
                                            <td>
                                              <select className="form-select"
                                              id={doc.name} 
                                              name={doc.name} 
                                              value={data[doc.name]}  
                                              onChange={handleChange}
                                              >
                                              <option value={true}>Yes</option>  
                                              <option value={false}>No</option>      
                                              </select>
                                            </td> 
                                          </tr>
                                        )
                                      })
                                  } 
                                  </tbody>
                                </table>
                            </div>                            
                        </div>  

                        <div className="mb-3">
                          <button type="submit" className="btn btn-primary radius-50 px-3 px-md-5" disabled={disablebutton}>Save</button>
                        </div>

                    </form> 

                  </div>
                </div>
            </div>
        </div>
    </section>
    </> 
    );
 
}
export default Permission_form;


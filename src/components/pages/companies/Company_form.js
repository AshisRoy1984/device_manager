import React, { useState, useEffect } from 'react';
import reactDOM from 'react-dom'; 
import { Link, Navigate, useParams } from 'react-router-dom'; 

import Modal from 'react-bootstrap/Modal';
import Api from '../../../config/Api';
import validation from '../../../config/validation';

const Company_form = (props)=>{ 

  const { DeviceIntID } = useParams();  

  const __data = {  
    DeviceID: '',  
    DeviceName:'',
    DeviceLocation:'',
    Unit:'',
    Status:'',
    Note:'',
  }

  const __errors = {	
    DeviceID: '',  
    DeviceName:'',
    DeviceLocation:'',
    Unit:'',
    Status:'',
    Note:'',
  }

  const [data, set_data] = useState(__data)   
  const [disablebutton, set_disablebutton] = useState(false);   
  const [common_error, set_common_error] = useState("")  
  const [errors,set_errors] = useState(__errors) 
  const [submitted, set_submitted] = useState(false);     
 
	useEffect(() => {	
    if(DeviceIntID){
      fetchData(DeviceIntID)
    }    
	},[DeviceIntID]);  

  const fetchData = async (DeviceIntID)=>{ 		
		try{				
			const res = await Api.device_row({
        id:DeviceIntID,       
			});
			if( res && (res.status === 200) ){				
				let result = res.data
				set_data(result.data)				
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

  const validate_DeviceName = (value)=>{	
      let err = '';          
      let DeviceName = value ?? data.DeviceName
      if(!DeviceName){ 
        err  = 'Device Name is required';  
      } 
      set_errors({
        ...errors,
        DeviceName:err
      });	  
      return err;	
  }

  const validate_DeviceID = (value)=>{	
      let err = '';          
      let DeviceID = value ?? data.DeviceID
      if(!DeviceID){ 
        err  = 'Device ID is required';  
      } 
      set_errors({
        ...errors,
        DeviceID:err
      });	  
      return err;	
  }

  const validate_DeviceLocation = (value)=>{	
      let err = '';  
      let DeviceLocation = value ?? data.DeviceLocation
      if(!DeviceLocation){        
        err  = 'Device Location is required';         
      }	  
      set_errors({
        ...errors,
        DeviceLocation:err
      });	 
      return err;	
  }

  const validate_Unit = (value)=>{	
      let err = '';  
      let Unit = value ?? data.Unit
      if(!Unit){        
        err  = 'Unit is required';          
      } 
       
      set_errors({
        ...errors,
        Unit:err
      });	 
      return err;	
  }

  const validateForm = ()=>{		
    let errors  = {};  
    let isValid  = true;  

    let DeviceName = validate_DeviceName()
    if( DeviceName !=='' ){
      errors.DeviceName = DeviceName;
      isValid = false;
    }

    let DeviceID = validate_DeviceID()
    if( DeviceID !=='' ){
      errors.DeviceID = DeviceID;
      isValid = false;
    }

    let DeviceLocation = validate_DeviceLocation()
    if( DeviceLocation !==''){
      errors.DeviceLocation = DeviceLocation;
      isValid = false;
    }

    let Unit = validate_Unit()
    if( Unit !==''){
      errors.Unit = Unit;
      isValid = false;
    }

    set_errors(errors);	
    return isValid        
  }

  const handleSubmit = async(e)=>{
    e.preventDefault();   
   
    if(validateForm()){	

      set_disablebutton(true)
      
      try{

        if(DeviceIntID){

            const res = await Api.update_device({   
              id:DeviceIntID,
              UserID:localStorage.getItem(process.env.REACT_APP_PREFIX + 'user_id'), 
              DeviceID:data.DeviceID,
              DeviceName:data.DeviceName,
              DeviceLocation:data.DeviceLocation,
              Unit:data.Unit,
              Status:data.Status,
              Note:data.Note,              
            });
            
            if( res && (res.status === 200) ){              
              set_submitted(true)
            } 
            else {          
              const { status, message, error } = res.data;                
              set_common_error(message)
              set_errors(error)
              set_disablebutton(false)
            }

        }
        else{

            const res = await Api.create_device({ 
              UserID:localStorage.getItem(process.env.REACT_APP_PREFIX + 'user_id'), 
              DeviceID:data.DeviceID,
              DeviceName:data.DeviceName,
              DeviceLocation:data.DeviceLocation,
              Unit:data.Unit,
              Status:data.Status,
              Note:data.Note,              
            });
            
            if( res && (res.status === 200) ){
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
    return <Navigate  to='/device' />			
  }

  return (   
	  <> 
    <div className="pagetitle">
        <h1>
        {
          DeviceIntID ? 'Edit Company' : 'Add Company'
        }      
        </h1>
        <nav>
        <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/"><i className="bi bi-house-door"></i></Link></li>
            <li className="breadcrumb-item"><Link to="/companies">Companies</Link></li>
            <li className="breadcrumb-item active">
            {
              DeviceIntID ? 'Edit Company' : 'Add Company'
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
                          <label className="form-label">Device Name<span className="required">*</span></label>
                          <input type="text" className="form-control" 
                          id="DeviceName"
                          name="DeviceName" 
                          value={data.DeviceName} 
                          onChange={(e)=>{
                            handleChange(e)
                            validate_DeviceName(e.target.value)
                          }}    
                          />
                          {errors.DeviceName && 
                            <div className="error-msg">{errors.DeviceName}</div>    
                          }  	
                        </div>

                        <div className="mb-3">
                          <label className="form-label">Device ID<span className="required">*</span></label>
                          <input type="text" className="form-control" 
                          id="DeviceID"
                          name="DeviceID" 
                          value={data.DeviceID} 
                          onChange={(e)=>{
                            handleChange(e)
                            validate_DeviceID(e.target.value)
                          }}    
                          />
                          {errors.DeviceID && 
                            <div className="error-msg">{errors.DeviceID}</div>    
                          }  	
                        </div>
                       
                        <div className="mb-3">
                        <label className="form-label">Device Location<span className="required">*</span></label>
                        <input type="text" className="form-control" placeholder=''
                        id="DeviceLocation"
                        name="DeviceLocation" 
                        value={data.DeviceLocation} 
                        onChange={(e)=>{
                          handleChange(e)
                          validate_DeviceLocation(e.target.value)
                        }}    
                        />
                        {errors.DeviceLocation && 
                          <div className="error-msg">{errors.DeviceLocation}</div>    
                        } 
                        </div>  
                       
                        <div className="mb-3">
                          <label className="form-label">Unit<span className="required">*</span></label>
                          <input type="text" className="form-control" placeholder=''
                          id="Unit"
                          name="Unit" 
                          value={data.Unit} 
                          onChange={(e)=>{
                            handleChange(e)
                            validate_Unit(e.target.value)
                          }}    
                          />
                          {errors.Unit && 
                            <div className="error-msg">{errors.Unit}</div>    
                          } 
                        </div>   
                       
                        <div className="mb-3">
                          <label className="form-label">Note</label>
                          <textarea className="form-control" 
                          rows={5}
                          id="Note"
                          name="Note" 
                          value={data.Note} 
                          onChange={(e)=>{
                            handleChange(e)              
                          }}    
                          />
                          {errors.Note && 
                            <div className="error-msg">{errors.Note}</div>    
                          }  	
                        </div>
                       
                        <div className="mb-3">
                          <label className="form-label">Status</label>
                          <select className="form-select"
                          id="Status" 
                          name="Status" 
                          value={data.Status}  
                          onChange={handleChange}
                          >
                          <option value="">-</option>
                          <option value="0">In-Active</option>
                          <option value="1">Active</option>        
                          </select>
                          {errors.Status && 
                            <div className="error-msg">{errors.Status}</div>    
                          }  	
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
export default Company_form;


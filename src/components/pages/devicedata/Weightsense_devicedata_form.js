import React, { useState, useEffect } from 'react';
import reactDOM from 'react-dom'; 
import { Link, Navigate, useParams } from 'react-router-dom'; 
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Api from '../../../config/Api';
import validation from '../../../config/validation';
import Meta from '../../common/Meta'; 
import all_function from '../../../config/all_function';

const Weightsense_devicedata_form = (props)=>{ 

  const { device, id } = useParams();  

  const metaData = {
    meta_title : id ? 'Edit Device data' : 'Add Device data',
    meta_description : '',
    meta_keywords : '',
  }   

  const __data = { 
    weight:'',
    timestamp:'',
    ip_address:'',    
  }

  const __errors = {	
    weight:'',
    timestamp:'',
    ip_address:'',    
  }

  const [data, set_data] = useState(__data)   
  const [deviceRow, set_deviceRow] = useState("");  
  const [disablebutton, set_disablebutton] = useState(false);   
  const [common_error, set_common_error] = useState("")  
  const [errors,set_errors] = useState(__errors) 
  const [submitted, set_submitted] = useState(false);  
 
	useEffect(() => {	
    if(id){
      fetchData(id)
    }    
	},[]);  

  useEffect(() => {		
    fetchDevice(device)        
  },[]);

  const fetchData = async (id)=>{ 		
		try{				
			const res = await Api.weightsense_device_sensor_data_row({
        id:id,       
			});
      
			if( res && (res.status === 200) ){				
				let resData = res.data
				set_data({
          weight:resData.weight,
          timestamp:resData.timestamp,
          ip_address:resData.ip_address,          
        })				
			}			
		}
		catch (err) {
			console.log('err:', err)
		}        
  }	
  const fetchDevice = async (device)=>{        
      const res = await Api.company_device_row({
          id:device,             
      })       
      if( res && (res.status === 200) ){
          const resData = res.data; 
          set_deviceRow(resData)  
      }       			
  }

  const handleChange = (e)=>{	
    const field_name  = e.target.name;
    const field_value = e.target.value;
    set_data({...data, [field_name]: field_value})
  }	

  const validate_weight = (value)=>{	
      let err = '';          
      let weight = value ?? data.weight
      if(!weight){ 
        err  = 'Weight is required';  
      } 
      set_errors({
        ...errors,
        weight:err
      });	  
      return err;	
  }

  const validate_timestamp = (value)=>{	
      let err = '';          
      let timestamp = value ?? data.timestamp
      if(!timestamp){ 
        err  = 'Timestamp is required';  
      } 
      set_errors({
        ...errors,
        timestamp:err
      });	  
      return err;	
  }

  const validate_ip_address = (value)=>{	
      let err = '';          
      let ip_address = value ?? data.ip_address
      if(!ip_address){ 
        err  = 'IP Address is required';  
      } 
      set_errors({
        ...errors,
        ip_address:err
      });	  
      return err;	
  }

  const validateForm = ()=>{		

    let errors  = {};  
    let isValid  = true;  

    let weight = validate_weight()
    if( weight !=='' ){
      errors.weight = weight;
      isValid = false;
    }

    let timestamp = validate_timestamp()
    if( timestamp !=='' ){
      errors.timestamp = timestamp;
      isValid = false;
    }

    let ip_address = validate_ip_address()
    if( ip_address !=='' ){
      errors.ip_address = ip_address;
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

        if(id){

            const res = await Api.update_weightsense_device_sensor_data({   
              id:id,
              device:deviceRow.device_id,
              weight:data.weight,
              timestamp:data.timestamp,
              ip_address:data.ip_address,              
            });
            
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

            const res = await Api.create_weightsense_device_sensor_data({ 
              device:deviceRow.device_id,
              weight:data.weight,
              timestamp:data.timestamp,
              ip_address:data.ip_address,              
            });           
            
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
    return <Navigate  to={`/weightsense-device-data/${device}`} />			
  }

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
            deviceRow &&
            <>
            {
              id ? `Edit Device data for : ${deviceRow.device_id}` : `Add Device data for : ${deviceRow.device_id}`
            }  
            </>                
        }
        </h1>
        <nav>
        <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/"><i className="bi bi-house-door"></i></Link></li>
            <li className="breadcrumb-item"><Link to="/devices">Devices</Link></li>
            <li className="breadcrumb-item"><Link to={`/weightsense-device-data/${device}`}>Device data</Link></li>            
            <li className="breadcrumb-item active">
            {
              id ? 'Edit Device data' : 'Add Device data'
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
                          <label className="form-label">Weight<span className="required">*</span></label>
                          <input type="text" className="form-control" 
                          id="weight"
                          name="weight" 
                          value={data.weight} 
                          onChange={(e)=>{
                            handleChange(e)
                            validate_weight(e.target.value)
                          }}    
                          />
                          {errors.weight && 
                            <div className="error-msg">{errors.weight}</div>    
                          }  	
                        </div>    

                        <div className="mb-3">
                          <label className="form-label">Timestamp<span className="required">*</span></label>
                          <input type="text" className="form-control" 
                          id="timestamp"
                          name="timestamp" 
                          value={data.timestamp} 
                          onChange={(e)=>{
                            handleChange(e)
                            validate_timestamp(e.target.value)
                          }}    
                          />
                          {errors.timestamp && 
                            <div className="error-msg">{errors.timestamp}</div>    
                          }  	
                        </div>    

                        <div className="mb-3">
                          <label className="form-label">IP Address<span className="required">*</span></label>
                          <input type="text" className="form-control" 
                          id="ip_address"
                          name="ip_address" 
                          value={data.ip_address} 
                          onChange={(e)=>{
                            handleChange(e)
                            validate_ip_address(e.target.value)
                          }}    
                          />
                          {errors.ip_address && 
                            <div className="error-msg">{errors.ip_address}</div>    
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
export default Weightsense_devicedata_form;


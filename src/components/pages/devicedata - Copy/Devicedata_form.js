import React, { useState, useEffect } from 'react';
import reactDOM from 'react-dom'; 
import { Link, Navigate, useParams } from 'react-router-dom'; 
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Api from '../../../config/Api';
import validation from '../../../config/validation';
import Meta from '../../common/Meta'; 

const Devicedata_form = (props)=>{ 

  const { device, id } = useParams();  

  const metaData = {
    meta_title : id ? 'Edit Device data' : 'Add Device data',
    meta_description : '',
    meta_keywords : '',
  }   

  const __data = {  
    device: device,  
    value:'',
    note:'',   
  }

  const __errors = {	
    device: '',  
    value:'',
    note:'',   
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
			const res = await Api.device_sensor_data_row({
        id:id,       
			});
      
			if( res && (res.status === 200) ){				
				let resData = res.data
				set_data({
          device: resData.device,  
          value: resData.value,  
          note: resData.note, 
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

  const validate_value = (v)=>{	
      let err = '';          
      let value = v ?? data.value
      if(!value){ 
        err  = 'Value is required';  
      } 
      set_errors({
        ...errors,
        value:err
      });	  
      return err;	
  }

  const validate_note = (value)=>{	
      let err = '';          
      let note = value ?? data.note
      if(!note){ 
        err  = 'Note is required';  
      } 
      set_errors({
        ...errors,
        note:err
      });	  
      return err;	
  }

  const validateForm = ()=>{		

    let errors  = {};  
    let isValid  = true;  

    let value = validate_value()
    if( value !=='' ){
      errors.value = value;
      isValid = false;
    }

    // let note = validate_note()
    // if( note !=='' ){
    //   errors.note = note;
    //   isValid = false;
    // }

    set_errors(errors);	
    return isValid        
  }

  const handleSubmit = async(e)=>{
    e.preventDefault();  
    if(validateForm()){	
      set_disablebutton(true)      
      try{

        if(id){

            const res = await Api.update_device_sensor_data({   
              id:id,
              device:device,
              value:data.value,
              note:data.note,             
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

            const res = await Api.create_device_sensor_data({ 
              device:device,
              value:data.value,
              note:data.note,                     
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
    return <Navigate  to={`/device-data/${device}`} />			
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
            <li className="breadcrumb-item"><Link to={`/device-data/${device}`}>Device data</Link></li>            
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
                          <label className="form-label">Value<span className="required">*</span></label>
                          <input type="text" className="form-control" 
                          id="value"
                          name="value" 
                          value={data.value} 
                          onChange={(e)=>{
                            handleChange(e)
                            validate_value(e.target.value)
                          }}    
                          />
                          {errors.value && 
                            <div className="error-msg">{errors.value}</div>    
                          }  	
                        </div>                          
                       
                        <div className="mb-3">
                          <label className="form-label">Note</label>
                          <textarea className="form-control" 
                          rows={5}
                          id="note"
                          name="note" 
                          value={data.note ?? ''} 
                          onChange={(e)=>{
                            handleChange(e)                              
                          }}    
                          />
                          {errors.note && 
                            <div className="error-msg">{errors.note}</div>    
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
export default Devicedata_form;


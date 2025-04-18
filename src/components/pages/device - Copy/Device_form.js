import React, { useState, useEffect } from 'react';
import reactDOM from 'react-dom'; 
import { Link, Navigate, useParams } from 'react-router-dom'; 
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Api from '../../../config/Api';
import validation from '../../../config/validation';
import Meta from '../../common/Meta'; 

const Device_form = (props)=>{ 

  const { id } = useParams();  

  const metaData = {
    meta_title : id ? 'Edit Device' : 'Add Device',
    meta_description : '',
    meta_keywords : '',
  }   

  const __data = {  
    company: '',  
    device_id: '',  
    device_name:'',
    device_location:'',
    unit:'',
    note:'',
    status:'',   
  }

  const __errors = {	
    company: '',  
    device_id: '',  
    device_name:'',
    device_location:'',
    unit:'',
    note:'',
    status:'',   
  }

  const [data, set_data] = useState(__data)   
  const [companies, set_companies] = useState([])  
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
      fetchCompany()   
  },[]);

  const fetchData = async (id)=>{ 		
		try{				
			const res = await Api.company_device_row({
        id:id,       
			});
      
			if( res && (res.status === 200) ){				
				let resData = res.data
				set_data({
          company: resData.company,  
          device_id: resData.device_id,  
          device_name: resData.device_name,  
          device_location: resData.device_location,  
          unit: resData.unit,  
          note: resData.note,  
          status: resData.status,            
        })				
			}			
		}
		catch (err) {
			console.log('err:', err)
		}        
  }	

  const fetchCompany = async (id)=>{ 		
    try{				
      const res = await Api.companies({});      
      if( res && (res.status === 200) ){				
        let resData = res.data
        set_companies(resData.results)				
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
  
  const validate_company = (value)=>{	
      let err = '';          
      let company = value ?? data.company
      if(!company){ 
        err  = 'Company is required';  
      } 
      set_errors({
        ...errors,
        company:err
      });	  
      return err;	
  }
  const validate_device_id = (value)=>{	
      let err = '';          
      let device_id = value ?? data.device_id
      if(!device_id){ 
        err  = 'Device ID is required';  
      } 
      set_errors({
        ...errors,
        device_id:err
      });	  
      return err;	
  }

  const validate_device_name = (value)=>{	
      let err = '';          
      let device_name = value ?? data.device_name
      if(!device_name){ 
        err = 'Device Name is required';  
      }       
      set_errors({
        ...errors,
        device_name:err
      });	  
      return err;	
  }

  const validate_device_location = (value)=>{	
      let err = '';          
      let device_location = value ?? data.device_location
      if(!device_location){ 
        err  = 'Device Location is required';  
      } 
      set_errors({
        ...errors,
        device_location:err
      });	  
      return err;	
  }

  const validate_unit = (value)=>{	
      let err = '';          
      let unit = value ?? data.unit
      if(!unit){ 
        err  = 'Unit is required';  
      } 
      set_errors({
        ...errors,
        unit:err
      });	  
      return err;	
  }

  const validateForm = ()=>{		

    let errors  = {};  
    let isValid  = true;  

    let company = validate_company()
    if( company !=='' ){
      errors.company = company;
      isValid = false;
    }

    let device_id = validate_device_id()
    if( device_id !=='' ){
      errors.device_id = device_id;
      isValid = false;
    }

    let device_name = validate_device_name()
    if( device_name !=='' ){
      errors.device_name = device_name;
      isValid = false;
    }

    let device_location = validate_device_location()
    if( device_location !==''){
      errors.device_location = device_location;
      isValid = false;
    }

    let unit = validate_unit()
    if( unit !==''){
      errors.unit = unit;
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

            const res = await Api.update_company_device({   
              id:id,
              company:data.company,
              device_id:data.device_id,
              device_name:data.device_name,
              device_location:data.device_location,
              unit:data.unit,
              note:data.note ?? '',            
              status: (data.status=='') ? 0 : data.status,              
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

            const res = await Api.create_company_device({ 
              company:data.company,
              device_id:data.device_id,
              device_name:data.device_name,
              device_location:data.device_location,
              unit:data.unit,
              note:data.note ?? '',            
              status: (data.status=='') ? 0 : data.status,                       
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
    return <Navigate  to={`/devices`} />			
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
          id ? 'Edit Device' : 'Add Device'
        }      
        </h1>
        <nav>
        <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/"><i className="bi bi-house-door"></i></Link></li>
            <li className="breadcrumb-item"><Link to="/devices">Devices</Link></li>
            <li className="breadcrumb-item active">
            {
              id ? 'Edit Device' : 'Add Device'
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
                            <label className="form-label">Company<span className="required">*</span></label>
                            <select className="form-select"
                            id="company" 
                            name="company" 
                            value={data.company}  
                            onChange={(e)=>{
                              handleChange(e)
                              validate_company(e.target.value)
                            }}   
                            >
                            <option value="">-</option>         
                            {
                              companies.map((val,i)=>{
                                return(<option key={i} value={val.id}>{val.name}</option>)
                              })
                            }          
                            </select>
                            {errors.company && 
                              <div className="error-msg">{errors.company}</div>    
                            }  	
                        </div>         

                        <div className="mb-3">
                          <label className="form-label">Device ID<span className="required">*</span></label>
                          <input type="text" className="form-control" 
                          id="device_id"
                          name="device_id" 
                          value={data.device_id} 
                          onChange={(e)=>{
                            handleChange(e)
                            validate_device_id(e.target.value)
                          }}    
                          />
                          {errors.device_id && 
                            <div className="error-msg">{errors.device_id}</div>    
                          }  	
                        </div>

                        <div className="mb-3">
                          <label className="form-label">Device Name<span className="required">*</span></label>
                          <input type="text" className="form-control" 
                          id="device_name"
                          name="device_name" 
                          value={data.device_name} 
                          onChange={(e)=>{
                            handleChange(e)
                            validate_device_name(e.target.value)
                          }}    
                          />
                          {errors.device_name && 
                            <div className="error-msg">{errors.device_name}</div>    
                          }  	
                        </div>
                       
                        <div className="mb-3">
                        <label className="form-label">Device Location<span className="required">*</span></label>
                        <input type="text" className="form-control" placeholder=''
                        id="device_location"
                        name="device_location" 
                        value={data.device_location} 
                        onChange={(e)=>{
                          handleChange(e)
                          validate_device_location(e.target.value)
                        }}    
                        />
                        {errors.device_location && 
                          <div className="error-msg">{errors.device_location}</div>    
                        } 
                        </div>  

                        <div className="mb-3">
                        <label className="form-label">Unit<span className="required">*</span></label>
                        <input type="text" className="form-control" placeholder=''
                        id="unit"
                        name="unit" 
                        value={data.unit} 
                        onChange={(e)=>{
                          handleChange(e)
                          validate_unit(e.target.value)
                        }}    
                        />
                        {errors.unit && 
                          <div className="error-msg">{errors.unit}</div>    
                        } 
                        </div>  
                       
                        <div className="mb-3">
                          <label className="form-label">Note</label>
                          <textarea className="form-control" 
                          rows={5}
                          id="note"
                          name="note" 
                          value={data.note} 
                          onChange={(e)=>{
                            handleChange(e)                              
                          }}    
                          />
                          {errors.note && 
                            <div className="error-msg">{errors.note}</div>    
                          }  	
                        </div>
                       
                        <div className="mb-3">
                          <label className="form-label">Status</label>
                          <select className="form-select"
                          id="status" 
                          name="status" 
                          value={data.status}  
                          onChange={handleChange}
                          >
                          <option value="">-</option>                          
                          <option value="1">Active</option>  
                          <option value="0">In-Active</option>      
                          </select>
                          {errors.status && 
                            <div className="error-msg">{errors.status}</div>    
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
export default Device_form;


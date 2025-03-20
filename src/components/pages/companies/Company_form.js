import React, { useState, useEffect } from 'react';
import reactDOM from 'react-dom'; 
import { Link, Navigate, useParams } from 'react-router-dom'; 
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Api from '../../../config/Api';
import validation from '../../../config/validation';
import Meta from '../../common/Meta'; 
const Company_form = (props)=>{ 

  const { id } = useParams();   

  const metaData = {
    meta_title : id ? 'Edit Company' : 'Add Company',
    meta_description : '',
    meta_keywords : '',
  }   

  const __data = {  
    name: '',  
    email:'',
    phone:'',
    address:'',
    status:'',   
  }

  const __errors = {	
    name: '',  
    email:'',
    phone:'',
    address:'',
    status:'',    
  }

  const [data, set_data] = useState(__data)   
  const [disablebutton, set_disablebutton] = useState(false);   
  const [common_error, set_common_error] = useState("")  
  const [errors,set_errors] = useState(__errors) 
  const [submitted, set_submitted] = useState(false);     
 
	useEffect(() => {	
    if(id){
      fetchData(id)
    }    
	},[]);  

  const fetchData = async (id)=>{ 		
		try{				
			const res = await Api.company_row({
        id:id,       
			});
      
			if( res && (res.status === 200) ){				
				let resData = res.data
				set_data({
          name: resData.name,  
          email: resData.email,  
          phone: resData.phone,  
          address: resData.address,  
          status: resData.status,            
        })				
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

  const validate_name = (value)=>{	
      let err = '';          
      let name = value ?? data.name
      if(!name){ 
        err  = 'Name is required';  
      } 
      set_errors({
        ...errors,
        name:err
      });	  
      return err;	
  }

  const validate_email = (value)=>{	
      let err = '';          
      let email = value ?? data.email
      if(!email){ 
        err = 'Email is required';  
      } 
      else if(!validation.validateEmail(email)){       
        err = 'Email is not valid!';
      }		
      set_errors({
        ...errors,
        email:err
      });	  
      return err;	
  }

  const validate_phone = (value)=>{	
      let err = '';          
      let phone = value ?? data.phone
      if(!phone){ 
        err  = 'Phone is required';  
      } 
      set_errors({
        ...errors,
        phone:err
      });	  
      return err;	
  }

  const validate_address = (value)=>{	
      let err = '';          
      let address = value ?? data.address
      if(!address){ 
        err  = 'Address is required';  
      } 
      set_errors({
        ...errors,
        address:err
      });	  
      return err;	
  }

  const validateForm = ()=>{		

    let errors  = {};  
    let isValid  = true;  

    let name = validate_name()
    if( name !=='' ){
      errors.name = name;
      isValid = false;
    }

    let email = validate_email()
    if( email !=='' ){
      errors.email = email;
      isValid = false;
    }

    let phone = validate_phone()
    if( phone !==''){
      errors.phone = phone;
      isValid = false;
    }

    let address = validate_address()
    if( address !==''){
      errors.address = address;
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

            const res = await Api.update_company({   
              id:id,
              name:data.name,
              email:data.email,
              phone:data.phone,
              address:data.address,
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

            const res = await Api.create_company({ 
              name:data.name,
              email:data.email,
              phone:data.phone,
              address:data.address,
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
    return <Navigate  to='/companies' />			
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
          id ? 'Edit Company' : 'Add Company'
        }      
        </h1>
        <nav>
        <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/"><i className="bi bi-house-door"></i></Link></li>
            <li className="breadcrumb-item"><Link to="/companies">Companies</Link></li>
            <li className="breadcrumb-item active">
            {
              id ? 'Edit Company' : 'Add Company'
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
                          <label className="form-label">Company Name<span className="required">*</span></label>
                          <input type="text" className="form-control" 
                          id="name"
                          name="name" 
                          value={data.name} 
                          onChange={(e)=>{
                            handleChange(e)
                            validate_name(e.target.value)
                          }}    
                          />
                          {errors.name && 
                            <div className="error-msg">{errors.name}</div>    
                          }  	
                        </div>

                        <div className="mb-3">
                          <label className="form-label">Email<span className="required">*</span></label>
                          <input type="text" className="form-control" 
                          id="email"
                          name="email" 
                          value={data.email} 
                          onChange={(e)=>{
                            handleChange(e)
                            validate_email(e.target.value)
                          }}    
                          />
                          {errors.email && 
                            <div className="error-msg">{errors.email}</div>    
                          }  	
                        </div>
                       
                        <div className="mb-3">
                        <label className="form-label">Phone<span className="required">*</span></label>
                        <input type="text" className="form-control" placeholder=''
                        id="phone"
                        name="phone" 
                        value={data.phone} 
                        onChange={(e)=>{
                          handleChange(e)
                          validate_phone(e.target.value)
                        }}    
                        />
                        {errors.phone && 
                          <div className="error-msg">{errors.phone}</div>    
                        } 
                        </div>  
                       
                        <div className="mb-3">
                          <label className="form-label">Address<span className="required">*</span></label>
                          <textarea className="form-control" 
                          rows={5}
                          id="address"
                          name="address" 
                          value={data.address} 
                          onChange={(e)=>{
                            handleChange(e)  
                            validate_address(e.target.value)           
                          }}    
                          />
                          {errors.address && 
                            <div className="error-msg">{errors.address}</div>    
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
export default Company_form;


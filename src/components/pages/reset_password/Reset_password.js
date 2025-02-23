import React, { useState, useEffect } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Navigate, Link } from 'react-router-dom';

import Meta from '../../common/Meta';
import validation from '../../../config/validation';
import Api from '../../../config/Api';
import all_function from '../../../config/all_function';
import $ from "jquery"

const Reset_password = ()=>{ 

    const metaData = {
      meta_title	    : 'Reset password',
      meta_description	: '',
      meta_keywords		: '',
    } 

    const __data = {
		password: '',
		confirm_password:''
	}
	const __errors = {
		password: '',
		confirm_password:'',		
	}
    const [data,set_data]   	  			        = useState(__data) 
    const [disablebutton, set_disablebutton] 		= useState(false); 
    const [common_error,set_common_error] 		    = useState("")  
    const [errors,set_errors]     				    = useState(__errors)   
   
    useEffect( ()=>{   

    },[])

    const handleChange = (e)=>{	
      const field_name  = e.target.name;
      const field_value = e.target.value;
      set_data({...data, [field_name]: field_value})
    }	

    const validate_password = (value)=>{	
		let err     = '';  
		let password  = value ?? data.password
		if(!password){        
		  err  = 'New password is required';         
		}	 
		else if(password && password.length < 6){        
		  err  = 'New password must be at least 6 characters';         
		}	 
		set_errors({
		  ...errors,
		  password:err
		});	 
		return err;	
	} 
  
	const validate_confirm_password = (value)=>{	
		let err     = '';  
		let confirm_password  = value ?? data.confirm_password
		if(!confirm_password){        
		  err  = 'Confirm password is required';         
		}	 
		else if(document.getElementById('password').value != confirm_password){        
		  err  = 'Password mismatch';         
		}	 
		set_errors({
		  ...errors,
		  confirm_password:err
		});	 
		return err;	
	} 

    
    const validateForm = ()=>{		
      let errors          = {};  
      let isValid         = true; 

      let password = validate_password()
      if( password !==''){
        errors.password  = password;
        isValid = false;
      }

	  let confirm_password = validate_confirm_password()
      if( confirm_password !==''){
        errors.confirm_password  = confirm_password;
        isValid = false;
      }

      set_errors(errors);	
      return isValid;	
    }

    const handleSubmit = async(e)=>{
      e.preventDefault();   

      if(validateForm()){	
        set_disablebutton(true)

        try {
          const res = await Api.login({
            email:data.email, 
            password:data.password
          });
          
          if( res && (res.status === 200) ){
            const resData = res.data;            
            set_disablebutton(false)

          } 
          else {          
            const { status, message, error } = res.data;           
            set_common_error(message)
            set_disablebutton(false)
          }
        } 
        catch (err) {
          set_common_error('error:', err)
          set_disablebutton(false)
        }

      }			
    }	

    return (  
      <>  
      <Meta metaData={metaData} />
      <HelmetProvider>
      <Helmet>	
      </Helmet>				
      </HelmetProvider>	
      
      <main>
        <div className="container">

          <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">

                  <div className="d-flex justify-content-center py-4">
                    <Link to="/login" className="logo d-flex align-items-center w-auto">
                      <img src="/assets/img/logo.png" alt="" />                      
                    </Link>
                  </div>

                  <div className="card mb-3">

                    <div className="card-body">

                      <div className="pt-4 pb-2">
                        <h5 className="card-title text-center pb-0 fs-4">Reset password</h5>
                        <p className="text-center small">Enter your Email & password to login</p>
                      </div>
                      {common_error &&            
                          <div className="alert alert-danger alert-dismissible fade show">
                          {common_error}    
                          <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={()=>{
                            $(".alert").hide()
                          }}>
                          <span aria-hidden="true">&times;</span>
                          </button>        
                          </div> 
                      }          
                      <form className="row g-3 needs-validation" method="post" onSubmit={handleSubmit}>

                        <div className="col-12">
                          <label htmlFor="yourPassword" className="form-label">New password</label>
                          <input 
                          type="password" 
                          className="form-control" 
                          placeholder="" 
                          id="password"
                          name="password" 
                          value={data.password} 
                          onChange={(e)=>{
                            handleChange(e)
                            validate_password(e.target.value)
                          }}
                          autoComplete="off"/>	
                          {errors.password &&
                          <div className="error-msg">{errors.password}</div>    
                          }  
                        </div>

						<div className="col-12">
                          <label className="form-label">Confirm password</label>
                          <input 
                          type="password" 
                          className="form-control" 
                          placeholder="" 
                          id="confirm_password"
                          name="confirm_password" 
                          value={data.confirm_password} 
                          onChange={(e)=>{
                            handleChange(e)
                            validate_confirm_password(e.target.value)
                          }}
                          autoComplete="off"/>	
                          {errors.confirm_password && 
                            <div className="error-msg">{errors.confirm_password}</div>    
                          }  				
                        </div>

                      
                        <div className="col-12">
                          <button className="btn btn-primary w-100" type="submit" disabled={disablebutton}>Submit</button>
                        </div>
                        
                      </form>

                    </div>
                  </div>                  

                </div>
              </div>
            </div>

          </section>

        </div>
      </main>      
      </>    
    ) 
}
export default Reset_password;


import React, { useState, useEffect } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Link } from 'react-router-dom';

import Meta from '../../common/Meta';
import validation from '../../../config/validation';
import './Forgot_password.css';

import Api from '../../../config/Api';
import $ from "jquery"

const Forgot_password = (props)=>{  

    const metaData = {
		meta_title			: 'Forgot password',
		meta_description	: '',
		meta_keywords		: '',
	} 

	const __data = {		
		email: ''
	}
	const __errors = {	
		email: ''
	}

	const [data,set_data]								= useState(__data) 
	const [disablebutton, set_disablebutton] 			= useState(false); 	
	const [success_msg,set_success_msg] 				= useState("")  
	const [common_error,set_common_error] 				= useState("")  
	const [errors,set_errors]     						= useState(__errors)

	useEffect(()=>{
		
	},[])
	
	const handleChange = (e)=>{	
		const field_name  = e.target.name;
		const field_value = e.target.value;
		set_data({...data, [field_name]: field_value})
	}	

	const validate_email = (value)=>{	
		let err      = '';  
		let email    = value ?? data.email
		if(!email){        
		  err  = 'Email is required';         
		}	  
		else if(!validation.validateEmail(email)){       
		  err  = 'Email is not valid!';
		}		
		set_errors({
		  ...errors,
		  email:err
		});	 
		return err;	
	}

	const validateForm = ()=>{		
		let errors          = {};  
		let isValid         = true;   
		
		let email = validate_email()
		if( email !==''){
		  errors.email  = email;
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
			  const res = await Api.forgot_password({
				email:data.email, 				
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
			  set_common_error('error:', err.message ?? '')			  
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
                        <h5 className="card-title text-center pb-0 fs-4">Forgot Password</h5>
                        <p className="text-center small">You forgot your password? Here you can easily retrieve a new password.</p>
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
                          <label className="form-label">Email</label>
                          <input 
                          type="text" 
                          className="form-control" 
                          placeholder="" 
                          id="email"
                          name="email" 
                          value={data.email} 
                          onChange={(e)=>{
                            handleChange(e)
                            validate_email(e.target.value)
                          }}
                          autoComplete="off"/>	
                          {errors.email && 
                          <div className="error-msg">{errors.email}</div>    
                          }  				
                        </div>

                        <div className="col-12">
                          <button className="btn btn-primary w-100" type="submit" disabled={disablebutton}>Request new password</button>
                        </div>
                        <div className="col-12">
                          <p className="small mb-0">Don't have account? <Link to="/login">Login</Link></p>
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
    );
  
}
export default Forgot_password;


import React, { useState, useEffect } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Navigate, Link } from 'react-router-dom';

import Meta from '../../common/Meta';
import validation from '../../../config/validation';
import Api from '../../../config/Api';
import all_function from '../../../config/all_function';
import $ from "jquery"

import Terms_modal from './Terms_modal'; 
import { useSelector, useDispatch } from 'react-redux'
import { termsAction } from '../../../actions/modal'

const Register = ()=>{ 

    const metaData = {
      meta_title			  : 'Register',
      meta_description	: '',
      meta_keywords		  : '',
    } 

    const __data = {		
      name:'',
      email: '',
      password: '',
      confirm_password:''
    }
    const __errors = {	
      name:'',
      email: '',
      password: '',
      confirm_password:'',
      acceptTerms:''
    }

    const [data,set_data]   	  						            = useState(__data) 
    const [disablebutton, set_disablebutton] 			      = useState(false); 
    const [checked,set_checked]   						          = useState(false)  
    const [loggedIn,set_loggedIn] 						          = useState(false)  
    const [common_error,set_common_error] 				      = useState("")  
    const [errors,set_errors]     						          = useState(__errors)   

    const dispatch = useDispatch()  
    const termsModelState = useSelector( (state)=> state.terms_modal ) 
   
    useEffect( ()=>{

      if( localStorage.getItem(process.env.REACT_APP_PREFIX + 'authToken') ){
        set_loggedIn(true)
      }

    },[])
  
    if(loggedIn){			
      return <Navigate  to='/' />			
    }	

    const handleChange = (e)=>{	
      const field_name  = e.target.name;
      const field_value = e.target.value;
      set_data({...data, [field_name]: field_value})
    }	
  
    const handleAcceptTerms =(e)=>{		
      if(checked){
        set_checked(false);
        set_errors({
          ...errors,
          acceptTerms:'You must agree before submitting'
        });	 
      }
      else{
        set_checked(true);
        set_errors({
          ...errors,
          acceptTerms:''
        });	 
      }		
    }

    const validate_name = (value)=>{	
      let err     = '';  
      let name    = value ?? data.name
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

    const validate_password = (value)=>{	
      let err     = '';  
      let password  = value ?? data.password
      if(!password){        
        err  = 'Password is required';         
      }	 
      else if(password && password.length < 6){        
        err  = 'Password must be at least 6 characters';         
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
      
      let name = validate_name()
      if( name !==''){
        errors.name  = name;
        isValid = false;
      }
      
      let email = validate_email()
      if( email !==''){
        errors.email  = email;
        isValid = false;
      }

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

      if( checked ===false ){
        errors.acceptTerms = 'You must agree before submitting';
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
          const res = await Api.register({
            name:data.name, 
            email:data.email, 
            password:data.password
          });
          
          if( res && (res.status === 200) ){
            const resData = res.data;           
           
            localStorage.setItem(process.env.REACT_APP_PREFIX + 'authToken', resData.token);
            localStorage.setItem(process.env.REACT_APP_PREFIX + 'user_id', resData.data.user_id);  
            
            set_loggedIn(true)
            set_disablebutton(false)

          } 
          else {          
            const { status, message, error } = res.data;           
            set_common_error(message)
            set_disablebutton(false)
          }
        } 
        catch (error) {
          set_common_error('Register failed:', error)
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
                    <Link to="/register" className="logo d-flex align-items-center w-auto">
                      <img src="/assets/img/logo.png" alt="" />                      
                    </Link>
                  </div>

                  <div className="card mb-3">

                    <div className="card-body">

                      <div className="pt-4 pb-2">
                        <h5 className="card-title text-center pb-0 fs-4">Create an Account</h5>
                        <p className="text-center small">Enter your personal details to create account</p>
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
                          <label className="form-label">Your Name</label>
                          <input 
                          type="text" 
                          className="form-control" 
                          placeholder="" 
                          id="name"
                          name="name" 
                          value={data.name} 
                          onChange={(e)=>{
                            handleChange(e)
                            validate_name(e.target.value)
                          }}
                          autoComplete="off"/>	
                          {errors.name && 
                          <div className="error-msg">{errors.name}</div>    
                          }  				
                        </div>

                        <div className="col-12">
                          <label className="form-label">Your Email</label>
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
                          <label className="form-label">Password</label>
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
                          <div className="form-check">
                            <input 
                            className="form-check-input"
                            type="checkbox" 
                            name="acceptTerms" 
                            id="acceptTerms"
                            value="1" 
                            checked={checked} 
                            onChange={handleAcceptTerms} />                            
                            <label className="form-check-label">
                              I agree and accept the <Link onClick={()=>dispatch(termsAction(true))}>terms and conditions</Link>
                            </label>
                            {errors.acceptTerms && 
                              <div className="error-msg">{errors.acceptTerms}</div>    
                            }  				
                          </div>
                        </div>
                        <div className="col-12">
                          <button className="btn btn-primary w-100" type="submit"  disabled={disablebutton}>Create Account</button>
                        </div>
                        <div className="col-12">
                          <p className="small mb-0">Already have an account? <Link to="/login">Log in</Link></p>
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
      {termsModelState.show &&
        <Terms_modal />
      }	
      </>    
    ) 
}
export default Register;


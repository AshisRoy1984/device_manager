import React, { useState, useEffect } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Navigate, Link } from 'react-router-dom';

import Meta from '../../common/Meta';
import validation from '../../../config/validation';
import Api from '../../../config/Api';
import all_function from '../../../config/all_function';
import $ from "jquery"
const Login = ()=>{ 

    const metaData = {
      meta_title			  : 'Login',
      meta_description	: '',
      meta_keywords		  : '',
    } 

    const __data = {		
      username: '',
      password: ''     
    }
    const __errors = {	
      username: '',
      password: ''      
    }

    const [data,set_data]   	  						    = useState(__data) 
    const [disablebutton, set_disablebutton] 		= useState(false); 
    const [checked,set_checked]   						  = useState(false)  
    const [loggedIn,set_loggedIn] 						  = useState(false)  
    const [common_error,set_common_error] 		  = useState("")  
    const [errors,set_errors]     						  = useState(__errors)   
   
    useEffect( ()=>{     

      if(localStorage.getItem(process.env.REACT_APP_PREFIX + 'remember_me')){			
        set_checked(true);
        set_data({
          ...data, 
          username:localStorage.getItem(process.env.REACT_APP_PREFIX + 'username') ? localStorage.getItem(process.env.REACT_APP_PREFIX + 'username') : '',
          password:localStorage.getItem(process.env.REACT_APP_PREFIX + 'password') ? localStorage.getItem(process.env.REACT_APP_PREFIX + 'password') : '',
        })						
      } 

      if( localStorage.getItem(process.env.REACT_APP_PREFIX + 'access_token') ){
        set_loggedIn(true)
      }

    },[])

    const handleChange = (e)=>{	
      const field_name  = e.target.name;
      const field_value = e.target.value;
      set_data({...data, [field_name]: field_value})
    }	
  
    const handleRememberMe =(e)=>{		
      if(checked){
        set_checked(false);
      }
      else{
        set_checked(true);
      }		
    }

    const validate_username = (value)=>{	
      let err      = '';  
      let username = value ?? data.username
      if(!username){        
        err  = 'Username is required';         
      }	 
      set_errors({
        ...errors,
        username:err
      });	 
      return err;	
    }

    const validate_password = (value)=>{	
      let err     = '';  
      let password  = value ?? data.password
      if(!password){        
        err  = 'Password is required';         
      }	 
      set_errors({
        ...errors,
        password:err
      });	 
      return err;	
    } 

    
    const validateForm = ()=>{		
      let errors          = {};  
      let isValid         = true;   
      
      let username = validate_username()
      if( username !==''){
        errors.username  = username;
        isValid = false;
      }

      let password = validate_password()
      if( password !==''){
        errors.password  = password;
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
          
          const res = await Api.token({
            username:data.username, 
            password:data.password
          });  
          
          if( res && (res.status === 200) ){

            const resData = res.data; 
            const access_token = resData.access;  
            const refresh_token = resData.refresh;   

            localStorage.setItem(process.env.REACT_APP_PREFIX + 'access_token', access_token);
            localStorage.setItem(process.env.REACT_APP_PREFIX + 'refresh_token', refresh_token); 
            
            const res2 = await Api.me(); 
            const res2Data = res2.data; 

            localStorage.setItem(process.env.REACT_APP_PREFIX + 'user_id', res2Data.user_id);   
            
            if(checked){
              localStorage.setItem(process.env.REACT_APP_PREFIX + 'remember_me','1');
              localStorage.setItem(process.env.REACT_APP_PREFIX + 'username',data.username);
              localStorage.setItem(process.env.REACT_APP_PREFIX + 'password',data.password);
            }
            else{
              localStorage.removeItem(process.env.REACT_APP_PREFIX + 'remember_me');
              localStorage.removeItem(process.env.REACT_APP_PREFIX + 'username');
              localStorage.removeItem(process.env.REACT_APP_PREFIX + 'password');		
            }	

            set_loggedIn(true)
            set_disablebutton(false)

          } 
          else if( res && (res.status === 401) ){
            const resData = res.data; 
            set_common_error(resData.detail ?? '')
            set_disablebutton(false)    
          }
          else{  
           //==
          }

        } 
        catch (err) {
          set_common_error('Login failed:', err)
          set_disablebutton(false)
        }

      }			
    }	

    if(loggedIn){			
      return <Navigate  to='/' />			
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
                        <h5 className="card-title text-center pb-0 fs-4">Login</h5>
                        <p className="text-center small">Enter your Username & password to login</p>
                      </div>
                      {common_error &&            
                          <div className="alert alert-danger alert-dismissible fade show">
                            {common_error}    
                            <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={()=>{
                              set_common_error('')
                            }}>
                            <span aria-hidden="true">&times;</span>
                            </button>        
                          </div> 
                      }          
                      <form className="row g-3 needs-validation" method="post" onSubmit={handleSubmit}>

                        <div className="col-12">
                          <label className="form-label">Username</label>
                          <input 
                          type="text" 
                          className="form-control" 
                          placeholder="" 
                          id="username"
                          name="username" 
                          value={data.username} 
                          onChange={(e)=>{
                            handleChange(e)
                            validate_username(e.target.value)
                          }}
                          autoComplete="off"/>	
                          {errors.username && 
                          <div className="error-msg">{errors.username}</div>    
                          }  				
                        </div>

                        <div className="col-12">
                          <label htmlFor="yourPassword" className="form-label">Password</label>
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
                          <div className='d-flex justify-content-between'>
                          <div className="form-check">
                          <input 
                          className="form-check-input"
                          type="checkbox" 
                          name="rememberMe" 
                          id="rememberMe"
                          value="1" 
                          checked={checked} 
                          onChange={handleRememberMe} />
                          <label className="form-check-label">Remember me</label>
                          </div>
                          <div>
                          <p className="small mb-0"><Link to="/forgot-password">I forgot my password</Link></p>
                          </div>
                          </div>
                        </div>
                        <div className="col-12">
                          <button className="btn btn-primary w-100" type="submit" disabled={disablebutton}>Login</button>
                        </div>

                        {/* 
                        <div className="col-12">
                          <p className="small mb-0">Don't have account? <Link to="/register">Create an account</Link></p>
                        </div> 
                        */}
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
export default Login;


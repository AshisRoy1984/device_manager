import React, { useState, useEffect } from 'react';
import reactDOM from 'react-dom'; 
import { Link, Navigate, useParams } from 'react-router-dom'; 
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Api from '../../../config/Api';
import validation from '../../../config/validation';
import Meta from '../../common/Meta'; 
const User_form = (props)=>{ 

  const { id } = useParams();  

  const metaData = {
    meta_title : id ? 'Edit User' : 'Add User',
    meta_description : '',
    meta_keywords : '',
  }   

  const __data = {  
    company:'',
    username: '',  
    password:'',
    confirm_password:'',
    email:'',
    phone:'',
    role:'',
    status:'',   
  }

  const __errors = {	
    company:'',
    username: '',  
    password:'',
    confirm_password:'',
    email:'',
    phone:'',
    role:'',
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
      const res = await Api.user_row({
        id:id,       
      });
      
      if( res && (res.status === 200) ){				
        let resData = res.data
        set_data({
          ...data,
          company: resData.company,  
          username: resData.username,  
          email: resData.email,  
          phone: resData.phone,  
          role: resData.role,  
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
  const validate_username = (value)=>{	
      let err = '';          
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

  const validate_role = (value)=>{	
      let err = '';          
      let role = value ?? data.role
      if(!role){ 
        err  = 'Role is required';  
      } 
      set_errors({
        ...errors,
        role:err
      });	  
      return err;	
  }

  const validate_password = (value)=>{	
    let err     = '';  
    let password  = value ?? data.password

    if(id && password && password.length < 6){
      err  = 'Password must be at least 6 characters';         
    }
    else if(!id && !password){        
      err  = 'Password is required';         
    }	
    else if(!id && password && password.length < 6){        
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
    let password  = document.getElementById('password').value
    let confirm_password  = value ?? data.confirm_password

    if(id && password && !confirm_password){        
      err  = 'Confirm password is required';         
    }	 
    else if(id && password && password != confirm_password){        
      err  = 'Password mismatch';         
    }	 
    else if(!id && !confirm_password){        
      err  = 'Confirm password is required';         
    }	 
    else if(!id && password != confirm_password){        
      err  = 'Password mismatch';         
    }	 
    set_errors({
      ...errors,
      confirm_password:err
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

    let username = validate_username()
    if( username !=='' ){
      errors.username = username;
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

    let role = validate_role()
    if( role !==''){
      errors.role = role;
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

    set_errors(errors);	
    return isValid        
  }

  const handleSubmit = async(e)=>{
    e.preventDefault();  
    if(validateForm()){	
      set_disablebutton(true)      
      try{

        if(id){

            let obj = {  
              company:data.company,
              username:data.username,
              email:data.email,
              phone:data.phone,
              role:data.role,
              status: (data.status=='') ? 0 : data.status,              
            }
            if( data.password ){
              obj['password'] = data.password 
            }

            const res = await Api.update_user(obj,id);
            
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

            const res = await Api.create_user({ 
              company:data.company,
              username:data.username,
              password:data.password,
              email:data.email,
              phone:data.phone,
              role:data.role,
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

  const roles = ['GlobalSuperuser','CompanySuperuser','NormalUser']

  if( submitted ){
    return <Navigate  to='/users' />			
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
          id ? 'Edit User' : 'Add User'
        }      
        </h1>
        <nav>
        <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/"><i className="bi bi-house-door"></i></Link></li>
            <li className="breadcrumb-item"><Link to="/users">users</Link></li>
            <li className="breadcrumb-item active">
            {
              id ? 'Edit User' : 'Add User'
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
                          <label className="form-label">Username<span className="required">*</span></label>
                          <input type="text" className="form-control" 
                          id="username"
                          name="username" 
                          value={data.username} 
                          onChange={(e)=>{
                            handleChange(e)
                            validate_username(e.target.value)
                          }}    
                          />
                          {errors.username && 
                            <div className="error-msg">{errors.username}</div>    
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
                          <label className="form-label">Role</label>
                          <select className="form-select"
                          id="role" 
                          name="role" 
                          value={data.role}  
                          onChange={(e)=>{
                            handleChange(e)
                            validate_role(e.target.value)
                          }}    
                          >
                          <option value="">-</option>     
                          {
                            roles.map((val,i)=>{
                              return(
                                <option key={i} value={val}>{val}</option>  
                              )
                            })
                          }                          
                          </select>
                          {errors.role && 
                            <div className="error-msg">{errors.role}</div>    
                          }  	
                        </div>  

                        <div className="mb-3">
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

                        <div className="mb-3">
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
export default User_form;


import React, { useState, useEffect } from 'react';

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import { useSelector, useDispatch } from 'react-redux'
import { fetchUser } from '../../../../redux/slice/userReducer'

import Api from '../../../../config/Api';
import validation from '../../../../config/validation';

let Form = (props)=>{

    const __data = {
        username: '',      
		email: '',
        phone: '',			
	}
	const __errors = {
		username: '',      
		email: '',
        phone: '',		
	}    

    const MySwal = withReactContent(Swal)
     	
	const dispatch     = useDispatch()
    const userState    = useSelector( (state)=> state.user )  
    const user         = (userState.data) ? userState.data : {}

    const [data, set_data]  = useState(__data) 
    const [disablebutton, set_disablebutton] = useState(false);   
	const [errors, set_errors] = useState(__errors)  
            
    useEffect(() => {
        //dispatch(fetchUser())   
        set_data({
            ...data,
            username:user.username ?? '',
            email:user.email ?? '',
            phone:user.phone ?? '',
        })     
    },[user]);

    useEffect(() => {
        set_errors(errors)
    }, [errors]);

    const handleChange = (e)=>{	
		const field_name  = e.target.name;
		const field_value = e.target.value;
		set_data({...data, [field_name]: field_value})
	}
   
    const validate_username = (value)=>{	
        let err  = '';          
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
    const validate_phone = (value)=>{	
        let err  = '';          
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
    const validateForm = ()=>{		
		let error     = {};  
        let isValid   = true;   

        let username = validate_username()
        if( username !==''){
            error.username  = username;
            isValid = false;
        }
        
        let email = validate_email()
        if( email !==''){
            error.email  = email;
            isValid = false;
        }

        let phone = validate_phone()
        if( phone !==''){
            error.phone  = phone;
            isValid = false;
        }
        set_errors(error);
        return isValid;	
	}  
    
    const handleSubmit = async(e)=>{
		e.preventDefault();   
		if( validateForm() ){

            set_disablebutton(true)             
            
            const res = await Api.update_profile({
                id: user.id,    
                username: data.username,                   
                email: data.email,
                phone: data.phone,
            });   
            
            if( res && (res.status === 200) ){
                dispatch(fetchUser())                
                set_disablebutton(false)                
                MySwal.fire({icon: 'success', text:'Data updated successfully', confirmButtonColor: '#3085d6'})  
            }
            
		}			
	}

    return(
        <>
        <form name="userProfileForm" id="userProfileForm" method="post" encType="multipart/form-data" onSubmit={handleSubmit}>

            <div className="row mb-3">
                <label htmlFor="fullName" className="col-md-4 col-lg-3 col-form-label">Username</label>
                <div className="col-md-8 col-lg-9">
                <input type="text" className={`form-control ${errors.username ? 'error': ''} `} id="username" name="username" 
                value={data.username}
                onChange={ (e) => {
                    //set_data('username', e.target.value)
                    handleChange(e)
                    validate_username(e.target.value)
                }} 
                />
                {errors.username && 
                    <div className="error-msg">{errors.username}</div>    
                }   
                </div>
            </div>

            <div className="row mb-3">
                <label htmlFor="address" className="col-md-4 col-lg-3 col-form-label">Email</label>
                <div className="col-md-8 col-lg-9">
                <input type="text" className={`form-control ${errors.email ? 'error': ''} `} id="email" name="email"
                value={data.email}
                onChange={ (e) => {
                    //set_data('email', e.target.value)
                    handleChange(e)
                    validate_email(e.target.value)
                }} 
                />
                {errors.email && 
                    <div className="error-msg">{errors.email}</div>    
                }   
                </div>
            </div>

            <div className="row mb-3">
                <label htmlFor="phone_number" className="col-md-4 col-lg-3 col-form-label">Phone</label>
                <div className="col-md-8 col-lg-9">
                <input type="text" className={`form-control ${errors.phone ? 'error': ''} `} id="phone" name="phone" 
                value={data.phone}
                onChange={ (e) => {
                    //set_data('phone', e.target.value)
                    handleChange(e)
                    validate_phone(e.target.value)
                }} 
                />
                {errors.phone && 
                    <div className="error-msg">{errors.phone}</div>    
                }   
                </div>
            </div>  

            <div className="row mb-3">
                <label htmlFor="Linkedin" className="col-md-4 col-lg-3 col-form-label"></label>
                <div className="col-md-8 col-lg-9">
                <button 
                type="submit"                
                className={`btn btn-primary`}
                disabled={disablebutton}
                >Save Changes</button>
                </div>
            </div>						
            </form>
            
        </>
    )
}
export default Form;
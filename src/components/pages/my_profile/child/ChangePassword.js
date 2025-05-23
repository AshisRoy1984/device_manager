import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Api from '../../../../config/Api';
import { useSelector, useDispatch } from 'react-redux'
import { fetchUser } from '../../../../redux/slice/userReducer'

let ChangePassword = (props)=>{
    
    const __data = {
        new_password:"",
        renew_password:"", 		
	}
	const __errors = {
        new_password:"",
        renew_password:"", 		
	}
    
    const dispatch     = useDispatch()
    const userState    = useSelector( (state)=> state.user )  
    const user         = (userState.data) ? userState.data : {};

    const [data,set_data]                               = useState(__data) 
    const [disablebutton, set_disablebutton] 		    = useState(false);   
	const [errors,set_errors]     	                    = useState(__errors) 

    const MySwal = withReactContent(Swal)

	useEffect(() => {        
        dispatch(fetchUser())
	},[]); 
    

    const handleChange = (e)=>{	
		const field_name  = e.target.name;
		const field_value = e.target.value;
		set_data({...data, [field_name]: field_value})
	}


    const validateForm = ()=>{		
		let errors                = {};  
		let isValid               = true;  
		
		if(!data.new_password){
			isValid 		       = false;
			errors.new_password    = 'New Password is required';
		}
        if(!data.renew_password){
			isValid 		       = false;
			errors.renew_password  = 'Re-enter New Password is required';
		}
		if( data.renew_password && data.renew_password!==document.getElementById('new_password').value){ 
            isValid 		       = false;
            errors.renew_password  = 'New Password mismatch';
        }	 
		set_errors(errors);	
		return isValid;		 
	}

    const handleSubmit = async(e)=>{
		e.preventDefault(); 

        if( validateForm() ){
            set_disablebutton(true)  
            const resData = await Api.update_password({                        
                id:user.id, 
                password:data.new_password
            });

            if( resData && (resData.status === 200) ){
                MySwal.fire({
                    icon: 'success', 
                    text:'Password updated successfully', 
                    confirmButtonColor: '#3085d6'
                }) 
                set_disablebutton(false)  
                set_data(__data)
            }
            else{
                set_disablebutton(false)  
            }               
        }

    }

    return(
        <>        
        <form name="cngPassdForm" id="cngPassdForm" method="post" encType="multipart/form-data" onSubmit={handleSubmit}>        

        <div className="row mb-3">
        <label htmlFor="new_password" className="col-md-4 col-lg-3 col-form-label">New Password</label>
        <div className="col-md-8 col-lg-9">
        <input name="new_password" type="password" className={`form-control ${errors.new_password ? 'error': ''} `}  id="new_password" 
        autoComplete='new-password'
        value={data.new_password} 
        onChange={handleChange} />
        {errors.new_password && 
        <div className="error-msg">{errors.new_password}</div>    
        }   
        </div>
        </div>

        <div className="row mb-3">
        <label htmlFor="renew_password" className="col-md-4 col-lg-3 col-form-label">Re-enter New Password</label>
        <div className="col-md-8 col-lg-9">
        <input name="renew_password" type="password" className={`form-control ${errors.renew_password ? 'error': ''} `}  id="renew_password" autoComplete='renew-password' 
        value={data.renew_password} 
        onChange={handleChange} />
        {errors.renew_password && 
        <div className="error-msg">{errors.renew_password}</div>    
        }   
        </div>
        </div>

        <div className="row mb-3">
        <label htmlFor="renewPassword" className="col-md-4 col-lg-3 col-form-label"></label>
        <div className="col-md-8 col-lg-9">
        <button 
        type="submit"         
        className={`btn btn-primary`}
        disabled={disablebutton}
        >Change Password</button>
        </div>
        </div>

        </form>
        </>
    )
}
export default ChangePassword;
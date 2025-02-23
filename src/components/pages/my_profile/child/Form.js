import React, { useState, useEffect } from 'react';

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import { useSelector, useDispatch } from 'react-redux'
import { fetchUser } from '../../../../redux/slice/userReducer'

let Form = (props)=>{

    const __data = {
        profile_image: '',
		fname: '',
        lname: '',		
		phone: '',
        address: '',
        about: '',		
	}
	const __errors = {
		profile_image: '',
		fname: '',
        lname: '',		
		phone: '',
        address: '',
        about: '',		
	}

    const [data, set_data]  = useState(__data) 
    const [disablebutton, set_disablebutton] 	= useState(false);   
	const [errors, set_errors]     				= useState(__errors)  

    const MySwal = withReactContent(Swal)
     	
	const dispatch     = useDispatch()
    const userState    = useSelector( (state)=> state.user )  
    const user         = (userState.data) ? userState.data : {};
            
    useEffect(() => {
        dispatch(fetchUser())   
        set_data({
            ...data,
            profile_image:user.profile_image ?? '',
            fname:user.fname ?? '',
            lname:user.lname ?? '',
            phone:user.phone ?? '',
            address:user.address ?? '',
            about:user.about ?? '',
        })     
    },[]); 
    

    const handleChange = (e)=>{	
		const field_name  = e.target.name;
		const field_value = e.target.value;
		set_data({...data, [field_name]: field_value})
	}

    const upload_file = (e)=>{	
        const promise = new Promise( (resolve,reject)=>{       
            const file = e.target[0]?.files[0]
            if(!file){
                resolve('') 
            } 
            else{
                //===call upload api
                resolve('filename from api') 
            }           
            
        })
        return promise        
	}

    const deleteFile = (fileUrl,id)=>{
        MySwal.fire({
            title: 'Are you sure?',  
            text: 'You want to delete selected item',                 
            showCancelButton: true,                 
            cancelButtonText: 'No',
            cancelButtonColor: '#3085d6',  
            confirmButtonText: 'Yes', 
            confirmButtonColor: '#d33'
        }).then((result) => {            
            if(result.isConfirmed) {
                //===call delete api
                set_data({
                    ...data, 
                    profile_image: ''
                })
                dispatch(fetchUser())  
                MySwal.fire({icon: 'success', text:'item deleted succsessfully', confirmButtonColor: '#3085d6'})       
            }
            else{
                //===
            }                
        })
    }

    const validateForm = ()=>{		
		let errors                = {};  
		let isValid               = true;  

		if(!data.fname){
			isValid 			   = false;
			errors.fname           = 'First Name is required';
		}	
        if(!data.lname){
			isValid 			   = false;
			errors.lname           = 'Last Name is required';
		}		    			
		if(!data.phone){
			isValid 			   = false;
			errors.phone           = 'Phone Number is required';
		}	
		if(!data.address){
			isValid 			   = false;
			errors.address         = 'Address is required';
		}	
		if(!data.about){
			isValid 			   = false;
			errors.about           = 'About Us is required';
		}	        
		set_errors(errors);	
		return isValid;		 
	}

    const handleSubmit = async(e)=>{
		e.preventDefault();   
		if( validateForm() ){

            set_disablebutton(true)
            
            const promise = upload_file(e)                    
            promise.then( async(uploadedFile)=>{                
                if(uploadedFile){
                    set_data({
                        ...data, 
                        ['profile_image']: uploadedFile
                    })
                }                
                const objData = {
                    profile_image: (uploadedFile) ? uploadedFile : data.profile_image,
                    fname: data.fname,
                    lname: data.lname,
                    email: data.email,
                    phone: data.phone,
                    address: data.address,
                    about: data.about,
                }   
                //== call update api            

                dispatch(fetchUser())                
                set_disablebutton(false)                
                MySwal.fire({icon: 'success', text:'Data updated successfully', confirmButtonColor: '#3085d6'}) 
            })
            
		}			
	}

    return(
        <>
        <form name="userProfileForm" id="userProfileForm" method="post" encType="multipart/form-data" onSubmit={handleSubmit}>
            
            <div className="row mb-3">
                <label htmlFor="fullName" className="col-md-4 col-lg-3 col-form-label">
                    Profile Image<br />
                    <small style={{color:'#aaa'}}>(Size : 500X500 pixel)</small>
                </label>
                <div className="col-md-8 col-lg-9">
                {data.profile_image &&                    
                    <div>   
                    <input type='file' style={{display:"none"}} />                  
                    <div className='imagebox'>     
                    <img src={data.profile_image} alt='' height={100} />
                    <i className="bi bi-trash" onClick={ ()=>deleteFile(data.profile_image,data.id) }></i>
                    </div> 
                    </div>
                }
                {!data.profile_image &&
                    <div>
                        <input type='file' />                          
                        <div className="className mt-1" role="progressbar" aria-label="Basic example" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">                        
                        </div>
                    </div>
                }
                </div>
            </div>

            <div className="row mb-3">
                <label htmlFor="fullName" className="col-md-4 col-lg-3 col-form-label">First Name</label>
                <div className="col-md-8 col-lg-9">
                <input type="text" className={`form-control ${errors.fname ? 'error': ''} `} id="fname" name="fname" 
                value={data.fname}
                onChange={handleChange} />
                {errors.fname && 
                    <div className="error-msg">{errors.fname}</div>    
                }   
                </div>
            </div>

            <div className="row mb-3">
                <label htmlFor="fullName" className="col-md-4 col-lg-3 col-form-label">Last Name</label>
                <div className="col-md-8 col-lg-9">
                <input type="text" className={`form-control ${errors.lname ? 'error': ''} `} id="lname" name="lname" 
                value={data.lname}
                onChange={handleChange} />
                {errors.lname && 
                    <div className="error-msg">{errors.lname}</div>    
                }   
                </div>
            </div>

            <div className="row mb-3">
                <label htmlFor="phone_number" className="col-md-4 col-lg-3 col-form-label">Phone</label>
                <div className="col-md-8 col-lg-9">
                <input type="text" className={`form-control ${errors.phone ? 'error': ''} `} id="phone" name="phone" 
                value={data.phone}
                onChange={handleChange} />
                {errors.phone && 
                    <div className="error-msg">{errors.phone}</div>    
                }   
                </div>
            </div>             

            <div className="row mb-3">
                <label htmlFor="address" className="col-md-4 col-lg-3 col-form-label">Address</label>
                <div className="col-md-8 col-lg-9">
                <input type="text" className={`form-control ${errors.address ? 'error': ''} `} id="address" name="address"
                value={data.address}
                onChange={handleChange} />
                {errors.address && 
                    <div className="error-msg">{errors.address}</div>    
                }   
                </div>
            </div>


            <div className="row mb-3">
                <label htmlFor="about_me" className="col-md-4 col-lg-3 col-form-label">About</label>
                <div className="col-md-8 col-lg-9">
                <textarea className={`form-control ${errors.about ? 'error': ''} `} id="about" name="about" style={{height:'100px'}} 
                value={data.about}
                onChange={handleChange} />
                {errors.about && 
                    <div className="error-msg">{errors.about}</div>    
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
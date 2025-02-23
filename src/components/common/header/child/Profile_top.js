import React, {useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';

import Api from '../../../../config/Api';
import dayjs from 'dayjs';
import { useSelector, useDispatch } from 'react-redux'
import { fetchUser, loginSuccess, logoutSuccess } from '../../../../redux/slice/userReducer'

const Profile_top = ()=>{

    const dispatch     = useDispatch()
	const userState    = useSelector( (state)=> state.user )  
	const user         = (userState.data) ? userState.data : {};

	const [loggedIn, set_loggedIn] = useState(true)  

	useEffect(() => {
        dispatch(fetchUser())        
	},[]); 

	console.log(user)

	const call_logout = async ()=>{
		try {
			const resData = await Api.logout({				
				user_id:user.id, 				
			});
			
			if( resData && (resData.status === 200) ){	
				localStorage.removeItem(process.env.REACT_APP_PREFIX + 'access_token');
                localStorage.removeItem(process.env.REACT_APP_PREFIX + 'refresh_token');
                localStorage.removeItem(process.env.REACT_APP_PREFIX + 'user_id');	
				set_loggedIn(false)
			} 
			
		} 
		catch (err) {			
		}
		
	}

	if(!loggedIn){			
		  return <Navigate  to='/login' />			
	}	
	
    return(         
		<>
        <Link className="nav-link nav-profile d-flex align-items-center pe-0" to="#" data-bs-toggle="dropdown">		
		{user.profile_image ? ( 
			<img src={user.profile_image} className="rounded-circle profile-img" alt="" />
		) : (
			<img src="/assets/img/default-profile.png" className="img-circle profile-img rounded-circle" alt="" />
		)}
		<span className="d-none d-md-block dropdown-toggle ps-2 profile-name">{user.username ?? ''}</span>
		</Link>

		<ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
		<li className="dropdown-header">
		<h6 className="profile-name">{user.email ?? ''}</h6>
		<span>{user.role ?? ''}</span>		
		</li>
		<li>
		<hr className="dropdown-divider" />
		</li>

		<li>
		<Link className="dropdown-item d-flex align-items-center" to="/my-profile">
		<i className="bi bi-person"></i>
		<span>My Profile</span>
		</Link>
		</li>
		<li>
		<hr className="dropdown-divider" />
		</li>		
		<li>
		<hr className="dropdown-divider" />
		</li>	

		<li>
		<Link className="dropdown-item d-flex align-items-center" onClick={call_logout}>
		<i className="bi bi-box-arrow-right"></i>
		<span>Sign Out</span>
		</Link>
		</li>
		</ul>
        </>
    )
}
export default Profile_top;
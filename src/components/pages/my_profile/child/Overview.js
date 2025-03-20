import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux'
import { fetchUser } from '../../../../redux/slice/userReducer'

let Overview = (props)=>{

    const dispatch     = useDispatch()
    const userState    = useSelector( (state)=> state.user )  
    const user         = (userState.data) ? userState.data : {};
     	
	useEffect(() => {
        dispatch(fetchUser())        
	},[]);

    return(
        <>
           
            <h5 className="card-title">Profile Details</h5>

            <div className="row">
            <div className="col-lg-3 col-md-4 label ">Company</div>
            <div className="col-lg-9 col-md-8">{user.company ?? ''}</div>
            </div>     

            <div className="row">
            <div className="col-lg-3 col-md-4 label ">Username</div>
            <div className="col-lg-9 col-md-8">{user.username ?? ''}</div>
            </div>            

            <div className="row">
            <div className="col-lg-3 col-md-4 label">Email</div>
            <div className="col-lg-9 col-md-8">{user.email ?? ''}</div>
            </div>

            <div className="row">
            <div className="col-lg-3 col-md-4 label">Phone</div>
            <div className="col-lg-9 col-md-8">{user.phone ?? ''}</div>
            </div>

            <div className="row">
            <div className="col-lg-3 col-md-4 label">Role</div>
            <div className="col-lg-9 col-md-8">{user.role ?? ''}</div>
            </div>
            
        </>
    )
}
export default Overview;
import React, { useEffect } from 'react';
import dayjs from 'dayjs';
import { useSelector, useDispatch } from 'react-redux'
import { fetchUser,loginSuccess,logoutSuccess } from '../../../../redux/slice/userReducer'

const ProfileCard = (props)=>{

    const dispatch     = useDispatch()
	const userState    = useSelector( (state)=> state.user )  
    const user         = (userState.data) ? userState.data : {};
     	
	useEffect(() => {
        dispatch(fetchUser())        
	},[]);  

    return(
        <>
        <div className="card">
        <div className="card-body profile-card pt-4 d-flex flex-column align-items-center">
            
            {user && user.profile_image ? ( 
			    <img src={user.profile_image} className="rounded-circle" alt="" />
            ) : (
                <img src="/assets/img/default-profile.png" className="rounded-circle" alt="" />
            )}

            <h2>{user.fname ?? ''} {user.lname ?? ''}</h2>
            <h3>{user.user_type}</h3>  
            <p>Member since : {dayjs(user.create_date ?? '').format('D MMM, YYYY h:mm A')}</p>  
                    
            {user.social_media &&
                <div className="social-links mt-2">
                    {/* 
                    {social_media.twitter &&
                        <a href={social_media.twitter} target="_blank" rel="noreferrer" className="twitter"><i className="bi bi-twitter"></i></a>
                    }
                    {social_media.facebook &&
                        <a href={social_media.facebook} target="_blank" rel="noreferrer" className="facebook"><i className="bi bi-facebook"></i></a>
                    }
                    {social_media.instagram &&
                        <a href={social_media.instagram} target="_blank" rel="noreferrer" className="instagram"><i className="bi bi-instagram"></i></a>
                    }
                    {social_media.linkedin &&
                        <a href={social_media.linkedin} target="_blank" rel="noreferrer" className="linkedin"><i className="bi bi-linkedin"></i></a>
                    } 
                     */}
                </div>
            }
        </div>
        </div>
        </>
    )
}
export default ProfileCard;
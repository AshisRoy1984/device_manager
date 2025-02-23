import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Meta from '../../common/Meta';

import ProfileCard from './child/ProfileCard';
import Overview from './child/Overview';
import Form from './child/Form';
import ChangePassword from './child/ChangePassword';

const My_profile = (props)=>{ 

  const metaData = {
    meta_title			  : 'My profile',
    meta_description	: '',
    meta_keywords		  : '',
  } 

  return (  
    <>  
    <Meta metaData={metaData} />
    <HelmetProvider>
    <Helmet>		
    </Helmet>				
    </HelmetProvider>

    <div className="pagetitle">
        <h1>My profile</h1>
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/"><i className="bi bi-house-door"></i></Link></li>
            <li className="breadcrumb-item active">My profile</li>
          </ol>
        </nav>
    </div>

    <section className="section profile">
      <div className="row">
      <div className="col-xl-4">
      <ProfileCard admin="" profile_image="" />
      </div>

      <div className="col-xl-8">

        <div className="card">
        <div className="card-body pt-3">			
          <ul className="nav nav-tabs nav-tabs-bordered">
            <li className="nav-item">
            <button className="nav-link active" data-bs-toggle="tab" data-bs-target="#profile-overview">Overview</button>
            </li>
            <li className="nav-item">
            <button className="nav-link" data-bs-toggle="tab" data-bs-target="#profile-edit">Edit Profile</button>
            </li>	
            <li className="nav-item">
            <button className="nav-link" data-bs-toggle="tab" data-bs-target="#profile-change-password">Change Password</button>
            </li>
          </ul>
          <div className="tab-content pt-2">

          <div className="tab-pane fade show active profile-overview" id="profile-overview">
          <Overview admin=""  />
          </div>

          <div className="tab-pane fade profile-edit pt-3" id="profile-edit">					
          <Form  />
          </div>					

          <div className="tab-pane fade pt-3" id="profile-change-password">
          <ChangePassword  />
          </div>

          </div>

        </div>
        </div>

      </div>
      </div>
    </section>
    </>
  );
 
}
export default My_profile;


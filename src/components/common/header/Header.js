import React, {useState,useEffect } from 'react';
import { Link } from 'react-router-dom';

//import SearchBar from './child/SearchBar';
//import Notifications from './child/Notifications';
//import Messages from './child/Messages';

import Profile_top from './child/Profile_top';
import './Header.css';

let Header = (props) =>{
	
	let [is_sidebar,SetSidebar]     = useState(true);
	const [logo,set_logo] 	        = useState("") 

	useEffect(()=>{
		
	},[])  
	
	useEffect(()=> {
		document.body.classList.remove('toggle-sidebar')
	},[])     
    
	const toggleSidebar = (is_sidebar)=> {		
		if(is_sidebar){
			document.body.classList.add('toggle-sidebar')			
			SetSidebar(false);			
		}
		else{
			document.body.classList.remove('toggle-sidebar')			
			SetSidebar(true);			  
		}	
	}

	return (
		<>	
		<header id="header" className="header fixed-top d-flex align-items-center">
		<div className="d-flex align-items-center justify-content-between">
		<Link to="/" className="logo d-flex align-items-center ms-3">
		<img src="/assets/img/logo.png" alt="" style={{maxHeight:"35px"}} />		
		</Link>
		<i className="bi bi-list toggle-sidebar-btn" onClick={()=>toggleSidebar(is_sidebar)}></i>
		</div>        
		
		{/*search-bar
		<SearchBar />
		*/}		

		<nav className="header-nav ms-auto">
		<ul className="d-flex align-items-center">

		{/*
		<li className="nav-item d-block d-lg-none">
		<Link className="nav-link nav-icon search-bar-toggle" to="#">
		<i className="bi bi-search"></i>
		</Link>
		</li>	
		*/}	
        
		{/*notifications
		<Notifications />
        */}
		
        {/*messages
		<Messages />
		*/}	

		<li className="nav-item dropdown pe-3">
		<Profile_top />
		</li>

		</ul>
		</nav>
		</header>
		</>     
    );
}
export default Header;
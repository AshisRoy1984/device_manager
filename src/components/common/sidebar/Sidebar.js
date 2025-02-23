
import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = (props)=>{	
   
	let ccp   	        = window.location.pathname;
	let ccp2     		= ccp.split('/')
	let current_path    = (ccp2[1]) ? ccp2[1] : ''

	const dashboard_menu 		   = [''];  	

	// const portfolio_child_1     = ['industries','add-industry','edit-industry'];  
	// const portfolio_child_2     = ['technologies','add-technology','edit-technology'];  
	// const portfolio_child_3     = ['portfolio','add-portfolio','edit-portfolio'];  
	// const portfolio_menu        = [
	// 								...portfolio_child_1,
	// 								...portfolio_child_2,
	// 								...portfolio_child_3,
	// 							];  

	const users_menu   	        = ['users','add-user','edit-user'];
	const companies_menu   	    = ['companies','add-company','edit-company'];	
	const device_menu   	    = ['device','add-device','edit-device'];
	
	return (
		<>		    	   
		<aside id="sidebar" className="sidebar">
		<ul className="sidebar-nav" id="sidebar-nav">

			<li className="nav-item">
			<Link to="/" className={`nav-link ${dashboard_menu.includes(current_path) ? '' : 'collapsed'}`} >
			<i className="bi bi-grid"></i>
			<span>Dashboard</span>
			</Link>
			</li>
			

			{/* <li className="nav-item">
			<Link to="/" className={`nav-link ${portfolio_menu.includes(current_path) ? '' : 'collapsed'}`} data-bs-target="#product-nav" data-bs-toggle="collapse">
			<i className="bi bi-bag-plus-fill"></i><span>Portfolio</span><i className="bi bi-chevron-down ms-auto"></i>
			</Link>
				<ul id="product-nav" className={`nav-content collapse ${portfolio_menu.includes(current_path) ? 'show' : ''}`} data-bs-parent="#sidebar-nav">				
				<li>
				<Link to="/industries" className={`${portfolio_child_1.includes(current_path) ? 'active' : ''}`}>
				<i className="bi bi-circle"></i><span>Industries</span>
				</Link>
				</li>	
				<li>
				<Link to="/technologies" className={`${portfolio_child_2.includes(current_path) ? 'active' : ''}`}>
				<i className="bi bi-circle"></i><span>Technologies</span>
				</Link>
				</li>	
				<li>
				<Link to="/portfolio" className={`${portfolio_child_3.includes(current_path) ? 'active' : ''}`}>
				<i className="bi bi-circle"></i><span>Portfolio</span>
				</Link>
				</li>			
				</ul>
			</li> */}

			<li className="nav-item">
			<Link to="/companies" className={`nav-link ${companies_menu.includes(current_path) ? '' : 'collapsed'}`}>
			<i className="bi bi-building"></i>
			<span>Companies</span>
			</Link>
			</li>

			<li className="nav-item">
			<Link to="/users" className={`nav-link ${users_menu.includes(current_path) ? '' : 'collapsed'}`}>
			<i className="bi bi-people-fill"></i>
			<span>Users</span>
			</Link>
			</li>			

			<li className="nav-item">
			<Link to="/device" className={`nav-link ${device_menu.includes(current_path) ? '' : 'collapsed'}`}>
			<i className="bi bi-hdd-network-fill"></i>
			<span>Device</span>
			</Link>
			</li>
			
			

		</ul>
		</aside>
	    </>
	);
}
export default Sidebar;
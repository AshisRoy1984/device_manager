
import React, { Component } from "react";
import Parser from 'html-react-parser';
import { Link } from 'react-router-dom';

const Footer = (props)=> {
	return (
		<>
		<footer id="footer" className="footer">
			<div className="copyright">
			© 2025 Device, All Rights Reserved.
			</div>
			{/* <div className="credits">     
			Designed by <a href="https://bootstrapmade.com/">BootstrapMade</a>
			</div> */}
		</footer>
		<Link to="#" className="back-to-top d-flex align-items-center justify-content-center"><i className="bi bi-arrow-up-short"></i></Link>
		</>
	);
}
export default Footer;
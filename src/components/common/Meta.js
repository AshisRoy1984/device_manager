
import React, { Component } from "react";
import { Helmet, HelmetProvider } from 'react-helmet-async';

const Meta = (props)=>{ 
 
    return (
		<>
		<HelmetProvider>
		<Helmet>
		<title>{props.metaData.meta_title}</title>			
		<meta name="description" content={props.metaData.meta_description} />
		<meta name="keywords" content={props.metaData.meta_keywords} />	
		</Helmet>				
		</HelmetProvider>	
		</>     
    );
  
}
export default Meta;
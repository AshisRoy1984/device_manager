import React from 'react';
import Header from '../common/header/Header';
import Sidebar from '../common/sidebar/Sidebar';
import Footer from '../common/footer/Footer';

const Admin_layout = (props)=>{  
  return (  
    <>
    <Header />
    <Sidebar />    
    <main id="main" className="main main-container">
    <props.component />
    </main>
    <Footer />
    </>
  );
 
}
export default Admin_layout;


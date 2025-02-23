import React, { } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation  } from 'react-router-dom';

import public_routes from './routes/public_routes';
import private_routes from './routes/private_routes';
import Admin_layout from './components/layouts/Admin_layout';

import './assets/vendor/bootstrap/css/bootstrap.min.css';
import './assets/vendor/bootstrap-icons/bootstrap-icons.css';
import './assets/vendor/boxicons/css/boxicons.min.css';
import './assets/vendor/quill/quill.snow.css';
import './assets/vendor/quill/quill.bubble.css';
import './assets/vendor/remixicon/remixicon.css';
import './assets/vendor/simple-datatables/style.css';
import './assets/css/style.css';
import './App.css';

const IsLogin = ({ children })=>{
    const location = useLocation();
    if( localStorage.getItem(process.env.REACT_APP_PREFIX + 'access_token') ){
      return children
    }
    else{
      return <Navigate to="/login" replace state={{ path: location.pathname }} />
    }  
    return children
}

function App() {

  const uuid = window.crypto.randomUUID()
  //console.log(uuid)

  return (
    <BrowserRouter
    future={{
      v7_startTransition: true,
      v7_relativeSplatPath: true,
    }}
    > 
        <Routes>
        
          {public_routes.map( (item,i) =>{           
            return <Route 
            key={i} 
            path={item.path} 
            element={<item.component />}
            />           
          })}  
        
          {private_routes.map( (item,i) =>{           
            return <Route 
            key={i} 
            path={item.path} 
            element={
            <IsLogin>   
            <Admin_layout component={item.component} />
            </IsLogin>
            }
            />           
          })}  

        </Routes>
    </BrowserRouter>
    
  );
}
export default App;


import Login from '../components/pages/login/Login';
import Register from '../components/pages/register/Register';
import Forgot_password from '../components/pages/forgot_password/Forgot_password';
import Reset_password from '../components/pages/reset_password/Reset_password';

const routes = [   
  {path: '/login', exact: true, component: Login }, 
  {path: '/register', exact: true, component: Register }, 
  {path: '/forgot-password', exact: true, component: Forgot_password },
  {path: '/reset-password', exact: true, component: Reset_password },   
];

export default routes;
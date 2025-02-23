
import Dashboard from '../components/pages/dashboard/Dashboard';
import My_profile from '../components/pages/my_profile/My_profile';

import User_list from '../components/pages/users/User_list';
import User_form from '../components/pages/users/User_form';

import Company_list from '../components/pages/companies/Company_list';
import Company_form from '../components/pages/companies/Company_form';

import Device_list from '../components/pages/device/Device_list';
import Device_form from '../components/pages/device/Device_form';

import Sensordata_list from '../components/pages/sensordata/Sensordata_list';
import Sensordata_form from '../components/pages/sensordata/Sensordata_form';


const routes = [    

  {path: '/', exact: true, component: Dashboard },   

  //=== profile
  {path: '/my-profile', exact: true, component: My_profile }, 

  //=== users
  {path: '/users', exact: true, component: User_list },   
  {path: '/add-user', exact: true, component: User_form },  
  {path: '/edit-user/:userID', exact: true, component: User_form },  

  //=== companies
  {path: '/companies', exact: true, component: Company_list },   
  {path: '/add-company', exact: true, component: Company_form },  
  {path: '/edit-company/:companyID', exact: true, component: Company_form }, 
  
  //=== device
  {path: '/device', exact: true, component: Device_list },   
  {path: '/add-device', exact: true, component: Device_form },  
  {path: '/edit-device/:DeviceIntID', exact: true, component: Device_form },  

  //=== device Sensor Data
  {path: '/sensor-data/:DeviceIntID', exact: true, component: Sensordata_list }, 
  {path: '/add-sensor-data/:DeviceIntID', exact: true, component: Sensordata_form },  
  {path: '/edit-sensor-data/:sensorID', exact: true, component: Sensordata_form },  
  
];

export default routes;
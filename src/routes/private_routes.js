
import Dashboard from '../components/pages/dashboard/Dashboard';
import My_profile from '../components/pages/my_profile/My_profile';

import User_list from '../components/pages/users/User_list';
import User_form from '../components/pages/users/User_form';

import Permission_form from '../components/pages/permission/Permission_form';

import Company_list from '../components/pages/companies/Company_list';
import Company_form from '../components/pages/companies/Company_form';

import Company_devices_list from '../components/pages/company_devices/Company_devices_list';
import Company_devices_form from '../components/pages/company_devices/Company_devices_form';

import Device_list from '../components/pages/device/Device_list';
import Device_form from '../components/pages/device/Device_form';

import Camsense_devicedata_list from '../components/pages/devicedata/Camsense_devicedata_list';
import Camsense_devicedata_form from '../components/pages/devicedata/Camsense_devicedata_form';


const routes = [    

  {path: '/', exact: true, component: Dashboard },   

  //=== profile
  {path: '/my-profile', exact: true, component: My_profile }, 

  //=== companies
  {path: '/companies', exact: true, component: Company_list },   
  {path: '/add-company', exact: true, component: Company_form },  
  {path: '/edit-company/:id', exact: true, component: Company_form }, 

  {path: '/company-devices/:company', exact: true, component: Company_devices_list },   
  {path: '/add-company-devices/:company', exact: true, component: Company_devices_form },  
  {path: '/edit-company-devices/:company/:id', exact: true, component: Company_devices_form },

  //=== users
  {path: '/users', exact: true, component: User_list },   
  {path: '/add-user', exact: true, component: User_form },  
  {path: '/edit-user/:id', exact: true, component: User_form },  

  //=== permission
  {path: '/permission/:user', exact: true, component: Permission_form }, 
  
  //=== device
  {path: '/devices', exact: true, component: Device_list },   
  {path: '/add-device', exact: true, component: Device_form },  
  {path: '/edit-device/:id', exact: true, component: Device_form },  

  //=== device data
  // {path: '/device-data/:device', exact: true, component: Devicedata_list }, 
  // {path: '/add-device-data/:device', exact: true, component: Devicedata_form },  
  // {path: '/edit-device-data/:device/:id', exact: true, component: Devicedata_form },  

  {path: '/camsense-device-data/:device', exact: true, component: Camsense_devicedata_list }, 
  {path: '/add-camsense-device-data/:device', exact: true, component: Camsense_devicedata_form },  
  {path: '/edit-camsense-device-data/:device/:id', exact: true, component: Camsense_devicedata_form }, 
  
];

export default routes;
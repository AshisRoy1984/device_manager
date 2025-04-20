import React, { useState, useEffect } from 'react';

import Dashboardglobal from './Dashboardglobal';
import Dashboardcompany from './Dashboardcompany';

const MainComponent = () => {
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    // Get the user role from localStorage (if it exists)
    const role = localStorage.getItem(process.env.REACT_APP_PREFIX + 'user_role');
    setUserRole(role);
  }, []); // Runs only once when the component mounts

  return (
    <div>
      {/* Conditionally render components based on the user role */}
      {userRole === 'GlobalSuperuser' ? (
        <Dashboardglobal />
      ) : userRole === 'CompanySuperuser' ? (
        <Dashboardcompany />
      ) : userRole === 'CompanyNormaluser' ? (
        <Dashboardcompany />
      ) : (
        <div>Loading...</div> // Show loading or fallback UI if role is not set
      )}
    </div>
  );
};

export default MainComponent;

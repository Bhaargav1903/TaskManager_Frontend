// import React, { useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import UserContext from '../context/UserContext';

// const Logout = () => {
//   const { logout } = useContext(UserContext);
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout(); // Clear user data
//     navigate('/login'); // Redirect to login page
//   };

//   return (
//     <button
//       onClick={handleLogout}
//       className="text-white hover:text-secondary px-2 py-1 lg:p-0"
//     >
//       Logout
//     </button>
//   );
// };

// export default Logout;


import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../context/UserContext';

const Logout = () => {
  const { setUser } = useUserContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user session
    setUser(null);
    
    // Redirect to login page
    navigate('/login');
    // Optionally clear token or other localStorage/sessionStorage items
    localStorage.removeItem('token');
    localStorage.removeItem('email');
  };

  return (
    <button
      onClick={handleLogout}
      className="text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
    >
      Logout
    </button>
  );
};

export default Logout;

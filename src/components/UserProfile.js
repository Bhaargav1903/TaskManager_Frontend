// import React from 'react';

// const UserProfile = ({ user }) => (
//   <div className="bg-white p-6 rounded-lg shadow-lg">
//     <h3 className="text-xl font-semibold text-primary">{user.name}</h3>
//     <p className="text-gray-600">{user.email}</p>
//   </div>
// );

// export default UserProfile;


// import React from 'react';

// const UserProfile = ({ user, onDelete }) => (
//   <div className="bg-white p-6 rounded-lg shadow-lg">
//     <h3 className="text-xl font-semibold text-primary">{user.name}</h3>
//     <p className="text-gray-600">{user.email}</p>
//     <p>Admin: {user.admin ? "Yes" : "No"}</p>
//     <button
//       onClick={() => onDelete(user.id)} // Call onDelete with user ID
//       className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 focus:outline-none"
//     >
//       Delete User
//     </button>
//   </div>
// );

// export default UserProfile;

import React from 'react';


const UserProfile = ({ user, isCurrentUser, onDelete,isCurrentUserAdmin }) => (
  <div
    className={`bg-white p-6 rounded-lg shadow-lg ${
      isCurrentUser ? 'border-4 border-primary' : ''
    }`}
  >
    <h3 className="text-xl font-semibold text-primary">
      {user.name} {isCurrentUser && <span className="text-sm text-green-500">(You)</span>}
    </h3>
    {/* {console.log(isCurrentUser)} */}
    <p className="text-gray-600">{user.email}</p>
    <p>Admin: {user.admin ? 'Yes' : 'No'}</p>
    {isCurrentUserAdmin && !user.admin && ( // Disable delete for the current user
      <button
        onClick={() => onDelete(user.id)} // Call onDelete with user ID
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 focus:outline-none"
      >
        Delete User
      </button>
    )}
  </div>
);

export default UserProfile;

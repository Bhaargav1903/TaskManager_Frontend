
import React from 'react';

const UserProfile = ({ user, isCurrentUser, onDelete }) => (
  <div
    className={`bg-white p-6 rounded-lg shadow-lg ${
      isCurrentUser ? 'border-4 border-primary' : ''
    }`}
  >
    <h3 className="text-xl font-semibold text-primary">
      {user.name} {isCurrentUser && <span className="text-sm text-green-500">(You)</span>}
    </h3>
    <p className="text-gray-600">{user.email}</p>
    <p>Admin: {user.admin ? 'Yes' : 'No'}</p>
    
  </div>
);

export default UserProfile;

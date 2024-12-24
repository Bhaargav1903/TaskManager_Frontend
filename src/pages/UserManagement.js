

// import React from 'react';
// import UserProfile from '../components/UserProfile';
// import { useQuery, useMutation } from '@apollo/client';
// import { GET_USERS_QUERY, DELETE_USER_MUTATION } from '../graphql/queries';
// import { useUserContext } from '../context/UserContext';
// import toast from 'react-hot-toast';

// const UserManagement = () => {
//   const { data, loading, error } = useQuery(GET_USERS_QUERY);
//   const [deleteUser] = useMutation(DELETE_USER_MUTATION, {
//     refetchQueries: [{ query: GET_USERS_QUERY }],
//   });

//   const { user } = useUserContext(); // Get the current logged-in user

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error.message}</p>;

//   const handleDeleteUser = (userId) => {
//     if (user.role !== 'admin') {
//       toast.error('Only admins can delete users.');
//       return;
//     }

//     deleteUser({ variables: { id: userId } })
//       .then(() => toast.success('User deleted successfully!'))
//       .catch((err) => toast.error(`Error: ${err.message}`));
//   };

//   return (
//     <div className="p-6 space-y-8 max-w-7xl mx-auto">
//       <h1 className="text-3xl font-semibold text-primary">User Management</h1>
//       <h2 className="text-2xl font-semibold text-secondary">Existing Users</h2>
//       <div className="mt-4 space-y-6">
//         {data.getUsers.map((user) => (
//           <UserProfile
//             key={user.id}
//             user={user}
//             onDelete={handleDeleteUser} // Pass the delete handler
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default UserManagement;



import React, { useEffect } from 'react';
import UserProfile from '../components/UserProfile';
import { useQuery, useMutation } from '@apollo/client';
import { GET_USERS_QUERY, DELETE_USER_MUTATION } from '../graphql/queries';
//import { useUserContext } from '../context/UserContext'; // Assuming context provides currentUser
import { toast } from 'react-toastify';
const UserManagement = () => {
  const { data, loading, error, refetch } = useQuery(GET_USERS_QUERY);
  
  const [deleteUser] = useMutation(DELETE_USER_MUTATION, {
    onCompleted: () => refetch(),
  });
  //const { user: currentUser } = useUserContext(); // Fetch the logged-in user from context
  
  const isCurrentUserAdmin = data.getUsers.filter((ele)=>{
    if (ele.email === localStorage.getItem('email')){
      return true;
    }else {
      return false;
    }
  })[0].admin;
  const handleDeleteUser = (id, isAdmin) => {
    if (!isCurrentUserAdmin) {
      toast.warn("Only admin users can delete accounts.");
      return;
    }

    if (window.confirm("Are you sure you want to delete this user?")) {
      try{
        deleteUser({ variables: { id } })
        toast.success('User deleted successfully')
      }
      catch(err){
        console.error("Error deleting user:", err.message)
      };
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-semibold text-primary">User Management</h1>
      <h2 className="text-2xl font-semibold text-secondary">Existing Users</h2>
      <div className="mt-4 space-y-6">
        {data.getUsers.map((user) => (
          <UserProfile
            key={user.id}
            user={user}
            isCurrentUser={localStorage.getItem("email") === user.email} // Compare current user
            onDelete={(id) => handleDeleteUser(id, isCurrentUserAdmin)} // Admin check
            isCurrentUserAdmin = {isCurrentUserAdmin}
          />
        ))}
      </div>
    </div>
  );
};

export default UserManagement;


// // src/pages/Signup.js
// import React, { useState } from 'react';
// import { useMutation } from '@apollo/client';
// import { SIGNUP_MUTATION } from '../graphql/queries';

// const Signup = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//   });

//   const [signUp, { loading, error, data }] = useMutation(SIGNUP_MUTATION);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleFormSubmit = (e) => {
//     e.preventDefault();

//     signUp({
//       variables: {
//         name: formData.name,
//         email: formData.email,
//         password: formData.password,
//       },
//     })
//       .then((res) => {
//         console.log('Signup successful:', res.data.SignUp);
//         alert('Signup successful! You can now log in.');
//         setFormData({ name: '', email: '', password: '' });
//       })
//       .catch((err) => console.error('Signup error:', err.message));
//   };

//   return (
//     <div className="p-6 space-y-8 max-w-md mx-auto">
//       <h1 className="text-3xl font-semibold text-primary text-center">Sign Up</h1>
//       <form onSubmit={handleFormSubmit} className="space-y-6">
//         <div>
//           <label htmlFor="name" className="block text-sm font-medium text-gray-700">
//             Name
//           </label>
//           <input
//             type="text"
//             name="name"
//             id="name"
//             value={formData.name}
//             onChange={handleInputChange}
//             required
//             className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
//             placeholder="Enter your name"
//           />
//         </div>
//         <div>
//           <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//             Email
//           </label>
//           <input
//             type="email"
//             name="email"
//             id="email"
//             value={formData.email}
//             onChange={handleInputChange}
//             required
//             className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
//             placeholder="Enter your email"
//           />
//         </div>
//         <div>
//           <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//             Password
//           </label>
//           <input
//             type="password"
//             name="password"
//             id="password"
//             value={formData.password}
//             onChange={handleInputChange}
//             required
//             className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
//             placeholder="Enter your password"
//           />
//         </div>
//         <button
//           type="submit"
//           className={`w-full py-2 px-4 text-white font-semibold rounded-md ${
//             loading ? 'bg-gray-400' : 'bg-primary hover:bg-primary-dark'
//           }`}
//           disabled={loading}
//         >
//           {loading ? 'Signing Up...' : 'Sign Up'}
//         </button>
//         {error && <p className="text-red-600 mt-4">Error: {error.message}</p>}
//         {data && <p className="text-green-600 mt-4">Signup successful!</p>}
//       </form>
//     </div>
//   );
// };

// export default Signup;


import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { SIGNUP_MUTATION } from '../graphql/queries';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [signUp, { loading, error, data }] = useMutation(SIGNUP_MUTATION);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    signUp({
      variables: {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      },
    })
      .then((res) => {
        console.log('Signup successful:', res.data.SignUp);
        toast.success('Signup successful! You can now log in.');
        setFormData({ name: '', email: '', password: '' });
      })
      .catch((err) => console.error('Signup error:', err.message));
  };

  return (
    <div className="p-6 space-y-8 max-w-md mx-auto">
      <h1 className="text-3xl font-semibold text-primary text-center">Sign Up</h1>
      <form onSubmit={handleFormSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
            placeholder="Enter your name"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
            placeholder="Enter your email"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
            placeholder="Enter your password"
          />
        </div>
        <button
          type="submit"
          className={`w-full py-2 px-4 text-white font-semibold rounded-md ${
            loading ? 'bg-gray-400' : 'bg-primary hover:bg-primary-dark'
          }`}
          disabled={loading}
        >
          {loading ? 'Signing Up...' : 'Sign Up'}
        </button>
        {error && <p className="text-red-600 mt-4">Error: {error.message}</p>}
        {data && <p className="text-green-600 mt-4">Signup successful!</p>}
      </form>

      {/* Link to login page */}
      <p className="text-center text-sm">
        Already have an account?{' '}
        <Link to="/login" className="text-primary hover:underline">
          Log in here
        </Link>
      </p>
    </div>
  );
};

export default Signup;

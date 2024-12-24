
// import React, { useState, useEffect, useContext } from 'react';
// import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
// import { ApolloProvider } from '@apollo/client';
// import client from './graphql/client';
// import UserContext, { UserProvider } from './context/UserContext';
// import toast, { Toaster } from 'react-hot-toast';

// import Home from './pages/Home';
// import TaskManagement from './pages/TaskManagement';
// import UserManagement from './pages/UserManagement';
// import SignUp from './pages/SignUp';
// import Login from './pages/Login';
// import Logout from './components/Logout';

// import { generateToken, messaging } from './notifications/firebase';
// import { onMessage } from 'firebase/messaging';

// const Header = () => {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const { user } = useContext(UserContext);

//   const toggleMenu = () => {
//     setMenuOpen(!menuOpen);
//   };

//   return (
//     <header className="bg-primary text-white shadow-md">
//       <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
//         <h1 className="text-3xl font-bold" style={{ color: '#ede8f5' }}>
//           TaskMaster
//         </h1>
//         <div className="flex items-center space-x-4">
//           <div className="block lg:hidden">
//             <button
//               onClick={toggleMenu}
//               className="text-white focus:outline-none"
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-6 w-6"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
//                 />
//               </svg>
//             </button>
//           </div>
//         </div>
//         <nav
//           className={`lg:flex lg:space-x-6 ${
//             menuOpen ? "block" : "hidden"
//           } absolute lg:static top-16 right-6 bg-primary lg:bg-transparent p-4 lg:p-0 rounded-md lg:rounded-none shadow-lg lg:shadow-none`}
//         >
//           {user ? (
//             <>
//               <Link
//                 to="/"
//                 className="block lg:inline-block text-white hover:text-secondary px-2 py-1 lg:p-0"
//                 onClick={() => setMenuOpen(false)}
//               >
//                 Home
//               </Link>
//               <Link
//                 to="/tasks"
//                 className="block lg:inline-block text-white hover:text-secondary px-2 py-1 lg:p-0"
//                 onClick={() => setMenuOpen(false)}
//               >
//                 Tasks
//               </Link>
//               <Link
//                 to="/users"
//                 className="block lg:inline-block text-white hover:text-secondary px-2 py-1 lg:p-0"
//                 onClick={() => setMenuOpen(false)}
//               >
//                 Users
//               </Link>
//               <Logout />
//             </>
//           ) : (
//             <>
//               <Link
//                 to="/login"
//                 className="block lg:inline-block text-white hover:text-secondary px-2 py-1 lg:p-0"
//                 onClick={() => setMenuOpen(false)}
//               >
//                 Login
//               </Link>
//               <Link
//                 to="/signup"
//                 className="block lg:inline-block text-white hover:text-secondary px-2 py-1 lg:p-0"
//                 onClick={() => setMenuOpen(false)}
//               >
//                 Sign Up
//               </Link>
//             </>
//           )}
//         </nav>
//       </div>
//     </header>
//   );
// };

// const PrivateRoute = ({ children }) => {
//   const { user } = useContext(UserContext);
//   return user ? children : <Navigate to="/login" />;
// };

// function App() {
//   useEffect(() => {
//     generateToken();
//     onMessage(messaging, (payload) => {
//       console.log(payload);
//       toast(payload.notification.body);
//     });
//   }, []);

//   return (
//     <ApolloProvider client={client}>
//       <Toaster position="top-right" />
//       <UserProvider>
//         <Router>
//           <Header />
//           <div className="container mx-auto p-6">
//             <Routes>
//               <Route path="/signup" element={<SignUp />} />
//               <Route path="/login" element={<Login />} />
//               <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
//               <Route path="/tasks" element={<PrivateRoute><TaskManagement /></PrivateRoute>} />
//               <Route path="/users" element={<PrivateRoute><UserManagement /></PrivateRoute>} />
//             </Routes>
//           </div>
//         </Router>
//       </UserProvider>
//     </ApolloProvider>
//   );
// }

// export default App;
import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link,Outlet } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import client from './graphql/client';
import { UserProvider, useUserContext } from './context/UserContext';
import toast, { Toaster } from 'react-hot-toast';

import Home from './pages/Home';
import TaskManagement from './pages/TaskManagement';
import UserManagement from './pages/UserManagement';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Logout from './components/Logout';

import { generateToken, messaging } from './notifications/firebase';
import { onMessage } from 'firebase/messaging';
import { ToastContainer } from 'react-toastify';

// Header component
const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useUserContext();  // Use custom hook to get user context

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="bg-primary text-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-3xl font-bold" style={{ color: '#ede8f5' }}>
          TaskMaster
        </h1>
        <div className="flex items-center space-x-4">
          <div className="block lg:hidden">
            <button onClick={toggleMenu} className="text-white focus:outline-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
              </svg>
            </button>
          </div>
        </div>
        <nav className={`lg:flex lg:space-x-6 ${menuOpen ? "block" : "hidden"} absolute lg:static top-16 right-6 bg-primary lg:bg-transparent p-4 lg:p-0 rounded-md lg:rounded-none shadow-lg lg:shadow-none`}>
          {user ? (
            <>
              <Link to="/" className="block lg:inline-block text-white hover:text-secondary px-2 py-1 lg:p-0" onClick={() => setMenuOpen(false)}>
                Home
              </Link>
              <Link to="/tasks" className="block lg:inline-block text-white hover:text-secondary px-2 py-1 lg:p-0" onClick={() => setMenuOpen(false)}>
                Tasks
              </Link>
              <Link to="/users" className="block lg:inline-block text-white hover:text-secondary px-2 py-1 lg:p-0" onClick={() => setMenuOpen(false)}>
                Users
              </Link>
              <Logout />
            </>
          ) : (
            <>
              <Link to="/login" className="block lg:inline-block text-white hover:text-secondary px-2 py-1 lg:p-0" onClick={() => setMenuOpen(false)}>
                Login
              </Link>
              <Link to="/signup" className="block lg:inline-block text-white hover:text-secondary px-2 py-1 lg:p-0" onClick={() => setMenuOpen(false)}>
                Sign Up
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

// PrivateRoute component
// const PrivateRoute = ({ children }) => {
//   const { user } = useUserContext();
//   return user ? children : <Navigate to="/login" />;
// };

const PrivateRoute=()=>{
  const auth=localStorage.getItem('token'); //get the user data
 return auth?<Outlet/>:<Navigate to="/signup" />;//if the user is not logged in then redirect to signup page
}

// App component
function App() {
  useEffect(() => {
    generateToken();
    onMessage(messaging, (payload) => {
      console.log(payload);
      toast(payload.notification.body);
    });
  }, []);

  return (
    <ApolloProvider client={client}>
      <Toaster position="top-right" />
      <UserProvider>
        <Router>
          <Header />
          <div className="container mx-auto p-6">
            <Routes>
            <Route element={<PrivateRoute/>}>
                 <Route path="/" element={<Home/>} />
                 <Route path="/tasks" element={<TaskManagement />} />
                 <Route path="/users" element={<UserManagement />} />
                 <Route path="/logout" element={<Logout />} />
            </Route>
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </div>
        </Router>
        <ToastContainer/>
      </UserProvider>
    </ApolloProvider>
  );
}

export default App;

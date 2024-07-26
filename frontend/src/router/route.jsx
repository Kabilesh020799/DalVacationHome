import React, { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import routes from './routesInfo';
import NavBar from '../containers/navbar/navbar';
import { signOut } from 'aws-amplify/auth';

const MainRoute = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignOut = async () => {
    try {
      await signOut();
      localStorage.clear();
      navigate('/login');
      setIsLoggedIn(false);
    } catch (error) {
      console.log('Error signing out: ', error);
    }
  };

  useEffect(() => {
    const checkUser = async () => {
      const role = localStorage.getItem('userType');
      const email = localStorage.getItem('email');
      if (email) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      if(role) {
        setUserRole(role);
      }
    };
    if(!localStorage.getItem("userType")) {
      localStorage.setItem('userType', "guest");
    }
    checkUser();
  }, [location]);

  return (
    <>
      {
        !['/login', '/signup', '/securityanswers'].includes(location.pathname) ? <NavBar isLoggedIn={isLoggedIn} handleSignOut={handleSignOut} /> : null
      }
      <Routes>
        {
          routes?.map((route) => (
            <Route
              key={route?.id}
              path={route?.route}
              element={
                userRole ? (
                  <ProtectedRoute roles={route?.roles} userRole={userRole}>
                    {route?.component}
                  </ProtectedRoute>
                ) : null
              }
            />
          ))
        }
        <Route
          path='*'
          element={<Navigate to="/home" />}
        />
      </Routes>
    </>
  );
};

const ProtectedRoute = ({ roles, userRole, children }) => {
  if (!roles || roles.includes(userRole)) {
    return children;
  }
  return <Navigate to="/not-authorized" />;
};

export default MainRoute;

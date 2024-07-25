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
      if (role) {
        setUserRole(role);
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    };
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
                <ProtectedRoute roles={route?.roles} userRole={userRole}>
                  {route?.component}
                </ProtectedRoute>
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

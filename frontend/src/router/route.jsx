import React, { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import routes from './routesInfo';
import NavBar from '../containers/navbar/navbar';
import { getCurrentUser, signOut } from 'aws-amplify/auth';

const MainRoute = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

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
    const checkUser = async function currentAuthenticatedUser() {
    try {
      const { username, userId, signInDetails } = await getCurrentUser();
      console.log(`The username: ${username}`);
      console.log(`The userId: ${userId}`);
      console.log(`The signInDetails: ${signInDetails}`);
      setIsLoggedIn(true);
      } catch {
        setIsLoggedIn(false);
      }
    };
    checkUser();
  }, []);

  return (
      <>
        <NavBar isLoggedIn={isLoggedIn} handleSignOut={handleSignOut} />
        <Routes>
          {
            routes?.map((route) => (
              <Route
                key={route?.id}
                path={route?.route}
                element={route?.component}
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

export default MainRoute;
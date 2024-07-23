import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';

export default function NavBar({ isLoggedIn, handleSignOut }) {
  const navigate = useNavigate();
  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ color: 'white', mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'white' }}>
            DalVacation Home
          </Typography>
          
          {isLoggedIn ? (
            <>
              <Typography variant="body1" onClick={() => navigate('/my-bookings')} sx={{ marginLeft: '20px', cursor: 'pointer' }}>
                My Bookings
              </Typography>
              <Button color="inherit" sx={{ color: 'white' }} onClick={handleSignOut}>SignOut</Button>
            </>
          ) : (
            <>
              <Typography variant="body1" onClick={() => navigate('/login')} sx={{ marginLeft: '20px', cursor: 'pointer' }}>
                Login
              </Typography>
              <Typography variant="body1" onClick={() => navigate('/signup')} sx={{ marginLeft: '20px', cursor: 'pointer' }}>
                Sign Up
              </Typography>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

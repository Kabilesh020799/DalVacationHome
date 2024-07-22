import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

export default function NavBar({ isLoggedIn, handleSignOut }) {
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
            <Button color="inherit" sx={{ color: 'white' }} onClick={handleSignOut}>SignOut</Button>
          ) : (
            <>
              <Button color="inherit" sx={{ color: 'white' }} href="/login">Login</Button>
              <Button color="inherit" sx={{ color: 'white' }} href="/signup">SignUp</Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

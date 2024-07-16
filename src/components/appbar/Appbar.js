import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Appbar({ isAdminLoggedIn }) {
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const handleReturn = () => {
    navigate('/student-list');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h6">Graduate Tracking</Typography>
        </Box>
        {isAdminLoggedIn && location.pathname === '/student-list' && (
          <>
            <Button color="inherit" onClick={() => navigate('/notification')}>
              Add Notification
            </Button>
            <Button color="inherit" onClick={() => navigate('/notification-list')}>
              List Notifications
            </Button>
          </>
        )}
        {location.pathname === '/notification-list' && (
          <Button color="inherit" onClick={handleReturn}>
            Return 
          </Button>
        )}
        {location.pathname === '/notification' && (
          <Button color="inherit" onClick={handleReturn}>
            Return 
          </Button>
        )}
        {isHomePage ? (
          <>
            <Button color="inherit" onClick={() => navigate('/login-admin')}>
              Login Admin
            </Button>
            <Button color="inherit" onClick={() => navigate('/login-student')}>
              Login Student
            </Button>
            <Button color="inherit" onClick={() => navigate('/student-register')}>
              Student Register
            </Button>
          </>
        ) : (
          <Button color="inherit" onClick={() => navigate('/')}>
            Home Page
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}

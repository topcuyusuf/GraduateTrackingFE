import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

export default function Appbar() {
  const navigate = useNavigate();

  return (
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" onClick={() => navigate('/login-admin')}>
          Login Admin
        </Button>
        <Box sx={{ flexGrow: 1 }} />
        <Typography variant="h6">Graduate Tracking</Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Button color="inherit" onClick={() => navigate('/login-student')}>
          Login Student
        </Button>
        <Button color="inherit" onClick={() => navigate('/student-register')}>
          Student Register
        </Button>
        <Button color="inherit" onClick={() => navigate('/notification')}>
          Add Notification
        </Button>
      </Toolbar>
    </AppBar>
  );
}

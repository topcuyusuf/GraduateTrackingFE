import React, { useState } from 'react';
import { Container, Paper, Box, TextField, Button, FormControlLabel, Switch, Snackbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Notification() {
  const navigate = useNavigate();
  const paperStyle = { padding: '30px', width: 400, margin: '20px auto' };

  const [notificationData, setNotificationData] = useState({
    header: '',
    body: '',
    active: true
  });

  const [openSnackbar, setOpenSnackbar] = useState(false); // State to control Snackbar visibility

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNotificationData({ ...notificationData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/notification/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(notificationData),
      });

      if (response.ok) {
        console.log("New notification created");
        setOpenSnackbar(true); // Open Snackbar on successful submit
        navigate('/notification');
      } else {
        console.error("Failed to create notification");
        alert("An error occurred while creating the notification.");
      }
    } catch (error) {
      console.error("Error creating notification:", error);
      alert("An error occurred while creating the notification.");
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container>
      <Paper elevation={3} style={paperStyle}>
        <h1 style={{ color: 'blue', marginBottom: '20px' }}>Notification Registration</h1>
        <Box
          component="form"
          sx={{
            display: 'grid',
            gap: '20px',
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="header"
            label="Header"
            variant="outlined"
            fullWidth
            value={notificationData.header}
            onChange={handleChange}
            name="header"
          />
          <TextField
            id="body"
            label="Body"
            variant="outlined"
            multiline
            rows={4}
            fullWidth
            value={notificationData.body}
            onChange={handleChange}
            name="body"
          />
          <FormControlLabel
            control={
              <Switch
                checked={notificationData.active}
                onChange={handleChange}
                name="active"
                color="primary"
              />
            }
            label="Active"
          />
          <Button variant="contained" onClick={handleClick} fullWidth>
            Submit
          </Button>
        </Box>
      </Paper>

      {/* Snackbar for notification */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000} // Adjust duration as needed
        onClose={handleCloseSnackbar}
        message="Notification created successfully!"
      />
    </Container>
  );
}

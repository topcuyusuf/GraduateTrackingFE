import React, { useState } from 'react';
import { Container, Paper, Box, TextField, Button, FormControlLabel, Switch } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Notification() {
  const navigate = useNavigate();
  const paperStyle = { padding: '50px 30px', width: 600, margin: '20px auto' };

  const [notificationData, setNotificationData] = useState({
    header: '',
    body: '',
    active: true
  });

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

  return (
    <Container>
      <Paper elevation={3} style={paperStyle}>
        <h1 style={{ color: 'blue' }}>Notification Registration</h1>
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 2 },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="header"
            label="Header"
            variant="outlined"
            value={notificationData.header}
            onChange={handleChange}
            name="header"
          />
          <TextField
            id="body"
            label="Body"
            variant="outlined"
            value={notificationData.body}
            onChange={handleChange}
            name="body"
            multiline
            rows={4}
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
          <Button variant="contained" onClick={handleClick}>
            Submit
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

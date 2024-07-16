import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Box, Typography, List, ListItem, ListItemText, Paper } from '@mui/material';

function Home() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get('http://localhost:8080/notification/getAllNotifications');
        setNotifications(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching notifications:', error);
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  // Filter only active notifications
  const activeNotifications = notifications.filter(notification => notification.active);

  return (
    <Container>
      <Box mt={4} display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h4" gutterBottom>
          Welcome to the Electric Electronic Engineering Graduate Tracking System
        </Typography>
        <Box mt={2} width="100%">
          <Typography variant="h5" gutterBottom>
            Notifications:
          </Typography>
          {activeNotifications.length > 0 ? (
            <Paper elevation={3}>
              <List>
                {activeNotifications.map(notification => (
                  <ListItem key={notification.id}>
                    <ListItemText
                      primary={<strong>{notification.header}</strong>}
                      secondary={notification.body}
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
          ) : (
            <Typography variant="body1">No active notifications</Typography>
          )}
        </Box>
      </Box>
    </Container>
  );
}

export default Home;

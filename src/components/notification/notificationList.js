import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Switch,
  FormControlLabel
} from '@mui/material';
import axios from 'axios';

function NotificationList() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [currentNotification, setCurrentNotification] = useState({
    id: '',
    header: '',
    body: '',
    active: true
  });

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

  const handleEditClick = (notification) => {
    setCurrentNotification(notification);
    setEditDialogOpen(true);
  };

  const handleEditChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCurrentNotification({ ...currentNotification, [name]: type === 'checkbox' ? checked : value });
  };

  const handleEditSave = async () => {
    try {
      await axios.put(`http://localhost:8080/notification/update/${currentNotification.id}`, currentNotification);
      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) =>
          notification.id === currentNotification.id ? currentNotification : notification
        )
      );
      setEditDialogOpen(false);
    } catch (error) {
      console.error('Error updating notification:', error);
      alert('An error occurred while updating the notification.');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Box mt={4} display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h4" gutterBottom>
          All Notifications
        </Typography>
        <TableContainer component={Paper} sx={{ maxWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><Typography variant="h6">Header</Typography></TableCell>
                <TableCell><Typography variant="h6">Body</Typography></TableCell>
                <TableCell><Typography variant="h6">Active</Typography></TableCell>
                <TableCell><Typography variant="h6">Actions</Typography></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {notifications.map((notification) => (
                <TableRow key={notification.id}>
                  <TableCell>{notification.header}</TableCell>
                  <TableCell>{notification.body}</TableCell>
                  <TableCell>{notification.active ? 'Active' : 'Inactive'}</TableCell>
                  <TableCell>
                    <Button variant="contained" color="primary" onClick={() => handleEditClick(notification)}>
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
        <DialogTitle>Edit Notification</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Header"
            type="text"
            fullWidth
            name="header"
            value={currentNotification.header}
            onChange={handleEditChange}
          />
          <TextField
            margin="dense"
            label="Body"
            type="text"
            fullWidth
            name="body"
            value={currentNotification.body}
            onChange={handleEditChange}
          />
          <FormControlLabel
            control={
              <Switch
                checked={currentNotification.active}
                onChange={handleEditChange}
                name="active"
                color="primary"
              />
            }
            label="Active"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleEditSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default NotificationList;

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Appbar from './components/appbar/Appbar';
import Student from './components/student/Student';
import LoginStudent from './components/student/LoginStudent';
import StudentProfile from './components/student/StudentProfile';
import LoginAdmin from './components/admin/LoginAdmin';
import StudentList from './components/student/StudentList'; // Import the StudentList component
import Notification from './components/notification/notification';
import Home from './components/home/home';
import NotificationList from './components/notification/notificationList'; // Import the NotificationList component

function App() {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  return (
    <Router>
      <Appbar isAdminLoggedIn={isAdminLoggedIn} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/students/:id" element={<StudentProfile />} />
        <Route path="/login-student" element={<LoginStudent />} />
        <Route path="/student-register" element={<Student />} />
        <Route path="/login-admin" element={<LoginAdmin setIsAdminLoggedIn={setIsAdminLoggedIn} />} />
        <Route path="/student-list" element={<StudentList />} /> {/* Add route for StudentListPage */}
        <Route path="/notification" element={<Notification />} /> {/* Correct route for Notification */}
        <Route path="/notification-list" element={<NotificationList />} /> {/* Add route for NotificationListPage */}
      </Routes>
    </Router>
  );
}

export default App;

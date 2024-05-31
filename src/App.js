import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Appbar from './components/appbar/Appbar';
import Student from './components/student/Student';
import LoginStudent from './components/student/LoginStudent';
import StudentProfile from './components/student/StudentProfile';
import LoginAdmin from './components/admin/LoginAdmin';
import StudentList from './components/student/StudentList'; // Import the StudentList component
import Notification from './components/notification/notification';

function App() {
  return (
    <Router>
      <Appbar />
      <Routes>
        <Route path="/students/:id" element={<StudentProfile />} />
        <Route path="/login-student" element={<LoginStudent />} />
        <Route path="/student-register" element={<Student />} />
        <Route path="/login-admin" element={<LoginAdmin />} />
        <Route path="/student-list" element={<StudentList />} /> {/* Add route for StudentListPage */}
        <Route path="/notification" element={<Notification />} /> {/* Correct route for Notification */}
      </Routes>
    </Router>
  );
}

export default App;

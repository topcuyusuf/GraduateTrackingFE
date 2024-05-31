import React, { useState, useEffect } from 'react';
import { Container, Paper, Box, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, TextField } from '@mui/material';
import axios from 'axios';

export default function StudentList() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get('http://localhost:8080/students/getAllStudents');
        setStudents(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching students:', error);
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const filteredStudents = students.filter((student) =>
    student.fullName && student.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  );
  

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Box mt={4}>
        <h1>All Students</h1>
        <TextField
          label="Search by Full Name"
          variant="outlined"
          value={searchQuery}
          onChange={handleSearchInputChange}
          fullWidth
          margin="normal"
        />
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Full Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Student Number</TableCell>
                <TableCell>Birthdate</TableCell>
                <TableCell>Birthplace</TableCell>
                <TableCell>Gender</TableCell>
                <TableCell>Marital Status</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>LinkedIn</TableCell>
                <TableCell>Personal Info</TableCell>
                <TableCell>Department</TableCell>
                <TableCell>Program</TableCell>
                <TableCell>Education Type</TableCell>
                <TableCell>Admission Year</TableCell>
                <TableCell>Graduation Year</TableCell>
                <TableCell>Diploma Grade</TableCell>
                <TableCell>Employment Status</TableCell>
                <TableCell>Interested Areas</TableCell>
                <TableCell>Image</TableCell>
                <TableCell>CV</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>{student.fullName}</TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell>{student.studentNumber}</TableCell>
                  <TableCell>{student.birthdate}</TableCell>
                  <TableCell>{student.birthplace}</TableCell>
                  <TableCell>{student.gender}</TableCell>
                  <TableCell>{student.maritalStatus}</TableCell>
                  <TableCell>{student.phone}</TableCell>
                  <TableCell>{student.address}</TableCell>
                  <TableCell>{student.linkedin}</TableCell>
                  <TableCell>{student.personalInfo}</TableCell>
                  <TableCell>{student.department}</TableCell>
                  <TableCell>{student.program}</TableCell>
                  <TableCell>{student.educationType}</TableCell>
                  <TableCell>{student.admissionYear}</TableCell>
                  <TableCell>{student.graduationYear}</TableCell>
                  <TableCell>{student.diplomaGrade}</TableCell>
                  <TableCell>{student.employmentStatus}</TableCell>
                  <TableCell>{student.interestedAreas}</TableCell>
                  <TableCell>
                    <img src={`data:image/jpeg;base64,${student.image}`} alt="Profile" style={{ width: '50px', height: '50px' }} />
                  </TableCell>
                  <TableCell>
                    <a href={`data:application/pdf;base64,${student.cv}`} download="CV.pdf">Download CV</a>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
}

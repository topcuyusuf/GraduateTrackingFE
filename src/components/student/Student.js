import React, { useState } from 'react';
import { Container, Paper, Box, TextField, Button, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Student() {
  const navigate = useNavigate();
  const paperStyle = { padding: '50px 30px', width: 600, margin: '20px auto' };

  const [studentData, setStudentData] = useState({
    email: '',
    password: '',
    fullName: '',
    studentNumber: '',
    birthdate: '',
    birthplace: '',
    gender: '',
    maritalStatus: '',
    phone: '',
    address: '',
    linkedin: '',
    personalInfo: '',
    department: '',
    program: '',
    educationType: '',
    admissionYear: '',
    graduationYear: '',
    diplomaGrade: '',
    employmentStatus: '',
    interestedAreas: '',
    image: '',
    cv: ''
  });

  const [emailError, setEmailError] = useState('');
  const [imagePreview, setImagePreview] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(value)) {
        setEmailError('Invalid email format');
      } else {
        setEmailError('');
      }
    }
    setStudentData({ ...studentData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result.split(",")[1];
      setStudentData({ ...studentData, [name]: base64String });
      if (name === 'image') {
        setImagePreview(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/students/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(studentData),
      });

      if (response.ok) {
        console.log("New student created");
        navigate('/home');
      } else {
        console.error("Failed to create student");
        alert("An error occurred while creating the student.");
      }
    } catch (error) {
      console.error("Error creating student:", error);
      alert("An error occurred while creating the student.");
    }
  };

  return (
    <Container>
      <Paper elevation={3} style={paperStyle}>
        <h1 style={{ color: 'blue' }}>Student Registration</h1>
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 2 },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="email"
            label="Email"
            variant="outlined"
            value={studentData.email}
            onChange={handleChange}
            name="email"
            error={!!emailError}
            helperText={emailError}
          />
          <TextField
            id="password"
            label="Password"
            variant="outlined"
            value={studentData.password}
            onChange={handleChange}
            name="password"
            type="password"
          />
          <TextField
            id="fullName"
            label="Full Name"
            variant="outlined"
            value={studentData.fullName}
            onChange={handleChange}
            name="fullName"
          />
          <TextField
            id="studentNumber"
            label="Student Number"
            variant="outlined"
            value={studentData.studentNumber}
            onChange={handleChange}
            name="studentNumber"
          />
          <TextField
            id="birthdate"
            label="Birthdate"
            variant="outlined"
            value={studentData.birthdate}
            onChange={handleChange}
            name="birthdate"
            type="date"
          />
          <TextField
            id="birthplace"
            label="Birthplace"
            variant="outlined"
            value={studentData.birthplace}
            onChange={handleChange}
            name="birthplace"
          />
          <FormControl fullWidth sx={{ m: 2 }}>
            <InputLabel id="gender-label">Gender</InputLabel>
            <Select
              labelId="gender-label"
              id="gender"
              value={studentData.gender}
              label="Gender"
              name="gender"
              onChange={handleChange}
            >
              <MenuItem value={"Male"}>Male</MenuItem>
              <MenuItem value={"Female"}>Female</MenuItem>
              <MenuItem value={"Other"}>Other</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ m: 2 }}>
            <InputLabel id="maritalStatus-label">Marital Status</InputLabel>
            <Select
              labelId="maritalStatus-label"
              id="maritalStatus"
              value={studentData.maritalStatus}
              label="Marital Status"
              name="maritalStatus"
              onChange={handleChange}
            >
              <MenuItem value={"Married"}>Married</MenuItem>
              <MenuItem value={"Single"}>Single</MenuItem>
            </Select>
          </FormControl>
          <TextField
            id="phone"
            label="Phone"
            variant="outlined"
            value={studentData.phone}
            onChange={handleChange}
            name="phone"
          />
          <TextField
            id="address"
            label="Address"
            variant="outlined"
            value={studentData.address}
            onChange={handleChange}
            name="address"
          />
          <TextField
            id="linkedin"
            label="LinkedIn"
            variant="outlined"
            value={studentData.linkedin}
            onChange={handleChange}
            name="linkedin"
          />
          <TextField
            id="personalInfo"
            label="Personal Info"
            variant="outlined"
            value={studentData.personalInfo}
            onChange={handleChange}
            name="personalInfo"
          />
          <TextField
            id="department"
            label="Department"
            variant="outlined"
            value={studentData.department}
            onChange={handleChange}
            name="department"
          />
          <TextField
            id="program"
            label="Program"
            variant="outlined"
            value={studentData.program}
            onChange={handleChange}
            name="program"
          />
          <FormControl fullWidth sx={{ m: 2 }}>
            <InputLabel id="educationType-label">Education Type</InputLabel>
            <Select
              labelId="educationType-label"
              id="educationType"
              value={studentData.educationType}
              label="Education Type"
              name="educationType"
              onChange={handleChange}
            >
              <MenuItem value={"Licence"}>Licence</MenuItem>
              <MenuItem value={"Associate Degree"}>Associate Degree</MenuItem>
              <MenuItem value={"Master Degree"}>Master Degree</MenuItem>
            </Select>
          </FormControl>
          <TextField
            id="admissionYear"
            label="Admission Year"
            variant="outlined"
            value={studentData.admissionYear}
            onChange={handleChange}
            name="admissionYear"
            type="number"
          />
          <TextField
            id="graduationYear"
            label="Graduation Year"
            variant="outlined"
            value={studentData.graduationYear}
            onChange={handleChange}
            name="graduationYear"
            type="number"
          />
          <TextField
            id="diplomaGrade"
            label="Diploma Grade"
            variant="outlined"
            value={studentData.diplomaGrade}
            onChange={handleChange}
            name="diplomaGrade"
          />
          <FormControl fullWidth sx={{ m: 2 }}>
            <InputLabel id="employmentStatus-label">Employment Status</InputLabel>
            <Select
              labelId="employmentStatus-label"
              id="employmentStatus"
              value={studentData.employmentStatus}
              label="Employment Status"
              name="employmentStatus"
              onChange={handleChange}
            >
              <MenuItem value={"Currently Employed"}>Currently Employed</MenuItem>
              <MenuItem value={"Unemployed"}>Unemployed</MenuItem>
            </Select>
          </FormControl>
          <TextField
            id="interestedAreas"
            label="Interested Areas"
            variant="outlined"
            value={studentData.interestedAreas}
            onChange={handleChange}
            name="interestedAreas"
          />
          <div style={{ margin: '20px 0' }}>
            <label htmlFor="image">Chose profile photo</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              name="image"
              id="image"
              style={{ display: 'block', marginTop: '10px' }}
            />
          </div>
          {imagePreview && (
            <Box component="div" sx={{ display: 'flex', justifyContent: 'center', m: 2 }}>
              <img src={imagePreview} alt="Preview" style={{ width: '150px', height: '150px' }} />
            </Box>
          )}
          <div style={{ margin: '20px 0' }}>
            <label htmlFor="cv">Chose CV file</label>
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              name="cv"
              id="cv"
              style={{ display: 'block', marginTop: '10px' }}
            />
          </div>
          <Button variant="contained" onClick={handleClick}>
            Submit
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

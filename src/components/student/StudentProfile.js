import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Box, Button, TextField, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';

function StudentProfile() {
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editState, setEditState] = useState({});
  const [updatedValues, setUpdatedValues] = useState({});

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/students/${id}`);
        setStudent(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching student data:', error);
        setLoading(false);
      }
    };

    fetchStudentData();
  }, [id]);

  const handleEditClick = (field) => {
    setEditState((prevEditState) => ({
      ...prevEditState,
      [field]: true,
    }));
    setUpdatedValues((prevValues) => ({
      ...prevValues,
      [field]: student[field],
    }));
  };

  const handleCancelClick = (field) => {
    setEditState((prevEditState) => ({
      ...prevEditState,
      [field]: false,
    }));
    setUpdatedValues((prevValues) => {
      const updated = { ...prevValues };
      delete updated[field];
      return updated;
    });
  };

  const handleInputChange = (field, value) => {
    setUpdatedValues((prevValues) => ({
      ...prevValues,
      [field]: value,
    }));
  };

  const handleFileChange = (field, file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setUpdatedValues((prevValues) => ({
        ...prevValues,
        [field]: reader.result.split(',')[1], // Get the base64 string
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSaveClick = async (field) => {
    try {
      const updatePayload = { [field]: updatedValues[field] };
      const response = await axios.put(`http://localhost:8080/students/${id}`, updatePayload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        setStudent((prevStudent) => ({ ...prevStudent, [field]: updatedValues[field] }));
        setEditState((prevEditState) => ({
          ...prevEditState,
          [field]: false,
        }));
        setUpdatedValues((prevValues) => {
          const updated = { ...prevValues };
          delete updated[field];
          return updated;
        });
      } else {
        alert('Failed to update student data.');
      }
    } catch (error) {
      console.error('Error updating student data:', error);
      const errorMessage = error.response?.data?.message || error.message || 'An unknown error occurred';
      alert(`An error occurred while updating the student data: ${errorMessage}`);
    }
  };

  const downloadCV = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/students/cv/${student.studentId}`, {
        responseType: 'blob', // Specify response type as blob to receive binary data
      });

      // Create a blob from the response data
      const blob = new Blob([response.data], { type: 'application/pdf' });

      // Convert the blob to a data URL
      const url = URL.createObjectURL(blob);

      // Open the PDF in a new tab
      window.open(url, '_blank');
    } catch (error) {
      console.error('Error downloading CV:', error);
      alert('An error occurred while downloading CV.');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!student) {
    return <div>Error loading student data</div>;
  }

  const filteredFields = ['facebook', 'twitter', 'studentId'];

  return (
    <Container>
      <Box mt={4}>
        <h2>Student Profile</h2>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Field</TableCell>
                <TableCell>Value</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.keys(student).map((field) => (
                !filteredFields.includes(field) && field !== 'image' && field !== 'cv' && (
                  <TableRow key={field}>
                    <TableCell>{field.charAt(0).toUpperCase() + field.slice(1)}</TableCell>
                    <TableCell>
                      {editState[field] ? (
                        <TextField
                          value={updatedValues[field]}
                          onChange={(e) => handleInputChange(field, e.target.value)}
                          variant="outlined"
                          size="small"
                        />
                      ) : (
                        student[field]
                      )}
                    </TableCell>
                    <TableCell>
                      {editState[field] ? (
                        <>
                          <IconButton onClick={() => handleSaveClick(field)} color="primary">
                            <SaveIcon />
                          </IconButton>
                          <IconButton onClick={() => handleCancelClick(field)} color="secondary">
                            <CancelIcon />
                          </IconButton>
                        </>
                      ) : (
                        <IconButton onClick={() => handleEditClick(field)}>
                          <EditIcon />
                        </IconButton>
                      )}
                    </TableCell>
                  </TableRow>
                )
              ))}
              <TableRow>
                <TableCell>Profile Image</TableCell>
                <TableCell>
                  {editState['image'] ? (
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileChange('image', e.target.files[0])}
                    />
                  ) : (
                    student.image && (
                      <img src={`data:image/jpeg;base64,${student.image}`} alt="Profile" style={{ width: '150px', height: '150px' }} />
                    )
                  )}
                </TableCell>
                <TableCell>
                  {editState['image'] ? (
                    <>
                      <IconButton onClick={() => handleSaveClick('image')} color="primary">
                        <SaveIcon />
                      </IconButton>
                      <IconButton onClick={() => handleCancelClick('image')} color="secondary">
                        <CancelIcon />
                      </IconButton>
                    </>
                  ) : (
                    <IconButton onClick={() => handleEditClick('image')}>
                      <EditIcon />
                    </IconButton>
                  )}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>CV</TableCell>
                <TableCell>
                  {editState['cv'] ? (
                    <input
                      type="file"
                      accept="application/pdf"
                      onChange={(e) => handleFileChange('cv', e.target.files[0])}
                    />
                  ) : (
                    <a href={`data:application/pdf;base64,${student.cv}`} download="CV.pdf">Download CV</a>
                  )}
                </TableCell>
                <TableCell>
                  {editState['cv'] ? (
                    <>
                      <IconButton onClick={() => handleSaveClick('cv')} color="primary">
                        <SaveIcon />
                      </IconButton>
                      <IconButton onClick={() => handleCancelClick('cv')} color="secondary">
                        <CancelIcon />
                      </IconButton>
                    </>
                  ) : (
                    <IconButton onClick={() => handleEditClick('cv')}>
                      <EditIcon />
                    </IconButton>
                  )}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
}

export default StudentProfile;

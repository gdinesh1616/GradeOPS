import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";

import {
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  CircularProgress,
} from '@mui/material';

export default function Newexamform() {
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    courseName: '',
    numStudents: '',
    conductedOn: '',
    numTAs: '',
  });


  const [errors, setErrors] = useState({});
  const [submittedData, setSubmittedData] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error on change
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.courseName.trim()) newErrors.courseName = 'Course Name is required';
    if (!formData.numStudents || parseInt(formData.numStudents) <= 0) newErrors.numStudents = 'Number of Students must be a positive number';
    if (!formData.conductedOn) newErrors.conductedOn = 'Conducted On date is required';
    if (!formData.numTAs || parseInt(formData.numTAs) < 0) newErrors.numTAs = 'Number of TAs must be 0 or more';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    navigate('/');
    setLoading(true);
    // Simulate async submission
    setTimeout(() => {
      console.log('Submitted Data:', formData);
      setSubmittedData(formData);
      setSuccess(true);
      setLoading(false);
    }, 1000);

      try {
    const res = await axios.post('http://localhost:5000/api/exam/submit', formData);
    console.log(res.data);
  } catch (err) {
    console.error(err);
  }
  
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
        padding: 2,
      }}
    >
      <Card
        sx={{
          maxWidth: 500,
          width: '100%',
          boxShadow: 3,
          borderRadius: 2,
        }}
      >
        <CardContent sx={{ padding: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom align="center">
            New Exam Form
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Course Name"
              name="courseName"
              value={formData.courseName}
              onChange={handleChange}
              error={!!errors.courseName}
              helperText={errors.courseName}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Number of Students"
              name="numStudents"
              type="number"
              value={formData.numStudents}
              onChange={handleChange}
              error={!!errors.numStudents}
              helperText={errors.numStudents}
              margin="normal"
              required
              inputProps={{ min: 1 }}
            />
            <TextField
              fullWidth
            //   label="Conducted On"
              name="conductedOn"
              type="date"
              value={formData.conductedOn}
              onChange={handleChange}
              error={!!errors.conductedOn}
              helperText={errors.conductedOn}
              margin="normal"
              required
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              fullWidth
              label="TA's to be Assigned"
              name="numTAs"
              type="number"
              value={formData.numTAs}
              onChange={handleChange}
              error={!!errors.numTAs}
              helperText={errors.numTAs}
              margin="normal"
              required
              inputProps={{ min: 0 }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, height: 48 }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Submit'}
            </Button>

          </Box>
          {success && (
            <Alert severity="success" sx={{ mt: 2 }}>
              Form submitted successfully!
            </Alert>
          )}
          
        </CardContent>
      </Card>
    </Box>
  );
}
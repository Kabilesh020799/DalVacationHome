import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';


const SecurityQuestion = () => {
  const [form, setForm] = useState({
    question1: '',
    answer1: '',
    question2: '',
    answer2: '',
    question3: '',
    answer3: '',
    caesarKey: '',
    userType: '', 
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const email = localStorage.getItem("email");


  const onSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        await axios.post('https://kadcflatfj.execute-api.us-east-1.amazonaws.com/dev/users/securityquestions', {
          email,
          answer1: form.answer1,
          answer2: form.answer2,
          answer3: form.answer3,
          caesarKey: form.caesarKey,
          userType: form.userType,
        });
        alert('Sign Up Successful!');
        navigate('/login');
      } catch (error) {
        console.log(error.message);
      }
    }
  };
  // const onSubmit = async (e) => {
  //   e.preventDefault();
  //   if (validate()) {
  //     try {
  //       await axios.post('https://khk7pnql30.execute-api.us-east-1.amazonaws.com/dev/users', {
  //         email,
  //         question1: form.question1,
  //         answer1: form.answer1,
  //         question2: form.question2,
  //         answer2: form.answer2,
  //         question3: form.question3,
  //         answer3: form.answer3,
  //         caesarKey: form.caesarKey,
  //       });
  //       alert('Sign Up Successful!');
  //       navigate('/login');
  //     } catch (error) {
  //       console.log(error.message);
  //     }
  //   }
  // };

  const validate = () => {
    let formErrors = {};
    formErrors.answer1 = form.answer1 ? '' : 'Answer to question 1 is required.';
    formErrors.answer2 = form.answer2 ? '' : 'Answer to question 2 is required.';
    formErrors.answer3 = form.answer3 ? '' : 'Answer to question 3 is required.';
    formErrors.caesarKey = form.caesarKey ? '' : 'Caesar cipher key is required.';
    formErrors.userType = form.userType ? '' : 'User type is required.'; 
    setErrors(formErrors);
    return Object.values(formErrors).every((x) => x === '');
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  return (
    <Container maxWidth="xs" sx={{ backgroundColor: '#ffffff'}}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component='h1' variant='h5' style={{ color: 'black', marginTop: '60px' }}>
          Security Questions
        </Typography>
        <Box component='form' onSubmit={onSubmit} sx={{ mt: 1 }}>
          <TextField
            fullWidth
            label="What is your favorite color?"
            name="answer1"
            value={form.answer1}
            onChange={onChange}
            margin="normal"
            error={!!errors.answer1}
            helperText={errors.answer1}
            required
          />
          <TextField
            fullWidth
            label="Which is your favorite car?"
            name="answer2"
            value={form.answer2}
            onChange={onChange}
            margin="normal"
            error={!!errors.answer2}
            helperText={errors.answer2}
            required
          />
          <TextField
            fullWidth
            label="What is your favorite food?"
            name="answer3"
            value={form.answer3}
            onChange={onChange}
            margin="normal"
            error={!!errors.answer3}
            helperText={errors.answer3}
            required
          />
          <TextField
            fullWidth
            type="number"
            label="Caesar Cipher Key"
            name="caesarKey"
            value={form.caesarKey}
            onChange={onChange}
            margin="normal"
            error={!!errors.caesarKey}
            helperText={errors.caesarKey}
            required
          />
          <FormControl fullWidth margin="normal" error={!!errors.userType}>
            <InputLabel>User Type</InputLabel>
            <Select
              label="User Type"
              name="userType"
              value={form.userType}
              onChange={onChange}
              required
            >
              <MenuItem value="Agent">Agent</MenuItem>
              <MenuItem value="Customer">Customer</MenuItem>
            </Select>
            {errors.userType && <Typography color="error">{errors.userType}</Typography>}
          </FormControl>
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign Up
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default SecurityQuestion;

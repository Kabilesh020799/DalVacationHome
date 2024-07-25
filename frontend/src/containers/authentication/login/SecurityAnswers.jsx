import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { sendMessage } from './apiUtils';

const generateCaesarCode = () => {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let code = '';
  for (let i = 0; i < 4; i++) {
    code += letters.charAt(Math.floor(Math.random() * letters.length));
  }
  return code;
};

const SecurityAnswers = () => {
  const [form, setForm] = useState({
    answer1: '',
    answer2: '',
    answer3: '',
    caesarCipherAnswer: ''
  });
  const [errors, setErrors] = useState({});
  const [caesarCode, setCaesarCode] = useState('');
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  useEffect(() => {
    const storedEmail = localStorage.getItem('email');
    if (storedEmail) {
      setEmail(storedEmail);
    } else {
      // Handle case where email is not found in localStorage
      console.error('Email not found in localStorage');
    }
    setCaesarCode(generateCaesarCode());
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        console.log("Sending request with email:", email); // Debugging log
        const response = await axios.post('https://kadcflatfj.execute-api.us-east-1.amazonaws.com/dev/users/securityanswers', {
          email,
          answer1: form.answer1,
          answer2: form.answer2,
          answer3: form.answer3,
          caesarCode: caesarCode,
          caesarCipherAnswer: form.caesarCipherAnswer
        });
        await sendMessage({ email }); 
          let responseBody;
          try {
            responseBody = JSON.parse(response.data.body);
          } catch (parseError) {
            console.error('Error parsing response body:', parseError);
            alert('Error parsing response from server.');
            return;
          }
  
          console.log("Parsed response body:", responseBody);
  
          if (responseBody.message === 'Verification successful') {

            localStorage.setItem('userType', responseBody.userType);
            localStorage.setItem('user_id', responseBody.user_id);
            localStorage.setItem('token', responseBody.token); 

            alert('Security Questions and Caesar Cipher Verified Successfully!');
            navigate('/home', { state: { email, userType: responseBody.userType, user_id: responseBody.user_id } });
          } else {
            alert(responseBody.message || 'Verification failed.');
          }
        } catch (error) {
          console.error('An error occurred during verification:', error);
          alert('An error occurred during verification. Please try again.');
        }
      }
    };

  const validate = () => {
    let formErrors = {};
    formErrors.answer1 = form.answer1 ? '' : 'Answer to question 1 is required.';
    formErrors.answer2 = form.answer2 ? '' : 'Answer to question 2 is required.';
    formErrors.answer3 = form.answer3 ? '' : 'Answer to question 3 is required.';
    formErrors.caesarCipherAnswer = form.caesarCipherAnswer ? '' : 'Caesar cipher response is required.';
    setErrors(formErrors);
    return Object.values(formErrors).every((x) => x === '');
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  return (
    <Container maxWidth="xs" sx={{ backgroundColor: '#ffffff' }}>
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
          <Typography component='h1' variant='h5' style={{ color: 'black', marginTop: '20px' }}>
            Caesar Cipher Code: {caesarCode}
          </Typography>
          <TextField
            fullWidth
            label="Enter the Caesar cipher response"
            name="caesarCipherAnswer"
            value={form.caesarCipherAnswer}
            onChange={onChange}
            margin="normal"
            error={!!errors.caesarCipherAnswer}
            helperText={
              errors.caesarCipherAnswer ||
              "! Code is case-sensitive"
            }
            required
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Verify Answers
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default SecurityAnswers;

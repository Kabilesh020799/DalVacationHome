import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import axios from 'axios';

const SecurityQuestions = ({ email, questions }) => {
  const [answers, setAnswers] = useState({
    answer1: '',
    answer2: '',
    answer3: '',
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setAnswers({ ...answers, [name]: value });
  };

  const onSubmitAnswers = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('YOUR_LAMBDA_ENDPOINT_FOR_ANSWERS', {
        email,
        answer1: answers.answer1,
        answer2: answers.answer2,
        answer3: answers.answer3,
      });
      if (response.data.success) {
        // Proceed to Caesar Cipher or next step
        console.log('Answers verified successfully');
      } else {
        alert('Incorrect answers. Please try again.');
      }
    } catch (error) {
      console.error('Error verifying answers:', error);
    }
  };

  return (
    <Container maxWidth='xs' sx={{ backgroundColor: '#ffffff', marginTop: '20px' }}>
      <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component='h1' variant='h5' style={{ color: 'black', marginTop: '20px' }}>
          Security Questions
        </Typography>
        <Box component='form' onSubmit={onSubmitAnswers} sx={{ mt: 1 }}>
          <TextField
            fullWidth
            label='What is your favorite color?'
            name='answer4'
            value={answers.answer4}
            onChange={onChange}
            margin='normal'
            required
          />
          <TextField
            fullWidth
            label='Which is your favorite car?'
            name='answer5'
            value={answers.answer5}
            onChange={onChange}
            margin='normal'
            required
          />
          <TextField
            fullWidth
            label='What is your favorite food?'
            name='answer6'
            value={answers.answer6}
            onChange={onChange}
            margin='normal'
            required
          />

          <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
            Submit Answers
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default SecurityQuestions;

import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box, Grid } from '@mui/material';
import axios from 'axios';

const LoginPage = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
    answer1: '',
    answer2: '',
    answer3: '',
    caesarAlpha: '', // Caesar cipher alpha from Lambda
  });

  const [errors, setErrors] = useState({});

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        // Check answers for security questions using Lambda
        const answersValidated = await validateSecurityQuestions();
        if (answersValidated) {
          // Call Lambda to get Caesar cipher alpha
          const caesarAlpha = await getCaesarCipherAlpha();
          if (caesarAlpha) {
            setForm({ ...form, caesarAlpha });
            alert('Login successful!');
          } else {
            alert('Failed to fetch Caesar cipher alpha.');
          }
        } else {
          alert('Security answers are incorrect.');
        }
      } catch (error) {
        console.error('Login error:', error);
      }
    }
  };

  const validate = () => {
    let formErrors = {};
    formErrors.email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) ? "" : "Invalid Email.";
    formErrors.password = form.password.length >= 8 ? "" : "Password must be at least 8 characters.";
    formErrors.answer1 = form.answer1 ? "" : "Answer to question 1 is required.";
    formErrors.answer2 = form.answer2 ? "" : "Answer to question 2 is required.";
    formErrors.answer3 = form.answer3 ? "" : "Answer to question 3 is required.";

    setErrors(formErrors);
    return Object.values(formErrors).every(x => x === "");
  };

  const validateSecurityQuestions = async () => {
    try {
      const response = await axios.post('YOUR_SECURITY_QUESTION_LAMBDA_ENDPOINT', {
        email: form.email,
        answer1: form.answer1,
        answer2: form.answer2,
        answer3: form.answer3,
      });
      return response.data.validated; // Assuming Lambda returns { validated: true } or { validated: false }
    } catch (error) {
      console.error('Error validating security questions:', error);
      return false;
    }
  };

  const getCaesarCipherAlpha = async () => {
    try {
      const response = await axios.post('YOUR_CAESAR_CIPHER_LAMBDA_ENDPOINT', {
        email: form.email,
      });
      return response.data.caesarAlpha; // Assuming Lambda returns caesarAlpha
    } catch (error) {
      console.error('Error fetching Caesar cipher alpha:', error);
      return null;
    }
  };

  return (
    <Container maxWidth="xs"
    sx={{
        backgroundColor: '#ffffff',
        marginTop: '20px'
      }}>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5" style={{ color: 'black',  marginTop: '20px' }}>
          Log In
        </Typography>
        <Box component="form" onSubmit={onSubmit} sx={{ mt: 1 }}>
          <TextField
            fullWidth
            label="Email Address"
            name="email"
            type="email"
            value={form.email}
            onChange={onChange}
            margin="normal"
            required
            error={!!errors.email}
            helperText={errors.email}
          />
          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={onChange}
            margin="normal"
            required
            error={!!errors.password}
            helperText={errors.password}
          />
          <TextField
            fullWidth
            label="Answer to question 1"
            name="answer1"
            value={form.answer1}
            onChange={onChange}
            margin="normal"
            required
            error={!!errors.answer1}
            helperText={errors.answer1}
          />
          <TextField
            fullWidth
            label="Answer to question 2"
            name="answer2"
            value={form.answer2}
            onChange={onChange}
            margin="normal"
            required
            error={!!errors.answer2}
            helperText={errors.answer2}
          />
          <TextField
            fullWidth
            label="Answer to question 3"
            name="answer3"
            value={form.answer3}
            onChange={onChange}
            margin="normal"
            required
            error={!!errors.answer3}
            helperText={errors.answer3}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Log In
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;



// import React, { useState } from 'react';
// import { Container, TextField, Button, Typography, Box, Grid } from '@mui/material';

// const LoginPage = () => {
//   const [form, setForm] = useState({
//     email: '',
//     password: '',
//   });

//   const onChange = (e) => {
//     const { name, value } = e.target;
//     setForm({ ...form, [name]: value });
//   };

//   const onSubmit = (e) => {
//     e.preventDefault();
//     // Here you can add your login logic, e.g., calling an API, validating credentials, etc.
//     console.log('Form submitted:', form);
//   };

//   return (
//     <Container maxWidth="xs"
//     sx={{
//         backgroundColor: '#ffffff',
//         marginTop: '20px'
//       }}>
//       <Box
//         sx={{
//           marginTop: 8,
//           display: 'flex',
//           flexDirection: 'column',
//           alignItems: 'center',
//         }}
//       >
//         <Typography component="h1" variant="h5" style={{ color: 'black',  marginTop: '20px' }}>
//           Log In
//         </Typography>
//         <Box component="form" onSubmit={onSubmit} sx={{ mt: 1 }}>
//           <TextField
//             fullWidth
//             label="Email Address"
//             name="email"
//             type="email"
//             value={form.email}
//             onChange={onChange}
//             margin="normal"
//             required
//           />
//           <TextField
//             fullWidth
//             label="Password"
//             name="password"
//             type="password"
//             value={form.password}
//             onChange={onChange}
//             margin="normal"
//             required
//           />
//           <Button
//             type="submit"
//             fullWidth
//             variant="contained"
//             sx={{ mt: 3, mb: 2 }}
//           >
//             Log In
//           </Button>
//         </Box>
//       </Box>
//     </Container>
//   );
// };

// export default LoginPage;

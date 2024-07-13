import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box, Grid } from '@mui/material';
import { signUp } from 'aws-amplify';
import axios from 'axios';
import './style.scss';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [signUpInfo, setSignUpInfo] = useState(null);
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const res = await signUp({
          username: form.email,
          password: form.password,
          attributes: { email: form.email, name: form.name },
        });
        setSignUpInfo(res);
        navigate('/securityquestions', { state: { email: form.email } });
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  const validate = () => {
    let formErrors = {};
    formErrors.name = /^[A-Za-z]+$/.test(form.name) ? '' : 'Name should contain only letters.';
    formErrors.email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) ? '' : 'Invalid Email.';
    formErrors.password = form.password.length >= 8 ? '' : 'Password must be at least 8 characters.';
    formErrors.confirmPassword = form.password === form.confirmPassword ? '' : 'Passwords do not match.';
    setErrors(formErrors);
    return Object.values(formErrors).every((x) => x === '');
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  return (
    <Container maxWidth="xs" className="signup-container" sx={{ backgroundColor: '#ffffff', marginTop: '20px' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
        <Typography component="h1" variant="h5" color="black" fontWeight="bold">
          Sign Up
        </Typography>
        <Box component="form" onSubmit={onSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                autoComplete="name"
                value={form.name}
                onChange={onChange}
                error={!!errors.name}
                helperText={errors.name}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                autoComplete="email"
                value={form.email}
                onChange={onChange}
                error={!!errors.email}
                helperText={errors.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="password"
                label="Password"
                type="password"
                autoComplete="new-password"
                value={form.password}
                onChange={onChange}
                error={!!errors.password}
                helperText={errors.password}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                value={form.confirmPassword}
                onChange={onChange}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword}
              />
            </Grid>
          </Grid>
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign Up
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Signup;



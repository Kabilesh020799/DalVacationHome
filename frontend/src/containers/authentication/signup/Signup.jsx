import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box, Grid } from '@mui/material';
import { signUp, confirmSignUp } from 'aws-amplify/auth';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './style.scss';

const Signup = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
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
          setOtpSent(true);
            const response = await axios.post('https://kadcflatfj.execute-api.us-east-1.amazonaws.com/dev/users', {
          email: form.email,
          username: form.name,
          password: form.password,
        });
         console.log(response.data);
}         catch (error) {
        console.log(error.message);
      }
    }
  };


  const onVerifyOtp = async (e) => {
    e.preventDefault();
    try {
        confirmSignUp({
        username: signUpInfo?.userId,
        confirmationCode: otp,
      });
      alert('Verification successful! Now provide authentication details.');
      localStorage.setItem("email",form.email)  
      navigate('/securityquestions');
    } catch (error) {
      console.log(error.message);
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
    <Container maxWidth="xs" className="signup-container" sx={{ backgroundColor: '#ffffff', display: 'flex', justifyContent: 'center' }}>
      <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5" color="black" fontWeight="bold">
          Sign Up
        </Typography>
        {!otpSent ? (
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
              Submit
            </Button>
            <Typography variant="body2" color="textSecondary" align="center">
              Already have an account? <Link component={Link} to="/login">Login</Link>
            </Typography>
          </Box>
        ) : (
               <Box component="form" onSubmit={onVerifyOtp} sx={{ mt: 3 }}>
            <Typography component="h1" variant="h5" color="black" fontWeight="bold">
              Verify OTP
            </Typography>
            <TextField
              fullWidth
              label="OTP"
              name="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              margin="normal"
              required
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Verify
            </Button>
          </Box>
        )}
      </Box>
      </Container>
  );
};
export default Signup;
import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box, Grid } from '@mui/material';
import { signIn } from 'aws-amplify/auth';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [signInError, setSignInError] = useState(null);
  const navigate = useNavigate();


  const onSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const res = await signIn({ username: form.email, password: form.password });
        localStorage.setItem("email", form.email);
        navigate('/securityanswers', { state: { email: form.email } });
      } catch (error) {
        setSignInError(error.message);
      }
    }
  };

  const validate = () => {
    let formErrors = {};
    formErrors.email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
      ? ''
      : 'Invalid Email.';
    formErrors.password =
      form.password.length >= 8 ? '' : 'Password must be at least 8 characters.';
    setErrors(formErrors);
    return Object.values(formErrors).every((x) => x === '');
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

//   const handleForgotPassword = async () => {
//     try {
//      const password = await forgotPassword(form.email);
//       navigate('/forgot-password', { state: { email: form.email } });
//     } catch (error) {
//       setSignInError(error.message);
//     }
//   };

  return (
    <div className="login">
      <Container
        maxWidth="xs"
        className="login-container"
        sx={{
          backgroundColor: '#ffffff'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography sx={{
            marginTop: '60px',
          }}
            component="h1"
            variant="h5"
            color="black"
            fontWeight="bold"
          >
            Sign In
          </Typography>
          <Box component="form" onSubmit={onSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
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
                  autoComplete="current-password"
                  value={form.password}
                  onChange={onChange}
                  error={!!errors.password}
                  helperText={errors.password}
                />
              </Grid>
            </Grid>
            {signInError && (
              <Typography color="error" sx={{ mt: 2 }}>
                {signInError}
              </Typography>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            {/* <Typography variant="body2" color="textSecondary" align="center">
              <Link component="button" onClick={handleForgotPassword}>
                Forgot password?
              </Link>
            </Typography> */}
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default Login;

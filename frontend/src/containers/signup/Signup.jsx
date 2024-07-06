import React, { useEffect, useState } from 'react';
import { Container, TextField, Button, Typography, Box, Grid, Modal } from '@mui/material';
import { signUp, confirmSignUp, signIn } from 'aws-amplify/auth';
import './style.scss';
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
  const {
    isLogin,
  } = props;

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: '',
    question1: '',
    answer1: '',
    question2: '',
    answer2: '',
    question3: '',
    answer3: '',
    caesarKey: '',
  });
  const [errors, setErrors] = useState({});
  const [otp, setOtp] = useState('');
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [signUpInfo, setSignUpInfo] = useState(null);
  const [signInError, setSignInError] = useState(null);
  const [caesarCode, setCaesarCode] = useState('');

  const navigate = useNavigate();

  const generateRandomCode = () => {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let code = '';
    for (let i = 0; i < 4; i++) {
      code += alphabet[Math.floor(Math.random() * alphabet.length)];
    }
    setCaesarCode(code);
    localStorage.setItem('caesarCode', code); // Store in local storage
  };

  useEffect(() => {
    const storedCaesarCode = localStorage.getItem('caesarCode');
    if (storedCaesarCode) {
      setCaesarCode(storedCaesarCode);
    } else {
      generateRandomCode();
    }
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (isLogin) {
      console.log(validate());
      alert('Answer the security questions, 2nd factor authentication is done.');

      if (validate()) {
        try {
          const res = await signIn({
            username: form.email,
            password: form.password,
          });
          // lambda for caesar cipher
           navigate('/securityquestions');
        } catch (error) {
          setSignInError(error.message);
        }
      }
    } else {
      if (validate()) {
        try {
          const res = await signUp({
            username: form.email,
            password: form.password,
            attributes: { email: form.email, name: form.name },
          });
          const response = await axios.post(
            'https://khk7pnql30.execute-api.us-east-1.amazonaws.com/dev/users',
            {
              name: form.name,
              email: form.email,
              userType: form.userType,
              password: form.password,
              question1: form.question1,
              answer1: form.answer1,
              question2: form.question2,
              answer2: form.answer2,
              question3: form.question3,
              answer3: form.answer3,
              caesarKey: form.caesarKey,
            }
          );
          setSignUpInfo(res);
          setShowOtpModal(true);
        } catch (error) {
          console.log(error.message);
        }
      }
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.log('Error signing out: ', error);
    }
  };

  const validate = () => {
    let formErrors = {};
    formErrors.firstName = /^[A-Za-z]+$/.test(form.firstName)
      ? ''
      : 'Name should contain only letter';
    formErrors.lastName = /^[A-Za-z]+$/.test(form.lastName)
      ? ''
      : 'Name should contain only letters.';
    formErrors.email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
      ? ''
      : 'Invalid Email.';
    formErrors.password =
      form.password.length >= 8 ? '' : 'Password must be at least 8 characters.';
    formErrors.confirmPassword =
      form.password === form.confirmPassword ? '' : 'Passwords do not match.';
    formErrors.answer1 = form.answer1 ? '' : 'Answer to question 1 is required.';
    formErrors.answer2 = form.answer2 ? '' : 'Answer to question 2 is required.';
    formErrors.answer3 = form.answer3 ? '' : 'Answer to question 3 is required.';
    formErrors.caesarKey = form.caesarKey ? '' : 'Caesar cipher key is required.';
    if (!isLogin)
      formErrors.confirmPassword =
        form.password === form.confirmPassword
          ? ''
          : 'Passwords do not match.';
    setErrors(formErrors);
    console.log(formErrors);
    return Object.values(formErrors).every((x) => x === '');
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const onClickSignup = () => {
    if (isLogin) {
      navigate('/signup');
    } else {
      navigate('/login');
    }
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleVerifyOtp = async () => {
    try {
      await confirmSignUp({
        username: signUpInfo?.userId,
        confirmationCode: otp,
      });
      alert('Verification successful! You can now log in.');
      setShowOtpModal(false);
      navigate('/login');
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (signInError && window.confirm(signInError)) {
      setSignInError(null);
    }
  }, [signInError]);

  return (
    <div className="signup">
      <div className="signup-text"></div>
      <Container
        maxWidth="xs"
        className="signup-container"
        sx={{
          backgroundColor: '#ffffff',
          marginTop: '20px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: '20px',
          }}
        >
          <Typography
            component="h1"
            variant="h5"
            color="black"
            fontWeight="bold"
          >
            {isLogin ? `Login in` : `Sign Up`}
          </Typography>
          <Box component="form" onSubmit={onSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} display={isLogin && 'none'}>
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
              <Grid item xs={12} display={isLogin && 'none'}>
                <TextField
                  fullWidth
                  select
                  label="User Type"
                  name="userType"
                  value={form.userType}
                  onChange={onChange}
                  SelectProps={{
                    native: true,
                  }}
                >
                  <option value=""></option>
                  <option value="New User">New User</option>
                  <option value="Property Agent">Property Agent</option>
                </TextField>
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
              <Grid item xs={12} display={isLogin && 'none'}>
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
              <Grid item xs={12} display={isLogin && 'none'}>
                <Typography
                  component="h6"
                  variant="h6"
                  style={{ color: 'black', marginTop: '5px' }}
                >
                  Additional Security Questions
                </Typography>
              </Grid>
              <Grid item xs={12} display={isLogin && 'none'}>
                <TextField
                  fullWidth
                  label="What is your favorite color?"
                  name="answer1"
                  value={form.answer1}
                  onChange={onChange}
                  error={!!errors.answer1}
                  helperText={errors.answer1}
                />
              </Grid>
              <Grid item xs={12} display={isLogin && 'none'}>
                <TextField
                  fullWidth
                  label="Which is your favorite car?"
                  name="answer2"
                  value={form.answer2}
                  onChange={onChange}
                  error={!!errors.answer2}
                  helperText={errors.answer2}
                />
              </Grid>
              <Grid item xs={12} display={isLogin && 'none'}>
                <TextField
                  fullWidth
                  label="What is your favorite food?"
                  name="answer3"
                  value={form.answer3}
                  onChange={onChange}
                  error={!!errors.answer3}
                  helperText={errors.answer3}
                />
              </Grid>
              <Grid item xs={12} display={isLogin && 'none'}>
                <TextField
                  fullWidth
                  label="Caesar Cipher Key"
                  name="caesarKey"
                  value={form.caesarKey}
                  onChange={onChange}
                  error={!!errors.caesarKey}
                  helperText={errors.caesarKey}
                />
              </Grid>
              <Grid container spacing={2} display={!isLogin && 'none'}>
                <Grid item xs={6}>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    style={{ marginTop: '8px', paddingLeft: '20px', fontSize: '18px', paddingTop: '24px' }}
                  >
                    Caesar Code: {caesarCode}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Caesar Cipher Text"
                    name="caesarText"
                    type="text"
                    value={form.caesarText}
                    onChange={onChange}
                    error={!!errors.caesarText}
                    helperText={errors.caesarText}
                    margin="normal"
                  />
                </Grid>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {isLogin ? `Sign in` : `Sign Up`}
            </Button>
            {!isLogin ? (
              <Typography color="black">
                Have an account?{' '}
                <u className="cursor-pointer" onClick={onClickSignup}>
                  Sign in
                </u>
              </Typography>
            ) : (
              <Typography color="black">
                Create an account?{' '}
                <u className="cursor-pointer" onClick={onClickSignup}>
                  Sign up
                </u>
              </Typography>
            )}
          </Box>
        </Box>
      </Container>
      <Modal open={showOtpModal} onClose={() => setShowOtpModal(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" component="h2">
            Enter OTP
          </Typography>
          <TextField
            fullWidth
            label="OTP"
            value={otp}
            onChange={handleOtpChange}
            margin="normal"
          />
          <Button onClick={handleVerifyOtp} variant="contained" fullWidth>
            Verify OTP
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default Signup;

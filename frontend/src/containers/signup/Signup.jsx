import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box, Grid, Modal } from '@mui/material';
import { signUp, confirmSignUp, signIn } from 'aws-amplify/auth'
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
  });
  const [errors, setErrors] = useState({});
  const [otp, setOtp] = useState('');
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [signUpInfo, setSignUpInfo] = useState(null);

  const navigate = useNavigate();

  const onSubmit = async(e) => {
    e.preventDefault();
    if(isLogin) {
      console.log({
        username: form.email,
        password: form.password,
      })
      const res = await signIn({
        username: form.email,
        password: form.password,
      })
      console.log(res);
    } else {
      if(validate()) {
        try {
          const res = await signUp({
            username: form.email,
            password: form.password,
            attributes: { email: form.email, name: form.name }
          });
          setSignUpInfo(res);
          setShowOtpModal(true);
        } catch (error) {
          console.log(error.message);
        }
      }
    }
  };

  const validate = () => {
    let formErrors = {};
    formErrors.firstName = /^[A-Za-z]+$/.test(form.firstName) ? "" : "Name should contain only letter";
    formErrors.lastName = /^[A-Za-z]+$/.test(form.lastName) ? "" : "Name should contain only letters.";
    formErrors.email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) ? "" : "Invaid Email.";
    formErrors.password = form.password.length >= 8 ? "" : "Password must be at least 8 characters.";
    formErrors.confirmPassword = form.password === form.confirmPassword ? "" : "Passwords do not match.";
    setErrors(formErrors);
    return Object.values(formErrors).every(x => x === "");
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const onClickSignup = () => {
    if(isLogin) {
      navigate("/signup");
    } else {
      navigate("/login");
    }
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleVerifyOtp = async () => {
    try {
      await confirmSignUp({username: signUpInfo?.userId, confirmationCode: otp});
      alert('Verification successful! You can now log in.');
      setShowOtpModal(false);
      navigate('/login');
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className='signup'>
      <div className="signup-text"></div>
      <Container maxWidth="xs" className='signup-container' 
      sx={{
        backgroundColor: '#ffffff',
        marginTop: '20px'
      }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: '20px'
          }}
        >
          <Typography component="h1" variant="h5" color="black" fontWeight="bold">
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
              <Grid item xs={12}>
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
                  margin="normal"
                />
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
            {
              !isLogin ? 
                <Typography color="black">Have an account? <u className='cursor-pointer' onClick={onClickSignup}>Sign in</u></Typography>
                : <Typography color="black">Create an account? <u className='cursor-pointer' onClick={onClickSignup}>Sign up</u></Typography>}
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
          <Typography variant='h6' component='h2'>
            Enter OTP
          </Typography>
          <TextField
            fullWidth
            label='OTP'
            value={otp}
            onChange={handleOtpChange}
            margin='normal'
          />
          <Button onClick={handleVerifyOtp} variant='contained' fullWidth>
            Verify OTP
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default Signup;



// import React, { useState } from 'react';
// import { Container, TextField, Button, Typography, Box, Grid } from '@mui/material';
// import { signUp } from 'aws-amplify/auth'
// import './style.scss';

// const Signup = () => {
//   const [form, setForm] = useState({
//     name: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//     userType: '',
//   });
//   const [errors, setErrors] = useState({});

//   const onChange = (e) => {
//     const { name, value } = e.target;
//     setForm({ ...form, [name]: value });
//   };
  
//   const onSubmit = async(e) => {
//     e.preventDefault();
//     if(validate()) {
//       try {
//         await signUp({
//           username: form.email,
//           password: form.password,
//           attributes: { email: form.email, name: form.name }
//         });
//         alert('Sign-up successful! Please check your email for verification.');
//       } catch (error) {
//         console.log(error.message);
//       }
//     }
//   };

//   const validate = () => {
//     let formErrors = {};
//     formErrors.firstName = /^[A-Za-z]+$/.test(form.firstName) ? "" : "Name should contain only letter";
//     formErrors.lastName = /^[A-Za-z]+$/.test(form.lastName) ? "" : "Name should contain only letters.";
//     formErrors.email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) ? "" : "Invaid Email.";
//     formErrors.password = form.password.length >= 8 ? "" : "Password must be at least 8 characters.";
//     formErrors.confirmPassword = form.password === form.confirmPassword ? "" : "Passwords do not match.";
//     setErrors(formErrors);
//     return Object.values(formErrors).every(x => x === "");
//   };

//   return (
//     <div className='signup'>
//       <div className="signup-text"></div>
//       <Container maxWidth="xs" className='signup-container'>
//         <Box
//           sx={{
//             display: 'flex',
//             flexDirection: 'column',
//             alignItems: 'center',
//             marginTop: 8
//           }}
//         >
//           <Typography component="h1" variant="h5" style={{ color: 'black' }}>
//             Sign Up
//           </Typography>
//           <Box component="form" onSubmit={onSubmit} sx={{ mt: 3 }}>
//   <Grid container spacing={2}>
//     <Grid item xs={12}>
//       <TextField
//         fullWidth
//         label="Name"
//         name="name"
//         autoComplete="name"
//         value={form.name}
//         onChange={onChange}
//         error={!!errors.name}
//         helperText={errors.name}
//       />
//     </Grid>
//     <Grid item xs={12}>
//       <TextField
//         fullWidth
//         label="Email Address"
//         name="email"
//         autoComplete="email"
//         value={form.email}
//         onChange={onChange}
//         error={!!errors.email}
//         helperText={errors.email}
//       />
//     </Grid>
//     <Grid item xs={12}>
//       <TextField
//         fullWidth
//         select
//         label="User Type"
//         name="userType"
//         value={form.userType}
//         onChange={onChange}
//         SelectProps={{
//         native: true,
//         }}
//       >
//         <option value=""></option>
//         <option value="New User">New User</option>
//         <option value="Property Agent">Property Agent</option>
//       </TextField>
//     </Grid>
//     <Grid item xs={12}>
//       <TextField
//         fullWidth
//         name="password"
//         label="Password"
//         type="password"
//         autoComplete="new-password"
//         value={form.password}
//         onChange={onChange}
//         error={!!errors.password}
//         helperText={errors.password}
//       />
//     </Grid>
//     <Grid item xs={12}>
//       <TextField
//         label="Confirm Password"
//         name="confirmPassword"
//         type="password"
//         value={form.confirmPassword}
//         onChange={onChange}
//         error={!!errors.confirmPassword}
//         helperText={errors.confirmPassword}
//         margin="normal"
//       />
//     </Grid>
//   </Grid>
//   <Button
//     type="submit"
//     fullWidth
//     variant="contained"
//     sx={{ mt: 3, mb: 2 }}
//   >
//     Sign Up
//   </Button>
// </Box>

//         </Box>
//       </Container>
//     </div>
//   );
// };

// export default Signup;

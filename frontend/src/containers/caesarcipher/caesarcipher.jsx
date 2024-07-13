import React, { useEffect, useState } from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const CaesarCipher = () => {
  const [caesarCode, setCaesarCode] = useState('');
  const [caesarText, setCaesarText] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const storedCaesarCode = localStorage.getItem('caesarCode');
    if (storedCaesarCode) {
      setCaesarCode(storedCaesarCode);
    }
  }, []);

  const handleCaesarTextChange = (e) => {
    setCaesarText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (caesarText === caesarCode) {
      // Caesar cipher authentication successful
      navigate('/home'); // Redirect to the home page or dashboard
    } else {
      setError('Invalid Caesar Cipher Text');
    }
  };

  return (
    <Container maxWidth="xs" sx={{ backgroundColor: '#ffffff', marginTop: '20px' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
        <Typography component="h1" variant="h5" color="black" fontWeight="bold">
          Caesar Cipher Authentication
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Typography variant="body2" color="textSecondary" style={{ marginTop: '8px', paddingLeft: '20px', fontSize: '18px', paddingTop: '24px' }}>
            Caesar Code: {caesarCode}
          </Typography>
          <TextField
            fullWidth
            label="Caesar Cipher Text"
            name="caesarText"
            type="text"
            value={caesarText}
            onChange={handleCaesarTextChange}
            error={!!error}
            helperText={error}
            margin="normal"
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Verify
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default CaesarCipher;

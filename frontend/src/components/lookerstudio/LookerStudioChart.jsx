import React from 'react';
import Box from '@mui/material/Box';

const LookerStudioChart = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      sx={{
        border: '1px solid #ddd',
        boxShadow: 3,
        p: 2,
        backgroundColor: 'white',
      }}
    >
      <Box
        width="1000px"
        height="750px"
        sx={{
          border: '1px solid #ddd',
          boxShadow: 3,
          p: 2,
        }}
      >
        <h2 style={{ textAlign: 'center' }}>Login Statistics</h2>
        <iframe
          width="100%"
          height="100%"
          src="https://lookerstudio.google.com/embed/reporting/8c469485-f40c-473e-97f6-7fe08c113373/page/iVs6D"
          frameBorder="0"
          style={{ border: 0 }}
          allowFullScreen
          sandbox="allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
        ></iframe>
      </Box>
    </Box>
  );
};

export default LookerStudioChart;

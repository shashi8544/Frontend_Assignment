import React from 'react';
import FindCollege from './component/findCollege';
import { Container, Typography } from '@mui/material';

function App() {
  return (
    <Container>
      
      <Typography variant="h4" align="center" gutterBottom bgcolor={'yellow'} marginTop={'122px'}>
        Find your Respective College Information Here
      </Typography>
      <FindCollege/>
    </Container>
  );
}

export default App;

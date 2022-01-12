import React from "react"
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import "./InfoArea.styles.scss"

function InfoArea({heading,subheading,text}) {
  return (
      <div className="main">
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        {/* <Box sx={{ bgcolor: '#cfe8fc', height: '100vh' }} /> */}
        <h1>{heading}</h1>
        <h2>{subheading}</h2>
        <h6>{text}</h6>
      </Container>
    </React.Fragment>
    </div>
  );
}

export default InfoArea ;

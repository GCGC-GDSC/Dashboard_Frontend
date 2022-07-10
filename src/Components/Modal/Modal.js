import React from "react";
import "./Modal.css";
import CountUp from "react-countup";
import Box from "@mui/material/Box";
import Modal from '@mui/material/Modal';

function ModalC({ setOpenModal,modalOpen }) {
  const previewStyle = {
    // background: "#D3CCE3", 
    // background: "-webkit-linear-gradient(to right, #E9E4F0, #D3CCE3)",  
    background:" linear-gradient(to right, #E9E4F0, #D3CCE3)", 
  }    
  const stylePreview = {
    position: 'absolute',
    fontSize:"12px",
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '60%',
    maxHeight:"70vh",
    overflow:"auto",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    borderRadius:'10px',
    boxShadow: 24,
    p: 4,
  };
  return (
      <Modal
           aria-labelledby="modal-modal-title"
           aria-describedby="modal-modal-description"
          open={modalOpen}
          onClose={()=>setOpenModal(false)} 
        >
          <Box sx={stylePreview} style={previewStyle}>

                  <div className="title">
                  <h1>Placement Numbers</h1>
                  </div>
                  <div className="body body2">
                  <p>
                      Total Students Placed : <CountUp end={400} duration={2} />
                  </p>

                  <p>
                      Max Salary : <CountUp end={15} duration={3} />
                  </p>
                  </div>
          </Box>
        </Modal>
  );
}

export default ModalC;

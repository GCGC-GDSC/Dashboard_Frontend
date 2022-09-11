import React from "react";
import "./Modal.css";
import CountUp from "react-countup";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import ApartmentIcon from "@mui/icons-material/Apartment";
import GroupsIcon from "@mui/icons-material/Groups";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import FindReplaceIcon from "@mui/icons-material/FindReplace";

function ModalC({ setOpenModal, modalOpen }) {
  const previewStyle = {
    // background: "#D3CCE3",
    // background: "-webkit-linear-gradient(to right, #E9E4F0, #D3CCE3)",
    background: " linear-gradient(to right, #E9E4F0, #D3CCE3)",
  };
  const stylePreview = {
    position: "absolute",
    fontSize: "12px",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "60%",
    maxHeight: "70vh",
    overflow: "auto",
    bgcolor: "background.paper",
    border: "2px solid #000",
    borderRadius: "10px",
    boxShadow: 24,
    p: 4,
  };
  return (
    <Modal
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      open={modalOpen}
      onClose={() => setOpenModal(false)}
    >
      <Box sx={stylePreview} style={previewStyle}>
        <div className="title">
          <h1>2021-22 Placement Highlights</h1>
        </div>
        <div className="modalContentSection">
          <div className="item">
            <ApartmentIcon fontSize="large" />
            <div className="countup">
              <CountUp end={140} duration={2} /> +
            </div>
            <p>Companies</p>
          </div>
          <div className="item">
            <GroupsIcon fontSize="large" />
            <div className="countup">
              <CountUp end={1699} duration={2} />
            </div>
            <p>Students Placed</p>
          </div>

          <div className="item">
            <AutoFixHighIcon fontSize="large" />
            <div className="countup">
              <CountUp end={45} duration={2} /> L
            </div>
            <p>Highest Package</p>
          </div>

          <div className="item">
            <FindReplaceIcon fontSize="large" />
            <div className="countup">
              <CountUp end={45} duration={2} /> %
            </div>
            <p>Off Placements</p>
          </div>
        </div>
      </Box>
    </Modal>
  );
}

export default ModalC;

import React from "react";
import "./Modal.css";
import Modal from "@mui/material/Modal";
import HighlightsCard from "../HighlightsCard/HighlightsCard";
import {highlights_data} from "../../Pages/Highlights/Highlights_data.js"
function ModalC({ setOpenModal, modalOpen }) {
  // const previewStyle = {
  //   // background: "#D3CCE3",
  //   // background: "-webkit-linear-gradient(to right, #E9E4F0, #D3CCE3)",
  //   background: " linear-gradient(to right, #E9E4F0, #D3CCE3)",
  // };
  const {year,
    companies,
    placementOffers,
    highestPackage,
    studentsPlaced}  = highlights_data[0]
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
          <HighlightsCard year={year}
          companies={companies}
          placementOffers = {placementOffers}
          highestPackage = {highestPackage}
          studentsPlaced = {studentsPlaced}
          stylePreview= {stylePreview}
          />     
    </Modal>
  );
}

export default ModalC;

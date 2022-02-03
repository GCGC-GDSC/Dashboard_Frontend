import React, { useState } from "react"
import "./card.css"
import Box from '@mui/material/Box';
import VBar from "./VBar"
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
const Card = ({ company,index ,companySet}) => {

// experimental  --start
const [flag,setFlag] = useState(false)
let data = {}  //when a card is clicked we get the company data, using this data
// we have to populate the VBar, is VBar is should come as a popup on the screen
const [open, setOpen] = useState(false);
const handleOpen = () => setOpen(true);
const handleClose = () => setOpen(false);
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

    return( <>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h4" component="h2" style={{textTransform:'capitalize'}}>
              {company.name_of_the_company}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <VBar company={company}/>
            </Typography>
          </Box>
        </Modal>
        <div className="card" onClick={handleOpen}>
            <div className="card__title" style={{textTransform:'capitalize'}}>{company.name_of_the_company}</div>
            <div className="card__body">
                <div>{company.package}</div>
                <div>{company.profile_offered}</div>
            </div>
        </div>
    </>

    )
};

export default Card;
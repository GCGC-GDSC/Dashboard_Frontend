import * as React from 'react';
import Card from '@mui/material/Card';

import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

import Typography from '@mui/material/Typography';
import ClipboardCopy from "../CopyToClipboard/ClipboardCopy"
import { SocialIcon } from "react-social-icons";

import "./ProfileCardStyles.css";


export default function ProfileCard(props) {
  return (
    
    <Card  className='main_profile' sx={{ maxWidth: 345 }}>
      <CardMedia className='profile_pic'
        component="img"
        height="330"
        image={props.image}
        alt="image"
      />
      <CardContent className='content'>
        <Typography className = "name" gutterBottom variant="h5" component="div">
          {props.name}
        </Typography>
        <Typography className = "role" variant="body2" fontSize={"1.2rem"} color={props.role === "Guide and Mentor"?"darkorange":"green"}>
            {props.role}
        </Typography>
        <Typography className = "registration" variant="body2" color="text.secondary" >
            {props.registration}
        </Typography>
        <Typography  className = {props.role === "Backend Developer" || props.role==="Frontend Developer" ? "isCursive" : ""} variant="body2"  color="text.secondary" >
            {props.position}
        </Typography>
      </CardContent>
      <div className="socialIcons">
      <SocialIcon url={props.linkdin} style={{ height: 30, width: 30 }} />
      <ClipboardCopy copyText={props.email}/>
      </div>
    </Card>

  );
}

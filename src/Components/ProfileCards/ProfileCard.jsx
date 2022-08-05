import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { SocialIcon } from "react-social-icons";
import Typography from "@mui/material/Typography";
import "./ProfileCardStyles.css";

export default function ProfileCard({ member }) {
  return (
    <Card className="main_profile" sx={{ maxWidth: 345 }}>
      <CardMedia
        className="profile_pic"
        component="img"
        height="330"
        image={member.picture}
        alt={`${member.name}'s_picture`}
      />
      <CardContent className="content">
        <Typography className="name" gutterBottom variant="h5" component="div">
          {member.name}
        </Typography>
        <Typography
          className="role"
          variant="body2"
          fontSize={"1.5rem"}
          color={member.role === "Frontend Developer" ? "red" : "blue"}
        >
          {member.role}
        </Typography>
        <Typography
          className="registration"
          variant="body2"
          color="text.secondary"
        >
          {member.rollnumber}
        </Typography>
        <Typography
          className={
            member.role === "Backend Developer" ||
            member.role === "Frontend Developer"
              ? "isCursive"
              : ""
          }
          variant="body2"
          color="text.secondary"
        >
          {member.description}
        </Typography>
      </CardContent>
      <div className="socialIcons">
        <SocialIcon url={member.linkedin} style={{ height: 30, width: 30 }} />
        <SocialIcon url={member.github} style={{ height: 30, width: 30 }} />
        <SocialIcon url={member.website} style={{ height: 30, width: 30 }} />
      </div>
    </Card>
  );
}

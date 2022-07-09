import React from "react";
import "./ProfileCard.scss"
import { SocialIcon } from 'react-social-icons';

// import avatar from "../images/image-rita.png";

function MentorProfileCard(member) {
	return(
        <div className="card-container">
            <div className="picture">
                <img src={member.picture}
                 alt={`${member.name}'s_picture`}/>
            </div>
            <div className="content">
                <div>
                    <p className="name">{member.name}</p>
                    <p className="mentorRole">{member.role}</p>
                    <p className="desc">
                    {member.description}
                    </p>
                </div>
                <div className="icons">
                    <SocialIcon url={member.linkedin} style={{ height: 30, width: 30 }} />
                </div>
            </div>
        </div>
    )
}

export default MentorProfileCard;
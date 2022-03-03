import { SocialIcon } from 'react-social-icons';
import "./ProfileCard.scss"
const ProfileCard = ({member}) => {
    return(
        <div className="card-container">
            <div className="picture">
                <img src={member.picture}
                 alt={`${member.name}'s_picture`}/>
            </div>
            <div className="content">
                <div>
                    <p className="name">{member.name}</p>
                    <p className={`${member.role.toLowerCase()}`} >{member.role}</p>
                    <p className="rollno">{member.rollnumber}</p>
                    <p className="desc">
                    {member.description}
                    </p>
                </div>
                <div className="icons">
                    <SocialIcon url={member.linkedin} style={{ height: 30, width: 30 }} />
                    <SocialIcon url={member.github} style={{ height: 30, width: 30 }} />
                    <SocialIcon url={member.website} style={{ height: 30, width: 30 }} />
                    {/* <a href={member.name}><SocialIcon url={member.name} style={{ height: 30, width: 30 }} /></a> */}
                </div>
            </div>
        </div>
    )
}
export default ProfileCard;

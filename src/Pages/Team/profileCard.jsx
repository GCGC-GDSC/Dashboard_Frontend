import { SocialIcon } from 'react-social-icons';
import "./ProfileCard.css"
const ProfileCard = () => {
    return(
        <div className="teamcontainer">
            <div className="picture">
                <img src="https://avatars.githubusercontent.com/u/54280958?v=4" alt="Team Memeber image should be here" />
            </div>
            <div className="content">
            <p className="name">Krishna Chaitanya</p>
            <p className="role">FrontEnd Developer</p>
            <p className="rollno">121910302022</p>
            <p className="desc">Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti assumenda voluptatem pariatur a, dolores nesciunt sit eum eius corrupti error?</p>
            <div className="icons">
            <a href=''><SocialIcon url="https://twitter.com/jaketrent" style={{ height: 30, width: 30 }} /></a>
            <a href=''><SocialIcon url="https://instagram.com/jaketrent" style={{ height: 30, width: 30 }} /></a>
            <a href=''><SocialIcon url="https://linkedin.com/jaketrent" style={{ height: 30, width: 30 }} /></a>
            <a href=''><SocialIcon url="https://github.com/jaketrent" style={{ height: 30, width: 30 }} /></a>

            </div>
        </div>
        </div>
    )
}
export default ProfileCard;

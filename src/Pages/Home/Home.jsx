import React, { useEffect ,useState,useContext} from 'react'
import "./Home.scss"
// import HeroText from "../../Components/HeroText/HeroText"
// import Aos from "aos"
import "aos/dist/aos.css"
import Footer from '../../Components/Footer/Footer'
import BasicTabs from "../../Components/Tabs/Tabs"
import Snackbar from '@mui/material/Snackbar';
import { UserContext } from '../../context/context';
function Home() {
    const user = useContext(UserContext)
    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
      };
    useEffect(() => {
        // Aos.init({})
        if(user)setOpen(true)
    },[user])
    return ( 
        
        <div className='homePage'> 
        <Snackbar
          anchorOrigin={{ vertical:"bottom", horizontal:"left" }}
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        message={`Welcome ${user.user.name}`}
            />
        <main className='main_section'>
            <BasicTabs/>
        </main>
            <Footer/>
        </div>
    )
}

export default Home

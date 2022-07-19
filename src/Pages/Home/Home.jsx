import React, { useEffect ,useState,useContext} from 'react'
import "./Home.scss"
// import HeroText from "../../Components/HeroText/HeroText"
// import Aos from "aos"
import "aos/dist/aos.css"
import Footer from '../../Components/Footer/Footer'
import BasicTabs from "../../Components/Tabs/Tabs"
import Snackbar from '@mui/material/Snackbar';
import { UserContext } from '../../context/context';
import ModalC from '../../Components/Modal/Modal'
function Home() {
    const user = useContext(UserContext)

    const [open, setOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(true);
    const [firstTime,setFirstTime] = useState(false)
    
    const handleClose = () => {
        setOpen(false);
      };
    const tryingThis = () => {
        if (sessionStorage.getItem('firstTime')){
            setFirstTime(false)
        }
        else{
            sessionStorage.setItem('firstTime',true)
            setFirstTime(true)
        }
        
    }
    useEffect(() => {
        if(user)setOpen(true)
        tryingThis()

    },[user])
    return ( 
        
        <div className='homePage'> 
        { firstTime ? 
        <ModalC setOpenModal={setModalOpen} modalOpen={modalOpen} /> 
        : null}
 
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

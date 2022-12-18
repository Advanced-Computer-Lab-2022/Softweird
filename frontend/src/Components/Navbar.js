import Searchbar  from "./Searchbar"
import CountryDropBox from "./countryDropBox"
import { AppBar, styled, Typography ,Box, Avatar} from "@mui/material"
import { Toolbar } from "@mui/material"
import { ThemeContext } from "@emotion/react"
import { borderRadius, fontWeight } from "@mui/system"
import { InputBase } from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Button } from "@mui/material"
import PublicIcon from '@mui/icons-material/Public';
import { Container,Stack } from "@mui/material"
import NavTrainee from './NavTrainee'
import { Divider } from "@mui/material"
import NavCorporate from './NavCorporate'
import NavInstructor from "./NavInstructor"
import Logo from '../Images/Logo.png'
import LogoShort from '../Images/LogoShort.png'
import {useAuth} from '../Components/auth'
import {NavLink} from 'react-router-dom'
import { Route } from 'react-router-dom';
import {Outlet,Navigate} from 'react-router-dom'

const StyledToolbar = styled(Toolbar)({
    display:"flex",
    justifyContent:"space-between"

})

const Search =styled("div")(({theme}) => ({
    backgroundColor:"white",
    padding:"0 10px",
    borderRadius:theme.shape.borderRadius,
    width:"25%",
    position:"relative"


}));


const Icons = styled (Box)({
    display:"flex",
    alignItems:"center",
    
    


})


const Navbar= ({children})=> {
    const auth= useAuth() 
 
return (
<>
        <AppBar position="sticky" sx={{padding:{sm:"0.9rem",xs:"0.5rem"},backgroundColor:"#c50d0d",boxShadow:"none",mb:"2rem",pb:"1rem"}}>
            <Container>
            <StyledToolbar>
               <Box sx={{ width:"10%" , display:{md:"block" , sm:"none",xs:"none"}}}>
               <NavLink to='/'>  <img  src={Logo} style={{width:"190%"}} />
               </NavLink> 
                </Box>
                
                <Box sx={{ display:{md:"none" , sm:"block",xs:"block"}}}>
                  <NavLink to='/'><img  src={LogoShort} style={{width:"45%"}}/></NavLink>  
                </Box>
               <Searchbar/>
               <Stack direction = "row"  gap={2}>
                 <Icons sx={{ display:{sm:"flex",xs:"none"}}}>
                 <Box sx={{maxWidth:"10vw"}}><CountryDropBox /></Box>
                {!auth.user && 
                 <NavLink to='/login' style={{textDecoration:"none"}}>
                 <Button variant="contained" sx={{backgroundColor:"#bbd2b1" ,fontWeight:"bold",ml:"0.8rem",
                boxShadow:"none", textDecoration:"none",
                "&:hover":{
                    cursor: "pointer",
                    color:"#bbd2b1",
                    backgroundColor:"#fff"

                    }}}>LOGIN</Button>
                    </NavLink>}
                    
              
                 </Icons>
                {auth.user && 
                <>
                <Divider orientation="vertical" variant="middle" flexItem sx={{backgroundColor:"black"}}/> 
                {auth.user.type=='individual' && <NavTrainee/>}
                {auth.user.type=='instructor' && <NavCorporate /> }
                {auth.user.type=='corporate' && <NavInstructor/> }
                </>}
                
                 </Stack>
            </StyledToolbar>
            </Container>
           </AppBar>
           <Container sx={{mt:"5%",pb:"3rem"}} >
            <Outlet />
            </Container>
          
         
           </>
)   
    
}

export default Navbar
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
function Navbar () {

    return(
<>
        <AppBar position="sticky" sx={{padding:{sm:"0.9rem",xs:"0.5rem"},backgroundColor:"#EC6A37",boxShadow:"none",mb:"2rem",pb:"1rem"}}>
            <Container>
            <StyledToolbar>
                <Box sx={{ width:"10%" , display:{md:"block" , sm:"none",xs:"none"}}}>
                    <img  src={Logo} style={{width:"190%"}} />
                </Box>
                <Box sx={{ display:{md:"none" , sm:"block",xs:"block"}}}>
                    <img  src={LogoShort} style={{width:"45%"}}/>
                </Box>
               <Searchbar/>
               <Stack direction = "row"  gap={2}>
                 <Icons sx={{ display:{sm:"flex",xs:"none"}}}>
                 <Box sx={{maxWidth:"10vw"}}><CountryDropBox /></Box>
                 <Button variant="contained" sx={{backgroundColor:"#bbd2b1" ,fontWeight:"bold",ml:"0.8rem",
                boxShadow:"none",
                "&:hover":{
                    cursor: "pointer",
                    color:"#bbd2b1",
                    backgroundColor:"#fff"

                    }}}>LOGIN</Button>
              
                 </Icons>
                 {/* <Divider orientation="vertical" variant="middle" flexItem sx={{backgroundColor:"black"}}/> */}
                
                 {/* <NavTrainee/> */}
                 {/* <NavCorporate /> */}
                 {/* <NavInstructor/> */}
                 </Stack>
            </StyledToolbar>
            </Container>
           </AppBar>
          
          
           </>
        // <div >

        // <CountryDropBox />
        // <Searchbar />
        
        // </div>
    )
}
export default Navbar
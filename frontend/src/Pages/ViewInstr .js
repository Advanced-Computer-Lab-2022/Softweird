import axios from 'axios';
import React,{ useState, useEffect, useContext, useRef } from 'react';
import Box from '@mui/material/Box';
import { Stack } from '@mui/material';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import RateReviewRoundedIcon from '@mui/icons-material/RateReviewRounded';
import Rev from '../Components/OneComponent/Reviews'
import InstCourses from '../Components/OneComponent/ViewInstCourses'
import BadgeIcon from '@mui/icons-material/Badge';
import Rating from '@mui/material/Rating';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import Divider from '@mui/material/Divider';
import FemaleOutlinedIcon from '@mui/icons-material/FemaleOutlined';
import MaleOutlinedIcon from '@mui/icons-material/MaleOutlined';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import CampaignRoundedIcon from '@mui/icons-material/CampaignRounded';
import {InstructorProfile} from '../Context/InstructorProfile'
import Slider from "react-slick";
import SkeletonsList from '../Components/OneComponent/SkeletonsList';
import { useNavigate } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import {OneCourseResult} from '../Context/OneCourseResult'
//Orange ==> #EC6A37
//Greeen ==> #BBD2B1

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function ViewInstr ({instId}){


 
  const {openInst,setOpenInst} = useContext(OneCourseResult)
const[loading,setLoading]=useState(true)
      const [inst,setProfile] = useState([]);  
      const [user, setUser] = useState([]);
      const[gender, setGender] = useState(false);
      const [myCourse,setMyCourse]=useState([])
   
  
      useEffect(() =>{
        setLoading(true)
       if(instId!=undefined){
        let cancel
         axios({
             method:"GET",
             url : `/Instructor/myprofile/${instId}`,
             cancelToken: new axios.CancelToken (c => cancel = c)
         }).then (res => {
        
             //setLoading(false)
             setProfile(res.data)  //all inst
             setUser(res.data.user)  //user info

             if(res.data.user.gender==="Female"){
              setGender(true)
             }

          axios({
              method:"GET",
              url : `/Instructor/instCourses/${instId}`,
          }).then (res => {
              setLoading(false)
             
              setMyCourse(res.data)
              
 
          })
            
            
         }).catch(e=>{
          console.log(e);
             if(axios.isCancel(e)) return 
         })
         return () => cancel ()
        }
     }, []);

    
     const handleClose = () => {
      setOpenInst(false);
     
    };


      const card2 = (
        <Card >
       <CardContent >
           
             <Typography variant="h5" component="div">
               Biography 
             </Typography>
             
             <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
             {inst.biography}
             </Typography>
           </CardContent>
           <CardActions>
           
           </CardActions>
        </Card>
       
       );

      
    return (
      <>
     { inst && !loading && user &&
     <InstructorProfile.Provider value={{inst,gender, setProfile, setLoading,user,setUser, loading,myCourse, setMyCourse }}>
 
 <Dialog
        fullScreen
        open={openInst}
        onClose={handleClose}
        TransitionComponent={Transition}
        sx={{backgroundColor:"lightgray"}}
      >
        <AppBar sx={{ position: 'relative' ,backgroundColor:"#c50d0d" ,position:"sticky",top:0}}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
               Instructor Profile
            </Typography>
            
          </Toolbar>
        </AppBar>
<Box sx={{    width: "90%",
    position: "relative",
    left: "5%",}}>
      <Stack direction={"column"} position={"relative"}  >
      <Stack direction={"column"} gap={4} sx={{paddingBottom:"3%"}}>
<Box sx={{width:'100%', marginTop: '3rem' }}>
    
  <div className='wire2'></div>
  <div className='pin'></div>
  <Card className="personalInfo" >
    <CardContent sx={{overflow:"auto"}}>
 <Stack direction={"row"} gap={7} padding="3rem">
 <Stack direction={"column"} gap={2} alignItems={'center'}> 
 <Avatar src="/static/images/avatar/1.jpg"  diplay="flex"  sx={{ width: 170, height: 170 }}/>
 
    
      </Stack>
      <Divider orientation="vertical" flexItem color={"#d3d3d3"}/>
    <Stack direction={"column"} gap={2} alignSelf={"center"}>
    <Typography sx={{ fontSize: "2rem"}} color="000" >
     {user.fName + " " + user.lName}
      </Typography>
      <Typography sx={{ fontSize: "1.2rem"}} color="000" display="flex" alignItems={"end"}>
      <BadgeIcon sx={{fontSize:"2rem", marginRight:"0.5rem", color:"#BBD2B1"}}/> { user.username}
      </Typography>
      <Typography sx={{ fontSize: "1.2rem"}} color="000">
      <EmailRoundedIcon sx={{fontSize:"2rem", marginRight:"0.5rem", color:"#BBD2B1"}}/>  {user.email}
      </Typography>
      <Typography fontSize={"1.1rem"}>
        
        <div>{ gender ? <FemaleOutlinedIcon sx={{fontSize:"2rem",marginRight:"0.5rem", color:"#BBD2B1"}}/>  : <MaleOutlinedIcon sx={{fontSize:"2rem", marginRight:"0.5rem", color:"#BBD2B1"}}/> } {inst.user.gender}</div> 
       
      </Typography>
    
    </Stack>
     
 </Stack>
    </CardContent>
    </Card>
   
    </Box>
    </Stack>
    
      
          <Stack direction={"row"} gap={1} sx={{paddingTop:'2rem', paddingBottom:'2rem', position:"relative", alignItems:"center"}} >
        <Stack direction={"row"} sx={{paddingRight:'1rem'}}>
        <DirectionsWalkIcon />
         < CampaignRoundedIcon/>
        </Stack>
       
        <Box sx={{ width: '100%', paddingBottom:"2rem", paddingTop:"2rem"}}  >
             <Card variant="outlined" sx={{overflow:'auto'}}>{card2}</Card> 
        </Box>
          </Stack>
         
          <Box>
 <Divider sx={{ fontSize: "1.5rem", paddingBottom:"3%"}} >Progress</Divider>
 <Stack direction="row" gap={0.7} paddingBottom={"4%"}>
       <Typography variant="h5" component="div" paddingRight={"0.5rem"} >
            <RateReviewRoundedIcon sx={{fontSize:"1.5rem", marginRight:"0.5rem", color:"#BBD2B1"}}/>
            {user.fName + " " + user.lName + "'s"}  Rating:
         </Typography>
            <Typography sx={{fontSize:"0.87rem"}} paddingTop={"0.3rem"} >{inst.rating.rate.$numberDecimal}</Typography> 
             <Rating 
             name="text-feedback1"
             value={inst.rating.rate.$numberDecimal}
             readOnly
            precision={0.5}
             size='small'
            sx={{alignItems:"center"}} />
             <Typography sx={{fontSize:"0.87rem"}} paddingTop={"0.3rem"}>({inst.rating.numberPeople})</Typography>
             </Stack>
             <Box sx={{paddingBottom:"3%"}}>
            {inst.reviews && inst.reviews.length!=0 && <Rev instructor={inst}/>}
             </Box>
        </Box>
        
       {loading && <>  
         <Slider>
        <SkeletonsList/>
        </Slider>
          </>}
        {!loading && <InstCourses/>}
     
       
  </Stack>
  </Box>

      
</Dialog>
        </InstructorProfile.Provider> }
        </>
    );
       
}



export default ViewInstr
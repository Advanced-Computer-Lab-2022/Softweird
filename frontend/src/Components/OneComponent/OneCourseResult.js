import './OneCourseResult.css'
import {Link} from 'react-router-dom'
import {Currency} from '../../Context/Currency'
import {useContext} from 'react'
import { useEffect,useState } from "react";
import Paper from '@mui/material/Paper';
import { createTheme } from '@mui/material/styles';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star'
import CircleIcon from '@mui/icons-material/Circle';
import Coding from '../../Images/Coding.jpg'
import './OneCourseResult.css'
import { Stack } from '@mui/system';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useTheme } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import { Box, Container } from '@mui/material';
import Divider from '@mui/material/Divider';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import VerifiedIcon from '@mui/icons-material/Verified';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import { useAuth } from '../auth';
import PendingIcon from '@mui/icons-material/Pending';
import Mathematics from '../../Images/Mathematics.jpeg'
import DataScience from '../../Images/DataScience.png'
import ComputerScience from '../../Images/Computer Science.jpg'
import CloudComputing from '../../Images/Cloud Computing.jpeg'
import ArtificialIntelligence from '../../Images/Artificial Intelligence.jpg'
import CyberSecurity from '../../Images/Cyber Security.jpeg'
import Sciences from '../../Images/Sciences.jpeg'
import Business from '../../Images/Business.jpg'
import OneCourse from '../../Pages/OneCourse';



function OneCourseResult ({Onecourse,myCourse}) {
  const auth = useAuth()
    const {curr , setCurr ,rate,setRate} = useContext(Currency) 
   
    const theme = useTheme();





    return (

 <Container sx={{position:"relative" ,m:"0",p:"0"}}>
<Card variant="outlined" className="stack1" sx={{ display: 'flex',
"&:hover":{
    cursor: "pointer",
    boxShadow: "0 3px 4px rgba(0,0,0,.12), 0 3px 4px rgba(0,0,0,.06)",

} }} onClick={() => window.location.href=`/Courses/${Onecourse.title}`} >
<CardMedia
  component="img"
  sx={{ width: "35%",borderRadius:"25px",padding:"3%" }}
  image= {(Onecourse.subject=="Mathematics"&& Mathematics)||
  (Onecourse.subject=="Computer Science"&& ComputerScience)||
  (Onecourse.subject=="Artificial Intelligence"&& ArtificialIntelligence)||
  (Onecourse.subject=="Sciences"&& Sciences)||
  (Onecourse.subject=="Cyber Security"&& CyberSecurity)||
  (Onecourse.subject=="Cloud Computing"&& CloudComputing)||
  (Onecourse.subject=="Business"&& Business) ||
  (Onecourse.subject=="Data Science"&& DataScience)
}


/>
<p className="stack2"></p>
<Box sx={{ display: 'flex', flexDirection: 'column',width:"100%",pl:"1rem" }}>
  <CardContent  sx={{ flex: '1 0 auto' ,pt:"5%"

  }}>
    <Typography component="div" variant="h4" sx={{fontSize:"1.7rem"}}>
      {Onecourse.title}
    </Typography>
    <Stack direction="row" sx={{pt:1,pb:"15px"}} alignItems="center" position="relative">
    <Typography variant="h6" color="text.secondary" component="div" > 
    {Onecourse.subject}

    </Typography>

  

    



    {auth.user ?

     
    <>
    {/*  For Registered Students Corporates&individual*/}
    {(auth.user.type=="individual" || auth.user.type=="corporate") ?
    <>
   
    {/*  For certified Students individual and Corporate*/}
    {myCourse.courseInfo.some(c=>c.course==Onecourse._id && c.certificate !="")&&
     <Stack position="absolute" right="15%" direction="row" gap={0.5}>
    <VerifiedIcon fontSize={"1rem"}sx={{color:"#faaf00"}}/>
    <Typography  fontSize={"0.8rem"} color={"grey"}> Certified</Typography>
    </Stack> }
    {auth.user.type=="individual" && 
    myCourse.courseInfo.some(c=>c.course==Onecourse._id && c.certificate =="" && (c.refund.set==false
      || (c.refund.set==true && c.refund.state=="rejected")))&&
      <Stack position="absolute" right="15%" direction="row" gap={0.5}>
      <TaskAltIcon fontSize={"1rem"}sx={{color:"green"}}/>
      <Typography  fontSize={"0.8rem"} color={"grey"}> Registered</Typography>
      </Stack> }

      {auth.user.type=="individual"  && myCourse.courseInfo.some(c=> c.course==Onecourse._id &&
      c.refund.set ==true &&  c.refund.state =="pending") &&
     <Stack position="absolute" right="10%" direction="row" gap={0.5}>
    <PendingIcon fontSize={"1rem"}sx={{color:"#c50d0d"}}/>
    <Typography  fontSize={"0.8rem"} color={"grey"}>  Pending Refund Request </Typography>
    </Stack> }

    </> 
    :<></>}
     
     { auth.user.type=="corporate" ? 
     <>
      {myCourse.courseInfo.some(c=>c.course==Onecourse._id && c.certificate =="") && 
      <Stack position="absolute" right="15%" direction="row" gap={0.5}>
      <TaskAltIcon fontSize={"1rem"}sx={{color:"green"}}/>
      <Typography  fontSize={"0.8rem"} color={"grey"}> Registered</Typography>
      </Stack>}

      {myCourse.accessRequests.some(c=>c.course==Onecourse._id && c.state =="pending") && 
      <Stack position="absolute" right="15%" direction="row" gap={0.5}>
      <PendingIcon fontSize={"1rem"}sx={{color:"#c50d0d"}}/>
    <Typography  fontSize={"0.8rem"} color={"grey"}>  Pending Access Request </Typography>
      </Stack>}
</>
      :<></> }
     {/* Instructor Courses*/}
    {auth.user.type=="instructor"&& Onecourse.instructor_id==auth.user.id ?
     <Stack position="absolute" right="15%" direction="row" gap={0.5}>
     <CollectionsBookmarkIcon fontSize={"1rem"}sx={{color:"green"}}/>
    <Typography  fontSize={"0.8rem"} color={"grey"}> Mine</Typography>
    </Stack> :<></>}
    </>:<></>}
    </Stack>
    <Typography variant="p" component="div" sx={{maxHeight:"10rem",overflow:"auto", pb:3,fontSize:"0.8rem "}}>
   {Onecourse.summary}
    </Typography>
    <Divider sx={{backgroundColor:"black"}}/>
  </CardContent>
 
  <Box sx={{ display: 'flex', justifyContent:"space-between", pl: 2, pb: 1 ,pr:4 ,color:"darkgrey" }}>
 <Stack direction="row">
      <Typography variant="p" component="div" sx={{fontSize:"0.8rem",pr:1.5}}>{Onecourse.subtitles.length} subtitles </Typography>
            <AccessTimeIcon sx={{fontSize:"1rem"}} />
           <Typography variant="p" component="div" sx={{fontSize:"0.8rem", pl:"5px"}}>{Onecourse.totalHours<60?Onecourse.totalHours+ " min" :
                Math.round(Onecourse.totalHours*10)/10+ " hrs"} </Typography>
           </Stack>
           <Stack direction="row" gap={0.5}>
            <Typography sx={{fontSize:"0.8rem"}} >{Onecourse.rating.$numberDecimal}</Typography>
             <Rating 
             name="text-feedback"
             value={Onecourse.rating.$numberDecimal}
             readOnly
            precision={0.5}
          
           
             size='small'/>
             <Typography sx={{fontSize:"0.8rem"}} >({Onecourse.numberRating})</Typography>
             </Stack>
  </Box>
</Box>

</Card>
{// promotion courses
}
 <div>
        {(Onecourse.promotionInst.set || Onecourse.promotionAdmin.set)&& auth.user && auth.user.type!="corporate"&&
       <div className='sale'>
        <div className="paper red ">
        <div className="tape-section"></div>
        <p style={{textAlign:"center" , paddingTop:"1rem" , fontSize:"small"}}>Offer</p>
        </div>
        </div>}
        </div>
{// free courses
}
        <div>
        {(Onecourse.price == "Free")&& auth.user && auth.user.type!="corporate"&&
       <div className='sale'>
        <div className="paper red ">
        <div className="tape-section"></div>
        <p style={{textAlign:"center" , paddingTop:"1rem" , fontSize:"small"}}>Free</p>
        </div>
        </div>}
        </div>

        <div>
        { auth.user && auth.user.type=="corporate"&& myCourse.company.courses.some(c=>c.course==Onecourse._id && c.level<=myCourse.level) &&
       <div className='sale'>
        <div className="paper red ">
        <div className="tape-section"></div>
        <p style={{textAlign:"center" , paddingTop:"1rem" , fontSize:"small"}}>Free</p>
        </div>
        </div>}
        </div>
        
        
</Container>
       
    )
}
export default OneCourseResult
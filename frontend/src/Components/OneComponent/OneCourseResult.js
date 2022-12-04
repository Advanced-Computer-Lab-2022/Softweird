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


function OneCourseResult ({Onecourse}) {
    const {curr , setCurr ,rate,setRate} = useContext(Currency) 
    const theme = useTheme();
    return (
//         <div style= {{position:"relative"}}>
//         <div className="card"  onClick={() => window.location.href=`/OneCourse?course=${Onecourse._id}`}>
//         <Stack direction={"row"}>
//         <img src={DataScience}/>
//         <Stack >
//         <h5 className="card-header fs-3 pb-0" style={{backgroundColor:"#fff",border:"none"}}>Computer Science</h5>
//         <Stack className="card-body ">
//             <h5 className="card-title fs-4 pb-3" >
//                 <span>{Onecourse.subject}</span>
//             </h5>
//             <p className="card-text" style={{overflowX:"hidden"}} >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam , quis nostrud exercitation ullamco laboris nisi</p>
//            <hr></hr>
//             <Stack direction={"row"} alignItems={"self-end"} sx={{color:"grey"}} gap={"15vw"}>
//             <p className="card-text subtitle" >
//             <span>{Onecourse.subtitles.length} subtitles </span>
//             <AccessTimeIcon fontSize="small" sx={{verticalAlign:"bottom"}}/>
//             <span className="hours">{Onecourse.totalHours} hours</span>
//             </p>
//             <p className="card-text rating" > 
//             <span >{Onecourse.rating}</span>
//             <Rating 
//             name="text-feedback"
//             value={Onecourse.rating}
//             readOnly
//             precision={0.5}
          
           
//             size='small'/>
//             <span >({Onecourse.numberRating})</span>
//             </p>
//             </Stack>
//             </Stack>
           
//          </Stack>
        
//         </Stack>
//        </div>
//       {/* {(Onecourse.promotionInst.set || Onecourse.promotionAdmin.set)&& */}
//        <div className='sale'>
//         <div className="paper red ">
//         <div className="tape-section"></div>
//         <p style={{textAlign:"center" , paddingTop:"1rem"}}>Offer</p>
      
//         </div>
        
//         </div>
 <Container sx={{position:"relative" ,m:"0",p:"0"}}>
<Card variant="outlined" className="stack1" sx={{ display: 'flex',
"&:hover":{
    cursor: "pointer",
    boxShadow: "0 3px 4px rgba(0,0,0,.12), 0 3px 4px rgba(0,0,0,.06)",

} }} onClick={() => window.location.href=`/OneCourse?course=${Onecourse._id}`} >
<CardMedia
  component="img"
  sx={{ width: "35%",borderRadius:"25px",padding:"3%" }}
  image={Coding}
  alt="Live from space album cover"
/>
<p className="stack2"></p>
<Box sx={{ display: 'flex', flexDirection: 'column' }}>
  <CardContent  sx={{ flex: '1 0 auto' ,

  }}>
    <Typography component="div" variant="h4">
      {Onecourse.title}
    </Typography>
    <Stack direction="row" sx={{pt:1,pb:3}} alignItems="center" position="relative">
    <Typography variant="h6" color="text.secondary" component="div" > 
    {Onecourse.subject}
    </Typography>
    
    {/*  For Registered Students Corporates&individual*/}
    {/* <Stack position="absolute" right="15%" direction="row" gap={0.5}>
    <TaskAltIcon fontSize={"1rem"}sx={{color:"green"}}/>
    <Typography  fontSize={"0.8rem"} color={"grey"}> Registered</Typography>
    </Stack> */}
    {/*  For certified Students individual and Corporate*/}
     {/* <Stack position="absolute" right="15%" direction="row" gap={0.5}>
    <VerifiedIcon fontSize={"1rem"}sx={{color:"#faaf00"}}/>
    <Typography  fontSize={"0.8rem"} color={"grey"}> Certified</Typography>
    </Stack>  */}
    {/*  Instructor Courses*/}
    {/* <Stack position="absolute" right="15%" direction="row" gap={0.5}>
     <CollectionsBookmarkIcon fontSize={"1rem"}sx={{color:"green"}}/>
    <Typography  fontSize={"0.8rem"} color={"grey"}> Mine</Typography>
    </Stack> */}
    </Stack>
    <Typography variant="p" component="div" sx={{maxHeight:"10rem",overflow:"auto", pb:3 }}>
   {Onecourse.summary}
    </Typography>
    <Divider sx={{backgroundColor:"black"}}/>
  </CardContent>
 
  <Box sx={{ display: 'flex', justifyContent:"space-between", pl: 2, pb: 1 ,pr:4 ,color:"darkgrey" }}>
 <Stack direction="row">
      <Typography variant="p" component="div" sx={{fontSize:"0.87rem",pr:1.5}}>{Onecourse.subtitles.length} subtitles </Typography>
            <AccessTimeIcon fontSize="small" />
           <Typography variant="p" component="div" sx={{fontSize:"0.87rem", pl:1}}>{Onecourse.totalHours} hours</Typography>
           </Stack>
           <Stack direction="row" gap={0.5}>
            <Typography sx={{fontSize:"0.87rem"}} >{Onecourse.rating.$numberDecimal}</Typography>
             <Rating 
             name="text-feedback"
             value={Onecourse.rating.$numberDecimal}
             readOnly
            precision={0.5}
          
           
             size='small'/>
             <Typography sx={{fontSize:"0.87rem"}} >({Onecourse.numberRating})</Typography>
             </Stack>
  </Box>
</Box>

</Card>
{// promotion courses
}
 <div>
        {(Onecourse.promotionInst.set || Onecourse.promotionAdmin.set)&& 
       <div className='sale'>
        <div className="paper red ">
        <div className="tape-section"></div>
        <p style={{textAlign:"center" , paddingTop:"1rem" , fontSize:"2.5vh"}}>Offer</p>
        </div>
        </div>}
        </div>
{// free courses
}
        <div>
        {(Onecourse.price == "Free")&& 
       <div className='sale'>
        <div className="paper red ">
        <div className="tape-section"></div>
        <p style={{textAlign:"center" , paddingTop:"1rem" , fontSize:"2.5vh"}}>Free</p>
        </div>
        </div>}
        </div>
        
        
</Container>
       
    )
}
export default OneCourseResult
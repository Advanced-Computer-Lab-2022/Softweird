import './OneCourseResult.css'
import {Currency} from '../../Context/Currency'
import {useContext} from 'react'
import './OneCourseResult.css'
import Rating from '@mui/material/Rating';
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
import CourseList from '../Instructor/CourseList';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import ReviewsIcon from '@mui/icons-material/Reviews';
import GroupIcon from '@mui/icons-material/Group';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

function InstructorCourse ({Onecourse}) {
    const {curr,setCurr,rate,setRate} = useContext(Currency)
    return (


<Container sx={{position:"relative",m:"0",p:"0"}}>
<Card variant="outlined" className="stack1" sx={{ display: 'flex',
"&:hover":{
    cursor: "pointer",
    boxShadow: "0 3px 4px rgba(0,0,0,.12), 0 3px 4px rgba(0,0,0,.06)",

} }} onClick={() => window.location.href=`/MyCourses/${Onecourse.title}`} >
<CardMedia
  component="img"
  sx={{ width: "35%",borderRadius:"15px",padding:"1.5%" }}
  image={Coding}
  alt="Live from space album cover"
/>
<p className="stack2"></p>
<Box sx={{ display: 'flex', flexDirection: 'column' ,width:"100%",pr:"1rem"}}>
  <CardContent  sx={{ flex: '1 0 auto' ,

  }}>
   
    <Stack direction="row" justifyContent={"space-between"} alignItems={"center"}>
    <Typography component="div" variant="h4" fontSize={"1.7rem"}>
      {Onecourse.title}
    </Typography>
    {Onecourse.Finished ?  <Stack direction="row" gap={0.5}  alignItems={"center"}>
    <DoneAllIcon fontSize={"1rem"}sx={{color:"green"}}/>
    <Typography  fontSize={"0.8rem"} color={"grey"}> Published</Typography>
    </Stack>: <Stack direction="row" gap={0.5} alignItems={"center"}>
    < MoreHorizOutlinedIcon fontSize={"1.3rem"}sx={{color:"#c50d0d"}}/>
    <Typography  fontSize={"0.8rem"} color={"grey"}> in progress</Typography>
    </Stack>
    }
    
    </Stack>
    <Typography variant="h6" color="text.secondary" component="div" sx={{pt:1,pb:"15px"}}> 
    {Onecourse.subject}
    </Typography>
    <Stack direction="row" justifyContent={"space-between"}>
    <Stack direction="row" gap={0.5} paddingTop={"0.5rem"} alignItems={"center"}>
       <GroupIcon sx= {{color:"#bbd2b1",fontSize:"1.3rem"}}/>
       <Typography sx={{fontSize:"0.83rem"}} >Currently Enrolled Students:  </Typography>
        <Typography sx={{fontSize:"0.83rem"}} >{Onecourse.enrolledStudents}</Typography>
        </Stack> 
    <Stack direction="row" gap={0.5} paddingTop={"0.5rem"} alignItems="center">
       <ReviewsIcon sx= {{color:"#bbd2b1",fontSize:"1.1rem"}}/>
       <Typography sx={{fontSize:"0.83rem"}} >No of reviews:  </Typography>
        <Typography sx={{fontSize:"0.83rem"}} >{Onecourse.reviews.length}</Typography>
        </Stack>
        </Stack>
        
        <Stack direction="row" gap={"8px"}  paddingRight={"10%"} alignItems={"center"} sx={{mt:"4%"}}>
       <Typography sx={{fontSize:"0.83rem" }} variant='h6' >Price of Course: </Typography>
       {Onecourse.price=="Free" ?  <Typography  sx={{fontSize:"0.83rem",fontWeight:"bolder",position:"relative"}} >Free </Typography>
       :
        <Stack direction="row" alignItems={"center"} gap={2}>
        <Typography  sx={{fontSize:"0.83rem",fontWeight:"bolder",position:"relative"}} >{Onecourse.price*rate} {curr}
        
    {(Onecourse.promotionInst.set==true|| Onecourse.promotionAdmin.set==true) &&
    <svg xmlns="http://www.w3.org/2000/svg" width="47" height="47" fill="currentColor" class="bi bi-slash-lg" viewBox="0 0 16 16" style={{ color: "#c50d0d",position: "absolute",
    left:"-19%",
    fontSize: "2.5rem",
    top: "-60%",
    transform:" rotate(10deg)",}}>
  <path fill-rule="evenodd" d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"/>
</svg>}
     </Typography>
    {(Onecourse.promotionInst.set || Onecourse.promotionAdmin.set )&& <ArrowRightAltIcon sx={{fontWeight:"bold" ,fontSize:"2rem"}}/>}
     {(Onecourse.promotionInst.set || Onecourse.promotionAdmin.set) && <Typography  sx={{fontSize:"0.87rem",fontWeight:"bolder",position:"relative"}} >
     {((100-(parseFloat(Onecourse.promotionInst.value.$numberDecimal)
  +parseFloat(Onecourse.promotionAdmin.value.$numberDecimal)))/100)*Onecourse.price*rate}{curr}</Typography>}
     </Stack>}
        </Stack>
        
  </CardContent>
  <Divider sx={{backgroundColor:"black",mb:"1rem",ml:"1rem"}}/>
  <Box sx={{ display: 'flex', justifyContent:"space-between", pl: 2, pb: 1  ,color:"darkgrey" }}>
 <Stack direction="row">
      <Typography variant="p" component="div" sx={{fontSize:"0.8rem",pr:1.5}}>{Onecourse.subtitles.length} subtitles </Typography>
            <AccessTimeIcon sx={{fontSize:"1rem"}} />
           <Typography variant="p" component="div" sx={{fontSize:"0.8rem", pl:"5px"}}>{Onecourse.totalHours} hours</Typography>
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
 <div>
       {/* {(Onecourse.promotionInst.set || Onecourse.promotionAdmin.set)&& 
       <div className='sale'>
        <div className="paper red ">
        <div className="tape-section"></div>
        <p style={{textAlign:"center" , paddingTop:"1rem" , fontSize:"2.5vh"}}>Offer</p>
        </div>
        </div>} */}
        </div>
</Container>
    )
}

    export default InstructorCourse
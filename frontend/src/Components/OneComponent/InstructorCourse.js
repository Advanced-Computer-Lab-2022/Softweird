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





function InstructorCourse ({Onecourse}) {
    const {curr,setCurr,rate,setRate} = useContext(Currency)
    return (
        // <div className = "course-card">
        //     <ul> 
        //         <li>
        //        <h3>{Onecourse.title}</h3>
        //         <p>{Onecourse.subject}</p>
        //         <p>{Onecourse.rating.$numberDecimal}</p>
        //         <p>{Onecourse.price * rate} {curr}</p>
        //         <p>{Onecourse.promotionInst.set}</p>
        //         <p>{Onecourse.promotionAdmin.set}</p>
        //         <p>{Onecourse.enrolledStudents}</p>
        //         <p>{Onecourse.totalHours}</p>
                
                
        //         </li>
        //     </ul>
            

        // </div>

<Container sx={{position:"relative",m:"0",p:"0"}}>
<Card variant="outlined" className="stack1" sx={{ display: 'flex',
"&:hover":{
    cursor: "pointer",
    boxShadow: "0 3px 4px rgba(0,0,0,.12), 0 3px 4px rgba(0,0,0,.06)",

} }} onClick={() => window.location.href=`/OneCourse?course=${Onecourse._id}`} >
<CardMedia
  component="img"
  sx={{ width: "35%" }}
  image={Coding}
  alt="Live from space album cover"
/>
<p className="stack2"></p>
<Box sx={{ display: 'flex', flexDirection: 'column' }}>
  <CardContent  sx={{ flex: '1 0 auto' ,

  }}>
    <Typography component="div" variant="h4">
      Title
    </Typography>
    <Typography variant="h6" color="text.secondary" component="div" sx={{pt:1,pb:3}}> 
    {Onecourse.subject}
    </Typography>
    {/* <Typography variant="p" component="div" sx={{maxHeight:"10rem",overflow:"auto", pb:3 }}>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam , quis nostrud exercitation ullamco laboris nisi
    </Typography> */}
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
 <div>
       {(Onecourse.promotionInst.set || Onecourse.promotionAdmin.set)&& 
       <div className='sale'>
        <div className="paper red ">
        <div className="tape-section"></div>
        <p style={{textAlign:"center" , paddingTop:"1rem"}}>Offer</p>
        </div>
        </div>}
        </div>
</Container>
    )
}

    export default InstructorCourse
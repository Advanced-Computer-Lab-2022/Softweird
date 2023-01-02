import { Paper } from "@mui/material"
import CourseContent from "../Trainess/CourseContent";
import VideoShow from "../Trainess/VideoShow";
import { Stack } from "@mui/material";
import {TraineeCourse} from '../../Context/TraineeCourse'
import {Navigate, useParams,useNavigate} from "react-router-dom"
import './MostViewed.css'
import SkeletonsList from './SkeletonsList';
import React from "react";
import photo from '../../Images/Coding.jpg'
import Slider from "react-slick";
import Typography from '@mui/material/Typography';
import axios from 'axios';
import {useState, useEffect, Component, useRef } from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Loading from "./Loading";
import { useAuth } from "../auth";
import { Divider } from "@mui/material";
import ProgressBar from "./ProgreeBar";
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { Box } from "@mui/material";
import PendingIcon from '@mui/icons-material/Pending';
import Mathematics from '../../Images/Mathematics.jpeg'
import DataScience from '../../Images/DataScience.png'
import ComputerScience from '../../Images/Computer Science.jpg'
import CloudComputing from '../../Images/Cloud Computing.jpeg'
import ArtificialIntelligence from '../../Images/Artificial Intelligence.jpg'
import CyberSecurity from '../../Images/Cyber Security.jpeg'
import Sciences from '../../Images/Sciences.jpeg'
import Business from '../../Images/Business.jpg'
import VerifiedIcon from '@mui/icons-material/Verified';


const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,

  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: "lightgrey",
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === 'light' ? '#bbd2b1' : '#308fe8',
  },
}));
function OneOfMyCourses (){
    const [myCourse,setMyCourse]=useState([])
    const [myProgress,setMyProgress]=useState([])
    const [course,setCourse]=useState([]) 
    const params = new URLSearchParams(window.location.search);
    const [loading,setLoading] = useState(true);
    const [reload,setReload] = useState(true);
    const [index,setIndex] = useState(0);
    const [subIndex,setSubIndex] = useState(0);
    const{coursetitle} = useParams() 
    const auth =useAuth()
    const navigate = useNavigate()


    useEffect(() =>{
        setLoading(true)
         let cancel
         axios({
             method:"GET",
             url : `/Individual/allCourses/${auth.user.id}`,
             cancelToken: new axios.CancelToken (c => cancel = c)
         }).then (res => {
             setLoading(false)
            
             setMyCourse(res.data.titles)
             setMyProgress(res.data.all)
             

         }).catch(e=>{
            
             if(axios.isCancel(e)) return 
         })
         return () => cancel ()
     }, [reload])


     const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        autoplay:false,
        autoplaySpeed:3000,
        slidesToShow: myCourse.length,
        slidesToScroll: myCourse.length
      };
      return (
        <>
     
     {!loading && myCourse && myCourse.length!==0 ?
         <div>
          <Typography sx={{ fontSize: 30, marginBottom:'2%',marginTop:'0%'}} color="000">
             My Courses 
           </Typography>
           <Divider sx={{borderWidth: "1px",marginBottom: "4%"}}/>
          <Slider {...settings} sx={{ }}>
            {myProgress.map((x, i) => {

          return  <div>
              <h5>
              <ImageList sx={{ width: 500, height: 300,"&:hover":{
    cursor: "pointer",

} }} 
 onClick={() => window.location.href=`/MyCourses/${x.course.title}`} >
           
             <div>
             <ImageListItem key={course._id}>
               <img
                 src={(x.course.subject=="Mathematics"&& Mathematics)||
                 (x.course.subject=="Computer Science"&& ComputerScience)||
                 (x.course.subject=="Artificial Intelligence"&& ArtificialIntelligence)||
                 (x.course.subject=="Sciences"&& Sciences)||
                 (x.course.subject=="Cyber Security"&& CyberSecurity)||
                 (x.course.subject=="Cloud Computing"&& CloudComputing)||
                 (x.course.subject=="Business"&& Business) ||
                 (x.course.subject=="Data Science"&& DataScience)
               }
                 loading="lazy"
                 style={{marginBottom: "0%", borderRadius: "15px",height:"10.5rem"}}
               />
               <ImageListItemBar
                 title={x.course.title}
                 position="below"
               />
   
   <Stack direction="row" gap={2} alignItems={"center"} sx={{position: "relative",
    left: "9%"}}>
     
    
   <Box sx={{width:"100%"}}>
    <BorderLinearProgress variant="determinate" value={Math.round(((myProgress[i].percentage.progress/myProgress[i].percentage.total)*100)*10)/10 || 0} />
    </Box>
    <Typography variant="p" component="div" sx={{fontSize:"0.7rem"}}><b> {Math.round(((myProgress[i].percentage.progress/myProgress[i].percentage.total)*100)*10)/10 || 0}%</b></Typography>
    </Stack>
    {auth.user.type=="individual"  && x.refund.set ==true &&  x.refund.state =="pending" &&
    <Stack  direction="row" gap={0.5}  justifyContent={"center"} marginTop={"1rem"}>
    <PendingIcon fontSize={"1rem"}sx={{color:"#c50d0d"}}/>
    <Typography  fontSize={"0.8rem"} color={"grey"}> pending refund response</Typography>
    </Stack> }

    {x.certificate!="" && <Stack  direction="row" gap={0.5}   justifyContent={"center"} marginTop={"1rem"} alignItems={"center"}>
    <VerifiedIcon fontSize={"1rem"}sx={{color:"#faaf00" }}/>
    <Typography  fontSize={"0.8rem"} color={"grey"}> Certified</Typography>
    
    </Stack> }

               {/* <ProgressBar  progress={(((myProgress[i].percentage.progress/myProgress[i].percentage.total)*100)*10)/10 || 0}  height={15} sx={{backgroundColor:"#bbd2b1"}} /> */}
             </ImageListItem>
             </div>
           
         </ImageList>
              </h5>
            </div>})}
            </Slider>
        </div>
        :<> 
         <div>
          <Typography sx={{ fontSize: 30, marginBottom:'4%',marginTop:'0%'}} color="000">
             My Courses <br/>
           </Typography>
           </div>
           
           <h6> You are not registered in any course yet. You can find our courses 
            <a href='/Search?search='> here </a></h6>
            
             
        
        </>}

        </>
        
    )
}
export default OneOfMyCourses
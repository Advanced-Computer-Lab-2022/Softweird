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
import Mathematics from '../../Images/Mathematics.jpeg'
import DataScience from '../../Images/DataScience.png'
import ComputerScience from '../../Images/Computer Science.jpg'
import CloudComputing from '../../Images/Cloud Computing.jpeg'
import ArtificialIntelligence from '../../Images/Artificial Intelligence.jpg'
import CyberSecurity from '../../Images/Cyber Security.jpeg'
import Sciences from '../../Images/Sciences.jpeg'
import Business from '../../Images/Business.jpg'
import DoneAllIcon from '@mui/icons-material/DoneAll';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import ReviewsIcon from '@mui/icons-material/Reviews';
import GroupIcon from '@mui/icons-material/Group';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import FolderDeleteIcon from '@mui/icons-material/FolderDelete';


function InstCourses (){
    const [myCourse,setMyCourse]=useState([])
    const [course,setCourse]=useState([]) 
    const params = new URLSearchParams(window.location.search);
    const [loading,setLoading] = useState(true);
    const [reload,setReload] = useState(true);
    const [index,setIndex] = useState(0);
    const [subIndex,setSubIndex] = useState(0);
    const{coursetitle} = useParams() 
    const [videosWatched,setVideo] = useState([])
    const [CourseInfo,setCourseInfo]=useState('') ;
    const [notes,setNotes] = useState([])
    const [video,setmyVideo] = useState('');
    const [exam,setexam] = useState([]);
    const [myprog,setProg] = useState([])
    const [openSolve,setOpenSolve]=useState(false)
    const [openGrade,setOpenGrade]=useState(false)
    const courseTitle = (coursetitle == undefined? "" : coursetitle)
    const [playVideo,setPlayVideo] = useState(true);
    const [firstOpen,setFirstOpen] =useState(false)

    const auth =useAuth()
    const navigate = useNavigate()


    useEffect(() =>{
        setLoading(true)
         let cancel
         axios({
             method:"GET",
             url : `/Instructor/instCourses/${auth.user.id}`,
             cancelToken: new axios.CancelToken (c => cancel = c)
         }).then (res => {
             setLoading(false)
             console.log(res.data)
             setMyCourse(res.data)

         }).catch(e=>{
            
             if(axios.isCancel(e)) return 
         })
         return () => cancel ()
     }, [])
     const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        autoplay:true,
        autoplaySpeed:3000,
        slidesToShow: 4,
        slidesToScroll: 4
      };
      return (
        
        <>
        {!loading && myCourse.length!==0 ?
         <div>
          <Typography sx={{ fontSize: 30, marginBottom:'2%',marginTop:'0%'}} color="000">
             My Courses 
           </Typography>
           <Divider sx={{borderWidth: "1px",marginBottom: "4%"}}/>
          <Slider {...settings} sx={{  height:'30%'}}>
            {myCourse.map(course =>{
          return  <div>
              <h5>
              <ImageList sx={{ width: 500, height: 260,"&:hover":{
    cursor: "pointer",

} }} 
 onClick={() => window.location.href=`/Courses/${course.title}`} >
           
             <div>
             <ImageListItem key={course._id}>
               <img
                  src={(course.subject=="Mathematics"&& Mathematics)||
                  (course.subject=="Computer Science"&& ComputerScience)||
                  (course.subject=="Artificial Intelligence"&& ArtificialIntelligence)||
                  (course.subject=="Sciences"&& Sciences)||
                  (course.subject=="Cyber Security"&& CyberSecurity)||
                  (course.subject=="Cloud Computing"&& CloudComputing)||
                  (course.subject=="Business"&& Business) ||
                  (course.subject=="Data Science"&& DataScience)
                }
                 loading="lazy"
                 style={{marginBottom: "4%", borderRadius: "15px",height:"10.5rem"}}
               />
               <ImageListItemBar
                 title={course.title}
                 position="below"
               />
             </ImageListItem>
             {course.Finished ?  <Stack direction="row" gap={0.5} justifyContent={"center"} alignItems={"center"}>
    <DoneAllIcon fontSize={"1rem"}sx={{color:"green"}}/>
    <Typography  fontSize={"0.8rem"} color={"grey"}> Published</Typography>
    </Stack>:( !course.Deleted ? <Stack direction="row" gap={0.5} justifyContent={"center"} alignItems={"center"}>
    < MoreHorizOutlinedIcon fontSize={"1.3rem"}sx={{color:"#c50d0d"}}/>
    <Typography  fontSize={"0.8rem"} color={"grey"}> in progress</Typography>
    </Stack> : <Stack justifyContent={"center"} direction="row" gap={0.5} alignItems={"center"}>
    < FolderDeleteIcon fontSize={"1.3rem"}sx={{color:"#c50d0d"}}/>
    <Typography  fontSize={"0.8rem"} color={"grey"}> Deleted</Typography></Stack>)
    }
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
           
            <h6> You haven't published any courses yet</h6>
            
             
        
        </>}
        </>
    )
}
export default InstCourses
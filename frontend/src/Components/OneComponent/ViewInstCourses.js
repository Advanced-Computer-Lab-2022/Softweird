
import {Navigate, useParams,useNavigate} from "react-router-dom"
import './MostViewed.css'

import React from "react";

import Slider from "react-slick";
import Typography from '@mui/material/Typography';
import axios from 'axios';
import {useState, useEffect, useContext, useRef } from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import {InstructorProfile} from '../../Context/InstructorProfile'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { Divider } from "@mui/material";
import Mathematics from '../../Images/Mathematics.jpeg'
import DataScience from '../../Images/DataScience.png'
import ComputerScience from '../../Images/Computer Science.jpg'
import CloudComputing from '../../Images/Cloud Computing.jpeg'
import ArtificialIntelligence from '../../Images/Artificial Intelligence.jpg'
import CyberSecurity from '../../Images/Cyber Security.jpeg'
import Sciences from '../../Images/Sciences.jpeg'
import Business from '../../Images/Business.jpg'


function ViewInstCourses (){



    const{coursetitle} = useParams() 
  
    const {inst,gender, setProfile, setLoading,user,setUser, loading,myCourse, setMyCourse }=useContext(InstructorProfile)



    
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      //autoplay:true,
      autoplaySpeed:3000,
      slidesToShow: 4,
      slidesToScroll: 4,
      KeyboardArrowLeftIcon,
      KeyboardArrowRightIcon
    };

      return (
        
        <>
        {!loading && myCourse.length!==0 ?
         <InstructorProfile.Provider value={{inst,gender, setProfile, setLoading,user,setUser, loading, myCourse, setMyCourse}}>
         <div style={{paddingBottom:"5rem"}}>
          <Typography sx={{ fontSize: 30, marginBottom:'2%',marginTop:'0%'}} color="000">
             Instructor Courses 
           </Typography>
           <Divider sx={{borderWidth: "1px",marginBottom: "4%"}}/>
  
          <Slider {...settings} sx={{  height:'30%'}}>
            {myCourse.map(course =>{
          return  <div>
              
              <ImageList sx={{ width: 500, height: 300,"&:hover":{
    cursor: "pointer",} }}
 onClick={() => window.location.href=`/Courses/${course.title}`} >
           
             <div>
             <ImageListItem key={course._id} sx={{alignItems:"center"}}>
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
                 style={{marginBottom: "0%", borderRadius: "15px",height:"10.5rem"}}
               />
               <ImageListItemBar 
                 title={course.title}
                 subtitle={course.subject} sx={{textAlign:"center"}}
                 position="below"
               />
             </ImageListItem>
             </div>
           
         </ImageList>
              
            </div>})}
            </Slider>
        </div> 
        
        </InstructorProfile.Provider>
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
export default ViewInstCourses
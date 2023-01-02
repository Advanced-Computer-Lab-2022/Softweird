
import './MostViewed.css'
import SkeletonsList from './SkeletonsList';
import React from "react";
import Slider from "react-slick";
import Typography from '@mui/material/Typography';

import axios from 'axios';
import {useState, useEffect, Component, useRef } from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import "slick-carousel/slick/slick.css";
//import "slick-carousel/slick/slick-theme.css";
import photo from '../../Images/Coding.jpg'
import { Box } from '@mui/material';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { Divider } from "@mui/material";
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import Mathematics from '../../Images/Mathematics.jpeg'
import DataScience from '../../Images/DataScience.png'
import ComputerScience from '../../Images/Computer Science.jpg'
import CloudComputing from '../../Images/Cloud Computing.jpeg'
import ArtificialIntelligence from '../../Images/Artificial Intelligence.jpg'
import CyberSecurity from '../../Images/Cyber Security.jpeg'
import Sciences from '../../Images/Sciences.jpeg'
import Business from '../../Images/Business.jpg'
import { Button,Stack } from '@mui/material';

function MostViewed({setLoading,loading}){
    const [course,setMostView] = useState([{title:"one", ddd: "lll"},{title:"two"},{title:"one", ddd: "lll"},{title:"two"},{title:"one", ddd: "lll"},{title:"two"},{title:"one", ddd: "lll"},{title:"two"}]);  
   
    const [user, setUser] = useState([]);

    useEffect(() =>{

        setLoading(true)
       
        let cancel
         axios({
             method:"GET",
             url : '/courses/mostViewed',
             cancelToken: new axios.CancelToken (c => cancel = c)
         }).then (res => {
        
             setLoading(false)
             setMostView(res.data)
             console.log(res.data)
            
         })
     }, []);

      function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "red" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "green" }}
      onClick={onClick}
    />
  );
}
     
      const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        autoplay:true,
        autoplaySpeed:3000,
        slidesToShow: 4,
        slidesToScroll: 4,
        KeyboardArrowLeftIcon,
        KeyboardArrowRightIcon
      };
      return (
        <>
     
        {!loading && course &&
         <div>
           <Stack direction="row " justifyContent={"space-between"} alignItems={"baseline"}>
          <Typography sx={{ fontSize: 30, marginBottom:'2%',marginTop:'0%'}} color="000">
             Most Viewed Courses 
           </Typography>
           <Button endIcon={<DoubleArrowIcon />} autoFocus onClick={() => window.location.href=`/Courses/}`} sx={{color:"#c50d0d",textDecoration:"underline"}}>
        View All Courses
      </Button>
           </Stack>
           <Divider sx={{borderWidth: "1px",marginBottom: "4%"}}/>
          <Slider {...settings} sx={{  height:'30%'}}>
            {course.map(course =>{
          return  <div key={course._id}>
              <h5>
              <ImageList sx={{ width: 500, height: 240,"&:hover":{
    cursor: "pointer",

} }}
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
                 style={{marginBottom: "4%", borderRadius: "15px",height:"10.5rem"}}
               />
               <ImageListItemBar 
                 title={course.title}
                 subtitle={course.subject} sx={{textAlign:"center"}}
                 position="below"
               />
             </ImageListItem>
             </div>
           
         </ImageList>
              </h5>
            </div>})}
            </Slider>
        </div>}
        
        </>
      );
    }

export default MostViewed
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
import ProgressBar from "./ProgreeBar";
import { TbMinimize } from "react-icons/tb";
import { Divider } from "@mui/material";

function CorporateCourses (){
    const [myCourse,setMyCourse]=useState([])
    const [myProgress,setMyProgress]=useState([])
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
             url : `/Corporate/allCourses/${auth.user.id}`,
             cancelToken: new axios.CancelToken (c => cancel = c)
         }).then (res => {
             setLoading(false)
             setMyCourse(res.data.titles)
             setMyProgress(res.data.all)
            console.log(res.data)

         }).catch(e=>{
            
             if(axios.isCancel(e)) return 
         })
         return () => cancel ()
     }, [reload])

     const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        autoplay:true,
        autoplaySpeed:3000,
        slidesToShow: Math.min(4,myCourse.length),
        slidesToScroll: Math.min(4,myCourse.length)
      };
      return (
        <>
     
     {!loading && myCourse.length!==0 ?
         <div>
          <Typography sx={{ fontSize: 30, marginBottom:'2%',marginTop:'0%'}} color="000">
             My Courses 
           </Typography>
           <Divider sx={{borderWidth: "1px",marginBottom: "4%"}}/>
          <Slider {...settings} sx={{ }}>
            {myCourse.map((x, i) => {

          return  <div>
              <h5>
              <ImageList sx={{ width: 500, height: 300,"&:hover":{
    cursor: "pointer",

} }} 
 onClick={() => window.location.href=`/Courses/${x}`} >
           
             <div>
             <ImageListItem key={course._id}>
               <img
                 src={photo}
                 loading="lazy"
                 style={{marginBottom: "0%", borderRadius: "15px"}}
               />
               <ImageListItemBar
                 title={x}
                 position="below"
               />
    {/* <BorderLinearProgress variant="determinate" value={Math.round(((myCourse.percentage.progress/myCourse.percentage.total)*100)*10)/10 || 0} /> */}
    
               <ProgressBar bgcolor="green" progress={(((myProgress[i].percentage.progress/myProgress[i].percentage.total)*100)*10)/10 || 0}  height={15} />
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
export default CorporateCourses
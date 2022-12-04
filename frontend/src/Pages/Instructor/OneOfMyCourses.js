import React, { useState, useEffect } from 'react';
import axios from "axios"
import Rating from '@mui/material/Rating';
import {Box,Stack,Divider,IconButton} from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ReviewsIcon from '@mui/icons-material/Reviews';
import GroupIcon from '@mui/icons-material/Group';
import SchoolIcon from '@mui/icons-material/School';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import Avatar from '@mui/material/Avatar'; 
import {Currency} from '../../Context/Currency'
import {useContext} from 'react'
import OneSubtitle from '../../Components/Instructor/OneSubtitle'
import DialogSubtitle from '../../Components/Instructor/DialogSubtitle'
import DialogVideo from '../../Components/Instructor/DialogVideo'
import {InstructorOneCourse} from '../../Context/InstructorOneCourse'
import DialogDisc from '../../Components/Instructor/DialogDisc'
import Reviews from '../../Components/OneComponent/Reviews';
import DiscountIcon from '@mui/icons-material/Discount';
import DeleteIcon from '@mui/icons-material/Delete';
import PublishIcon from '@mui/icons-material/Publish';
import DialogDelete from '../../Components/Instructor/DialogDelete'
import DialogPublish from '../../Components/Instructor/DialogPublish'
import {useParams} from "react-router-dom"
import Loading from '../../Components/OneComponent/Loading'
import { Toast } from 'react-bootstrap'

function OneOfMyCourses () {  
     const[loading , setLoading]=useState(true)
    const {curr , setCurr,rate,setRate} = useContext(Currency)
    const [openAdd, setOpenAdd] = React.useState(false);
    const [openVideo, setOpenVideo] = React.useState(false);
    const [openDisc, setOpenDisc] = React.useState(false);
    const [openDelete,setOpenDelete] = useState(false)
    const [openPublish , setOpenPublish]=useState(false)
    const [courses,setCourse] = useState([])
    const [subtitleSelected,setSubtitleSelected]=useState("")
    const params = new URLSearchParams(window.location.search);
    const{course} = useParams() 
    const courseTitle = (course == undefined? "" : course)
    const [reload,setReload] = useState(true)
    const[toast,showToast] = useState(true)
    
    useEffect(() =>{
      console.log("dd")
      setLoading(true)
       let cancel
       axios({
           method:"GET",
           url : "/Instructor/oneCourse/6384c29e9bed14d581bf6292",
           params : {courseTitle:courseTitle },
           cancelToken: new axios.CancelToken (c => cancel = c)
       }).then (res => {
           setLoading(false)
           setCourse(res.data)
           console.log(courses)
          
       }).catch(e=>{
           if(axios.isCancel(e)) return 
       })
       return () => cancel ()
       
   
   }, [reload])
  
   
    return(
      <>
            {!loading && courses &&
        <InstructorOneCourse.Provider value={{openVideo,setOpenVideo,openAdd,setOpenAdd,openDisc,setOpenDisc,
        openPublish , setOpenPublish,openDelete,setOpenDelete,courses,setCourse,subtitleSelected,setSubtitleSelected,setReload,setLoading}}>
        <Box sx={{position:"relative"}}>
        <div className="wire"></div>
        <Card className="card-course" sx={{position:"relative",left:"0",right:"0",p:"2rem",mb:"3rem"}}>
        
        <CardContent>
        <Typography sx={{ fontSize: "2.5rem" }} >
          {courses.title}
        </Typography>
        <Typography variant="h6" color="text.secondary" component="div" gutterBottom>
        {courses.subject}
        </Typography>
        
        <Typography variant="P">
       {courses.summary}
        </Typography>
        <Stack direction = "row" gap={10}>
    
        <Stack direction="row" gap={0.5} paddingTop={"2rem"}>
            <Typography sx={{fontSize:"0.87rem"}} >{courses.rating.$numberDecimal}</Typography>
             <Rating 
             name="text-feedback1"
             value={courses.rating.$numberDecimal}
             readOnly
            precision={0.5}
             size='small'/>
             <Typography sx={{fontSize:"0.87rem"}} >({courses.numberRating})</Typography>
             </Stack>
        <Stack direction="row" gap={0.5} paddingTop={"2rem"}>
       <ReviewsIcon sx= {{color:"#bbd2b1"}}/>
       <Typography sx={{fontSize:"0.87rem"}} >No of reviews:  </Typography>
        <Typography sx={{fontSize:"0.87rem"}} >{courses.reviews.length}</Typography>
        </Stack>     
        </Stack>
        <Stack direction="row" gap={0.5} paddingTop={"2rem"} alignItems={"center"}>
       <GroupIcon sx= {{color:"#bbd2b1"}}/>
       <Typography sx={{fontSize:"0.87rem"}} >Currently Enrolled Students:  </Typography>
        <Typography sx={{fontSize:"0.87rem"}} >{courses.enrolledStudents}</Typography>
        </Stack> 
        <Stack direction="row" paddingTop={"2rem"} alignItems={"center"}>
        <Stack direction="row" gap={0.5}  paddingRight={"15%"} >
       <Typography sx={{fontSize:"0.87rem" }} variant='h6' >Price of Course: </Typography>
        <Typography sx={{fontSize:"0.87rem",fontWeight:"bolder"}} >{courses.price} {curr}</Typography>
        </Stack>
        
        <Button variant="contained" href="#contained-buttons" sx={{backgroundColor:"#bbd2b1",fontWeight:"bolder",
      '&: hover':{ cursor: "pointer",
      color:"#bbd2b1",
      backgroundColor:"#fff"}}}
      onClick={()=>{setOpenDisc(true)}}
       >Apply Discount</Button></Stack>
      </CardContent>
      <CardActions>
      </CardActions>
      </Card>
      <Stack direction="row" gap={1} alignItems={"center"} mb={"2rem"}>
     < AutoStoriesIcon sx= {{color:"#bbd2b1"}}/>
      <Typography variant={"h5"}>Course Contents</Typography>
      </Stack>
      <OneSubtitle course ={courses}/>
     </Box>
     <DialogVideo/>
     <DialogSubtitle/>
     <DialogDisc />
    <Stack sx={{mt:"5rem"}}>
     <Reviews/> </Stack>
     {!courses.Finished && 
     <Stack direction={"row"} paddingTop={"8%"} gap={10} justifyContent={"center"}>
     <Button variant="outlined" startIcon={<DeleteIcon sx= {{color:"#bbd2b1"}} />}
     sx={{color:"#000" , border:"1px solid rgba(187, 210, 177, 0.8)" ,
     '&:hover':{
      border:"1px solid rgba(187, 210, 177)" 
     }}} onClick={()=>{setOpenDelete(true)}}>
        Delete Course
      </Button>
      <Button data-bs-toggle="modal" data-bs-target="#exampleModal" variant="outlined" startIcon={<PublishIcon sx= {{color:"#bbd2b1"}}/>} sx={{color:"#000",
     border:"1px solid rgba(187, 210, 177, 0.8)" ,
    '&:hover':{
     border:"1px solid rgba(187, 210, 177)" 
      }}} onClick={()=>{setOpenPublish(true)}}>
        Publish Course
      </Button>
</Stack>}
<DialogDelete />
<DialogPublish course={{title:courses.title}} />
  
</InstructorOneCourse.Provider>}
{loading && <> <Loading /> </>}
</>


    );
   }

export default OneOfMyCourses
import React from "react";
import './styling.css'
import { useEffect,useState } from "react";
import {useParams} from "react-router-dom"
import axios from "axios"
import Subtitle from "../Components/OneComponent/Subtitle";
import {Currency} from '../Context/Currency'
import {useContext} from 'react'
import Rating from '@mui/material/Rating';
import {Box,Stack,Divider} from '@mui/material';
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
import Loading from "../Components/OneComponent/Loading";
import Reviews from "../Components/OneComponent/Reviews";
import {OneCourseResult} from "../Context/OneCourseResult";

function OneCourse (){
    const params = new URLSearchParams(window.location.search);
    const Onecourse = params.get('course');
    const [course, setCourse]= useState([])
    const [instructor, setInstructor] = useState()
    const[loading , setLoading]=useState(true)
    const {curr , setCurr,rate,setRate} = useContext(Currency)
    const [open ,setOpen] = useState(false)
    useEffect(() =>{
        setLoading(true)
        let cancel
         axios({
             method:"GET",
             url : `/Courses/${Onecourse}`,
             cancelToken: new axios.CancelToken (c => cancel = c)
         }).then (res => {
             setLoading(false)
            setCourse(res.data.course)
            setInstructor(res.data.instructor[0])

         }).catch(e=>{
             if(axios.isCancel(e)) return 
         })
         return () => cancel ()
         

     }, [])
    
    return (
        
        <OneCourseResult.Provider value={{open,setOpen,course}}>
        {!loading && course&& <Box sx={{position:"relative"}}>
        <div className="wire"></div>
        <Card className="card-course " sx={{position:"relative",left:"0",right:"0",p:"2rem",mb:"6rem"}}>
        
        <CardContent>
        <Typography sx={{ fontSize: "2.5rem" }} >
          {course.title}
        </Typography>
        <Typography variant="h6" color="text.secondary" component="div" gutterBottom>
         {course.subject}
        </Typography>
        
        <Typography variant="P">
        {course.summary}
        </Typography>
        <Stack direction = "row" gap={10}>
        <Stack direction="row" gap={0.5} paddingTop={"2rem"}>
            <Typography sx={{fontSize:"0.87rem"}} >{course.rating.$numberDecimal}</Typography>
             <Rating 
             name="text-feedback1"
             value={course.rating.$numberDecimal}
             readOnly
            precision={0.5}
             size='small'/>
             <Typography sx={{fontSize:"0.87rem"}} >({course.numberRating})</Typography>
             </Stack>
       {course.reviews && <Stack direction="row" gap={0.5} paddingTop={"2rem"}>
       <ReviewsIcon sx= {{color:"#bbd2b1"}}/>
       <Typography variant="p" sx={{fontSize:"0.87rem"}} >No of reviews:  </Typography>
        <Typography variant="p" sx={{fontSize:"0.87rem"}} >{course.reviews.length}</Typography>
        </Stack>     }
        </Stack>
        <Stack direction="row" gap={0.5} paddingTop={"2rem"} alignItems={"center"}>
       <GroupIcon sx= {{color:"#bbd2b1"}}/>
       <Typography variant="p" sx={{fontSize:"0.87rem"}} >Currently Enrolled Students:  </Typography>
        <Typography variant="p" sx={{fontSize:"0.87rem"}} >{course.enrolledStudents}</Typography>
        </Stack> 

        <Stack direction="row" gap={0.5} paddingTop={"2rem"} >
       

       <Typography variant="p" sx={{fontSize:"0.87rem" , fontWeight:"bolder"}} >Price:  </Typography>
        {course.price==="Free" ?
        <Typography sx={{fontSize:"0.87rem",fontWeight:"bolder"}} >Free</Typography>:
        <Typography sx={{fontSize:"0.87rem",fontWeight:"bolder"}} >{course.price * rate} {curr}</Typography>}

        
        </Stack>  

      </CardContent>
      <CardActions>
      <Stack direction="row" gap={3} paddingTop={"1rem"} alignItems="center">
      
      <Button variant="contained" sx={{backgroundColor:"#bbd2b1" ,fontWeight:"bold",ml:"0.8rem",
                boxShadow:"none",
                "&:hover":{
                    cursor: "pointer",
                    color:"#bbd2b1",
                    backgroundColor:"#fff"

                    }}}>Study Now</Button>
      <ArrowForwardIosIcon/>
      <SchoolIcon />
      </Stack>
      </CardActions>
      </Card>
      <Stack gap={7} direction={"row"} maxWidth={"60vw"} alignItems={"center"} mb={"6rem"}>
          <Stack flex ={1} gap={2} alignItems={"center"} >
          <Avatar src="/static/images/avatar/1.jpg" />
          <Typography>{instructor.user.fName} {instructor.user.lName}</Typography>
          <Stack direction="row" gap={0.5} paddingTop={"1rem"}>
            <Typography svariant="p" x={{fontSize:"0.87rem"}} >{instructor.rating.rate.$numberDecimal}</Typography>
             <Rating 
             name="text-feedback2"
             value={instructor.rating.rate.$numberDecimal}
             readOnly
            precision={0.1}
             size='small'/>
             <Typography sx={{fontSize:"0.87rem"}} >({instructor.rating.numberPeople})</Typography>
             </Stack>
          </Stack>
          <Divider orientation="vertical" variant="middle" flexItem sx={{border:"0.5px #bbd2b1 solid"}} />
          <Stack flex ={3} gap={2} >
          <Typography> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Typography>
          </Stack>
      </Stack>
      <Reviews/>
      <Stack direction="row" gap={1} alignItems={"center"} mb={"2rem"} mt={"6rem"}>
     < AutoStoriesIcon sx= {{color:"#bbd2b1"}}/>
      <Typography variant={"h5"}>Begin Your Study Path</Typography>
      </Stack>
      
      <Subtitle/>
     </Box>}
     {loading && <Loading />}
     </OneCourseResult.Provider>
    )
}
export default OneCourse

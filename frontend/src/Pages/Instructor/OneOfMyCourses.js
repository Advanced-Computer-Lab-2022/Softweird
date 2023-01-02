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
import DialogExam from '../../Components/Instructor/DialogExam'
import DialogReviewExam from '../../Components/Instructor/DialogReviewExam'
import {BsSlashLg} from 'react-icons/bs'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { IconContext } from "react-icons";
import ApplyDiscount from '../../Components/Instructor/ApplyDiscount';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import Tooltip from '@mui/material/Tooltip';
import ToastMess from '../../Components/OneComponent/ToastMess'
import { Toast } from '../../Context/Toast';
import { useNavigate, useLocation,Navigate } from 'react-router-dom';
import OneCourseResult from '../../Components/OneComponent/OneCourseResult';
import { useAuth } from '../../Components/auth';

function OneOfMyCourses () { 
  const auth = useAuth() 
  const {setOpenToast} = useContext(Toast)
     const[loading , setLoading]=useState(true)
    const {curr , setCurr,rate,setRate} = useContext(Currency)
    const [openAdd, setOpenAdd] = React.useState(false);
    const [openVideo, setOpenVideo] = React.useState(false);
    const [openDisc, setOpenDisc] = React.useState(false);
    const [openDelete,setOpenDelete] = useState(false)
    const [openPublish , setOpenPublish]=useState(false)
    const [openExam,setOpenExam]=useState(false)
    const [openReview,setOpenReview]=useState(false)
    const [exam ,setExam] = useState([])
    const [courses,setCourse] = useState([])
    const [subtitleSelected,setSubtitleSelected]=useState("")
    const params = new URLSearchParams(window.location.search);
    const{coursetitle} = useParams(); 
    console.log(coursetitle)
    const courseTitle = (coursetitle == undefined? "" : coursetitle)
    const [reload,setReload] = useState(true)
    const [message ,setMessage] = useState('')
    const navigate= useNavigate()

    useEffect(() =>{
      setLoading(true)
       let cancel
       axios({
           method:"GET",
           url : `/Instructor/oneCourse/${auth.user.id}`,
           params : {courseTitle:courseTitle },
           cancelToken: new axios.CancelToken (c => cancel = c)
       }).then (res => {
           setLoading(false)
           setCourse(res.data)  
           if(res.data==null){
             navigate('/MyCourses')

           }  
           
       }).catch(e=>{
           if(axios.isCancel(e)) return 
       })
       return () => cancel ()
       
   
   }, [reload])
   function handleRemove() {
    if (window.confirm("Are you sure you want to remove promotion?")){
          let cancel
          axios({
            method:"PATCH",
            url : '/Instructor/removePromote',
            data : {courseTitle:courses.title},
            headers : {'Content-Type' : 'application/json'},
            cancelToken: new axios.CancelToken (c => cancel = c)
          }).then (res => {
        
              setCourse(res.data)
              setMessage("Promotion Removed Successfully")
              setOpenToast(true)
          }).catch(e=>{
              if(axios.isCancel(e)) return 
          })
          return () => cancel ()
          
       }
  }
  
    return(
      <>
            {!loading && courses &&
        <InstructorOneCourse.Provider value={{openVideo,setOpenVideo,openAdd,setOpenAdd,openDisc,setOpenDisc,
        openPublish , setOpenPublish,openDelete,setOpenDelete,courses,setCourse,subtitleSelected,setSubtitleSelected,
        openExam,setOpenExam,setReload,setLoading,openReview,setOpenReview,exam,setExam,message ,setMessage}}>
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
        
        <Typography variant="P" sx={{fontSize:"0.8rem"}}>
       {courses.summary}
        </Typography>
        <Stack direction = "row" gap={10}>
    
        <Stack direction="row" gap={0.5} paddingTop={"2rem"}>
            
            <>
            <Typography sx={{fontSize:"0.87rem"}} >{courses.rating.$numberDecimal}</Typography>
             <Rating 
             name="text-feedback1"
             value={courses.rating.$numberDecimal}
             readOnly
            precision={0.5}
             size='small'/>
             </> 
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
        {courses.price!="Free" &&   <>
        <Stack direction="row" paddingTop={"2rem"} marginBottom={"2rem"} alignItems={"center"}>
        <Stack direction="row" gap={"8px"}  paddingRight={"10%"} alignItems={"center"} >
       <Typography sx={{fontSize:"0.87rem" }} variant='h6' >Price of Course: </Typography>
    
    
      <Stack direction="row" alignItems={"center"} gap={2}>
      <Typography  sx={{fontSize:"0.87rem",fontWeight:"bolder",position:"relative"}} >{courses.price*rate}{curr}
        
    {(courses.promotionInst.set==true|| courses.promotionAdmin.set==true) &&
    <svg xmlns="http://www.w3.org/2000/svg" width="47" height="47" fill="currentColor" class="bi bi-slash-lg" viewBox="0 0 16 16" style={{ color: "#c50d0d",position: "absolute",
    left:"-19%",
    fontSize: "2.5rem",
    top: "-60%",
    transform:" rotate(10deg)",}}>
  <path fill-rule="evenodd" d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"/>
</svg>}
     </Typography>
    {(courses.promotionInst.set || courses.promotionAdmin.set )&& <ArrowRightAltIcon sx={{fontWeight:"bold" ,fontSize:"2rem"}}/>}
     {(courses.promotionInst.set || courses.promotionAdmin.set) && <Typography  sx={{fontSize:"0.87rem",fontWeight:"bolder",position:"relative"}} >
     {((100-(parseFloat(courses.promotionInst.value.$numberDecimal)
  +parseFloat(courses.promotionAdmin.value.$numberDecimal)))/100)*courses.price*rate}{curr}</Typography>}
     </Stack>
        </Stack>
        <Stack direction="row" alignItems="center" gap={2}>
        {(courses.promotionInst.set || courses.promotionAdmin.set )&& 
        <Typography variant="p">
         <DiscountIcon sx={{color:"#bbd2b1"}} />
         </Typography>}
        {courses.promotionInst.set && 
        <Typography variant="p" sx={{border: "1px solid rgb(197 13 13)", borderRadius: "12px", padding:" 0.5rem",
    boxShadow: "-2px 3px 0px 0px rgb(197 13 13 / 24%)"}}>{courses.promotionInst.value.$numberDecimal}% by You
        <Tooltip title="remove discount" >
        <IconButton onClick={handleRemove} >
        <DeleteIcon  sx={{fontSize:"1.4rem",ml:"1rem"}} />
        </IconButton>
        </Tooltip></Typography>}
       
        {courses.promotionAdmin.set && courses.promotionInst.set && 
        <Typography variant="p" sx={{fontStyle:"italic"}}>and</Typography>}
       {courses.promotionAdmin.set && <Typography variant="p" sx={{border: "1px solid rgb(197 13 13)", borderRadius: "12px", padding:" 0.9rem",
    boxShadow: "-2px 3px 0px 0px rgb(197 13 13 / 24%)"}}>{courses.promotionAdmin.value.$numberDecimal}% by admin</Typography>
    }
         
       </Stack>
       </Stack>
       {courses.promotionInst.set ? <ApplyDiscount sx={{mt:"3rem"}} discount={"Update Discount"}/> :
    <ApplyDiscount sx={{mt:"3rem"}} discount={"Apply Discount"}/>} 
    </>}
    {courses.price=="Free" && 
     
      <Stack direction="row" paddingTop={"2rem"} marginBottom={"2rem"} alignItems={"center"}>
        <Stack direction="row" gap={"8px"}  paddingRight={"10%"} alignItems={"center"} >
    <Typography sx={{fontSize:"0.87rem" }} variant='h6' >Price of Course: </Typography>
   <Typography  sx={{fontSize:"0.87rem",fontWeight:"bolder",position:"relative"}} >Free
   </Typography>
   </Stack>
</Stack>
   }
      
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
     <Reviews course={courses} cn={true}/>
      </Stack>
     {!courses.Finished && 
     <Stack direction={"row"} paddingTop={"8%"} gap={10} justifyContent={"center"}>
     <Button variant="outlined" startIcon={<DeleteIcon sx= {{color:"#bbd2b1"}} />}
     sx={{color:"#000" , border:"1px solid rgba(197, 13, 13, 0.8)" ,
     '&:hover':{
      border:"1px solid rgba(197, 13, 13)" 
     }}} onClick={()=>{setOpenDelete(true)}}>
        Delete Course
      </Button>
      <Button data-bs-toggle="modal" data-bs-target="#exampleModal" variant="outlined" startIcon={<PublishIcon sx= {{color:"#bbd2b1"}}/>} sx={{color:"#000",
     border:"1px solid rgba(197, 13, 13, 0.8)" ,
    '&:hover':{
     border:"1px solid rgba(197, 13, 13)" 
      }}} onClick={()=>{setOpenPublish(true)}}>
        Publish Course
      </Button>
</Stack>}
<DialogDelete />
<DialogPublish course={{title:courses.title}} />
<DialogExam />
<DialogReviewExam />
  
</InstructorOneCourse.Provider>}
{loading && <> <Loading /> </>}
<ToastMess message={message} />
</>


    );
   }

export default OneOfMyCourses
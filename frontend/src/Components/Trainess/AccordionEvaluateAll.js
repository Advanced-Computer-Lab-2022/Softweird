import {Link} from 'react-router-dom'
import {Currency} from '../../Context/Currency'
import {useContext} from 'react'
import { useEffect,useState } from "react";
import Paper from '@mui/material/Paper';
import { createTheme } from '@mui/material/styles';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star'
import CircleIcon from '@mui/icons-material/Circle';
import Coding from '../../Images/Coding.jpg'

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
import { Box, Button, Container,Grid, Tooltip} from '@mui/material';
import Divider from '@mui/material/Divider';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import VerifiedIcon from '@mui/icons-material/Verified';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import { useAuth } from '../auth';
import FeaturedVideoIcon from '@mui/icons-material/FeaturedVideo';
import QuizIcon from '@mui/icons-material/Quiz';
import CorrectedExams from '../../Images/CorrectedExams.png'
import  RedoIcon from '@mui/icons-material/Redo'
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { TextField } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import EditOffIcon from '@mui/icons-material/EditOff';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {TraineeMyCourses} from '../../Context/TraineeMyCourses'
import ToastMess from '../OneComponent/ToastMess';
import { Toast } from '../../Context/Toast';
import axios from 'axios'
import Menu from '@mui/material/Menu';


function AccordianEvaluateAll({course,myCourse,instructor,setInstructor,setCourse,setMessage}){
  const auth = useAuth()
  const {myCourses,setMyCourses ,courses,setCourses,instructors,setInstructors} = useContext(TraineeMyCourses)
  const {setOpenToast}=useContext(Toast)
    const [inst,setInst] = useState(false)
    const [courseEv,setCourseEv] = useState(true)
    const [editCourse,setEditCourse] = useState(true)
    const [stopEditCourse,setStopEditCourse]=useState(false)
    const [courseReview,setCourseReview] = useState("")
    const [instReview,setInstReview] = useState("")
    const [editInst,setEditInst] = useState(true)
    const [stopEditInst,setStopEditInst]=useState(false)
    const [courseReviewWrite,setCourseReviewWrite] = useState("")
    const [instructorReviewWrite,setInstReviewWrite] = useState("")
    
    const [valuerate, setRateValue] = useState(0);
    const [valueInstrate, setRateInstValue] = useState(0);
    const [ratedCourse,setRatedCourse]=useState(false)
    const [ratedInst,setRatedInst]=useState(false)



    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorElInst, setAnchorElInst] = useState(null);
    const open = Boolean(anchorEl);
    const openInst = Boolean(anchorElInst)
    const [disabled,setDisabled]=useState(false)

    const handleClose = () => {
      setAnchorEl(null);
    };

    const handleCloseInst= () => {
      setAnchorElInst(null);
    };

    const handleRateClickInst = (event) => {
      setAnchorElInst(event.currentTarget);
    }; 

    function handleRateClick(event){
      setAnchorEl(event.currentTarget);

    }

    // function handleRate(event){
    //   setRateValue(event.target.value)
    // }
    

    useEffect (()=>{
     
      if(course.length!=0){
      if(course.reviews.length!=0){
        course.reviews.map(r=>{
          if(r.traineeId==auth.user.id){
            setCourseReview(r.review)
            setCourseReviewWrite(r.review)
          }
        })
      }
    }
    if(myCourse.rating){
      setRateValue(myCourse.rateCourse)
    }
    if(myCourse.rateInst){
      setRateInstValue(myCourse.rateInstructor)
    }

        if(instructor.length!=0){
          if(instructor.reviews.length!=0){
        { instructor.reviews.map(r=>{
            if(r.traineeId==auth.user.id){
              setInstReview(r.review)
              setInstReviewWrite(r.review)
            }
          })
      }}
    }
    
      


      
    },[course,instructor])
 
   function handleChangeCourse (e){
     setCourseReviewWrite(e.target.value)
    
   }

   function handleChangeInst(e){
    setInstReviewWrite(e.target.value)

  } 


   function handlePost (){
     if(auth.user.type=="individual")
   { 

     if(courseEv && window.confirm("Are You sure you want to post this review?")){
       setDisabled(true)
    let cancel

    axios({
        method:"PATCH",
        url : ` /Individual/reviewCourse/${auth.user.id}`,
        data:{courseTitle:course.title,username:auth.user.username,review:courseReviewWrite},
        cancelToken: new axios.CancelToken (c => cancel = c)
    }).then (res => {
      setCourse(res.data)
      setMessage("Course Review posted successfully")
      setOpenToast(true)
      setEditCourse(true)
      setStopEditCourse(false)
      setDisabled(false)
    }).catch(e=>{
       setDisabled(false)
        if(axios.isCancel(e)) return 
    })
  return () => cancel ()}

  else if(inst && window.confirm("Are You sure you want to post this review?")){
    setDisabled(true)
    let cancel
    axios({
        method:"PATCH",
        url : ` /Individual/reviewInst/${auth.user.id}`,
        data:{instructor:course.instructor_id,username:auth.user.username,review:instructorReviewWrite},
        cancelToken: new axios.CancelToken (c => cancel = c)
    }).then (res => {
      setInstructor(res.data)
      setMessage("Instructor Review posted successfully")
      setOpenToast(true)
      setEditInst(true)
      setStopEditInst(false)
      setDisabled(false)
    }).catch(e=>{
      setDisabled(false)
        if(axios.isCancel(e)) return 
    })
    return () => cancel ()
  }
  }

  else if(auth.user.type=="corporate")
  { 
    if(courseEv && window.confirm("Are You sure you want to post this review?")){
   let cancel
   setDisabled(true)
   axios({
       method:"PATCH",
       url : `/Corporate/reviewCourse/${auth.user.id}`,
       data:{courseTitle:course.title,username:auth.user.username,review:courseReviewWrite},
       cancelToken: new axios.CancelToken (c => cancel = c)
   }).then (res => {
     setCourse(res.data)
     setMessage("Course Review posted successfully")
     setOpenToast(true)
     setEditCourse(true)
     setStopEditCourse(false)
     setDisabled(false)
   }).catch(e=>{
    setDisabled(false)
       if(axios.isCancel(e)) return 
   })
   return () => cancel ()}

   else if(inst && window.confirm("Are You sure you want to post this review?")){
    let cancel
    setDisabled(true)
    console.log("ddddd")
    axios({
        method:"PATCH",
        url : ` /Corporate/reviewInst/${auth.user.id}`,
        data:{instructor:course.instructor_id,username:auth.user.username,review:instructorReviewWrite},
        cancelToken: new axios.CancelToken (c => cancel = c)
    }).then (res => {
      setInstructor(res.data)
      setMessage("Instructor Review posted successfully")
      setOpenToast(true)
      setEditInst(true)
      setStopEditInst(false)
      setDisabled(false)
     
    }).catch(e=>{
      setDisabled(false)
        if(axios.isCancel(e)) return 
    })
    return () => cancel ()
  }

 }


   

   }
    function handelEditCourse(){
        setEditCourse(false)
        setStopEditCourse(true)
    }
    function handelStopEditCourse(){
        setEditCourse(true)
        setStopEditCourse(false)
        setCourseReviewWrite(courseReview)
    }
    function handleInst (){
        setInst(true)
        setCourseEv(false)
        setEditCourse(true)
        setStopEditCourse(false)

    }
    function handleCourse (){
        setInst(false)
        setCourseEv(true)
        setEditInst(true)
        setStopEditInst(false)
    }

    function handleDeleteCourseReview(){
      if(auth.user.type=="individual")
 {   
     if(window.confirm("Are you sure you want to delete this review?"))

     { setDisabled(true)
       let cancel
      axios({
          method:"PATCH",
          url : ` /Individual/deleteReviewCourse/${auth.user.id}`,
          data:{courseTitle:course.title},
          cancelToken: new axios.CancelToken (c => cancel = c)
      }).then (res => {
        setCourse(res.data)
        setMessage("Course Review deleted successfully")
        setOpenToast(true)
        setEditCourse(true)
        setStopEditCourse(false)
        setCourseReview("")
        setCourseReviewWrite("")
        setDisabled(false)
      }).catch(e=>{
         
          if(axios.isCancel(e)) return 
      })
      return () => cancel ()
}}

else if(auth.user.type=="corporate")
{   
    if(window.confirm("Are you sure you want to delete this review?"))
    { setDisabled(true)
      let cancel
     axios({
         method:"PATCH",
         url : ` /Corporate/deleteReviewCourse/${auth.user.id}`,
         data:{courseTitle:course.title},
         cancelToken: new axios.CancelToken (c => cancel = c)
     }).then (res => {
       setCourse(res.data)
       setMessage("Course Review deleted successfully")
       setOpenToast(true)
       setEditCourse(true)
       setStopEditCourse(false)
       setCourseReview("")
       setCourseReviewWrite("")
       setDisabled(false)
     }).catch(e=>{
        
         if(axios.isCancel(e)) return 
     })
     return () => cancel ()
}}
    }


    function handelEditInst(){
      setEditInst(false)
      setStopEditInst(true)
  }
  function handelStopEditInst(){
      setEditInst(true)
      setStopEditInst(false)
      setInstReviewWrite(courseReview)
  }
  
  function handleDeleteInsteReview(){
    if(auth.user.type=="individual"){
    if(window.confirm("Are you sure you want to delete this review?"))
   { let cancel
    axios({
        method:"PATCH",
        url : ` /Individual/deleteReviewInst/${auth.user.id}`,
        data:{instructor:course.instructor_id},
        cancelToken: new axios.CancelToken (c => cancel = c)
    }).then (res => {
      setInstructor(res.data)
      setMessage("Instructor Review deleted successfully")
      setOpenToast(true)
      setEditInst(true)
      setStopEditInst(false)
      setInstReview("")
      setInstReviewWrite("")
    }).catch(e=>{
       
        if(axios.isCancel(e)) return 
    })
    return () => cancel ()
}
    }
    if(auth.user.type=="corporate"){
      if(window.confirm("Are you sure you want to delete this review?"))
     { let cancel
      axios({
          method:"PATCH",
          url : `/Corporate/deleteReviewInst/${auth.user.id}`,
          data:{instructor:course.instructor_id},
          cancelToken: new axios.CancelToken (c => cancel = c)
      }).then (res => {
        
        setInstructor(res.data)
        setMessage("Instructor Review deleted successfully")
        setOpenToast(true)
        setEditInst(true)
        setStopEditInst(false)
        setInstReview("")
        setInstReviewWrite("")
      }).catch(e=>{
         
          if(axios.isCancel(e)) return 
      })
      return () => cancel ()
  }
      }
  }


  function handleRate(event){
    setRateValue(event.target.value)

  }
  function handleRateInst(event){
    setRateInstValue(event.target.value)

  }
  function handleSendRate(){
   
   
    if(auth.user.type=="individual" && courseEv && window.confirm("are you sure you want to submit this rate"))
{    let cancel
  setRatedCourse(true)
  setDisabled(true)
    axios({
   method:"PATCH",
   url : `/Individual/course/rate/${auth.user.id}`,
   data : {courseTitle:course.title,rating : parseInt(valuerate) },
   headers : {'Content-Type' : 'application/json'},
    cancelToken: new axios.CancelToken (c => cancel = c)
}).then (res => {
   setMyCourses(res.data)
 setMessage("course rated successfully")
  setOpenToast(true)
  setAnchorEl(null);
  setDisabled(false)
 
}).catch(e=>{
  setDisabled(false)
   if(axios.isCancel(e)) return 
})
return () => cancel ()
}

else if(auth.user.type=="corporate" && courseEv && window.confirm("are you sure you want to submit this rate"))
{ setRatedCourse(true)   
  setDisabled(true)
  let cancel
    axios({
   method:"PATCH",
   url : `/Corporate/course/rate/${auth.user.id}`,
   data : {courseTitle:course.title,rating : parseInt(valuerate) },
   headers : {'Content-Type' : 'application/json'},
    cancelToken: new axios.CancelToken (c => cancel = c)
}).then (res => {
  setMyCourses(res.data)
  setMessage("course rated successfully")
  setRatedCourse(true)
  setOpenToast(true)
  setAnchorEl(null);
  setDisabled(false)
  
}).catch(e=>{
  setDisabled(false)
   if(axios.isCancel(e)) return 
})
return () => cancel ()
}

if(auth.user.type=="individual" && inst && window.confirm("are you sure you want to submit this rate"))
{    let cancel
  setRatedInst(true)
  setDisabled(true)
    axios({
   method:"PATCH",
   url : `/Individual/instructor/rate/${auth.user.id}`,
   data : {courseTitle:course.title,rating : parseInt(valueInstrate) },
   headers : {'Content-Type' : 'application/json'},
    cancelToken: new axios.CancelToken (c => cancel = c)
}).then (res => {
  setMyCourses(res.data)
  setMessage("Instructor Rated successfully")
  setOpenToast(true)
  setAnchorElInst(null);
  setDisabled(false)
 
}).catch(e=>{
  setDisabled(false)
   if(axios.isCancel(e)) return 
})
return () => cancel ()
}

else if(auth.user.type=="corporate" && inst && window.confirm("are you sure you want to submit this rate"))
{    let cancel
  setDisabled(true)
  setRatedInst(true)
    axios({
   method:"PATCH",
   url : `/Corporate/instructor/rate/${auth.user.id}`,
   data : {courseTitle:course.title,rating : parseInt(valueInstrate) },
   headers : {'Content-Type' : 'application/json'},
    cancelToken: new axios.CancelToken (c => cancel = c)
}).then (res => {
  setMyCourses(res.data)
  setMessage("Instructor Rated successfully")
  setOpenToast(true)
  setAnchorElInst(null);
  setDisabled(false)
  
}).catch(e=>{
  setDisabled(false)
   if(axios.isCancel(e)) return 
})
return () => cancel ()
}


  }


    return(
      <>
        <>
        <Accordion sx={{p:0,m:0,position:"relative",top:"-2px",boxShadow:"none",border:"1px solid rgba(0, 0, 0, 0.12)",
"&.Mui-expanded":{m:"0"}}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          sx={{backgroundColor:"#c50d0d"}}
        >
         <Typography sx={{fontWeight:"bold"}}>Your Evaluation</Typography>
        
        </AccordionSummary>
        <AccordionDetails>
        <Divider sx={{backgroundColor:"darkgrey",m:"0 0 1rem 0"}}/>
          <Stack direction="row" justifyContent={"space-between"} alignItems={"center"}>
          
          {(courseEv && !myCourse.rating) && 
          <> <Button variant="contained" sx={{backgroundColor:"#bbd2b1" ,fontWeight:"bold",ml:"0.8rem",
                boxShadow:"none", textDecoration:"none", width:"fit-content", flex:0.5,
                "&:hover":{
                    cursor: "pointer",
                    color:"#bbd2b1",
                    backgroundColor:"#fff"

                    }}} onClick={handleRateClick} 
                    disabled={disabled}>
                    Course Rate</Button>
                    <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                      'aria-labelledby': 'basic-button',
                    }}
                    sx={{display:"flex",p:"1rem"}}
                  >
                    <Stack direction="column" sx={{padding: "0.5rem 1rem"}}>
                    
                    <Typography variant="p" sx={{pt:"2%"}}> <Rating name="no-value" value={valuerate} onChange={handleRate} /></Typography>
               <Typography variant="p" >   <Button
                 sx={{ color:"rgba(197, 13, 13, 0.8)" , position: "relative",
                 right: "-54%",
                 '&:hover':{
                  color:"rgba(197, 13, 13)" ,
                  backgroundColor:"white"
                 }}} onClick={handleSendRate} disabled={ratedCourse}>
                   Done
                  </Button>
                 
                  </Typography>
                  </Stack>
             
                  </Menu></>}
                 {courseEv && myCourse.rating && <Stack gap={2}>
                  <Typography sx={{color:"#bbd2b1",fontWeight:"bold"}}>My Course Rating</Typography>
                  <Rating name="no-value" value={valuerate} readOnly={true} /></Stack>}
                  


{(inst && !myCourse.rateInst) && 
          <> <Button variant="contained" sx={{backgroundColor:"#bbd2b1" ,fontWeight:"bold",ml:"0.8rem",
                boxShadow:"none", textDecoration:"none", width:"fit-content", flex:0.5,
                "&:hover":{
                    cursor: "pointer",
                    color:"#bbd2b1",
                    backgroundColor:"#fff"

                    }}} onClick={handleRateClickInst}
                    disabled={disabled} >
                     Instructor Rate</Button>
                    <Menu
                    id="basic-menu"
                    anchorEl={anchorElInst}
                    open={openInst}
                    onClose={handleCloseInst}
                    MenuListProps={{
                      'aria-labelledby': 'basic-button',
                    }}
                    sx={{display:"flex",p:"1rem"}}
                  >
                    <Stack direction="column" sx={{padding: "0.5rem 1rem"}}>
                    
                    <Typography variant="p" sx={{pt:"2%"}}> <Rating name="no-value" value={valueInstrate} onChange={handleRateInst} /></Typography>
               <Typography variant="p" >   <Button
                 sx={{ color:"rgba(197, 13, 13, 0.8)" , position: "relative",
                 right: "-54%",
                 '&:hover':{
                  color:"rgba(197, 13, 13)" ,
                  backgroundColor:"white"
                 }}} onClick={handleSendRate} disabled={ratedInst}>
                  Done
                  </Button>
                 
                  </Typography>
                  </Stack>
             
                  </Menu></>}
                  {inst && myCourse.rateInst && 
                  <Stack gap={2}>
                  <Typography sx={{color:"#bbd2b1",fontWeight:"bold"}}>My Instructor Rating</Typography>
                  <Rating name="no-value" value={valueInstrate} readOnly={true} /></Stack>}
                  



                   <Card variant="outlined" sx={{ display: 'flex',flex: 2,m: "0 2rem 0 6rem",position:"relative"}}> 
                   <CardContent sx={{width:"90%"}}>
                     <Stack gap={3}>
                 {courseEv&& <> 
                 <Typography sx={{fontWeight:"bold"}}> Course Review: </Typography> 
                 
                     <TextField sx={{width:"100%",
                      }}
          id="outlined-multiline-static"
          label="Write Your Review"
          multiline
          rows={4}
          placeholder='Write Your Review'
          disabled={courseReview==""?false:(editCourse==true?true:false)}
          value={courseReviewWrite}
          onChange={handleChangeCourse}
         
        />
        </>}
                {inst && <> <Typography sx={{fontWeight:"bold"}}> Instructor Review </Typography> 
                
                     <TextField sx={{width:"100%"}}
          id="outlined-multiline-static"
          label="Write Your Review"
          multiline
          rows={4}
          placeholder='Write Your Review'
          disabled={instReview==""?false:(editInst==true?true:false)}
          value={instructorReviewWrite}
          onChange={handleChangeInst}
          // defaultValue="Default Value"
        />
        </>}

{ courseEv &&  <Stack position="absolute" right={"5%"}>
                     <Stack direction="row" gap={1}>
                    { editCourse && courseReview!="" && <Tooltip title="editCourse review">
                     <ModeEditIcon sx={{'&:hover':{cursor:"pointer"}}} onClick={handelEditCourse}/>
                     </Tooltip>}
                    { stopEditCourse && courseReview!="" && <Tooltip title="cancel editCourse">
                     <EditOffIcon sx={{'&:hover':{cursor:"pointer"}}}  onClick={handelStopEditCourse}/>
                     </Tooltip>}
                     {courseReview!="" && <Tooltip title="delete review">
                     <DeleteForeverIcon sx={{'&:hover':{cursor:"pointer"}}} onClick={handleDeleteCourseReview}/>
                     </Tooltip>}
                     </Stack>
                 </Stack>}

{ inst &&  <Stack position="absolute" right={"5%"}>
    <Stack direction="row" gap={1}>
  { editInst && instReview!="" && <Tooltip title="edit instructor review">
    <ModeEditIcon sx={{'&:hover':{cursor:"pointer"}}} onClick={handelEditInst}/>
    </Tooltip>}
  { stopEditInst && instReview!="" && <Tooltip title="cancel editCourse">
    <EditOffIcon sx={{'&:hover':{cursor:"pointer"}}}  onClick={handelStopEditInst}/>
    </Tooltip>}
    {instReview!="" && <Tooltip title="delete review">
    <DeleteForeverIcon sx={{'&:hover':{cursor:"pointer"}}} onClick={handleDeleteInsteReview}/>
    </Tooltip>}
    </Stack>
</Stack>}

        {/* no review */}
    { ( (courseEv && (stopEditCourse || courseReview=="")) ||
        (inst && (stopEditInst || instReview==""))) &&   
  <div class="text-end">
        
<Button data-bs-toggle="modal" data-bs-target="#exampleModal" variant="outlined" sx={{color:"#000",
     border:"1px solid rgba(197, 13, 13, 0.8)" , fontSize:"0.8rem",
    '&:hover':{
     border:"1px solid rgba(197, 13, 13)" 
      }}}
      onClick={handlePost}
     >
      Post
      </Button>
        </div> }
</Stack>
                   </CardContent>
                   </Card> 
                   { courseEv && <Tooltip title="Instructor Evaluation">
       < NavigateNextIcon sx={{"&:hover":{color:"#bbd2b1",cursor:"pointer"}}} onClick={handleInst}/>
       </Tooltip>}
       { inst && <Tooltip title="Course Evaluation">
       < NavigateNextIcon sx={{"&:hover":{color:"#bbd2b1",cursor:"pointer"},transform:"rotate(180deg)"}} onClick={handleCourse}/>
       </Tooltip>}

          </Stack>
        </AccordionDetails>
      </Accordion>
     
      </>
      
      </>
    )
}
export default AccordianEvaluateAll
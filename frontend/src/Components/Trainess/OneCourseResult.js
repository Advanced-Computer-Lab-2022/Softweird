
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
import AccordionEvaluateAll from './AccordionEvaluateAll'
import { TraineeMyCourses } from '../../Context/TraineeMyCourses';
import {HiOutlineReceiptRefund} from 'react-icons/hi'
import { IconContext } from "react-icons";
import DialogRefundRequest from "./DialogRefundRequest";
import PendingIcon from '@mui/icons-material/Pending';
import BlockIcon from '@mui/icons-material/Block';
import CertificateSm from './CertificateSm';
import ToastMess from '../OneComponent/ToastMess';
import DownloadIcon from '@mui/icons-material/Download';
import jsPDF from 'jspdf'
import Certificate from '../../Images/Certificate.png'

import Mathematics from '../../Images/Mathematics.jpeg'
import DataScience from '../../Images/DataScience.png'
import ComputerScience from '../../Images/Computer Science.jpg'
import CloudComputing from '../../Images/Cloud Computing.jpeg'
import ArtificialIntelligence from '../../Images/Artificial Intelligence.jpg'
import CyberSecurity from '../../Images/Cyber Security.jpeg'
import Sciences from '../../Images/Sciences.jpeg'
import Business from '../../Images/Business.jpg'


const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,

  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === 'light' ? '#bbd2b1' : '#308fe8',
  },
}));

function OneCourseResult ({myCourse}) {
  const {myCourses,setMyCourses ,courses,setCourses,instructors,setInstructors} = useContext(TraineeMyCourses)
  const auth =useAuth()
    const {curr , setCurr ,rate,setRate} = useContext(Currency) 
    const [course ,setCourse] =useState([])
    const [instructor ,setInstructor] =useState([])
    const [vidNo ,setVidNo] = useState([])
    const [examDone ,setExamDone] = useState([])
    const [examNo ,setExamNo] = useState([])
    const [failExam,setFailExam] = useState([])
    const [avgGrade,setAvgGrade] = useState([])
    const [vidDone,setVidDone] = useState([])
   const [open ,setOpen] =useState(false)
    const [noExams,setNoExams] =useState(true)
    const theme = useTheme();
    const [message,setMessage]=useState()

    useEffect (() =>{
      var title="";
      var instid =""
      if(courses){
        courses.map(c=>{
        if (c._id == myCourse.course){
          setCourse(c)
          title=c.title
          instid = c.instructor_id
        }
      })
    }

    if(instructors){
      instructors.map(i=>{
      if (i.user==instid){
        setInstructor(i)
       
      }
    })
  }
      var v = 0
      var e=0
      myCourse.subtitlesTotal.map(se=>{
        e+=se.exercises
        v+=se.videos

      })
      setVidNo(v)
      setExamNo(e)

      var vd = 0
      if(myCourses.videoWatched.length>0)
     { myCourses.videoWatched.map(v=>{
        if(v.course==title){
          v.subtitlesWatched.map(s=>{
            vd+=s.video.length
          })
        }
      })}
      setVidDone(vd)

      var exF = 0
      var exD = 0
      var gT = 0 
      if(myCourses.exercises.length>0)
      { myCourses.exercises.map(e=>{
         if(e.course==myCourse.course){
           if(e.grade<35){
             exF+=1
           }
          
             exD+=1
           
           gT+=e.grade
         }
       })}
       if(exD!=0){
      setNoExams(false)
      gT=Math.round((gT/exD)*10) /10
    }
      else setNoExams(true)
       
       
       setFailExam(exF)
       setExamDone(exD)
       setAvgGrade(gT)


    },[courses,instructors,myCourses])

    function handleRefundRequest(e){
      setOpen(true)

    }
    function handleNav(e){
      console.log(e.target)
      if(e.target.id=="ref"){
        handleRefundRequest(e)
      }
      else if(e.target.id=="cer" || e.target==
      <path d={"M5 20h14v-2H5v2zM19 9h-4V3H9v6H5l7 7 7-7z"}></path>){
        e.preventDefault()
        return
      
      }
      else{
        if(auth.user.type=="individual"){
          if(myCourse.refund.set==true && myCourse.refund.state=="pending"){
          window.location.href=`/Courses/${course.title}`}
          else{
            console.log("ff")
        window.location.href=`/MyCourses/${course.title}`}
          }
        
        else{
          window.location.href=`/MyCourses/${course.title}`}
        }
  
  }
  const downloadCert =()=>{
    var doc=new jsPDF('landscape', 'px', 'a4','false');
    var width = doc.internal.pageSize.getWidth();
    var height = doc.internal.pageSize.getHeight();
   // doc.setFont('RockSalt-Regular', 'normal');
   var date =""
    doc.addImage(Certificate,'PNG',0,0,width,height)
    if(myCourses.length!=0){
      myCourses.courseInfo.map(c=>{
        if(c.course==course._id){
       
          date = (c.certDate.slice(0,10))
      
       
        }
      })
     }
    doc.text(280,250, auth.user.fName + " "+ auth.user.lName)
    doc.text(260,327,course.title)
    doc.text(290,360,date)
    doc.save('certificate.pdf')
 }

    return (
<>
<Stack >
 <Box sx={{position:"relative" ,m:"0",p:"0",width: "90%",left:" 5%"}} >
<Card id ="card" variant="outlined" className="stack1" sx={{ display: 'flex',
"&:hover":{
    cursor: "pointer",
    boxShadow: "0 3px 4px rgba(0,0,0,.12), 0 3px 4px rgba(0,0,0,.06)",

} }} onClick={handleNav} >
<CardMedia
  component="img"
  sx={{ width: "35%",borderRadius:"25px",padding:"3%" }}
  image={(course.subject=="Mathematics"&& Mathematics)||
  (course.subject=="Computer Science"&& ComputerScience)||
  (course.subject=="Artificial Intelligence"&& ArtificialIntelligence)||
  (course.subject=="Sciences"&& Sciences)||
  (course.subject=="Cyber Security"&& CyberSecurity)||
  (course.subject=="Cloud Computing"&& CloudComputing)||
  (course.subject=="Business"&& Business) ||
  (course.subject=="Data Science"&& DataScience)
}


/>
<p className="stack2"></p>

<Box sx={{ display: 'flex', flexDirection: 'column',width:"100%",pl:"1rem" }}>
  <CardContent  sx={{ flex: '1 0 auto' ,pt:"5%"

  }}>
    <Stack direction ="row"  justifyContent="space-between"
    alignItems=" center">
    <Typography component="div" variant="h4" sx={{fontSize:"1.7rem"}}>
      {course.title}
    </Typography>
     
     {/* Certified */}
    {myCourse.certificate!="" && <Stack  direction="row" gap={0.5}  marginRight={"2rem"} alignItems={"center"}>
    <VerifiedIcon fontSize={"1rem"}sx={{color:"#faaf00" }}/>
    <Typography  fontSize={"0.8rem"} color={"grey"}> Certified</Typography>
    <Box id="cer" onClick={downloadCert}>
    <Tooltip title={"download certificate"} id="cer">
    <Button onClick={downloadCert} data-bs-toggle="modal" data-bs-target="#exampleModal"  id="cer" startIcon={<DownloadIcon sx={{color:"black"}} id="cer"/>}>
             
            </Button>
           
        </Tooltip>
        </Box>
    </Stack> }

   
    {auth.user.type=="individual"  && myCourse. certificate =="" && 
    (myCourse.refund.set!=true || myCourse.refund.set==true && myCourse.state=="rejected") &&
    <Stack  direction="row" gap={0.5}  marginRight={"2rem"}>
    <TaskAltIcon fontSize={"1rem"}sx={{color:"green"}}/>
    <Typography  fontSize={"0.8rem"} color={"grey"}> Registered</Typography>
    </Stack> }

     
    {auth.user.type=="individual"  && myCourse.refund.set ==true &&  myCourse.refund.state =="pending" &&
    <Stack  direction="row" gap={0.5}  marginRight={"2rem"}>
    <PendingIcon fontSize={"1rem"}sx={{color:"#c50d0d"}}/>
    <Typography  fontSize={"0.8rem"} color={"grey"}> pending refund response</Typography>
    </Stack> }

   

    {auth.user.type =="corporate" && myCourse. certificate =="" &&
    <Stack direction="row" gap={0.5}  marginRight={"2rem"}>
    <TaskAltIcon fontSize={"1rem"}sx={{color:"green"}}/>
    <Typography  fontSize={"0.8rem"} color={"grey"}> Registered</Typography>
    </Stack>
    }
</Stack>

    






    <Box sx={{ display: 'flex', flexDirection: 'column',width:"100%",marginTop:"2rem",gap:"0.5rem" }}>
<Stack direction="row" gap={2}>
  <FeaturedVideoIcon sx={{color:"#bbd2b1"}}/>
      <Typography variant="p" component="div" sx={{fontSize:"0.9rem"}}><b>Finished Lectures :</b> {vidDone} out of {vidNo} Lectures </Typography>
      </Stack> 
 <Stack direction="row" gap={2}>
      <QuizIcon  sx={{color:"#bbd2b1"}}/>
    <Typography variant="p" component="div" sx={{fontSize:"0.9rem"}}> <b>Solved Exams :</b> {examDone} out of {examNo} Exams  </Typography>
    </Stack>

    <Stack direction="row" gap={2} alignItems={"center"}>
    <img src={CorrectedExams} />
    <Typography variant="p" component="div" sx={{fontSize:"0.9rem"}}><b>Average exam grades</b> : {!noExams?`${avgGrade} % `: "NAN %"}</Typography>
    </Stack>
    <Stack direction="row" gap={2}>
      <RedoIcon sx={{color:"#c50d0d"}}/>
    <Typography variant="p" component="div" sx={{fontSize:"0.9rem"}}>You have <b>{failExam}</b> exam to resolve</Typography>
    </Stack>

<div class="text-right">
    {auth.user.type=="individual" && myCourse.refund.set ==true && myCourse.refund.state =="pending" &&
    <Stack direction="row"  gap={0.5} justifyContent={"flex-end"} marginRight={"2rem"}>
    <BlockIcon fontSize={"1rem"}sx={{color:"#c50d0d"}}/>
    <Typography  fontSize={"0.8rem"} color={"grey"}> You can't access this course right now</Typography>
    </Stack> }
    
{/* 50% progress */}
{course.price!="Free" && auth.user.type!="corporate" && ((myCourse.percentage.progress/myCourse.percentage.total || 0) <0.5) && 
(myCourse.refund.set!=true)&& 
<Stack direction="row" gap={0.5}  justifyContent={"flex-end"}  marginRight={"2rem"}>
<Button data-bs-toggle="modal" data-bs-target="#exampleModal"  id="ref" startIcon={
<HiOutlineReceiptRefund style={{color:"#bbd2b1"}} />
} sx={{color:"#000",
     border:"1px solid rgba(197, 13, 13, 0.8)" , fontSize:"0.8rem",
    '&:hover':{
     border:"1px solid rgba(197, 13, 13)" 
      }}} onClick={handleRefundRequest}>
        Request Refund
      </Button>
    </Stack> }

    { auth.user.type!="corporate" && myCourse.refund.set==true && myCourse.refund.state=="rejected" && ((myCourse.percentage.progress/myCourse.percentage.total || 0) <0.5) &&
    <Stack direction="row"  gap={0.5} justifyContent={"flex-end"} marginRight={"2rem"}>
    <BlockIcon fontSize={"1rem"}sx={{color:"#c50d0d"}}/>
    <Typography  fontSize={"0.8rem"} color={"grey"}> Your request to refund was rejected</Typography>
    </Stack>  }
    </div>

    <Divider sx={{backgroundColor:"darkgrey",m:"1.5rem 0"}}/>
    <Stack direction="row" gap={2} alignItems={"center"}>
    <Typography variant="p" component="div" sx={{fontSize:"0.9rem"}}><b>Overall Progress:</b></Typography>
   <Box sx={{width:"55%"}}>
    <BorderLinearProgress variant="determinate" value={Math.round(((myCourse.percentage.progress/myCourse.percentage.total)*100)*10)/10 || 0} />
    </Box>
    <Typography variant="p" component="div" sx={{fontSize:"0.7rem"}}><b>{Math.round(((myCourse.percentage.progress/myCourse.percentage.total)*100)*10)/10 || 0}%</b></Typography>
    </Stack>

          </Box>


         
 
    </CardContent>  
      
</Box>

</Card>  
<AccordionEvaluateAll course={course} myCourse={myCourse} instructor={instructor} 
setInstructor={setInstructor} setCourse={setCourse} setMessage={setMessage}/>  

</Box>
</Stack>
<DialogRefundRequest open={open} setOpen={setOpen} course={course} setMessage={setMessage}/>
<ToastMess message={message} />

</>
       
    )
}
export default OneCourseResult
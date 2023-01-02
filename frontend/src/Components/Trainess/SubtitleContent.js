
import 'font-awesome/css/font-awesome.min.css';
import React, { useContext, useEffect, useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import {Stack} from '@mui/material'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Divider from '@mui/material/Divider';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import QuizIcon from '@mui/icons-material/Quiz';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { Button ,Checkbox} from '@mui/material';
import {TraineeCourse} from '../../Context/TraineeCourse'
import Star from '@mui/icons-material/Star';
import DialogSolveExam from './DialogSolveExam'
import DialogGrade from './DialogGrade' 
import DialogFail from './DialogFail'
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import  RedoIcon from '@mui/icons-material/Redo'


var exams = []

function SubtitleContent(){
 
  const{myCourse,setMyCourse,course,index,setIndex,subIndex,setSubIndex,videosWatched,video,setmyVideo,
    setVideo,notes,setNotes,openSolve,setOpenSolve,exam,setexam,openGrade,setOpenGrade,playVideo,setPlayVideo,
    setFirstOpen,successExam,setSuccesexam,failedExam,setFailedexam,openFail,setOpenFail,prog,setProg} = useContext(TraineeCourse)
    const [subtitleSelected,setSubtitleSelected]=useState("");
    const [loading,setLoading]=useState(true)
    const label = { inputProps: {'aria-label': 'controlled' } };
    const [sub,setSub]=useState([])
   const [subTot ,setSubTot] = useState([])
   function handleClick (event,params){
     setIndex(event.target.id)
     setSubIndex(params)
     setPlayVideo(true)
     setFirstOpen(false)

   }
   useEffect(()=>{
     setLoading(true)
     var ved=[]

     if(myCourse!=null){
    if(myCourse.videoWatched.length !=0){
     
      myCourse.videoWatched.map(video=>{
        if(video.course==course.title)
              video.subtitlesWatched.map(sw=>{
                  sw.video.map(v=>{
                      setVideo (videos => [... new Set ([...videos , v])])
                      ved.push(v)
                      
                     
                  })
              })
          
      })
   }
   if(myCourse.notes.length!=0){
       myCourse.notes.map(notes =>{  
           if(notes.course == course.title){
               setNotes(notes.subtitleNotes)
           }
       })
   }
   if(myCourse.courseInfo.length!=0){
     myCourse.courseInfo.map(c=>{
    
       if(c.course==(course._id)){
       
         setSub(c.subtitlesTotal)
       }
     })
   }
  var c= 0;
  var sub =[]
  var fail =[]
  var success =[]
  var exam =[]
  if(myCourse.exercises.length!=0){
    myCourse.exercises.map(e =>{
      if(e.course==course._id){
        setexam(s => [... new Set([...s,e.subtitle])])
        exam.push(e.subtitle)
       
      }
      if(e.course==course._id&&e.grade>=35){
        setSuccesexam(s => [... new Set([...s,e.subtitle])])
       success.push(e.subtitle)
      }
      if(e.course==course._id&&e.grade<35){
        setFailedexam(s => [... new Set([...s,e.subtitle])])
        fail.push(e.subtitle)
       
      }
    })
  }

 course.subtitles.map(s=>{
     c=0
     
     s.video.map(v=>{
       if(ved.includes(v.text)){
         c+=1
         
       }
     })
     console.log(successExam)
     if (success.includes(s.title)){
       c+=1;}
     sub.push(c)
     console.log(sub)
   })
   setSubTot(sub)

   var p =""
  
   if(myCourse.length!=0)
 {  myCourse.courseInfo.map(c=>{
     if(c.course===course._id){
        p= Math.round(((c.percentage.progress/c.percentage.total)*100)*10)/10
       

     }
    
     })}
     setProg(p)
 
   
   setLoading(false)
  }
  
   },[myCourse,course])


   function handleExam (event,params){
     setFirstOpen(false)
     if(!exam.includes(params)){
    setOpenSolve(true)

     }

     else if (successExam.includes(params)){
         setOpenGrade(true)
     }
     else {
       setOpenFail(true)

     }
    setSubtitleSelected(params)
   
    
    setPlayVideo(false)
   
   }
   
console.log(sub,subTot)
    return(
      <>
       {course && !loading &&
       <Stack maxHeight={"28rem"} sx={{overflow:"auto"}} >
        {course.subtitles.map((subtitle,subIndex2)=>{
        return <Accordion defaultExpanded={subIndex==subIndex2} key={subtitle._id} position="relative" 
        sx = {{maxWidth:"100%",mb:"1%",boxShadow:"0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px #bbd2b1, 0px 1px 3px 0px rgb(0 0 0 / 12%)"}} disableGutters> 
        <AccordionSummary
          expandIcon={<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-journal-arrow-up" viewBox="0 0 16 16" fontWeight={"bolder"}>
          <path fill-rule="evenodd" d="M8 11a.5.5 0 0 0 .5-.5V6.707l1.146 1.147a.5.5 0 0 0 .708-.708l-2-2a.5.5 0 0 0-.708 0l-2 2a.5.5 0 1 0 .708.708L7.5 6.707V10.5a.5.5 0 0 0 .5.5z"/>
          <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z"/>
          <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z"/>
        </svg>}
          aria-controls="panel1a-content"
          id="panel1a-header"
          style ={{backgroundColor:"#bbd2b1"}}
          
        >
            <Stack direction="row" sx={{width:"100%",alignItems:"center"}}>
            <svg xmlns="http://www.w3.org/2000/svg" width="29" height="54" fill="currentColor" class="bi bi-pin-angle-fill" viewBox="0 0 16 16" color="black">
            <path d="M9.828.722a.5.5 0 0 1 .354.146l4.95 4.95a.5.5 0 0 1 0 .707c-.48.48-1.072.588-1.503.588-.177 0-.335-.018-.46-.039l-3.134 3.134a5.927 5.927 0 0 1 .16 1.013c.046.702-.032 1.687-.72 2.375a.5.5 0 0 1-.707 0l-2.829-2.828-3.182 3.182c-.195.195-1.219.902-1.414.707-.195-.195.512-1.22.707-1.414l3.182-3.182-2.828-2.829a.5.5 0 0 1 0-.707c.688-.688 1.673-.767 2.375-.72a5.922 5.922 0 0 1 1.013.16l3.134-3.133a2.772 2.772 0 0 1-.04-.461c0-.43.108-1.022.589-1.503a.5.5 0 0 1 .353-.146z"/>
            </svg>
          <Typography variant={"p"}sx={{ pl:"4%",width: '60%', pr:"2rem",flexShrink: 0,fontSize:"0.9rem"}}>{subtitle.title}</Typography> <br/>
    <Stack direction="row" width="100%" gap={"2px"}>
          <Typography sx={{ color: 'text.secondary', fontSize:"0.8rem",mr:"3%",ml:"7%",fontSize:"0.75rem",position: "relative",
    bottom: "-10px"}}>
               {subtitle.totalHours<60?subtitle.totalHours+ " min" :
                Math.round(subtitle.totalHours*10)/10+ " hrs"} 
              </Typography>
              <Divider orientation="vertical" variant="middle"  style = {{backgroundColor:"#EC6A37",opacity:1,height:"0.85rem",position: "relative",
    bottom: "-4px"}}/>
              <Typography sx={{ color: 'text.secondary', fontSize:"0.8rem",ml:"2%",fontSize:"0.75rem",position: "relative",
    bottom: "-10px"}}>
              { subTot[subIndex2]}/{sub[subIndex2].exercises+sub[subIndex2].videos}
               </Typography>
               </Stack>
              </Stack>
        </AccordionSummary>
        <AccordionDetails sx={{padding:0,paddingTop:"0.5%" }}>
        <Stack  marginTop={"2%"} >
      {subtitle.video.map((video,index2)=>{
       return <div id ={video.text} key={video.text}>
          <Button id ={index2}  position="relative" sx={{color:"black !important" ,fontSize:"0.85rem",textTransform:"none",textAlign:"inherit",textTransform:"none",width:"100%",padding:0,
         }} 
          onClick={event=>handleClick(event,subIndex2)}>
          <Stack   id ={index2}  direction="row"  backgroundColor={subIndex2==subIndex && index==index2 ?"lightgrey":"white"} alignItems={"center"}  position="relative" sx={{paddingLeft:"5%",width:"100%",mb:"0.7rem"}}>
          
        <Stack  id ={index2}   direction={"row"} width={"85%"} alignItems={"center"} gap={"1%"}>
          <Checkbox  {...label} disabled checked={videosWatched.includes(video.text)} size="small" sx={{
         
         '&.Mui-checked': {
           color: "black",
         },
       }}/>
         <Typography variant="p"  id ={index2} sx={{maxWidth:"75%"}} >
           {video.text}
           </Typography>
          </Stack>
          <Typography id ={index2} position="relative" fontSize={"0.7rem"} color="text.secondary">
          {video.length<60?video.length+ " min" :
                Math.round(video.length*10)/10+ " hrs"} 
          </Typography>
          
          </Stack>
          </Button>
          <Divider  component="Typography" />
        </div>})}
        {subtitle.exercise.length!=0 && 
         <Button   position="relative" sx={{color:"black !important" ,fontSize:"0.85rem",textTransform:"none",textAlign:"inherit",textTransform:"none",width:"100%",padding:0}} 
         onClick={event=>handleExam(event,subtitle.title)}>
         <Stack direction="row"  alignItems={"center"}  position="relative" sx={{paddingLeft:"5%",width:"100%"}}>
         
       <Stack direction={"row"} width={"80%"} alignItems={"center"} gap={"1%"}>
         <Checkbox  {...label} disabled checked={successExam.includes(subtitle.title)} size="small" sx={{
        
        '&.Mui-checked': {
          color: "black",
        },
      }}/>
      {failedExam.includes(subtitle.title) && <RedoIcon sx={{color:"#c50d0d",fontSize:" 0.8rem",
    mr: "0.5rem"}}/>}
        <Typography variant="p" sx={{textDecoration:"underline"}}  >
          Exam
          </Typography>
          <QuizIcon sx={{fontSize:"1.1rem",ml:"4%",color:"#000",position: "relative",
    }}/>
         </Stack>
         {exam.includes(subtitle.title) &&  
        myCourse.exercises.map(e =>{
          return <> {e.course==course._id && e.subtitle==subtitle.title && 
            <Typography position="relative"fontSize={"0.7rem"} sx={{color:"#c50d0d",fontStyle:"italic !important"}}>
              {e.grade} %
            </Typography>}  </>
           
          })}
         </Stack>
         </Button>}
          </Stack>
        </AccordionDetails>
      </Accordion>   
      })}     
        </Stack>}
        <DialogSolveExam subtitle={subtitleSelected}/>
        <DialogGrade subtitle={subtitleSelected}/>
        <DialogFail subtitle={subtitleSelected}/>
        </>
    )
}
export default SubtitleContent
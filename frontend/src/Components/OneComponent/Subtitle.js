import 'font-awesome/css/font-awesome.min.css';
import React, { useContext, useState } from 'react';
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
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import { InstructorOneCourse } from '../../Context/InstructorOneCourse';
import reviews from './Reviews';
import ReactPlayer from "react-player";
import './Subtitle.css'
import PreviewVideo from './PreviewVideos';
import { Button } from '@mui/material';
import { OneCourseResult } from '../../Context/OneCourseResult';
 

function Subtitle (props) {
  const {open,setOpen,course} =useContext(OneCourseResult)
  const [index,setIndex]=useState(0)
  const [subInd,setSubInd] = useState(0)
  const type = "trainee previews"
  const subtitles = course.subtitles 
  const previews = []
  if(subtitles && subtitles.map(s=>{
    s.video.map(v=>{
      if(v.preview) previews.push(v)
    })
  }))
  var counter = 0


   
  function handelPreview(event,params){
      console.log(event.target.id)
      if(event.target.id!=""){
        console.log(previews)
        setOpen(true)
        setIndex(event.target.id)
        setSubInd(params)
    }
        
    }

      return ( 
          <>
    {course.subtitles && course.subtitles.map ((subtitle ,subInd )=> {
        return  <Accordion key ={subtitle.title} position="relative" sx = {{mb:"0.3rem",boxShadow:"0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px #bbd2b1, 0px 1px 3px 0px rgb(0 0 0 / 12%)"}}> 
        <AccordionSummary
          expandIcon={<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-journal-arrow-up" viewBox="0 0 16 16" fontWeight={"bolder"}>
          <path fill-rule="evenodd" d="M8 11a.5.5 0 0 0 .5-.5V6.707l1.146 1.147a.5.5 0 0 0 .708-.708l-2-2a.5.5 0 0 0-.708 0l-2 2a.5.5 0 1 0 .708.708L7.5 6.707V10.5a.5.5 0 0 0 .5.5z"/>
          <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z"/>
          <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z"/>
        </svg>}
          aria-controls="panel1a-content"
          id="panel1a-header"
          sx={{backgroundColor:"lightgrey",paddingLeft:"3rem"}}
        >
            
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pin-angle-fill" viewBox="0 0 16 16" color="black">
            <path d="M9.828.722a.5.5 0 0 1 .354.146l4.95 4.95a.5.5 0 0 1 0 .707c-.48.48-1.072.588-1.503.588-.177 0-.335-.018-.46-.039l-3.134 3.134a5.927 5.927 0 0 1 .16 1.013c.046.702-.032 1.687-.72 2.375a.5.5 0 0 1-.707 0l-2.829-2.828-3.182 3.182c-.195.195-1.219.902-1.414.707-.195-.195.512-1.22.707-1.414l3.182-3.182-2.828-2.829a.5.5 0 0 1 0-.707c.688-.688 1.673-.767 2.375-.72a5.922 5.922 0 0 1 1.013.16l3.134-3.133a2.772 2.772 0 0 1-.04-.461c0-.43.108-1.022.589-1.503a.5.5 0 0 1 .353-.146z"/>
            </svg>
          <Typography sx={{ width: '42%', flexShrink: 0,pl:"3rem" }}>{subtitle.title}</Typography>
              <Typography sx={{ color: 'text.secondary',width:"56%" }}>
                {subtitle.video.length} Lectures . {subtitle.totalHours} hours
              </Typography>
            
             
        </AccordionSummary>
        <AccordionDetails sx={{marginBottom:"2rem"}}>
        <Stack gap={3} marginTop={"2%"} marginLeft={"15%"} maxWidth={"65%"}>
          {subtitle.video.map((video,videoInd)=>{

         return  <div key={video.text}>
          <Stack direction="row" justifyContent={"space-between"} marginLeft={"1rem"} marginRight={"3rem"} position="relative">
          
          {video.preview ? <>
          <Typography variant="p">
          <YouTubeIcon sx={{color:"#bbd2b1",mr:"1rem"}} />
          <Button variant="text" sx={{textDecoration:"underline"}} position="relative" id={counter++} onClick={event =>handelPreview(event,subInd)} >
          
            {video.text}

          </Button>
          </Typography> </>: <Typography variant="p">
          <YouTubeIcon sx={{color:"#bbd2b1",mr:"1rem"}} />
         <Button variant="text" position="relative"  disabled sx={{color:"black !important"}} >
        
           {video.text}

         </Button>
         </Typography>}
          <Typography position="relative">
            {video.length} hours 
          </Typography>
          
          </Stack>
          <Divider  component="Typography" />
          </div>})}


          {subtitle.exercise.length!=0 &&
           <Stack direction="row" justifyContent={"space-between"} marginLeft={"1rem"} position="relative">
            <Typography variant="p">
          
           <Button variant="text" position="relative"  sx={{color:"black !important"}} disabled>
           <QuizIcon sx={{color:"#bbd2b1",mr:"1rem"}} id={index}/>Quiz
          </Button> 
           </Typography>
          </Stack>}
          
          </Stack>
        </AccordionDetails>
      </Accordion>        
    })}
  {open && <PreviewVideo previews={{subtitles,index,type,subInd,previews}}/>}
   </>

    )
   
}
export default Subtitle
import 'font-awesome/css/font-awesome.min.css';
import React, { useContext, useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import PreviewVideo from '../OneComponent/PreviewVideos'
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
import {Alert} from '@mui/material'
import {OneCourseResult} from '../../Context/OneCourseResult'
import ToastMess from '../OneComponent/ToastMess';
import {Toast} from '../../Context/Toast'
import axios from 'axios'

function OneSubtitle (props) {
    
  const [index,setIndex]=useState(0)
  const [subInd,setSubInd] = useState(0)
  const [open,setOpen] = useState(false)
  var old = false;
  const type = "instructor edit"
 const {setOpenToast} = useContext(Toast)
  const {openAdd,openVideo,setOpenAdd,setOpenVideo,courses,setCourse,subtitleSelected,setSubtitleSelected,
  openExam,setOpenExam,openReview,setOpenReview,exam,setExam,messaga,setMessage} =useContext(InstructorOneCourse)
const subtitles = courses.subtitles


    const handleToggle = (e) => {
        setOpenAdd(!openAdd);
        
    };

    function handleToggleVideo (event,params)  {
      setOpenVideo(!openVideo);
      setSubtitleSelected(params)
      
      
  };
  
  function handleToggleExam (event,params)  {
    setOpenExam(!openExam);
    setSubtitleSelected(params)
    old = false
    
};
function handleExam (event,params) {
  setOpenReview(!openReview);
  setExam(params)
}
  function handelVideo(event,params) {
    if(event.target.id!==""){
    setOpen(true)
    setIndex(event.target.id)
    setSubInd(params)
    }

    
  }
  function handleDeleteSubtitle (event,params) {
    if (window.confirm("Are you sure you want to delete this subtitle?")){
      let cancel
      axios({
        method:"patch",
        url : '/Instructor/deleteSubtitle',
        data : {subtitleTitle:params,courseTitle:courses.title},
        headers : {'Content-Type' : 'application/json'},
        cancelToken: new axios.CancelToken (c => cancel = c)
      }).then (res => {
          setCourse(res.data)
          setMessage("Subtitle Deleted Successfully")
          setOpenToast(true)
      }).catch(e=>{
          if(axios.isCancel(e)) return 
      })
      return () => cancel ()
      
   }

  }
  function handleDeleteVideo(event,params,params2){
    
   
  
    if (window.confirm("Are you sure you want to delete this video?")){
      let cancel
      axios({
        method:"patch",
        url : '/Instructor/deleteVideo',
        data : {subtitleTitle:params,courseTitle:courses.title,videoText:params2},
        headers : {'Content-Type' : 'application/json'},
        cancelToken: new axios.CancelToken (c => cancel = c)
      }).then (res => {
          setCourse(res.data)
          setMessage("Video Deleted Successfully")
          setOpenToast(true)
      }).catch(e=>{
          if(axios.isCancel(e)) return 
      })
      return () => cancel ()
      
    }
  
  }
  
    
      return ( 
          <OneCourseResult.Provider value={{open,setOpen}}>
          <Box position={"relative"}>
    {courses.subtitles && courses.subtitles.map ((subtitle,subtitleInd) => {
        return  <Stack direction="row" sx={{width:"96%"}}>
           
        <Accordion key={subtitle._id} position="relative" sx = {{mb:"0.3rem",boxShadow:"0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px #bbd2b1, 0px 1px 3px 0px rgb(0 0 0 / 12%)",flex:1}}> 

        <AccordionSummary 
          expandIcon={<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-journal-arrow-up" viewBox="0 0 16 16" fontWeight={"bolder"}>
          <path fillRule="evenodd" d="M8 11a.5.5 0 0 0 .5-.5V6.707l1.146 1.147a.5.5 0 0 0 .708-.708l-2-2a.5.5 0 0 0-.708 0l-2 2a.5.5 0 1 0 .708.708L7.5 6.707V10.5a.5.5 0 0 0 .5.5z"/>
          <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z"/>
          <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z"/>
        </svg>}
          aria-controls="panel1a-content"
          id="panel1a-header"
          sx={{backgroundColor:"lightgrey",paddingLeft:"3rem"}}
        >
            
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pin-angle-fill" viewBox="0 0 16 16" >
            <path d="M9.828.722a.5.5 0 0 1 .354.146l4.95 4.95a.5.5 0 0 1 0 .707c-.48.48-1.072.588-1.503.588-.177 0-.335-.018-.46-.039l-3.134 3.134a5.927 5.927 0 0 1 .16 1.013c.046.702-.032 1.687-.72 2.375a.5.5 0 0 1-.707 0l-2.829-2.828-3.182 3.182c-.195.195-1.219.902-1.414.707-.195-.195.512-1.22.707-1.414l3.182-3.182-2.828-2.829a.5.5 0 0 1 0-.707c.688-.688 1.673-.767 2.375-.72a5.922 5.922 0 0 1 1.013.16l3.134-3.133a2.772 2.772 0 0 1-.04-.461c0-.43.108-1.022.589-1.503a.5.5 0 0 1 .353-.146z"/>
            </svg>
          <Typography sx={{ width: '42%', flexShrink: 0,pl:"3rem" }}>{subtitle.title}</Typography>
              <Typography sx={{ color: 'text.secondary',width:"56%" }}>
        {subtitle.video.length} Lectures . {subtitle.totalHours<60?subtitle.totalHours+ " min" :
                Math.round(subtitle.totalHours*10)/10+ " hrs"} 
              </Typography>
            
             
        </AccordionSummary>
        <AccordionDetails>
        <Stack  gap={3} marginTop={"2%"} marginLeft={"15%"} maxWidth={"65%"}  positio="relative" width={"96%"}>
          {subtitle.video.map((video,videoInd)=>{
          return <>
          
          <Stack key={video.text} direction="row" justifyContent={"space-between"} marginLeft={"1rem"} position="relative">
          <Typography sx={{"&:hover":{cursor:"pointer"}}}>
         {!courses.Finished && !courses.Deleted && 
         <Tooltip title="edit video">
         <IconButton color="primary" component="label" 
          sx={{position:"relative",left:"-2rem"}}
         >
          <input hidden  />
          <EditIcon sx={{color:"black"}} />
        </IconButton>
        </Tooltip>}
        <YouTubeIcon sx={{color:"#bbd2b1",mr:"0.2rem"}} id={videoInd} />
        <Button sx={{textDecoration:"underline",textTransform:"none",maxWidth:"20rem"}}variant="text"  id={videoInd} 
        
        onClick={(event)=>handelVideo(event,subtitleInd)} >
           {video.text} {video.preview&& <span style={{
    marginLeft:" 1rem",
    color: "black",
    fontSize: "0.8rem"
}}>(Preview)</span>}
          </Button>
           
          </Typography>
          <Typography  id={video.text}>
          {video.length<60?video.length+ " min" :
                Math.round(video.length*10)/10+ " hrs"} </Typography>
            {!courses.Finished && !courses.Deleted && 
            <Tooltip id={video.text} title="delete Video">
            <IconButton id={video.text}color="primary" aria-label="upload picture" component="label" 
          sx={{position:"absolute" , right:"-4rem" ,top:"-0.5rem" }} onClick={event=>handleDeleteVideo(event,subtitle.title,video.text)}>
          <input hidden  />
          <DeleteIcon id={video.text}  sx={{color:"black"}} />
          </IconButton>
          </Tooltip>}
          
          </Stack>
          <Divider  component="Typography" />

         </>
           })}
           {subtitle.exercise.length!=0 &&
           <Stack direction="row" justifyContent={"space-between"} marginLeft={"1rem"} position="relative">
          
           <Typography position="relative" sx={{"&:hover":{cursor:"pointer"}}}>
          {!courses.Finished && !courses.Deleted && 
          <IconButton color="primary" aria-label="upload picture" component="label" 
           sx={{position:"relative",left:"-2rem",right:"-4rem"}}
          >
           <input hidden  />
           <EditIcon sx={{color:"black"}} />
         </IconButton>}
         <QuizIcon sx={{color:"#bbd2b1",mr:"0.2rem"}} />
         <Button sx={{textDecoration:"underline",textTransform:"none"}}variant="text" position="relative" 
         
         onClick={(event)=>handleExam(event,subtitle.exercise)}>
            Exam
           </Button>
            
           </Typography>
           
             {!courses.Finished && !courses.Deleted && 
             <IconButton color="primary" aria-label="upload picture" component="label" 
           sx={{position:"relative" ,right:"-9%",top:"-0.5rem" }}
            // onClick={event=>handleDeleteVideo(event,subtitle.title)}
            >
           <input hidden  />
           <DeleteIcon sx={{color:"black"}} />
           </IconButton>}
           
           
           </Stack> }

           </Stack>
          <Box sx={{ height: 100, transform: 'translateZ(0px)', flexGrow: 1 }}>
          {!courses.Finished && !courses.Deleted && 
          <SpeedDial
        ariaLabel="SpeedDial openIcon example"
        sx={{ position: 'absolute', bottom: 3, right: 40 }}
        icon={<SpeedDialIcon />}
        FabProps={{
          sx: {
            bgcolor: '#bbd2b1',
            '&:hover': {
              bgcolor: '#bbd2b1',
            }
            
          }
        }}
        
      >
          <SpeedDialAction
            key={subtitle.title}
            id={subtitle.title}
            icon={<YouTubeIcon  id={subtitle.title}/>}
            tooltipTitle="Video"
            onClick={event => handleToggleVideo(event,subtitle.title)}
          />
          {subtitle.exercise.length==0 && <SpeedDialAction                          
            key="Exam"
            id={subtitle.title}
            icon= {<QuizIcon id={subtitle.title}/>}
            tooltipTitle="Exam"
            onClick={event => handleToggleExam (event,subtitle.title)}
          />}
        
      </SpeedDial>}
        </Box>
        </AccordionDetails>
      
      </Accordion> 
      {!courses.Finished && !courses.Deleted && 
          <Tooltip title="Delete subtitle" flex={0.5} sx={{mr:"1rem"}}>
          <IconButton color="primary" component="label" 
           sx={{position:"absolute",right:"0rem"}} onClick={event => handleDeleteSubtitle(event,subtitle.title)}
          >
           <input hidden  />
           <DeleteIcon sx={{color:"rgba(0, 0, 0, 0.54)"}} />
         </IconButton>
         </Tooltip>}
    
      </Stack>       
    })}
    </Box>
    {!courses.Finished && !courses.Deleted && 
      <Box >
        <Tooltip title="Add Subtitle" sx={{position: 'absolute', bottom: "-6.5rem", right: "1rem" }}>
        <IconButton onClick={handleToggle}>
        <AddCircleIcon  sx={{color:"#bbd2b1",fontSize: {md:"3.5rem",sm:"2.5rem",xs:"2.5rem"}}} />
        </IconButton>
        </Tooltip>
      </Box>}
     
{open && <PreviewVideo previews={{subtitles,index,type,subInd}}/>}
       </OneCourseResult.Provider>
       

    )
   
}
export default OneSubtitle
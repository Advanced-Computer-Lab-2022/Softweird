import * as React from 'react';
import Textarea from '@mui/material/TextareaAutosize';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import { IconButton, TextareaAutosize,Button, containerClasses } from '@mui/material';
import { Container ,Stack,Tooltip} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import { useState } from 'react';
import {useContext} from 'react'
import {TraineeCourse} from '../../Context/TraineeCourse'    
import SaveIcon from '@mui/icons-material/Save';                              
import axios from 'axios'
import jsPDF from 'jspdf'
import {useAuth} from '../auth'
import paper from '../../Images/paper.jpeg'
import {Toast} from '../../Context/Toast'
import ToastMess from '../OneComponent/ToastMess';






function Notes (){
  const auth =useAuth()
  const {course,video,notes,setMyCourse,setReload} = useContext(TraineeCourse)
  const [newNotes , setNewNotes] = useState('')
  const {setOpenToast}= useContext(Toast)
   console.log(notes)
  React.useEffect(()=>{
    notes.map(n=>{
      if(n.videoTitle==video)
         setNewNotes(n.notes)
    })
  },[])


    function handleWriting (e){
        setNewNotes(e.target.value);
    }

    function handleSave(e){
      if(auth.user.type=="individual")
   {   let cancel
      axios({
          method:"PATCH",
          url : `/Individual/notes/${auth.user.id}`,
          data : {videoText:video,courseTitle:course.title,notes:newNotes },
          headers : {'Content-Type' : 'application/json'},
          cancelToken: new axios.CancelToken (c => cancel = c)
      }).then (res => {
          setReload(true)
          setMyCourse(res.data)
          setOpenToast(true)
      }).catch(e=>{
          if(axios.isCancel(e)) return 
      })
      return () => cancel ()}

      if(auth.user.type=="corporate")
      {   let cancel
         axios({
             method:"PATCH",
             url : `/Corporate/notes/${auth.user.id}`,
             data : {videoText:video,courseTitle:course.title,notes:newNotes },
             headers : {'Content-Type' : 'application/json'},
             cancelToken: new axios.CancelToken (c => cancel = c)
         }).then (res => {
             setReload(true)
             setMyCourse(res.data)
             setOpenToast(true)
            
         }).catch(e=>{
             if(axios.isCancel(e)) return 
         })
         return () => cancel ()}
    }

async function handleDownload(){

 var doc = new jsPDF('portrait','px','a4','false')
  var sub ;
  course.subtitles.map(s=>{
    s.video.map(v=>{
      if(v.text==video)
      sub=s.title
    })
  })
  // doc.setFont('Helvertica','bold')
  // doc.stroke()
  // doc.setTextColor(255,0,0)
  // doc.text(40,60,`${course.title} -> ${sub} -> ${video}`)
  // doc.setTextColor(0,0,0)
  // doc.setFont('Helvertica')
  // doc.text(40,100,newNotes)
  // doc.save(`${course.title}.${video}.notes.pdf`)

        var width = doc.internal.pageSize.getWidth();
        var height = doc.internal.pageSize.getHeight();
       doc.addImage(paper,'JPG',0,0,width,height)
        
       doc.setFont("times","bolditalic" );
       doc.setFontSize(25);
     doc.stroke()
     doc.setTextColor(255,0,0)
        doc.text(140,33,`${course.title}`)

        doc.setFont("times", "italic");

        doc.setFontSize(20);
        doc.stroke()
     doc.setTextColor(255,0,0)
        doc.text(110,76, `${sub} +  ${video}`)
        doc.setFont("times", "roman");
        var splitTitle = doc.splitTextToSize(newNotes, 480);
        doc.setFontSize(16);
        doc.setTextColor(0,0,0)
        doc.text(35,122,splitTitle)
        doc.save(`${course.title}.${video}.notes.pdf`)
    
}

    return(
        <>
        <div className="card" style={{marginBottom:"2rem"}}>
  <div className="card-header" style={{backgroundColor:"#bbd2b1"}} >
  <Stack direction="row" 
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          width: 'fit-content',
          borderRadius: 1,

          color: 'text.secondary',
          '& svg': {
            m: 1.5,
          },
          '& hr': {
            mx: 0.5,
          },
        }}
      >
          <Box sx={{display: 'flex',
          alignItems: 'flex-start',}}>
          <IconButton sx={{pb:0,mb:0}}>
        <FormatBoldIcon />
        </IconButton >
        <IconButton sx={{pb:0,mb:0}}>
        <FormatUnderlinedIcon/>
        </IconButton>
        <IconButton sx={{pb:0,mb:0}}>
        <FormatItalicIcon />
        </IconButton>
        <Divider orientation="vertical" variant="middle" flexItem style = {{backgroundColor:"#EC6A37"}}/>
        </Box>
       
        <Stack direction="row">
        <Tooltip title="Save for Later">
  <IconButton sx={{paddingRight:0}} onClick={handleSave}>
    <SaveIcon />
  </IconButton>
</Tooltip>
        <Tooltip title="Download as PDF">
  <IconButton sx={{paddingLeft:0}} onClick={handleDownload}>
    <DownloadIcon />
  </IconButton>
</Tooltip>

        </Stack>
      </Stack>
      
  </div>
  <div className="card-body">
    <TextareaAutosize onChange={handleWriting}
  defaultValue={newNotes}
  style={{ width: "100%" , minHeight:"58vh",maxHeight:"80vh",overflow:"auto" ,border:"none"}}

/>
  </div>
</div>
<ToastMess message="notes saved successfully" />

        </>
    )
}
export default Notes
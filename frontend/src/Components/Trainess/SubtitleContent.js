
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
import { Button ,Checkbox} from '@mui/material';

function SubtitleContent(){
    const x =[1,2,3,4,5,6,7,8,9,10]
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    console.log(x)
    return(
        <Stack maxHeight={"28rem"} sx={{overflow:"auto"}}>
        {x.map(i=>{
        return <Accordion key={i} position="relative" sx = {{maxWidth:"100%",mb:"1%"}} disableGutters> 
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
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pin-angle-fill" viewBox="0 0 16 16" color="black">
            <path d="M9.828.722a.5.5 0 0 1 .354.146l4.95 4.95a.5.5 0 0 1 0 .707c-.48.48-1.072.588-1.503.588-.177 0-.335-.018-.46-.039l-3.134 3.134a5.927 5.927 0 0 1 .16 1.013c.046.702-.032 1.687-.72 2.375a.5.5 0 0 1-.707 0l-2.829-2.828-3.182 3.182c-.195.195-1.219.902-1.414.707-.195-.195.512-1.22.707-1.414l3.182-3.182-2.828-2.829a.5.5 0 0 1 0-.707c.688-.688 1.673-.767 2.375-.72a5.922 5.922 0 0 1 1.013.16l3.134-3.133a2.772 2.772 0 0 1-.04-.461c0-.43.108-1.022.589-1.503a.5.5 0 0 1 .353-.146z"/>
            </svg>
          <Typography variant={"p"}sx={{ pl:"4%",width: '60%', flexShrink: 0}}>Subtitle 1</Typography> <br/>
          <Typography sx={{ color: 'text.secondary', fontSize:"0.8rem",mr:"2%"}}>
               2h 
              </Typography>
              <Divider orientation="vertical" variant="middle" flexItem style = {{backgroundColor:"#EC6A37",opacity:1}}/>
              <Typography sx={{ color: 'text.secondary', fontSize:"0.8rem",ml:"2%"}}>
               3/4
              </Typography>
              </Stack>
        </AccordionSummary>
        
      
        <AccordionDetails >
        <Stack gap={1} marginTop={"2%"} >
          <Stack direction="row" justifyContent={"space-between"} maxWidth={"85%"} alignItems={"center"}  position="relative">
          
          <Typography variant="p">
         
          <Button variant="text" position="relative" sx={{color:"black !important"}} >
          <Checkbox {...label} disabled sx={{
         
          '&.Mui-checked': {
            color: "#bbd2b1",
          },
        }}/>
            Preview

          </Button>
          </Typography>
          <Typography position="relative"fontSize={"0.9rem"} color="text.secondary">
            4 hours 
          </Typography>
          
          </Stack>
          <Divider  component="Typography" />
          <Stack direction="row"  direction="row" justifyContent={"space-between"} maxWidth={"85%"} alignItems={"center"}  position="relative">
         
          <Typography variant="p">
         
          <Button variant="text" position="relative"   sx={{color:"black !important"}} >
          <Checkbox {...label} disabled sx={{
         
         '&.Mui-checked': {
           color: "#bbd2b1",
         },
       }}/>
            Content

          </Button>
          </Typography>
          <Typography position="relative" fontSize={"0.9rem"} color="text.secondary">
            4 hours 
          </Typography>
          
          </Stack>

          <Divider  component="Typography" />

          <Stack  direction="row" justifyContent={"space-between"} maxWidth={"85%"} alignItems={"center"}  position="relative">
          <Typography variant="p">
         
         <Button variant="text" position="relative"   sx={{color:"black !important"}} >
         <Checkbox {...label} disabled sx={{
        
        '&.Mui-checked': {
          color: "#bbd2b1",
        },
      }}/>
           Quiz

         </Button>
         </Typography>
         
          </Stack>
          </Stack>
        </AccordionDetails>
      </Accordion>   
      })}     
        </Stack>
    )
}
export default SubtitleContent
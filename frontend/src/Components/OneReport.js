import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Box,Stack,Container,CardHeader,Button } from '@mui/material';
import { useState } from 'react';
import ReadMore from './OneComponent/ReadMore'
import SettingsIcon from '@mui/icons-material/Settings';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import Pending from '@mui/icons-material/Pending';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import { Badge } from '@mui/material';
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight';
import ReplyIcon from '@mui/icons-material/Reply';
import NoteIcon from '@mui/icons-material/Note';
import FollowUp from './FollowUp';

export default function OneReport({report}){

const [openFollow,setOpenFollow] = useState(false)
const [messSeen,setMessSeen] = useState(report.reporterMessageSeen)

function handleOpenFollow(){
  setOpenFollow(true)

}
    return(
<>
<Container sx={{position:"relative" ,m:"0",p:"0"}}>
<Card variant="outlined" className="stack1" sx={{
 }} >
     
{report.solved=="pending" &&
     <CardHeader
         
         component={Typography}
         title={report.title}
         sx={{    backgroundColor:"#facc65",
            paddingLeft: "2rem"}}
         
       />}
       {report.solved=="resolved" &&
     <CardHeader
         
         component={Typography}
         title={report.title}
         sx={{    backgroundColor:" rgb(187 210 177 / 70%)",
            paddingLeft: "2rem"}}
         
       />}

{report.solved=="noStatus" &&
<CardHeader
         
         component={Typography}
         title={report.title}
         sx={{    backgroundColor:" #f1f1f1",
   
            paddingLeft: "2rem"}}
         
       />}
         
       {/* <Stack position="absolute" right="6%" top="12%" direction="row" gap={0.5} alignItems={"center"}>
       {report.solved=="pending" &&<>
   <MoreHorizIcon fontSize={"1rem"}sx={{color:"#c50d0d"}}/>
      <Typography  fontSize={"0.8rem"} color={"black"}> Pending</Typography>
      </>}

      {report.solved=="resolved" &&<>
   <DoneOutlineIcon fontSize={"1rem"}sx={{color:"#c50d0d"}}/>
      <Typography  fontSize={"0.8rem"} color={"black"}> Resolved</Typography>
      </>}  
      </Stack> */}
<p className="stack2" style={{margin:0}}></p>


<Box sx={{ display: 'flex', flexDirection: 'column',width:"100%",pl:"1rem" }}>


  <CardContent  sx={{ flex: '1 0 auto'  }}>


      <Stack direction="row" alignItems={"center"} gap={1}>
      {report.type=="Technical" &&  <SettingsIcon sx={{fontSize:"1.3rem",color:"grey"}}/>}  
      {report.type=="Financial" &&  <MonetizationOnIcon sx={{fontSize:"1.3rem",color:"grey"}}/>}
      {report.type=="Other" &&  <QuestionMarkIcon sx={{fontSize:"1.3rem",color:"grey"}}/>}   
  <Typography variant="h7" color="text.secondary" component="div" sx={{p:"0.5rem 0",fontSize:"1.1rem"}}> 
    {report.type}
    </Typography>
    </Stack>
       
        <ReadMore>
    {report.body}
        </ReadMore>

        {report.solved=="pending" &&   
     <Stack direction="row" alignItems={"center"} marginBottom={"1rem"}>
    <NoteIcon sx={{ml:"2rem",color:"#c50d0d",mr:"0.5rem" ,fontSize:"1.3rem"}}/>
    <Typography variant="h7" component="div" sx={{p:"0.5rem 0",fontSize:"0.9rem",fontWeight:"bold",
    mr:"0.3rem"}}>
reason to be marked pending : 
    </Typography> 

    <Typography variant="h7" component="div" sx={{p:"0.5rem 0",fontSize:"0.9rem",
}}>
{report.pendingReason}
    </Typography> 
    
    </Stack>}

      {report.solved!="resolved" && messSeen==true&& <div className='text-end'>
        <Button data-bs-toggle="modal" data-bs-target="#exampleModal" variant="outlined"  sx={{color:"#000",
     border:"1px solid rgba(197, 13, 13, 0.8)" ,textTransform:"none",mr:"2rem",
    '&:hover':{
     border:"1px solid rgba(197, 13, 13)" 
      }}} onClick={handleOpenFollow}>
        Follow Up
      </Button>
        </div>}

        {report.solved=="pending" && messSeen==false &&
         <div className='text-end'>
        <Badge  variant="dot" color="success" sx={{mr:"2rem"}}>
        <Button data-bs-toggle="modal" data-bs-target="#exampleModal" variant="outlined"  sx={{color:"#000",
     border:"1px solid rgba(197, 13, 13, 0.8)" ,textTransform:"none",mr:"0.5rem",
    '&:hover':{
     border:"1px solid rgba(197, 13, 13)" 
      }}} onClick={handleOpenFollow}>
        Follow Up
      </Button>
      </Badge>
        </div>}



        {report.solved=="resolved" &&report.followUp.length!=0 && <div className='text-end'>
       
        <Button data-bs-toggle="modal" data-bs-target="#exampleModal" variant="outlined"  sx={{color:"#000",
     border:"1px solid rgba(197, 13, 13, 0.8)" ,textTransform:"none",mr:"2rem",
    '&:hover':{
     border:"1px solid rgba(197, 13, 13)" 
      }}} onClick={handleOpenFollow}>
        Follow Up Chat
      </Button>
     
        </div>}
    
 </CardContent>
  </Box>
  </Card>
  </Container>
<FollowUp openFollow={openFollow} setOpenFollow={setOpenFollow} report={report} setMessSeen={setMessSeen} />
</>
    )
}
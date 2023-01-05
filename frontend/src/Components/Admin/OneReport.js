import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Box,Stack,Container,CardHeader,Button } from '@mui/material';
import { useState,useEffect } from 'react';
import SettingsIcon from '@mui/icons-material/Settings';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import Pending from '@mui/icons-material/Pending';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import { Badge } from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import PersonIcon from '@mui/icons-material/Person';
import FollowUp from '../FollowUp';
import HelpIcon from '@mui/icons-material/Help';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CloseIcon from '@mui/icons-material/Close';
import { Divider } from '@mui/material';
import me from '../../Images/me.png'
import { useAuth } from '../auth';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import { responsiveProperty } from '@mui/material/styles/cssUtils';
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight';
import ViewStreamIcon from '@mui/icons-material/ViewStream';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import DialogViewProblem from './DialogViewProblem'
import NoReports from '../OneComponent/NoReports';
const ViewProblem = ({ children }) => {
 
  const text = children;
  const [view, setView] = useState(false);
  const toggle = () => {
    setView(!view);
  };
  return (
    <Box>
     
     {view && <Stack direction="row"> 
      <Typography sx={{overflowWrap:"break-word"}}>{text}</Typography>
      </Stack>}
      <Stack direction="row">
    {!view ? 
    <>
  <Button startIcon={<ViewStreamIcon/>} sx={{color:"#c50d0d"}} onClick={toggle}>
    view Problem
    </Button> </>
     : <>
      <Button startIcon={<CancelPresentationIcon /> } sx={{color:"#c50d0d"}} onClick={toggle}>
    Close Problem
    </Button> 
  
     </>}
      </Stack>
      
    </Box>
  );
};

export default function OneReport({rep, checked2 ,setMessage,setArr}){

const [openFollow,setOpenFollow] = useState(false)
const [report,setReport] =useState(rep)
const [messSeen,setMessSeen] =useState('')
const auth =useAuth()
function handleOpenFollow(){
  setOpenFollow(true)

}
console.log(rep)

useEffect(()=>{
  if(report&&(rep._id == report._id && rep.solved!=report.solved )) rep=report
    if(checked2)
    setReport(rep.solved=="noStatus" || ((rep.solved=="resolved" || rep.solved=="pending")
    && rep.adminSolver && rep.adminSolver._id==auth.user.id)?rep:"")
    else{
     setReport(rep)
     }
    
     
},[checked2])

    return(
<>
{report &&
<Container sx={{position:"relative" ,m:"0",p:"0"}}>
<Card variant="outlined" className="stack1" sx={{
 }} >
     
     {/* pending */}
{report.solved=="pending" &&
     <CardHeader
         
         component={Typography}
        
         sx={{ backgroundColor:"#facc65",
            paddingLeft: "2rem"}}
         
       /> }
     
     {/* resolved */}
     {report.solved=="resolved" && <CardHeader
         
         component={Typography}
        
         sx={{    backgroundColor:" rgb(187 210 177 / 70%)",
            paddingLeft: "2rem"}}
         
       /> }



       {/* unseen */}

   

       {/* unMarked */}
{report.solved=="noStatus" &&
<CardHeader
         
         component={Typography}
        
         sx={{    backgroundColor:" #f1f1f1",
         boxShadow:"0px 1px 0px rgb(0 0 0 / 6%)",
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


  <CardContent  sx={{ flex: '1 0 auto' }}>

      {/* mine */}
  {report.adminSolver && report.adminSolver._id==auth.user.id &&
   <Stack  direction="row" gap={0.5} alignItems={"center"} marginRight={"2rem"} sx = {{right: "3%",
    position:" absolute",mt:"2rem",
    top: "15%"}}>
   <img src={me} style={{width:"25px"}}/>
    <Typography  fontSize={"0.8rem"} color={"darkgrey"}>Mine</Typography>
    </Stack> }

    {/* unseen */}

{report.adminSeen && !(report.adminSeen.some(e=> e==auth.user.id))&& 
(report.adminSolver==null || report.adminSolver._id!==auth.user.id) &&
 <Stack  direction="row" alignItems="center" gap={0.5} alignItems={"center"} marginRight={"2rem"} sx = {{right: "3%",
    position:" absolute",mt:"2rem",
    top: "15%"}}>
   <FiberManualRecordIcon sx={{color:" #2f7feed1",
    fontSize: "1.2rem"}}/>
    <Typography  fontSize={"0.8rem"} color={"darkgrey"}>Unseen</Typography>
    </Stack> }

<Typography  sx={{fontSize:"1.5rem",mb:"0rem"}} >
    {report.title}
</Typography>
      <Stack direction="row" alignItems={"center"} gap={1} marginBottom={"0.7rem"}>
       {report.type=="Technical" &&<SettingsIcon sx={{fontSize:"1.3rem",color:"grey"}}/>}
      {report.type=="Financial" && <MonetizationOnIcon sx={{fontSize:"1.3rem",color:"grey"}}/> }
      {report.type=="Other" && <QuestionMarkIcon sx={{fontSize:"1.3rem",color:"grey"}}/>}
  <Typography variant="h7" color="text.secondary" component="div" sx={{p:"0.5rem 0",fontSize:"1.1rem"}}> 
   {report.type}
    </Typography>
    </Stack>

    <Stack direction="row"alignItems={"center"}  sx={{mr:"4rem",mb:"1rem"}}>
    <PersonIcon sx={{color:"#bbd2b1"}}/>
    <Typography  variant="h7" component="div" sx={{p:"0.5rem 0",fontSize:"1rem",fontWeight:"bold",
m:"0 1rem 0 1.5rem"}}>
Reporter:
    </Typography>
  <Typography variant="h7" color="text.secondary" component="div" sx={{p:"0.5rem 0",mr:"2rem",fontSize:"1rem"}}> 
  {report.reporter.fName} {report.reporter.lName}
    </Typography>

    <KeyboardDoubleArrowLeftIcon sx={{color:"#c50d0d",ml:"1rem"}}/>
    <Typography variant="h7"  component="div" sx={{p:"0.5rem 0",ml:"0.4rem",mr:"0.4rem",fontSize:"0.9rem"}}> 
  {report.reporter.type} {report.reporter.type!="instructor" && "trainee"}
    </Typography>
    <KeyboardDoubleArrowRightIcon sx={{color:"#c50d0d"}}/>
    </Stack>

    <DialogViewProblem  report={report} setReport={setReport} setArr={setArr} setMessage={setMessage}/>
     

    <Divider sx={{    margin:" 1rem 0 1rem 0",
    color:" black",
    borderWidth:" 0.6px"}}/> 





    {/* resolved */}
     {report.solved=="resolved" && <div className='text-start'>
     <Stack direction="row" alignItems={"center"} >
    <DoneOutlineIcon sx={{color:"green",fontSize:"1.3rem"}}/>
    <Typography variant="h7" component="div" sx={{p:"0.3rem 0",fontSize:"0.8rem",fontWeight:"bold",m:"0 1rem 0 1.5rem"
}}>
    Resolved by:
    </Typography>
  <Typography variant="h7" color="text.secondary" component="div" sx={{p:"0.5rem 0",fontSize:"0.8rem"}}> 
 {report.adminSolver && report.adminSolver.fName} {report.adminSolver&&report.adminSolver.lName}
 
    </Typography>
    </Stack>
     </div> }



    {/* pending */}
     {report.solved=="pending" && <> <div className='text-start'>

     <Stack direction="row" alignItems={"center"} >
    <MoreHorizIcon sx={{color:"#c50d0d",fontSize:"1.3rem"}}/>
    <Typography variant="h7" component="div" sx={{p:"0.3rem 0",fontSize:"0.8rem",fontWeight:"bold",
m:"0 1rem 0 1.5rem"}}>
Marked pending by:
    </Typography>
    <Typography variant="h7" color="text.secondary" component="div" sx={{p:"0.5rem 0",fontSize:"0.8rem"}}> 
 {report.adminSolver && report.adminSolver.fName} {report.adminSolver&&report.adminSolver.lName}
    </Typography>
 
 
    </Stack>
     </div> 

     
   {report.pendingReason &&<Stack direction="row" alignItems={"center"} marginBottom={"1rem"}>
    <SubdirectoryArrowRightIcon sx={{ml:"3rem",color:"#bbd2b1"}}/>
    <Typography variant="h7" component="div" sx={{p:"0.5rem 0",fontSize:"0.8rem",fontWeight:"bold",
m:"0 1.5rem",color:"#c50d0d"}}>
{ report.pendingReason  }
    </Typography> 
 

    </Stack>}
    </>
     
     }

        {/* no status */}
     {/* <div className='text-start'>
     <Stack direction="row" alignItems={"center"} >
    <HelpIcon sx={{color:"#c50d0d",fontSize:"1.3rem"}}/>
    <Typography flex={1}variant="h7" component="div" sx={{p:"0.3rem 0",fontSize:"0.8rem",fontWeight:"bold",
m:"0 1.5rem"}}>
no status
    </Typography>
 
    </Stack>
     </div> */}
     

   
       

      {/* <div className='text-end'>
        <Button data-bs-toggle="modal" disabled data-bs-target="#exampleModal" variant="outlined"  sx={{color:"#000",
     border:"1px solid rgba(197, 13, 13, 0.8)" ,textTransform:"none",mr:"2rem",
    '&:hover':{
     border:"1px solid rgba(197, 13, 13)" 
      }}} onClick={handleOpenFollow}>
        Follow Up
      </Button>
        </div> } */}

      
{report.solved=="pending" &&report.adminSolver && report.adminSolver._id==auth.user.id &&
report.adminMessageSeen==true &&  
 <div className='text-end'>
        <Button data-bs-toggle="modal"  data-bs-target="#exampleModal" variant="outlined"  sx={{color:"#000",
     border:"1px solid rgba(197, 13, 13, 0.8)" ,textTransform:"none",mr:"2rem",
    '&:hover':{
     border:"1px solid rgba(197, 13, 13)" 
      }}} onClick={handleOpenFollow}>
        Follow Up
      </Button>
        </div>}


  {report.solved=="noStatus"&&  report.followUp.length!=0 &&  
  <Stack>   
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
        </div> 
           <Typography sx={{color:"#c50d0d" ,fontSize:"0.8rem",textAlign:"end" , mt:"1rem"}}>
           *Mark report as pending if you want to start conversation with reporter
         </Typography>
         </Stack>}

        {report.solved=="noStatus"&&  report.followUp.length==0 &&      
          <Stack>
         <div className='text-end'>
    
        <Button data-bs-toggle="modal" data-bs-target="#exampleModal" variant="outlined"  sx={{color:"#000",
     border:"1px solid rgba(197, 13, 13, 0.8)" ,textTransform:"none",mr:"0.5rem",
    '&:hover':{
     border:"1px solid rgba(197, 13, 13)" 
      }}} onClick={handleOpenFollow}>
        Follow Up
      </Button>
     
     
        </div> 
        <Typography sx={{color:"#c50d0d" ,fontSize:"0.8rem",textAlign:"end" , mt:"1rem"}}>
          *Mark report as pending if you want to start conversation with reporter
        </Typography>
        </Stack>}


      
{report.solved=="pending" &&report.adminSolver && report.adminSolver._id==auth.user.id &&
report.adminMessageSeen==false &&         
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
        </div> }

 { report.solved=="resolved" &&report.adminSolver && report.adminSolver._id==auth.user.id && report.followUp.length!=0 &&

         <div className='text-end'>
       
        <Button data-bs-toggle="modal" data-bs-target="#exampleModal" variant="outlined"  sx={{color:"#000",
     border:"1px solid rgba(197, 13, 13, 0.8)" ,textTransform:"none",mr:"2rem",
    '&:hover':{
     border:"1px solid rgba(197, 13, 13)" 
      }}} onClick={handleOpenFollow}>
        Follow Up Chat
      </Button>
     
        </div> }
    
 </CardContent>
  </Box>
  </Card>
  </Container>}
  {report && report.length==0 && <NoReports message={"You have no reports"}/>}
<FollowUp openFollow={openFollow} setOpenFollow={setOpenFollow} report={report} setReport={setReport}/>
</>
    )
}
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Box,Stack,Container,CardHeader,Button, Divider } from '@mui/material';
import { useState,useContext, useEffect } from 'react';
import {useAuth} from '../auth'
import SettingsIcon from '@mui/icons-material/Settings';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import Pending from '@mui/icons-material/Pending';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import { Badge } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CloseIcon from '@mui/icons-material/Close';
import me from '../../Images/me.png'
import { Currency } from '../../Context/Currency';
import DialogAcceptRefund from './DialogAcceptRefund'
import DialogRejectRefund from './DialogRejectRefund'

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
  width:"50%",
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: theme.palette.mode === 'light' ? '#bbd2b1' : '#308fe8',
    },
  }));

export default function OneRefund({refu,indiv,setMessage,checked2,setRef}){
    const auth = useAuth()
const {rate,curr} = useContext(Currency)
const [openFollow,setOpenFollow] = useState(false)
const [refund,setRefund] =useState(refu)
const [openAccp,setOpenAccp] = useState(false)
const [openRej,setOpenRej] =useState(false)
var mon =0
var prog = 0
if(refund!=""){
  
  indiv.courseInfo.map(c=>{
    if( c.course==refund.Course._id ){
   prog = Math.round((c.percentage.progress/c.percentage.total)*10)/10 || 0
   mon = c.pricePayed.$numberDecimal
   console.log(mon+"rr")
    }

   
})}


function handleAccess(e){
    console.log(e.target.id)
  if(e.target.id=="accept"){
      setOpenAccp(true)
  }
  else if(e.target.id=="reject"){
      setOpenRej (true)
  }

}
useEffect(()=>{
  if(refu._id == refund._id && refu.state!=refund.state ) refu=refund
    if(checked2)
    setRefund(refu.state=="pending" || ((refu.state=="accepted" || refu.state=="rejected")
     && refu.Admin._id==auth.user.id)?refu:"")
     else
     setRefund(refu)
     
},[checked2])
    return(
       
<>
{refund!="" &&
<>
<Container sx={{position:"relative" ,m:"0",p:"0"}}>
<Card variant="outlined" className="stack1" sx={{
 }} >
     
{/* Pending */}
  {refund.state=="pending" &&   <CardHeader
         
         sx={{    backgroundColor:"#facc65",
            paddingLeft: "2rem"}}
         
       />}
{/* Accepted */}    
     {refund.state=="accepted"&& <CardHeader
         
         sx={{    backgroundColor:" rgb(187 210 177 / 70%)",
            paddingLeft: "2rem"}}
         
       /> }
{/* Rejected */}  
{refund.state=="rejected" && <CardHeader
     
         sx={{    backgroundColor:" #c50d0d80",
            paddingLeft: "2rem"}}
         
       /> }

         
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
      {/* Mine */}
  {refund.Admin!=null && auth.user.id == refund.Admin._id && refund.state!="pending"&& <Stack  direction="row" gap={0.5} alignItems={"center"} marginRight={"2rem"} sx = {{right: "3%",
    position:" absolute",
    top: "15%"}}>
   <img src={me} style={{width:"25px"}}/>
    <Typography  fontSize={"0.8rem"} color={"darkgrey"}>Mine</Typography>
    </Stack> }


<Stack direction="row"alignItems={"center"} sx={{mb:"1rem"}} >
    <PersonIcon sx={{color:"#bbd2b1"}}/>
    <Typography variant="h7" component="div" sx={{p:"0.5rem 0",fontSize:"1rem",fontWeight:"bold",
m:"0 1rem"}}>
Requester:
    </Typography>
  <Typography variant="h7" color="text.secondary" component="div" sx={{p:"0.5rem 0",fontSize:"1rem"}}> 
  {refund.Trainee.fName} {refund.Trainee.fName}
    </Typography>
    </Stack>

<Stack direction="row" width="100%" gap={"4rem"} sx={{mb:"1rem"}}>
    <Stack direction="row" alignItems={"center"} >
    <AutoStoriesIcon sx={{color:"#bbd2b1"}}/>
    <Typography variant="h7" component="div" sx={{p:"0.5rem 0",fontSize:"1rem",fontWeight:"bold",
m:"0 1rem"}}>
Course:
    </Typography>
  <Typography  variant="h7" color="text.secondary" component="div" sx={{p:"0.5rem 0",fontSize:"1rem"}}> 
  {refund.Course.title}
    </Typography>
    </Stack>

    <Stack direction="row" alignItems={"center"} >
    <CalendarMonthIcon sx={{color:"#bbd2b1"}}/>
    <Typography variant="h7" component="div" sx={{p:"0.5rem 0",fontSize:"1rem",fontWeight:"bold",
m:"0 1rem"}}>
RegisteredAt:
    </Typography>
    {indiv.courseInfo.map(c=>{
      return c.course==refund.Course._id && <Typography  variant="h7" color="text.secondary" component="div" sx={{p:"0.5rem 0",fontSize:"1rem"}}> 
{c.registeredAt.slice(0,10)}
      </Typography>
  })}
  
    </Stack>

    <Stack direction="row" alignItems={"center"} >
    <AttachMoneyIcon sx={{color:"#bbd2b1"}}/>
    <Typography variant="h7" component="div" sx={{p:"0.5rem 0",fontSize:"1rem",fontWeight:"bold",
m:"0 1rem"}}>
Price Paid:
    </Typography>
    
   
        <Typography  variant="h7" color="text.secondary" component="div" sx={{p:"0.5rem 0",fontSize:"1rem"}}> 
        {mon *rate} {curr}
           </Typography>
        
  

    </Stack>

    </Stack>
    
   
    
    
  

    <Stack direction="row" alignItems={"center"} sx={{mb:"1rem"}}>
    <QueryStatsIcon sx={{color:"#bbd2b1"}}/>
    <Typography variant="h7" component="div" sx={{p:"0.5rem 0",fontSize:"1rem",fontWeight:"bold",
m:"0 1rem"}}>
Progress:
    </Typography>
   
   <Stack direction="row" sx={{width:"55%"}}  alignItems={"center"} gap={4}>
    
   
        <>
        <BorderLinearProgress  variant="determinate" value={prog} />
        <Typography variant="p" component="div" sx={{fontSize:"0.8rem"}}>
            <b>{prog}</b></Typography></>

    
    </Stack>
   
    </Stack>
    


 

    <Stack direction="row"alignItems={"center"} sx={{mb:"1rem"}}>
    <QuestionMarkIcon sx={{color:"#bbd2b1"}}/>
    <Typography  variant="h7" component="div" sx={{p:"0.5rem 0",fontSize:"1rem",fontWeight:"bold",
m:"0 1rem"}}>
Reason:
    </Typography>
  <Typography variant="h7"  color="text.secondary" component="div" sx={{p:"0.5rem 0",fontSize:"1rem"}}> 
  {refund.reason}
    </Typography>
    </Stack> 
    
<Divider sx={{    margin:" 1rem 0 1rem 0",
    color:" black",
    borderWidth:" 0.6px"}}/>

    {/* accepted */}
     {refund.Admin!=null && refund.state=="accepted" && <div className='text-start'>
     <Stack direction="row" alignItems={"center"} >
    <DoneOutlineIcon sx={{color:"green",fontSize:"1.3rem"}}/>
    <Typography flex={1}variant="h7" component="div" sx={{p:"0.3rem 0",fontSize:"0.8rem",fontWeight:"bold",
m:"0 1.5rem"}}>
Accepted by:
    </Typography>
  <Typography flex={10} variant="h7" color="text.secondary" component="div" sx={{p:"0.5rem 0",fontSize:"0.8rem"}}> 
 {refund.Admin.fName} {refund.Admin.lName} 
    </Typography>
    
    </Stack>
     </div> }



    {/* rejected */}
    {refund.Admin!=null && refund.state=="rejected" &&
     <div className='text-start'>
     <Stack direction="row" alignItems={"center"} >
    <CloseIcon sx={{color:"#c50d0d",fontSize:"1.3rem"}}/>
    <Typography flex={1}variant="h7" component="div" sx={{p:"0.3rem 0",fontSize:"0.8rem",fontWeight:"bold",
m:"0 1.5rem"}}>
Rejected by:
    </Typography>
  <Typography flex={11} variant="h7" color="text.secondary" component="div" sx={{p:"0.5rem 0",fontSize:"0.8rem"}}> 
  {refund.Admin.fName} {refund.Admin.lName}
    </Typography>
    </Stack>
     </div>}
     
{refund.state=="pending" && 
     <div className='text-end'>
        <Button id={"accept"} data-bs-toggle="modal" data-bs-target="#exampleModal" variant="outlined"  sx={{color:"#000",
     border:"1px solid rgba(197, 13, 13, 0.8)" ,textTransform:"none",mr:"2rem",
    '&:hover':{
     border:"1px solid rgba(197, 13, 13)" 
      }}} onClick={handleAccess}>
        Accept 
      </Button>

      <Button id={"reject"} data-bs-toggle="modal" data-bs-target="#exampleModal" variant="outlined"  sx={{color:"#000",
     border:"1px solid rgba(197, 13, 13, 0.8)" ,textTransform:"none",mr:"2rem",
    '&:hover':{
     border:"1px solid rgba(197, 13, 13)" 
      }}} onClick={handleAccess}>
        Reject 
      </Button >
        </div>}


    
 </CardContent>
  </Box>
  </Card>
  </Container>
<DialogAcceptRefund setOpenAccp={setOpenAccp} openAccp={openAccp} setRefund={setRefund} refund={refund} mon={mon} prog={prog} setMessage={setMessage} setRef={setRef}/>
<DialogRejectRefund setOpenRej={setOpenRej} openRej={openRej} setRefund={setRefund} refund={refund} setMessage={setMessage} setRef={setRef}/>
</>
}
</>
    )
}
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Box,Stack,Container,CardHeader,Button, Divider } from '@mui/material';
import { useState,useContext,useEffect } from 'react';

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
import BusinessIcon from '@mui/icons-material/Business';
import InsightsIcon from '@mui/icons-material/Insights';
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight';
import {useAuth} from '../auth'
import { Currency } from '../../Context/Currency';
import DialogAcceptAccess from './DialogAcceptAccess';
import DialogRejectAccess from './DialogRejectAccess'


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

export default function OneAccess({acce,indiv,setMessage,checked2,setAcc}){
  

    const auth = useAuth()
const {rate,curr} = useContext(Currency)
const [access,setAccess] =useState(acce)
const [openAccp,setOpenAccp] = useState(false)
const [openRej,setOpenRej] =useState(false)
console.log(access)
var mon =0
var prog = 0

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
  if(acce._id == access._id && acce.state!=access.state ) acce=access
  if(checked2){

  setAccess(acce.state=="pending" || ((acce.state=="accepted" || acce.state=="rejected")
   && acce.Admin._id==auth.user.id)?acce:"")}
   else
   setAccess(acce)
   
},[checked2])

    return(
     
<>
{access!="" && access &&
<Container sx={{position:"relative" ,m:"0",p:"0"}}>
<Card variant="outlined" className="stack1" sx={{
 }} >
     
{/* Pending */}
{access.state=="pending" &&   <CardHeader
         
         sx={{    backgroundColor:"#facc65",
            paddingLeft: "2rem"}}
         
       />}
{/* Accepted */}    
     {access.state=="accepted"&& <CardHeader
         
         sx={{    backgroundColor:" rgb(187 210 177 / 70%)",
            paddingLeft: "2rem"}}
         
       /> }
{/* Rejected */}  
{access.state=="rejected" && <CardHeader
     
         sx={{    backgroundColor:" #c50d0d80",
            paddingLeft: "2rem"}}
         
       /> }

         
      
<p className="stack2" style={{margin:0}}></p>


<Box sx={{ display: 'flex', flexDirection: 'column',width:"100%",pl:"1rem" }}>


  <CardContent  sx={{ flex: '1 0 auto' }}>
      {/* mine */}
  {access.Admin && access.Admin._id==auth.user.id && <Stack  direction="row" gap={0.5} alignItems={"center"} marginRight={"2rem"} sx = {{right: "3%",
    position:" absolute",
    top: "15%"}}>
   <img src={me} style={{width:"25px"}}/>
    <Typography  fontSize={"0.8rem"} color={"darkgrey"}>Mine</Typography>
    </Stack> }

<Stack direction="row" >
<Stack direction="row"alignItems={"center"}  sx={{mr:"4rem",mb:"1rem"}}>
    <PersonIcon sx={{color:"#bbd2b1"}}/>
    <Typography  variant="h7" component="div" sx={{p:"0.5rem 0",fontSize:"1rem",fontWeight:"bold",
m:"0 1.5rem"}}>
Requester:
    </Typography>
  <Typography variant="h7" color="text.secondary" component="div" sx={{p:"0.5rem 0",fontSize:"1rem"}}> 
  {access.Trainee.fName} {access.Trainee.lName}
    </Typography>
    </Stack>

    <Stack direction="row" alignItems={"center"} sx={{mr:"4rem"}}>
    <BusinessIcon sx={{color:"#bbd2b1"}}/>
    <Typography  variant="h7" component="div" sx={{p:"0.5rem 0",fontSize:"1rem",fontWeight:"bold",
m:"0 1.5rem"}}>
Company:
    </Typography>
  <Typography variant="h7"  color="text.secondary" component="div" sx={{p:"0.5rem 0",fontSize:"1rem"}}> 
 {access.CompanyName}
    </Typography>
    </Stack>

    
    <Stack direction="row"alignItems={"center"} justifyContent={"space-between"}>
    <InsightsIcon sx={{color:"#bbd2b1"}}/>
    <Typography variant="h7" component="div" sx={{p:"0.5rem 0",fontSize:"1rem",fontWeight:"bold",
m:"0 1.5rem"}}>
Level:
    </Typography>
  <Typography variant="h7"  color="text.secondary" component="div" sx={{p:"0.5rem 0",fontSize:"1rem"}}> 
 {access.Level}
    </Typography>
    </Stack>

    </Stack>


    <Stack direction="row" alignItems={"center"} marginBottom={"1rem"}>
    <AutoStoriesIcon sx={{color:"#bbd2b1"}}/>
    <Typography variant="h7" component="div" sx={{p:"0.5rem 0",fontSize:"1rem",fontWeight:"bold",
m:"0 1.5rem"}}>
Course:
    </Typography>
  <Typography variant="h7" color="text.secondary" component="div" sx={{p:"0.5rem 0",fontSize:"1rem"}}> 
  {access.Course.course.title}
    </Typography>
    </Stack>

    <Stack direction="row" alignItems={"center"} marginBottom={"1rem"}>
    <SubdirectoryArrowRightIcon sx={{ml:"3rem",color:"#bbd2b1"}}/>
{access.Course.company==true &&
    <Typography variant="h7" component="div" sx={{p:"0.5rem 0",fontSize:"0.9rem",fontWeight:"bold",
m:"0 1.5rem",color:"#c50d0d"}}>
Included in company package for <i>Level {access.Course.level}</i>
    </Typography> 
    }
{access.Course.company == false &&
<Typography variant="h7" component="div" sx={{p:"0.5rem 0",fontSize:"0.9rem",fontWeight:"bold",
m:"0 1.5rem",color:"#c50d0d"}}>
Not included in company package
    </Typography> 
}


    </Stack>
    
    
    

   
    


    <Stack direction="row" alignItems={"center"} >
    <AttachMoneyIcon sx={{color:"#bbd2b1"}}/>
    <Typography variant="h7" component="div" sx={{p:"0.5rem 0",fontSize:"1.1rem",fontWeight:"bold",
m:"0 1.5rem"}}>
Price:
    </Typography>
  <Typography  variant="h7" color="text.secondary" component="div" sx={{p:"0.5rem 0",fontSize:"1.1rem"}}> 
 {access.Course.course.price*rate || "Free"} {access.Course.course.price!="Free" && curr}
    </Typography>
    </Stack>




<Divider sx={{    margin:" 1rem 0 1rem 0",
    color:" black",
    borderWidth:" 0.6px"}}/> 



    {/* accepted */}
     {access.state=="accepted" && access.Admin && <div className='text-start'>
     <Stack direction="row" alignItems={"center"} >
    <DoneOutlineIcon sx={{color:"green",fontSize:"1.3rem"}}/>
    <Typography flex={1}variant="h7" component="div" sx={{p:"0.3rem 0",fontSize:"0.8rem",fontWeight:"bold",
m:"0 1.5rem"}}>
Accepted by:
    </Typography>
  <Typography flex={10} variant="h7" color="text.secondary" component="div" sx={{p:"0.5rem 0",fontSize:"0.8rem"}}> 
 {access.Admin.fName} {access.Admin.lName}
    </Typography>
    </Stack>
     </div> }



    {/* rejected */}
     {access.state=="rejected" && access.Admin && <div className='text-start'>
     <Stack direction="row" alignItems={"center"} >
    <CloseIcon sx={{color:"#c50d0d",fontSize:"1.3rem"}}/>
    <Typography flex={1}variant="h7" component="div" sx={{p:"0.3rem 0",fontSize:"0.8rem",fontWeight:"bold",
m:"0 1.5rem"}}>
Rejected by:
    </Typography>
  <Typography flex={11} variant="h7" color="text.secondary" component="div" sx={{p:"0.5rem 0",fontSize:"0.8rem"}}> 
  {access.Admin.fName} {access.Admin.lName}
    </Typography>
    </Stack>
     </div> }
     
     {access.state=="pending" && 
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
  </Container>}
  <DialogAcceptAccess setOpenAccp={setOpenAccp} openAccp={openAccp} setAccess={setAccess} access={access}  setMessage={setMessage} setAcc={setAcc}/>
  <DialogRejectAccess setOpenRej={setOpenRej} openRej={openRej} setAccess={setAccess} access={access} setMessage={setMessage} setAcc={setAcc}/>

</>
    )
}
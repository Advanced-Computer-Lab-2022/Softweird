import React, { useState, useEffect , useRef ,useCallback} from 'react';
import axios from "axios"
import Card from 'react-bootstrap/Card';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Box,Stack,Container,CardHeader, Paper } from '@mui/material';

import ReadMore from './OneComponent/ReadMore'
import SettingsIcon from '@mui/icons-material/Settings';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import Pending from '@mui/icons-material/Pending';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import { Badge ,Dialog,Slide} from '@mui/material';
import { Link, renderMatches, useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import { useParams } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CloseIcon from '@mui/icons-material/Close';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Alert from 'react-bootstrap/Alert';
import SendIcon from '@mui/icons-material/Send';
import weHelp from '../Images/weHelp2.png'
import { Divider } from '@mui/material';
import Loading from './OneComponent/Loading'
import { useAuth } from './auth';


var t =0 ;
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });


  
function FollowUp({openFollow,setOpenFollow,report,setReport,setMessSeen}) {
const auth = useAuth()
    const [Solved, setSolved] = useState('');
    const [body, setBody] = useState('');
    const [title , setTitle] = useState();
const[loading,setLoading] = useState(true)
    const [Arr,setArr] =useState('')
 
     const messagesEndRef = useRef(null)
    // const [messagesEndRef, setRef] = useState(null);

  // const myRefCallback = useCallback(node => {
  //   if (node !== null) {
  //     setRef(null);
  //   }
  // }, [openFollow]);

console.log(report)
  const scrollToBottom = () => {
  
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })

  }

  useEffect(() => {
    
    scrollToBottom()
    
    },[Arr]);

    const handleClick=(e, updatedAt) =>{
      if(auth.user.type!="admin") {
        let cancel
         axios({
        method:"POST",
        url : "/addFollowUp",
        params :{Rid : report._id , Uid :"6387cd0c3420cccd5c92f4c0", follow :body,type:auth.user.type },
        cancelToken: new axios.CancelToken (c => cancel = c)
     }).then (res => {
       
      setArr(res.data.followUp)
      setSolved(res.data.solved)
      setMessSeen(res.data.reporterMessageSeen)
     
      setBody('')
    }).catch(e=>{
        if(axios.isCancel(e)) return 
    })
    return () => cancel ()
 //   setChange(false)
    
  }
  else{
    let cancel
    axios({
   method:"POST",
   url : "Admin/addFollowUp",
   params :{Rid : report._id , Aid :auth.user.id, follow :body},
   cancelToken: new axios.CancelToken (c => cancel = c)
}).then (res => {
 setArr(res.data.followUp)
 setSolved(res.data.solved)
 setReport(res.data)
 
 setBody('')
}).catch(e=>{
   if(axios.isCancel(e)) return 
})
return () => cancel ()
//   setChange(false)
}
  }


    useEffect(() =>{
      if(auth.user.type!="admin")
       { let cancel
        if(openFollow)
     {   setLoading(true)
         axios({
        method:"GET",
        url : "/getfollow",
        params : {id : report._id},
         cancelToken: new axios.CancelToken (c => cancel = c)
     }).then (res => {
        setArr(res.data.r)
        setSolved(res.data.s)
        setMessSeen(true)
        setBody('')
        messagesEndRef.current=null
        setLoading(false)
        
      
    }).catch(e=>{
        if(axios.isCancel(e)) return 
    })

    return () => cancel ()}}
    else{
      let cancel
        if(openFollow)
     {   setLoading(true)
         axios({
        method:"GET",
        url : "Admin/getfollow",
        params : {id : report._id},
         cancelToken: new axios.CancelToken (c => cancel = c)
     }).then (res => {
      
        setArr(res.data.followUp)
        setSolved(res.data.solved)
        setReport(res.data)
        
        setBody('')
        messagesEndRef.current=null
        setLoading(false)
      
        
      
    }).catch(e=>{
      console.log(e)
        if(axios.isCancel(e)) return 
    })

    return () => cancel ()}
    }
    }, [openFollow])
  
        //   console.log(question)
       
       
        const getbody = (e, updatedAt) =>
        {
               setBody(e.target.value)
               console.log(body)
             
        }


        const check = (e, updatedAt) =>
        {
        if ( body !=''  )
        {
            handleClick() 
          t++ 
         setTitle(t)
       
        }
    }
    const handleClose = () =>{
      setOpenFollow(false)
    }
    
  return (
     <>
<style type="text/css">
    {`

.btn:hover , .btn:focus {
  background-color: white !important;
  color:"#c50d0d"
 
}

}
`}
  </style>

      <Dialog
        fullScreen
        open={openFollow}
        onClose={handleClose}
        TransitionComponent={Transition}
        sx={{backgroundColor:"lightgray"}}
      >
        <AppBar sx={{ position: 'relative' ,backgroundColor:"#c50d0d" ,position:"sticky",top:0}}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
               Messaging Mode 
            </Typography>
            
          </Toolbar>
        </AppBar>


        <Box sx={{height:"100%"}}>
        <Box sx={{ width:"70%",position:"relative",left:"15%",zIndex:2, top:"6rem" ,paddingBottom:"7%"}}>
        <div className="wire1"></div>
   <div class= 'row'>
     <Card style={{ width: '80rem',paddingTop:"2rem" ,paddingBottom:"2rem",backgroundColor:"#f1f1f1"}} className="solve">
       <Box sx={{backgroundColor: "rgb(241, 241, 241)",
    position: "sticky",
    top: "4rem",
    zIndex: "3",
    paddingBottom: "0.2rem",height:"6.5rem"}}>
     <img src={weHelp} style={{width: "37%",position: "relative",left: "30%"
}}/>
</Box>
   {!loading ?  <Card.Body style={{paddingLeft:"5%",marginTop:"5%"}}>
   
  {Arr.map(r=>{

 return <>
 {auth.user.type!="admin" ? 
 <>
{r.from=="admin" &&
<Paper elevation={0} sx={{padding:"0.6rem 1rem ",maxWidth:"50%",mb:"2rem"}}>
  <Typography variant="p" color={"text.secondary"} fontSize={"0.7rem"}>Admin</Typography>
    <Typography>{r.body}</Typography>
</Paper>}

{r.from!="admin" && 

<Paper elevation={0} sx={{padding:"0.6rem 1rem ",maxWidth:"50%",position:"relative",right:"-47%",mb:"2rem",
backgroundColor:"#bbd2b1"}}>
<Typography variant="p" color={"text.secondary"} fontSize={"0.7rem"}>You</Typography>
    <Typography>{r.body}</Typography>
</Paper>}
</>
:
<>
{r.from!="admin" &&
<Paper elevation={0} sx={{padding:"0.6rem 1rem ",maxWidth:"50%",mb:"2rem"}}>
  <Typography variant="p" color={"text.secondary"} fontSize={"0.7rem"}>{report.reporter.fName}</Typography>
    <Typography>{r.body}</Typography>
</Paper>}

{r.from=="admin" && 

<Paper elevation={0} sx={{padding:"0.6rem 1rem ",maxWidth:"50%",position:"relative",right:"-47%",mb:"2rem",
backgroundColor:"#bbd2b1"}}>
<Typography variant="p" color={"text.secondary"} fontSize={"0.7rem"}>You</Typography>
    <Typography>{r.body}</Typography>
</Paper>}


</>
}
</>
 })}

    { (Solved === "pending" || (Solved=="noStatus" && auth.user.type!="admin")) &&
    <>
<Divider sx={{border: "0.5px solid black",
    backgroundColor: "black",
    marginTop: "5rem"
}}/>
     <Box position="relative" sx={{marginTop:"2rem",ml:"2rem"}}>
        <Form.Control
         aria-label="Text input with dropdown button"
         placeholder="Message"  
         style={{ height: '50px' ,width:'50%'}}
         onChange={getbody}
         value = {body}
           />
            
      <div >
           <Button variant="danger" style={{ height: "50px",
              top: 0,
              position: "absolute",
              right: "50%",
              width: "54px",}}onClick={ ()=> { check() }}><SendIcon sx={{fontSize:"1rem",
             }}/>
           </Button>{'   '} </div>
          </Box>
          </>}
    
          <div ref={messagesEndRef} />
      
    </Card.Body>

     :<Loading />}
  
   
    </Card>
    </div>
    </Box>
    </Box>
    
    
      </Dialog>


    </>
  )
};


export default FollowUp;
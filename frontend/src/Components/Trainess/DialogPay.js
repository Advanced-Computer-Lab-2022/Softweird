import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TraineeCourse } from '../../Context/TraineeCourse';
import { useContext } from 'react';
import { useState ,useEffect} from 'react';
import $ from 'jquery';
import axios from "axios"
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import {Box,Button,Stack} from '@mui/material';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import {useAuth} from '../auth'
import Pay from '../OneComponent/Pay';
import DialogGrade from './DialogGrade';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });



export default function DialogPay({openPay,setOpenPay,course}) {
    const[registered,setRegistered] = useState(false)
    const[paying,setPaying] = useState(false)
const navigate = useNavigate()
const auth = useAuth()
  
  console.log(course)

  const handleClose = () => {
    setOpenPay(false);
    setPaying(false)
   
  };
  const handleRegister =() => {
    if(auth.user.type==="individual"){
    let cancel
    axios({
        method:"PATCH",
        url : `/Individual/registerCourse/${auth.user.id}`,
        data:{courseTitle: course.title},
        cancelToken: new axios.CancelToken (c => cancel = c)
    }).then (res => {
        navigate(`/MyCourses/${course.title}`)
    }).catch(e=>{
        if(axios.isCancel(e)) return 
    })
    return () => cancel ()
}
else if(auth.user.type==="corporate"){
  let cancel
  axios({
      method:"PATCH",
      url : `/Corporate/registerCourse/${auth.user.id}`,
      data:{courseTitle: course.title},
      cancelToken: new axios.CancelToken (c => cancel = c)
  }).then (res => {
      navigate(`/MyCourses/${course.title}`)
  }).catch(e=>{
      if(axios.isCancel(e)) return 
  })
  return () => cancel ()
}
  }


 

   
  return (
    <div>
   
      <Dialog
        fullScreen
        open={openPay}
        onClose={handleClose}
        TransitionComponent={Transition}
       
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
               Register Course
            </Typography>
            
          </Toolbar>
        </AppBar>
     { auth.user && auth.user.type=="individual" &&
       <Box sx={{    width:" 70%",
    position: "relative",
    left: "15%",
    marginTop: "6%"}}>

        {/* first state Info */}
        {!paying &&   <Box >
        <Box sx={{ width:"62%",position:"relative",left:"19%",zIndex:2,marginBottom:"15%"}}>
        <div className="wire1"></div>
   <div class= 'row'>
     <Card style={{ width: '80rem',paddingTop:"3rem" }} className="solve">
   
       
    <>
    <Card.Body>
        <>
        <Stack direction="row" alignItems="center" justifyContent={"center"}>
        
        <Typography variant="p" sx={{textDecoration:"underline",color:"#c50d0d",fontSize:"1.2rem"}}>Important Note</Typography>
        </Stack>
        <br/>
        <Typography variant="p">
            By registering in <b>{course.title} Course</b> you are going to start your learning path  on<b> {new Date().getDate() + '/' +new Date().getMonth() + '/'+new Date().getFullYear()}</b>.
            You will have to watch all the videos provided and solve all the exams in the course with a grade of at least <b>35%</b>. This is all
            to ensure your eligibility to recieve our certificate.
        </Typography>
        <br/>
        <Stack direction="row" marginTop={"5%"} gap={1}>
            <AutoGraphIcon sx={{color:"#faaf00"}}/>
        <Typography variant="p" sx={{fontStyle:"italic"}}>
          Let the fun begin
        </Typography>
        </Stack>
        </>
    </Card.Body>
   
   
  </>
        <div class="text-center" style={{paddingBottom:"2rem",paddingLeft:"3%",}}>
      <br />
     {course.price=="Free"  && <Button variant="contained"  sx={{backgroundColor:"#bbd2b1" ,fontWeight:"bold",ml:"0.8rem",
                boxShadow:"none",
                "&:hover":{
                    cursor: "pointer",
                    color:"#bbd2b1",
                    backgroundColor:"#fff"
                    }}}
                    onClick={handleRegister}>Start Now</Button>}
     {course.price!="Free" && auth.user.type!="corporate" && 
     <Button variant="contained"  sx={{backgroundColor:"#bbd2b1" ,fontWeight:"bold",ml:"0.8rem",
                boxShadow:"none",
                "&:hover":{
                    cursor: "pointer",
                    color:"#bbd2b1",
                    backgroundColor:"#fff"

                    }}}onClick={()=>{setPaying(true)}}>Pay First</Button>}
   
    </div>
      </Card>
     
      
    
        <br />  
  </div>
  </Box>
  </Box>}
    
        
            {paying && <Pay course={course} setPaying={setPaying} setOpenPay={setOpenPay} /> }
     
  </Box>}


  { auth.user && auth.user.type=="corporate" && 
       <Box sx={{    width:" 70%",
    position: "relative",
    left: "15%",
    marginTop: "6%"}}>

      
        <Box >
        <Box sx={{ width:"62%",position:"relative",left:"19%",zIndex:2,marginBottom:"15%"}}>
        <div className="wire1"></div>
   <div class= 'row'>
     <Card style={{ width: '80rem',paddingTop:"3rem" }} className="solve">
   
       
    <>
    <Card.Body>
        <>
        <Stack direction="row" alignItems="center" justifyContent={"center"}>
        
        <Typography variant="p" sx={{textDecoration:"underline",color:"#c50d0d",fontSize:"1.2rem"}}>Important Note</Typography>
        </Stack>
        <br/>
        <Typography variant="p">
            By registering in <b>{course.title} Course</b> you are going to start your learning path  on<b> {new Date().getDate() + '/' +new Date().getMonth() + '/'+new Date().getFullYear()}</b>.
            You will have to watch all the videos provided and solve all the exams in the course with a grade of at least <b>35%</b>. This is all
            to ensure your eligibility to recieve our certificate.
        </Typography>
        <br/>
        <Stack direction="row" marginTop={"5%"} gap={1}>
            <AutoGraphIcon sx={{color:"#faaf00"}}/>
        <Typography variant="p" sx={{fontStyle:"italic"}}>
          Let the fun begin
        </Typography>
        </Stack>
        </>
    </Card.Body>
   
   
  </>
        <div class="text-center" style={{paddingBottom:"2rem",paddingLeft:"3%",}}>
      <br />
     <Button variant="contained"  sx={{backgroundColor:"#bbd2b1" ,fontWeight:"bold",ml:"0.8rem",
                boxShadow:"none",
                "&:hover":{
                    cursor: "pointer",
                    color:"#bbd2b1",
                    backgroundColor:"#fff"
                    }}}
                    onClick={handleRegister}>Start Now</Button>
    
    </div>
      </Card>
     
      
    
        <br />  
  </div>
  </Box>
  </Box>
    
     
  </Box>}
      </Dialog>
    </div>
  );
}

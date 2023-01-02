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
import ToastMess from '../OneComponent/ToastMess';
import { Toast } from '../../Context/Toast';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });



export default function DialogPay({openAccess,setOpenAccess,course,setMyCourse}) {
    const[registered,setRegistered] = useState(false)
    const[paying,setPaying] = useState(false)
    const {openToast,setOpenToast} = useContext(Toast)
    const [acc,setAcc] = useState(false)

const navigate = useNavigate()
const auth = useAuth()
  
 

  const handleClose = () => {
    setOpenAccess(false);
    setPaying(false)
   
  };
  const handleAccess =() => {
setAcc(true)
  let cancel
  axios({
      method:"PATCH",
      url : `/Corporate/accessRequests/${auth.user.id}`,
      data:{courseId: course._id},
      cancelToken: new axios.CancelToken (c => cancel = c)
  }).then (res => {
    setMyCourse(res.data)
      setOpenAccess(false)
      setOpenToast(true)
      setAcc(false)
  }).catch(e=>{
      if(axios.isCancel(e)) return 
  })
  return () => cancel ()
}
  


 

   
  return (
    <div>
   
      <Dialog
        fullScreen
        open={openAccess}
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
               Request Access
            </Typography>
            
          </Toolbar>
        </AppBar>
     
       <Box sx={{    width:" 70%",
    position: "relative",
    left: "15%",
    marginTop: "6%"}}>

        {/* first state Info */}
        <Box sx={{ width:"62%",position:"relative",left:"19%",zIndex:2,marginBottom:"15%"}}>
        <div className="wire1"></div>
   <div class= 'row'>
     <Card style={{ width: '80rem',paddingTop:"3rem" }} className="solve">
   
       
    <>
    <Card.Body>
        <>
        <Stack direction="row" alignItems="center" justifyContent={"center"}>
        
        <Typography variant="p" sx={{textDecoration:"underline",color:"#c50d0d",fontSize:"1.2rem"}}>Important Notice</Typography>
        </Stack>
        <br/>
        <Typography variant="p">
           Unfortunatly, this course is not included in your package 😔.
           Don't worry , you can still request access to this course from the admin. 

        </Typography>
        
        <br/>
      
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
                    onClick={handleAccess}> 
                    {acc ? <div className="spinner" id="spinner"></div> : "Request Access"}</Button>
    
   
    </div>
      </Card>
     
      
    
        <br />  
  </div>
  </Box>
  </Box>
  
    
 
      </Dialog>
      <ToastMess message={"Request sent successfully"} />
    </div>
  );
}

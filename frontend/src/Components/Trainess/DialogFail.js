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
import {Box,Button, textFieldClasses} from '@mui/material';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import './Grade.css'
import Loading from '../../Components/OneComponent/Loading'
import './Exam.css'
import {useAuth} from '../auth'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });


export default function DialogFail({subtitle}) {

const [grade,setGrade]=useState(0)
const [loading,setLoading]=useState(true)
const auth = useAuth()
  
const {myCourse,setMyCourse,course,openFail,setOpenFail,openSolve,setOpenSolve} = useContext(TraineeCourse)
 
const handleClose = () => {
    setOpenFail(false);
   
   
  };
      
      useEffect(() =>{
        setLoading(false)
          if (openFail ){
          myCourse.exercises.map(g=>{
              if(g.course==course._id && g.subtitle == subtitle){
                  setGrade(g.grade);
              }
          })}
          
      }, [openFail])

 
function handleResolve(){
  setLoading(true)
 setOpenSolve(true)
 setOpenFail(false)

}
   
  return (
    <div>
   
    <Dialog
        fullScreen
        open={openFail}
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
               Failed Exam
            </Typography>
            
          </Toolbar>
        </AppBar>
       {!loading && <Box sx={{ width:"62%",position:"relative",left:"19%",zIndex:2, top:"8rem" ,marginBottom:"15%"}}>
   <div className="wire1"></div>
  <div class= 'row'>
     <Card style={{ width: '80rem',paddingTop:"5rem" }} className="solve">
    <Card.Body style={{textAlign:"center"}}>
      <Card.Title style={{fontSize:"2.5rem"}}>{grade}%</Card.Title>
       <Card.Title className='kalam2' style={{fontSize:"1.6rem",paddingTop:"2%"}}>Sorry you did not pass 😞</Card.Title>
       <Card.Title className='kalam' style={{fontSize:"1.6rem",paddingTop:"2%"}}>Don't worry just refer back to the lectures and  try agin 🙂 </Card.Title>
      <Button data-bs-toggle="modal" data-bs-target="#exampleModal" variant="outlined" startIcon={<QuestionAnswerIcon sx= {{color:"#bbd2b1"}}/>} sx={{
          marginTop:"6%",color:"#000",
     border:"1px solid rgba(187, 210, 177, 0.8)" ,
    '&:hover':{
     border:"1px solid rgba(187, 210, 177)" 
      }}} onClick={handleResolve}>
        Resolve My Exam
      </Button>
    </Card.Body>
      </Card>
  </div>   

  </Box>}
      </Dialog>
      {loading && <Loading />}
     
    </div>
  );
}

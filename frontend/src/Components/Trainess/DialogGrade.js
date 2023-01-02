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


export default function DialogGrade({subtitle}) {
const [viewModel,setViewModel]=useState(false)
const [model,setModel] =useState([])
const [Ans , setAns] = useState([])
const [grade,setGrade]=useState(0)
const [loading,setLoading]=useState(true)
const auth = useAuth()
  
const {myCourse,setMyCourse,course,openGrade,setOpenGrade} = useContext(TraineeCourse)
 
const handleClose = () => {
    setOpenGrade(false);
    setViewModel(false)
    setGrade(0)
    setAns([])
    setModel([])
   
  };
      
      useEffect(() =>{
        setLoading(false)
          if (openGrade && myCourse!=null ){
          myCourse.exercises.map(g=>{
              if(g.course==course._id && g.subtitle == subtitle){
                  setGrade(g.grade);
              }
          })}
          
      }, [openGrade])

 
function handleModel(){
  if(auth.user.type=="individual")
{  setLoading(true)
    setViewModel(true)
    let cancel
    axios({
   method:"GET",
   url : "/Individual/modelAns",
   params : {Subtitle:subtitle,id : course._id , Uid :auth.user.id},
    cancelToken: new axios.CancelToken (c => cancel = c)
}).then (res => {
setLoading(false)
   setModel(res.data.modelAnswer)
   setAns(res.data.answers)
}).catch(e=>{
   if(axios.isCancel(e)) return 
})
return () => cancel ()}

else if(auth.user.type=="corporate")
{  setLoading(true)
    setViewModel(true)
    let cancel
    axios({
   method:"GET",
   url : "/Corporate/modelAns",
   params : {Subtitle:subtitle,id : course._id , Uid :auth.user.id},
    cancelToken: new axios.CancelToken (c => cancel = c)
}).then (res => {
setLoading(false)
   setModel(res.data.modelAnswer)
   setAns(res.data.answers)
}).catch(e=>{
   if(axios.isCancel(e)) return 
})
return () => cancel ()}

}
   
  return (
    <div>
   
    <Dialog
        fullScreen
        open={openGrade}
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
               Solved Exam
            </Typography>
            
          </Toolbar>
        </AppBar>
       {!loading && <Box sx={{ width:"62%",position:"relative",left:"19%",zIndex:2, top:"8rem" ,marginBottom:"15%"}}>
         <div className="wire1"></div>
  {!viewModel ? <div class= 'row'>
     <Card style={{ width: '80rem',paddingTop:"5rem" }} className="solve">
    <Card.Body style={{textAlign:"center"}}>
      <Card.Title style={{fontSize:"2.5rem"}}>{grade}%</Card.Title>
      {grade >=80 &&<Card.Title className='kalam' style={{fontSize:"2rem",paddingTop:"2%"}}>Bravo 🤩 </Card.Title>}
      {grade >=60 && grade<80 && <Card.Title className='kalam' style={{fontSize:"2rem",paddingTop:"2%"}}> Great Job . Keep it up 😀</Card.Title>}
      {grade >=40 && grade<60 && <Card.Title className='kalam' style={{fontSize:"2rem",paddingTop:"2%"}}>Good,but you can do better 🙂 </Card.Title>}
      {grade<40 && <Card.Title className='kalam' style={{fontSize:"2rem",paddingTop:"2%"}}>Better next time 😞</Card.Title>}
      <Button data-bs-toggle="modal" data-bs-target="#exampleModal" variant="outlined" startIcon={<QuestionAnswerIcon sx= {{color:"#bbd2b1"}}/>} sx={{
          marginTop:"6%",color:"#000",
     border:"1px solid rgba(187, 210, 177, 0.8)" ,
    '&:hover':{
     border:"1px solid rgba(187, 210, 177)" 
      }}} onClick={handleModel}>
        View Model Answer
      </Button>
    </Card.Body>
      </Card>
     
      
    
  </div>:
    <div class= 'row'>
          <Card style={{ width: '80rem',paddingTop:"5rem" }} className="solve">
    {model && model.map((el , A)  => (
       
  <>
    <Card.Body>
        
      <Card.Title>{el.number})  {el.question}</Card.Title>
      
    </Card.Body>
    <Card.Body style={{paddingLeft:"7%",paddingTop:0}}>
    <ListGroup className="list-group-flush" >
    {el.answer ===  'a' ?
<ListGroup.Item style={{padding:"4% 0"}}> a)  {el.choices[0]} <span style={{fontSize:"2rem",position:"absolute",right:"5%",top:"20%"}} role="img" aria-label="check mark" class="react-emojis" >✔️</span></ListGroup.Item>
:
Ans[A] === 'a' ? 
<ListGroup.Item style={{padding:"4% 0"}}> a)  {el.choices[0]}<span style={{fontSize:"2rem",position:"absolute",right:"5%",top:"20%"}} role="img" aria-label="cross mark" class="react-emojis" >❌</span> </ListGroup.Item>
: 
<ListGroup.Item style={{padding:"4% 0"}}> a)  {el.choices[0]}  </ListGroup.Item>
}    
      
 {el.answer ===  'b'?
<ListGroup.Item style={{padding:"4% 0"}}> b)  {el.choices[1]}         <span style={{fontSize:"2rem",position:"absolute",right:"5%",top:"20%"}} role="img" aria-label="check mark" class="react-emojis" >✔️</span></ListGroup.Item>
:
Ans[A] === 'b'?
<ListGroup.Item style={{padding:"4% 0"}}> b)  {el.choices[1]}<span style={{fontSize:"2rem",position:"absolute",right:"5%",top:"20%"}} role="img" aria-label="cross mark" class="react-emojis" >❌</span></ListGroup.Item>
:
<ListGroup.Item style={{padding:"4% 0"}}> b)  {el.choices[1]}  </ListGroup.Item>
}
{el.answer ===  'c'?
<ListGroup.Item style={{padding:"4% 0"}}> c)  {el.choices[2]}       <span style={{fontSize:"2rem",position:"absolute",right:"5%",top:"20%"}} role="img" aria-label="check mark" class="react-emojis" >✔️</span></ListGroup.Item>
:
Ans[A] === 'c'?
<ListGroup.Item style={{padding:"4% 0"}}> c)  {el.choices[2]}<span style={{fontSize:"2rem",position:"absolute",right:"5%",top:"20%"}} role="img" aria-label="cross mark" class="react-emojis" >❌</span> </ListGroup.Item>
:
<ListGroup.Item style={{padding:"4% 0"}}> c)  {el.choices[2]}  </ListGroup.Item>}
{el.answer ===  'd'?
<ListGroup.Item style={{padding:"4% 0"}}> d)  {el.choices[3]}    <span style={{fontSize:"2rem",position:"absolute",right:"5%",top:"20%"}} role="img" aria-label="check mark" class="react-emojis">✔️</span></ListGroup.Item>
:
Ans[A] === 'd'?
<ListGroup.Item style={{padding:"4% 0"}}> d)  {el.choices[3]}<span style={{fontSize:"2rem",position:"absolute",right:"5%",top:"20%"}} role="img" aria-label="cross mark" class="react-emojis" >❌</span> </ListGroup.Item>
:
<ListGroup.Item style={{padding:"4% 0"}}> d)  {el.choices[3]}  </ListGroup.Item> }
    
    <Card.Body>
   
   <br/>
    </Card.Body>
    {model.length>1 && <div className="fold"></div>} 
    </ListGroup>
    </Card.Body>
   </>
  
  
    ))
      }
     
      
     </Card>     
  </div>}
  </Box>}
      </Dialog>
      {loading && <Loading />}
     
    </div>
  );
}
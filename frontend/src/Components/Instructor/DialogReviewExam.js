import * as React from 'react';
import Button from '@mui/material/Button';
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
import { InstructorOneCourse } from '../../Context/InstructorOneCourse';
import { useContext } from 'react';
import FormTextExample from './FormTextExample';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Tooltip from '@mui/material/Tooltip';
import { useState ,useEffect} from 'react';
import $ from 'jquery';
import axios from "axios"
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import './Exam.css'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import FilledInput from '@mui/material/FilledInput';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import TextField from '@mui/material/TextField';
import { styled,Stack } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import  "./review.css";

var count=0;
const CssTextField = styled(TextField)({
    '& label.Mui-focused': {
      color: 'black',
    },
    '& .MuiOutlinedInput-root': {
      
     
      
      
      '&.Mui-focused fieldset': {
        borderColor: '#bbd2b1',
      },
    },
    root:{
    '& .MuiInputBase-root.Mui-disabled': {
     webkitTextFillColor:"black"
    },
  }
  });

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});



export default function FullScreenDialog() {

const [qNum,setQNum] = useState(0)
  
  const {openReview,setOpenReview,exam,setExam} = useContext(InstructorOneCourse)
  console.log(exam)
  const handleClose = () => {
    setOpenReview(false);
    setQNum(0);
    count=0
  };
  console.log(exam)

  const toNextQusetion = (e, updatedAt) =>
    {
       count++;
         setQNum(count);
         

        }  
    const toPrevQuesetion = (e, updatedAt) =>
    {
      count--;
        setQNum(count);
    }
    
 

   
  return (
    <div>
   {exam.length!=0 && 
      <Dialog
        fullScreen
        open={openReview}
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
               Exam Review
            </Typography>
           {qNum!=0 && <Tooltip title="previous question">
            <IconButton aria-label="delete" size="large" onClick={toPrevQuesetion}>
            <NavigateNextIcon fontSize="large" sx={{color:"white",transform:"rotate(180deg)"}} />
            </IconButton>
            </Tooltip>}
           {qNum < exam.length-1 && <Tooltip title="next question">
            <IconButton aria-label="delete" size="large" onClick={toNextQusetion}>
            <NavigateNextIcon fontSize="large" sx={{color:"white"}} />
            </IconButton>
            </Tooltip>}
            
          </Toolbar>
        </AppBar>
        
        <Box sx={{ width:"62%",position:"relative",left:"19%",zIndex:2, top:"10%" ,marginBottom:"15%"}}>
  
  <Card className="exam1" sx={{boxShadow:"none",border:"0.1px solid lightgrey"}} >
    <p className="exam2"></p>
    <p style={{position:"relative",backgroundColor:"#c50d0d",width:"fit-content",paddingRight:"2%",top:"-16px",paddingBottom:"1%"}}>Question {qNum+1}</p>
        <CardContent sx={{m:"2% 4%",pt:"0"}}>
        <FormControl variant="standard" sx={{width:"70%"}}>
        <CssTextField disabled label="Question" id="custom-css-outlined-input"  value={exam[qNum].question}
         style={{webkitTextFillColor:"black"}} />
        </FormControl>
  <ol type="a" style={{fontWeight:"bold"}}>
       <li style={{margin:"3% 0", marginLeft:"4%"}}> <FormControl variant="standard" sx={{width:"70%" }}>
        <CssTextField disabled label="answer" id="custom-css-outlined-input" value = {exam[qNum].choices[0]} 
         style={{webkitTextFillColor:"black"}} />
        </FormControl>  
        </li>
        <li style={{margin:"3% 0", marginLeft:"4%"}}>
        <FormControl variant="standard" sx={{width:"70%" }}>
        <CssTextField disabled label="answer" id="custom-css-outlined-input" value = {exam[qNum].choices[1]} 
         style={{webkitTextFillColor:"black"}} />
        </FormControl>
        </li>
        <li style={{margin:"3% 0", marginLeft:"4%"}}>
        <FormControl variant="standard" sx={{width:"70%" }}>
        <CssTextField disabled label="answer" id="custom-css-outlined-input" value = {exam[qNum].choices[2]} 
         style={{webkitTextFillColor:"black"}}/>
        </FormControl>
        </li>
        <li style={{margin:"3% 0", marginLeft:"4%"}}>
        <FormControl variant="standard" sx={{width:"70%"}}>
        <CssTextField disabled label="answer" id="custom-css-outlined-input" value= {exam[qNum].choices[3] } 
         style={{webkitTextFillColor:"black"}} />
        </FormControl>
        </li>
        </ol>
        <FormControl>
        <FormLabel id="demo-row-radio-buttons-group-label" sx={{'&.Mui-focused':{
          color:"black"
        }}}>Correct Answer</FormLabel>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          
        >
          <FormControlLabel value="a" checked={'a'==exam[qNum].answer} disabled
            label="choice a" control={<Radio sx={{'&.Mui-checked': {
           color: "#bbd2b1",
           
         },
       }}/>} label="a"  />
          <FormControlLabel value="b"  checked={'b'==exam[qNum].answer} disabled
            label="choice b" control={<Radio sx={{'&.Mui-checked': {
           color: "#bbd2b1",
         },}}/>} label="b" />
          <FormControlLabel  checked={'c'==exam[qNum].answer} disabled 
            label="choice c" value="c" control={<Radio sx={{'&.Mui-checked': {
           color: "#bbd2b1",
         },}}/>} label="c" />
          <FormControlLabel checked={'d'==exam[qNum].answer} disabled
            label="choice e" value="d" control={<Radio sx={{'&.Mui-checked': {
           color: "#bbd2b1",
         },}}/>} label="d" />
         
        </RadioGroup>
      </FormControl>
        </CardContent>
      
      </Card>
  </Box>
  
  
        
      </Dialog>}
    </div>
  );
}
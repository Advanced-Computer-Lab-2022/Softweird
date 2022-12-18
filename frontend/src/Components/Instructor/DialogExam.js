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
import ToastMess from '../OneComponent/ToastMess';
import { Toast } from '../../Context/Toast';

const CssTextField = styled(TextField)({
    '& label.Mui-focused': {
      color: 'black',
    },
    '& .MuiOutlinedInput-root': {
      
      '&.Mui-focused fieldset': {
        borderColor: '#bbd2b1',
      },
    },
  });

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const Arr = new Array()
var count =0
var qNum = 0
var chan = false 
var flag = false
export default function FullScreenDialog() {
const {setOpenToast} = useContext(Toast)
    const [question,setQuestion] =useState('')
    const [choiceA,setA] =useState('')
    const [ch,setch] =useState('')
    const [choiceB,setB] =useState('')
    const [choiceC,setC] =useState('')
    const [choiceD,setD] =useState('')
    const [Ans,setAns] =useState('')
    const [sub,setsub] =useState('')
    const [error,setError] = useState(false)
  
  const {openExam,setOpenExam,setReload,setCourse,courses,subtitleSelected} = useContext(InstructorOneCourse)

  const handleClose = () => {
    setOpenExam(false);
  };

  const toNextQusetion = (e, updatedAt) =>
    {
        if(choiceA=="" || choiceA == undefined || choiceB=="" || choiceB== undefined || choiceC=="" || choiceC== undefined || choiceD=="" || choiceD== undefined || question=="" || question == undefined || Ans =="" || Ans == undefined)
        {
         setError(true)
        }

        else{
          setError(false)
        const choices = new Array
        choices.push(choiceA)
        choices.push(choiceB)
        choices.push(choiceC)
        choices.push(choiceD)

        Arr[(3*qNum)] = question
        Arr[(3*qNum)+1] = choices
        Arr[(3*qNum)+2] = Ans
        qNum++

        if (Arr[(3*qNum)] ==undefined || Arr[(3*qNum)+1] == undefined || Arr[(3*qNum)+2] == undefined)
        {
            var l = ""
            setQuestion(l)
            setA(l)
            setB(l)
            setC(l)
            setD(l)
            setAns(l)
       
        }
        else
        {
        setQuestion(Arr[(3*qNum)])
        setA(Arr[(3*qNum)+1][0])
        setB(Arr[(3*qNum)+1][1])
        setC(Arr[(3*qNum)+1][2])
        setD(Arr[(3*qNum)+1][3])
        setAns(Arr[(3*qNum)+2]) 

          
        }
    }
         
        }  
    const toPrevQuesetion = (e, updatedAt) =>
    {
        if (qNum>0)
        qNum--
setError(false)
        setQuestion(Arr[(3*qNum)])
        setA(Arr[(3*qNum)+1][0])
        setB(Arr[(3*qNum)+1][1])
        setC(Arr[(3*qNum)+1][2])
        setD(Arr[(3*qNum)+1][3])
        setAns(Arr[(3*qNum)+2])

    }
    const Submit = () =>
    {
        if(choiceA=="" || choiceA == undefined || choiceB=="" || choiceB== undefined || choiceC=="" || choiceC== undefined || choiceD=="" || choiceD== undefined || question=="" || question == undefined || Ans =="" || Ans == undefined)
        {
         setError(true)
         
        }
        else {
            if (window.confirm("Are you sure you want to add this Exam?"))
       { 
        setOpenExam(false)
        const choices = new Array
        choices.push(choiceA)
        choices.push(choiceB)
        choices.push(choiceC)
        choices.push(choiceD)
        Arr[(3*qNum)] = question
        Arr[(3*qNum)+1] = choices
        Arr[(3*qNum)+2] = Ans

        let cancel
        axios({
        method:"POST",
        url : "/Instructor/makeExam/6384c29e9bed14d581bf6292",
        params : {Subtitle:subtitleSelected , Blk : Arr , courseTitle:courses.title},
         cancelToken: new axios.CancelToken (c => cancel = c)
     }).then (res => {
        setCourse(res.data)
        var l = ""
        setQuestion(l)
        setA(l)
        setB(l)
        setC(l)
        setD(l)
        setAns(l)
        Arr = []
        count =0
        qNum = 0
        chan = false 
        flag = false
        setOpenExam(false)
        
    }).catch(e=>{
        if(axios.isCancel(e)) return 
    })
    return () => cancel ()
    }
}
    }
 

    const getQusetion = (e, updatedAt) =>
    {
        setError(false)
        setQuestion(e.target.value)
        if (qNum<Arr.length)
        {
            chan = true
        }
        else{
             flag = true
        }
    
    }

    const getChoiceA = (e, updatedAt) =>
    {
        setError(false)
        setA(e.target.value)
        if (qNum<Arr.length)
        {
            chan = true
        }else{
            flag = true
       }
     
    }
    const getChoiceB = (e, updatedAt) =>
    {
        setError(false)
        setB(e.target.value)
        if (qNum<Arr.length)
        {
            chan = true
        }else{
            flag = true
       }
    
    }
    const getChoiceC = (e, updatedAt) =>
    {
        setError(false)
        setC(e.target.value)
        if (qNum<Arr.length)
        {
            chan = true
        }else{
            flag = true
       }
      
    }
    const getChoiceD = (e, updatedAt) =>
    {
        setError(false)
        setD(e.target.value)
        if (qNum<Arr.length)
        {
            chan = true
        }else{
            flag = true
       }
    }
    const getAns = (e, updatedAt) =>
    {
        setError(false)
        setAns(e.target.value)
        if (qNum<Arr.length)
        {
            chan = true
        }else{
            flag = true
       }
    }

  return (
    <div>
   
      <Dialog
        fullScreen
        open={openExam}
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
              Add Exam
            </Typography>
            <Button autoFocus color="inherit" onClick={Submit} sx={{paddingRight:"3%"}}>
              Submit
            </Button>
           {qNum!=0 && <Tooltip title="previous question">
            <IconButton aria-label="delete" size="large" onClick={toPrevQuesetion}>
            <NavigateNextIcon fontSize="large" sx={{color:"white",transform:"rotate(180deg)"}} />
            </IconButton>
            </Tooltip>}
            <Tooltip title="next question">
            <IconButton aria-label="delete" size="large" onClick={toNextQusetion}>
            <NavigateNextIcon fontSize="large" sx={{color:"white"}} />
            </IconButton>
            </Tooltip>
            
          </Toolbar>
        </AppBar>
        
        <Box sx={{ width:"62%",position:"relative",left:"19%",zIndex:2, top:"10%" ,marginBottom:"15%"}}>
  
  <Card className="exam1" sx={{boxShadow:"none",border:"0.1px solid lightgrey"}} >
    <p className="exam2"></p>
    <p style={{position:"relative",backgroundColor:"#c50d0d",width:"fit-content",paddingRight:"2%" , top:"-16px",paddingBottom:"1%"}}>Question {qNum+1}</p>
        <CardContent sx={{m:"2% 4%",pt:"0"}}>
    {error && <p style={{ color:'#c50d0d'}}>*All fields are required</p>}
        <FormControl variant="standard" sx={{width:"70%"}}>
        <CssTextField multiline label="Question*" id="custom-css-outlined-input"  value={question}
          onChange={getQusetion}/>
        </FormControl>
  <ol type="a" style={{fontWeight:"bold"}}>
       <li style={{margin:"3% 0", marginLeft:"4%"}}> <FormControl variant="standard" sx={{width:"70%" }}>
        <CssTextField multiline label="answer*" id="custom-css-outlined-input" value = {choiceA}  onChange={getChoiceA} />
        </FormControl>  
        </li>
        <li style={{margin:"3% 0", marginLeft:"4%"}}>
        <FormControl variant="standard" sx={{width:"70%" }}>
        <CssTextField multiline label="answer*" id="custom-css-outlined-input" value = {choiceB}  onChange={getChoiceB}/>
        </FormControl>
        </li>
        <li style={{margin:"3% 0", marginLeft:"4%"}}>
        <FormControl variant="standard" sx={{width:"70%" }}>
        <CssTextField multiline label="answer*" id="custom-css-outlined-input" value = {choiceC}  onChange={getChoiceC}/>
        </FormControl>
        </li>
        <li style={{margin:"3% 0", marginLeft:"4%"}}>
        <FormControl variant="standard" sx={{width:"70%"}}>
        <CssTextField multiline label="answer*" id="custom-css-outlined-input" value = {choiceD}  onChange={getChoiceD}/>
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
          <FormControlLabel value="a" onChange={getAns} checked={'a'==Ans}
            label="choice a" control={<Radio sx={{'&.Mui-checked': {
           color: "#bbd2b1",
           
         },
       }}/>} label="a"  />
          <FormControlLabel value="b"  onChange={getAns} checked={'b'==Ans}
            label="choice b" control={<Radio sx={{'&.Mui-checked': {
           color: "#bbd2b1",
         },}}/>} label="b" />
          <FormControlLabel  onChange={getAns} checked={'c'==Ans}
            label="choice c" value="c" control={<Radio sx={{'&.Mui-checked': {
           color: "#bbd2b1",
         },}}/>} label="c" />
          <FormControlLabel  onChange={getAns} checked={'d'==Ans}
            label="choice e" value="d" control={<Radio sx={{'&.Mui-checked': {
           color: "#bbd2b1",
         },}}/>} label="d" />
         
        </RadioGroup>
      </FormControl>
        </CardContent>
      
      </Card>
  </Box>
  
  
        
      </Dialog>
      <ToastMess message={"Exam is added successfully"} />
    </div>
  );
}
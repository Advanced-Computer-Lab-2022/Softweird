import React, { useState, useEffect , useMemo } from 'react';
import axios from "axios"
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import './Exam.css'
import $ from 'jquery';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
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

function FormTextExample ({question,setQuestion,choiceA,setA,ch,setch,choiceB,setB,choiceC,
  setC,choiceD,setD,Ans,setAns,sub,setsub,count,qNum,chan,flag,Arr})  {
 

    const [page,setPage] =useState("/")
  
  
    
    const Submit = () =>
    {
        const choices = new Array
        choices.push(choiceA)
        choices.push(choiceB)
        choices.push(choiceC)
        choices.push(choiceD)

        
        if (chan === true)
        {
            Arr[(3*qNum)] = question
            Arr[(3*qNum)+1] = choices
            Arr[(3*qNum)+2] = Ans
            count++
            chan = false
        }
       setsub(count)
    }
    useEffect(() =>{
        let cancel
         axios({
        method:"POST",
        url : "/Instructor/makeExam",
        params : {Subtitle:"Introduction To Mern Stack" , Blk : Arr , courseTitle:"Advanced Computer Lab" , id:"6384c29e9bed14d581bf6292"},
         cancelToken: new axios.CancelToken (c => cancel = c)
     }).then (res => {
       
        
    }).catch(e=>{
        if(axios.isCancel(e)) return 
    })
    return () => cancel ()
 //   setChange(false)
    }, [sub])

    const getQusetion = (e, updatedAt) =>
    {
        setQuestion(e.target.value)
        if (qNum<Arr.length)
        {
            chan = true
        }
        else{
             flag = true
        }
     //   console.log(question)
    }

    const getChoiceA = (e, updatedAt) =>
    {
        setA(e.target.value)
        if (qNum<Arr.length)
        {
            chan = true
        }else{
            flag = true
       }
      //  console.log(choiceA)
    }
    const getChoiceB = (e, updatedAt) =>
    {
        setB(e.target.value)
        if (qNum<Arr.length)
        {
            chan = true
        }else{
            flag = true
       }
      //  console.log(choiceA)
    }
    const getChoiceC = (e, updatedAt) =>
    {
        setC(e.target.value)
        if (qNum<Arr.length)
        {
            chan = true
        }else{
            flag = true
       }
      //  console.log(choiceA)
    }
    const getChoiceD = (e, updatedAt) =>
    {
        setD(e.target.value)
        if (qNum<Arr.length)
        {
            chan = true
        }else{
            flag = true
       }
      //  console.log(choiceA)
    }
    const getAns = (e, updatedAt) =>
    {
        setAns(e.target.value)
        if (qNum<Arr.length)
        {
            chan = true
        }else{
            flag = true
       }
     //   console.log(Ans)
    }
  return (
    <>
      {/* <Form.Label htmlFor="Enterquestion">Question</Form.Label>
      <Form.Control
        type="String"
        id="Enterquestion"
        aria-describedby="Enterquestion"
        placeholder=" Enter a question here"
        value={question}
        onChange={getQusetion}
      />
      <Form.Text id="Enterquestion" muted>
      </Form.Text>
      <br />
       choices
      <br />
      <Form.Control type="text" placeholder="choice a" value = {choiceA}  onChange={getChoiceA} />
      <Form.Text id="choice a" muted></Form.Text>
      <br />
      <Form.Control type="text" placeholder="choice b" value = {choiceB}  onChange={getChoiceB}/>
      <Form.Text id="choice b" muted></Form.Text>
      <br />
      <Form.Control type="text" placeholder="choice c" value={choiceC}  onChange={getChoiceC} />
      <Form.Text id="choice c" muted></Form.Text>
      <br />
      <Form.Control type="text" placeholder="choice d"  value = {choiceD}  onChange={getChoiceD}/>
      <Form.Text id="choice d" muted></Form.Text>
      <br />
      
      <br />
      Answer
      <br />
      <br />
      <Form>
      {['radio'].map((type) => (
        <div key={`inline-${type}`} className="mb-3" >
          <Form.Check
            inline
            Ans ='a'
           
            value={'a'}
            onChange={getAns}
            label="choice a"
            name="group1"
            type={type}
            id="a"
           
          />
          <Form.Check
            inline
            Ans = 'b'
            value={'b'}
            onChange={getAns}
            label="choice b"
            name="group1"
            type={type}
            
            id={`inline-${type}-2`}
          />
          <Form.Check
            inline
            value={'c'}
            onChange={getAns}
            label="choice c"
            name="group1"
            type={type}
            
            
            id={`inline-${type}-3`}
          />
           <Form.Check
            inline
            value={'d'}
            onChange={getAns}
            label="choice d"
            name="group1"
            type={type}
            
            id={`inline-${type}-4`}
          />
        </div>
      ))}
    </Form>
    
    
    
   
   <div >
    <Button variant="primary" onClick={Submit}>supmit Exam</Button>{'   '}
    <Button  variant="primary" onClick={toPrevQuesetion} >go to previous Question </Button>{'   '}
    <Button  variant="primary" onClick={toNextQusetion} >Add Next Question </Button>{}
    </div>
    */}
<Box sx={{ width:"62%",position:"relative",left:"19%",zIndex:2, top:"10%" ,marginBottom:"15%"}}>
  
<Card className="exam1" sx={{boxShadow:"none",border:"0.1px solid lightgrey"}} >
  <p className="exam2"></p>
  <p style={{position:"relative",backgroundColor:"#c50d0d",width:"5rem",top:"-16px",paddingBottom:"1%"}}>Question 1</p>
      <CardContent sx={{m:"2% 4%",pt:"0"}}>
  
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
      }}}>Gender</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        
      >
        <FormControlLabel value="a" control={<Radio sx={{'&.Mui-checked': {
         color: "#bbd2b1",
       },
     }}/>} label="a"  />
        <FormControlLabel value="b" control={<Radio sx={{'&.Mui-checked': {
         color: "#bbd2b1",
       },}}/>} label="b" />
        <FormControlLabel value="c" control={<Radio sx={{'&.Mui-checked': {
         color: "#bbd2b1",
       },}}/>} label="c" />
        <FormControlLabel value="d" control={<Radio sx={{'&.Mui-checked': {
         color: "#bbd2b1",
       },}}/>} label="d" />
       
      </RadioGroup>
    </FormControl>
      </CardContent>
    
    </Card>
</Box>


    </>
  );
}


export default FormTextExample;
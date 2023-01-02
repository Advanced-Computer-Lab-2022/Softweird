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
import {Box,Button} from '@mui/material';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import {useAuth} from '../auth'
import './Exam.css'
import jsPDF from 'jspdf'
import Certificate from '../../Images/Certificate.png'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });


var Ans = new Array()
var counter =0
export default function DialogSolveExam({subtitle}) {

const auth = useAuth()
  const [solve,setSolve] = useState(false)
  const {myCourse,setMyCourse,course,setCourse,openSolve,setOpenSolve,setOpenGrade,openFail,setOpenFail,reload,setReload,setProg} = useContext(TraineeCourse)

  const handleClose = () => {
    setOpenSolve(false);
   
  };

 console.log(subtitle,course._id)
      const [Arr,setArr] =useState([])
      const [Answ,setAnsw] =useState('')
      const [count,setCount] =useState('')
      
      useEffect(() =>{
          let cancel
           if(openSolve){ 
          axios({
          method:"GET",
          url : "/Individual/getQusetions",
          params : {Subtitle:subtitle,courseId :course._id },
           cancelToken: new axios.CancelToken (c => cancel = c)
       }).then (res => {
          setArr(res.data.r)
          console.log(Arr)
      }).catch(e=>{
          if(axios.isCancel(e)) return 
      })
      return () => cancel ()}
      }, [openSolve])

      const pdfGenerate=(email)=>{
        var date= (new Date()).toString();
         var doc=new jsPDF('landscape', 'px', 'a4','false');
     var width = doc.internal.pageSize.getWidth();
     var height = doc.internal.pageSize.getHeight();
     doc.addImage(Certificate,'PNG',0,0,width,height)
     
     doc.text(280,250, auth.user.fName + " "+ auth.user.lName)
     doc.text(260,327,course.title)
     date = date.slice(0,10)
     doc.text(290,360,`${date}`)

       const pdfOut = doc.output("datauristring");
       doc.save('a.pdf')
       
       let cancel
      
           axios({
               method:"POST",
               url : "/Individual/sendCert",
               data :{ pdf:pdfOut,email:email},
               headers : {'Content-Type' : 'application/json'},
               cancelToken: new axios.CancelToken (c => cancel = c)
           }).then (res => {
             
           }).catch(e=>{
               console.log(e)
                if(axios.isCancel(e)) return 

           })
     
           return () => cancel ()
      
     }


      const submit = () => {
        counter++
         for(var i =1 ; i <= Arr.length ; i++)
         {
     var filterDay = $(`#ansbutton${i} input:radio:checked`).val()
     if(filterDay==undefined){
         alert("All Questions has to be answered")
         break;
     }
     Ans[i-1] = filterDay
         }
         setSolve(true)
         if(auth.user.type=="individual")
 {        let cancel
         axios({
        method:"POST",
        url : "/Individual/solve",
        params : {Answers : Ans , id : auth.user.id ,Subtitle:subtitle,courseId :course._id },
         cancelToken: new axios.CancelToken (c => cancel = c)
     }).then (res => {
      setMyCourse(res.data.user)
      setReload(true)
      if(res.data.p<35){
        setOpenFail(true)
        setOpenSolve(false)
      }
      else{  
        setOpenGrade(true)
       setOpenSolve(false) 
       if(res.data.cer=="true"){
        pdfGenerate(res.data.user.user.email)

      }

      }

       var p =""
  
       if(res.data.user.length!=0)
     {  res.data.user.courseInfo.map(c=>{
         if(c.course===course._id){
            p= Math.round(((c.percentage.progress/c.percentage.total)*100)*10)/10
   
         }
        
         })}
         setProg(p)
        setSolve(false)
         
         setArr([])
        Ans=[]
       
    }).catch(e=>{
        if(axios.isCancel(e)) return 
    })
    return () => cancel ()}
    

    else if(auth.user.type=="corporate")
    {        let cancel
            axios({
           method:"POST",
           url : "/Corporate/solve",
           params : {Answers : Ans , id : auth.user.id ,Subtitle:subtitle,courseId :course._id },
            cancelToken: new axios.CancelToken (c => cancel = c)
        }).then (res => {
         setMyCourse(res.data.user)

         setReload(true)
         if(res.data.p<35){
           setOpenFail(true)
           setOpenSolve(false)
         }
         else{  setOpenGrade(true)
          setOpenSolve(false)
          if(res.data.cer=="true"){
            pdfGenerate(res.data.user.user.email)
    
          }
         }
   
          var p =""
  
          if(res.data.user.length!=0)
        {  res.data.user.courseInfo.map(c=>{
            if(c.course===course._id){
               p= Math.round(((c.percentage.progress/c.percentage.total)*100)*10)/10
      
            }
           
            })}
            setProg(p)
       
         setSolve(false)
           
           
            
            setArr([])
           Ans=[]
          
       }).catch(e=>{
           if(axios.isCancel(e)) return 
       })
       return () => cancel ()}
       
     }
 

   
  return (
    <div>
   
      <Dialog
        fullScreen
        open={openSolve}
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
               Exam Mode
            </Typography>
            
          </Toolbar>
        </AppBar>
        <Box sx={{backgroundColor:"lightgray"}}>
        <Box sx={{ width:"62%",position:"relative",left:"19%",zIndex:2, top:"8rem" ,marginBottom:"15%"}}>
        <div className="wire1"></div>
   <div class= 'row'>
     <Card style={{ width: '80rem',paddingTop:"2rem" }} className="solve">
    {Arr && Arr.map((el,index) => (
       
    <>
    <Card.Body>
      <Card.Title>{el.number}) {el.question} </Card.Title>
    </Card.Body>
    <Card.Body style={{paddingLeft:"5%"}}>
    <Form>
      {['radio'].map((type,i) => (
        <div key={`inline-${type}-${i}`} className="mb-3" id= {`ansbutton${el.number}`}>
           
      <ListGroup.Item>  <Form.Check value={'a'} label={el.choices[0]}  name="group1" type={type}
            id={`a${el.choices[1]}`}/>   </ListGroup.Item>
      <ListGroup.Item>  <Form.Check
            value={'b'}
            label={el.choices[1]}
            name="group1"
            type={type}
            id={`b${el.choices[1]}`}
            // id="a"   id={`inline-${type}-${i}-2`}
           
          />    </ListGroup.Item>
      <ListGroup.Item> <Form.Check
            value={'c'}
            label={el.choices[2]} 
            name="group1"
            type={type}
            id={`c${el.choices[1]}`}
            // id="a"   id={`inline-${type}-${i}-3`}
          />   </ListGroup.Item>
      <ListGroup.Item> <Form.Check
           
 
           value={'d'}
           label={el.choices[3]} 
           name="group1"
           type={type}
           id={`d${el.choices[1]}`}
          //  id={`inline-${type}-${i}-4`}
         />   </ListGroup.Item>
      
         
         
          
           
        </div>
      ))}
    </Form>
   <br/>
{Arr.length>1 && <div className="fold"></div>} 
    </Card.Body>

   
  </>
  
    ))

      }
        <div class="text-start" style={{paddingBottom:"2rem",paddingLeft:"3%",}}>
      <br />
      <Button variant="contained" onClick={submit} disabled={solve} sx={{backgroundColor:"#bbd2b1" ,fontWeight:"bold",ml:"0.8rem",
                boxShadow:"none",
                "&:hover":{
                    cursor: "pointer",
                    color:"#bbd2b1",
                    backgroundColor:"#fff"

                    }}}>
            {solve ? <div className="spinner" id="spinner"></div> : "submit"}
         </Button>
   
    </div>
      </Card>
     
      
    
        <br />  
  </div>
  </Box>
  </Box>
      </Dialog>
    </div>
  );
}
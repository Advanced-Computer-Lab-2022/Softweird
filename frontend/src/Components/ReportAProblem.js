import React, { useState, useEffect , useMemo, useContext } from 'react';
import axios from "axios"
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Slide from '@mui/material/Slide';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import Modal from 'react-bootstrap/Modal';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import InputGroup from 'react-bootstrap/InputGroup';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useAuth } from './auth';
import { Dialog } from '@mui/material';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import {Box,Button,Stack} from '@mui/material';
import Card from 'react-bootstrap/Card';
import ToastMess from './OneComponent/ToastMess';
import { Toast } from '../Context/Toast';
import Help from '../Images/Help.png'
import Problem from '../Images/Problem.png'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});



const Report = ({openRep,setOpenRep,Arr,setArr}) => {
  const auth = useAuth()
    const [checked, setChecked] = useState('');
    const [body, setBody] = useState('');
    const [title , setTitle] = useState('');
    const [Show, setShow] = useState(false);
    const [err, seterr] = useState(false);
const [solve ,setSolve] =useState(false)
const{openToast,setOpenToast} =useContext(Toast)

   const handleClick=((e, updatedAt) =>{
     if(window.confirm("Are you sure you want to submit this problem"))
{     setSolve(true)
        let cancel
         axios({
        method:"POST",
        url : "/reportProplem",
        params :{id :auth.user.id ,Title :title, Body :body ,Type : checked},
        cancelToken: new axios.CancelToken (c => cancel = c)
     }).then (res => {
       setArr(res.data.r)
       setOpenRep(false)
        setSolve(false)
        setOpenToast(true)
        setChecked('')
        setBody('')
        setTitle('')
    }).catch(e=>{
      setSolve(false)
        if(axios.isCancel(e)) return 
    })
    return () => cancel ()}
 //   setChange(false)
    })
   
    const check = (e, updatedAt) =>
    {
    if (checked=='' || body=='' ||  title=='' )
    {
        seterr(true)
    }
    else
    {
        seterr(false)
        handleClick() 
      
    }
}
    const getType1 = (e, updatedAt) =>
    {
      seterr(false)
     setChecked('Technical')
 
     
       }
       const getType2 = (e, updatedAt) =>
    {
      seterr(false)
     setChecked('Financial')
 
       }
    const getType3 = (e, updatedAt) =>
    {
      seterr(false)
     setChecked('Other')
 
     
    }
    const getbody = (e, updatedAt) =>
    {
      seterr(false)
           setBody(e.target.value)
         
    }
    const getTitle = (e, updatedAt) =>
    {
      seterr(false)
     setTitle(e.target.value)
    }
  const handleClose = () => setShow(false);
        const handleShow = () => setShow(true);



  const handleClose2=()=>{
    setOpenRep(false)
    setChecked('')
    setBody('')
    setTitle('')
  }
  return (
   

     <>

<style type="text/css">
    {`
.btn-primary {
  background-color: #bbd2b1;
  color: white;
}

.btn:hover , .btn:focus {
  background-color: #bbd2b1 !important;
 
}

}
`}
  </style>


    <Dialog
        fullScreen
        open={openRep}
        onClose={handleClose2}
        TransitionComponent={Transition}
        sx={{backgroundColor:"lightgray"}}
      >
        <AppBar sx={{ position: 'relative' ,backgroundColor:"#c50d0d" ,position:"sticky",top:0}}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose2}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
               Report 
            </Typography>
            
          </Toolbar>
        </AppBar>
        <Box sx={{backgroundColor:"lightgray"}}>
         
<Stack direction={"row"}>
  <img src={Problem} height={"100%"} style={{margin:"10rem 0px 0rem 2rem"}}/>
            <Box sx={{ width:"70%",position:"relative",zIndex:2, top:"6rem" , left:"5%"  ,marginBottom:"15%"}}>
            <div className="wire1"></div>
      <div class= 'row'>
        <Card style={{ width: '80rem',paddingTop:"2rem" }} className="solve">
        
        <Card.Body style={{paddingLeft:"5%"}}>
        {err && <p style={{ color:'#c50d0d'}}>*All fields are required</p>}
  
    <Stack gap={3} marginTop={"2rem"}>
      <Form>
          <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
            <Form.Label column sm="2" >
            Problem type:
            </Form.Label>
            <Col sm="8">
            <DropdownButton
            style={{color:"black"}}
            placeholder='select the report type'
            
            title = {   checked  ?
              checked
            :
            "select report type"
          }
            id="input-group-dropdown-1"
          >
            <Dropdown.Item href="#"    onClick={getType1} >Technical  </Dropdown.Item>
            <Dropdown.Item href="#"    onClick={getType2} >Financial </Dropdown.Item>
            <Dropdown.Item href="#"    onClick={getType3} >Other </Dropdown.Item>
          
          </DropdownButton>
            </Col>
          </Form.Group>
          </Form>
      
          <Form>
          <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
            <Form.Label column sm="2">
            Problem title:
            </Form.Label>
            <Col sm="8">
            
            <Form.Control
            aria-label="Text input with dropdown button"
            placeholder=" Enter a title for report"  
            style={{ height: '50px' ,width:'100%'}}
            onChange={getTitle}
              />
            </Col>
          </Form.Group>
          </Form>
          
      

    <Form>
        
          <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
            <Form.Label column sm="2">
            Problem:
            </Form.Label>
            <Col sm="8">
            
            <FloatingLabel controlId="floatingTextarea2" label="Your Problem" style={{color:"grey"}}>
            <Form.Control
              as="textarea"
              placeholder="what happned"
        
              onChange={getbody}
              style={{ minHeight: '200px' ,width:"100%"}}
            />
          </FloatingLabel>
            </Col>
          </Form.Group>
          </Form>
          </Stack>
         
          <Button variant="contained"  disabled={solve} sx={{backgroundColor:"#bbd2b1" ,fontWeight:"bold",ml:"0.8rem",
                    boxShadow:"none", marginTop:"3rem",
                    "&:hover":{
                        cursor: "pointer",
                        color:"#bbd2b1",
                        backgroundColor:"#fff"

                      }}}
                        onClick={ ()=> { check();setShow(true) }}>
                {solve ? <div className="spinner" id="spinner"></div> : "submit"}
            </Button>
          
        </Card.Body>
      
        
        </Card>
        </div>
        </Box>
        <img src={Help} style={{height:"100%" , margin:"11rem 2rem 0px 7rem"}}/>
  </Stack>
    </Box>
    
    
      </Dialog>

 
<ToastMess message={"Report Submitted Successfully"} />


      {/* <div class="text-end" >
      <br />

     
    <Button variant="danger" onClick={ ()=> { check();setShow(true) }}  >supmit report</Button>{'   '}
               
               { err ?
      <Modal show={Show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>please enter All information correctly</Modal.Body>
      <Modal.Footer>
      
       <Button variant="danger" onClick={handleClose}>
        OK
        </Button>
      </Modal.Footer>
    </Modal>
      :
      <Modal show={Show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>your report has been supmited , Hope we can help you</Modal.Body>
        <Modal.Footer>
        
          <Button variant="danger" onClick={handleClose}>  
            back home
          </Button>
          <Button variant="danger" onClick={()=>{  window.location.href=`/ViewReport`  }}>
          see All Reports
          </Button>
        </Modal.Footer>
      </Modal>
} */}
   
  
    </>
  )
}


export default Report;
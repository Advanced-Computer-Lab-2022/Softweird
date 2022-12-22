import React, { useState, useEffect , useMemo } from 'react';
import axios from "axios"

import { Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import Modal from 'react-bootstrap/Modal';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import InputGroup from 'react-bootstrap/InputGroup';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const Report = () => {
    const [checked, setChecked] = useState('');
    const [body, setBody] = useState('');
    const [title , setTitle] = useState('');
    const [Show, setShow] = useState(false);
    const [err, seterr] = useState(false);

   const handleClick=((e, updatedAt) =>{
        let cancel
         axios({
        method:"POST",
        url : "/IndividualTrainee/reportProplem",
        params :{id : "6387cd0c3420cccd5c92f4c0" ,Title :title, Body :body ,Type : checked},
        cancelToken: new axios.CancelToken (c => cancel = c)
     }).then (res => {
       
        
    }).catch(e=>{
        if(axios.isCancel(e)) return 
    })
    return () => cancel ()
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
        console.log(err)
    }
}
    const getType1 = (e, updatedAt) =>
    {
     setChecked('technical')
 
     
       }
       const getType2 = (e, updatedAt) =>
    {
     setChecked('financial')
 
       }
    const getType3 = (e, updatedAt) =>
    {
     setChecked('other')
 
     
    }
    const getbody = (e, updatedAt) =>
    {
           setBody(e.target.value)
         
    }
    const getTitle = (e, updatedAt) =>
    {
     setTitle(e.target.value)
    }
        //   console.log(question)
    const someFunc = (e, updatedAt) =>
     {
           
        }

      
        const handleClose = () => setShow(false);
        const handleShow = () => setShow(true);
  return (
     <>
   <br/>
   <br/>
   
   <Form>
      <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
        <Form.Label column sm="1">
        Problem type
        </Form.Label>
        <Col sm="7">
        <DropdownButton
         
         placeholder='select the report type'
         variant="danger"
         title = {   checked  ?
           checked
        :
        "select report type"
      }
         id="input-group-dropdown-1"
       >
         <Dropdown.Item href="#"    onClick={getType1} >technical  </Dropdown.Item>
         <Dropdown.Item href="#"    onClick={getType2} >financial </Dropdown.Item>
         <Dropdown.Item href="#"    onClick={getType3} >other </Dropdown.Item>
       
       </DropdownButton>
        </Col>
      </Form.Group>
      </Form>
      <br/>
      <br/>
      <Form>
      <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
        <Form.Label column sm="1">
        Problem title
        </Form.Label>
        <Col sm="7">
        
        <Form.Control
         aria-label="Text input with dropdown button"
         placeholder=" Enter a title for report"  
         style={{ height: '50px' ,width:'600px'}}
         onChange={getTitle}
           />
        </Col>
      </Form.Group>
      </Form>
      
   
 <br/>
 <br/>
 <Form>
    
      <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
        <Form.Label column sm="1">
        Problem
        </Form.Label>
        <Col sm="5">
        
        <FloatingLabel controlId="floatingTextarea2" label="Your Problem">
        <Form.Control
          as="textarea"
          placeholder="what happned"
      //    value={Body}
          onChange={getbody}
          style={{ height: '400px' ,width:'1000px'}}
        />
      </FloatingLabel>
        </Col>
      </Form.Group>
      </Form>

      
      <div class="text-end" >
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
}
   
    </div>
    </>
  )
}


export default Report;
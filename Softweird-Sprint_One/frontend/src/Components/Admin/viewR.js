import React, { useState, useEffect , useMemo } from 'react';
import axios from "axios"

import { Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import InputGroup from 'react-bootstrap/InputGroup';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';


const VReports = () => {
    const [checked, setChecked] = useState('');
    const [body, setBody] = useState('');
    const [Reid , setRid] = useState('');

    const [Arr,setArr] =useState('')
    
    
    const Unseen = ((e, updatedAt) =>{
        let cancel
         axios({
        method:"Get",
        url : "Admin/getreportsUnSeen",
        params : { },
         cancelToken: new axios.CancelToken (c => cancel = c)
     }).then (res => {
        setArr(res.data.r)
      
        console.log(Arr[0] + "///////////")
    }).catch(e=>{
        if(axios.isCancel(e)) return 
    })
    return () => cancel ()
    });
  
        //   console.log(question)///////////////////////////////////
        const Solvedr = ((e, updatedAt) =>{
            let cancel
             axios({
            method:"Post",
            url : "Admin/getreportsSolved",
            params : { id : "6384c26d9bed14d581bf628e" },
             cancelToken: new axios.CancelToken (c => cancel = c)
         }).then (res => {
            setArr(res.data.r)
          
            console.log(Arr[0] + "///////////")
        }).catch(e=>{
            if(axios.isCancel(e)) return 
        })
        return () => cancel ()
        });
        /////////////////////////////////////////////////////////////
        const Pendingr = ((e, updatedAt) =>{
            let cancel
             axios({
            method:"Post",
            url : "Admin/getreportsPending",
            params : {  id : "6384c26d9bed14d581bf628e" },
             cancelToken: new axios.CancelToken (c => cancel = c)
         }).then (res => {
            setArr(res.data.r)
            console.log(Arr[0] + "///////////")
        }).catch(e=>{
            if(axios.isCancel(e)) return 
        })
        return () => cancel ()
        });
      ///////////////////////////////////////////
   
    const openr = ((id) =>{
        let cancel
         axios({
        method:"Post",
        url : "Admin/OpenR",
        params : {  Aid : "6384c26d9bed14d581bf628e" , Rid: id },
         cancelToken: new axios.CancelToken (c => cancel = c)
     }).then (res => {
        setArr(res.data.r)
        console.log(Arr[0] + "///////////")
    }).catch(e=>{
        if(axios.isCancel(e)) return 
    })
    return () => cancel ()
    });
    const test =(id)=>
    {
      openr(id)
     
    }
  return (
     <>
      <Nav fill   variant="pills" defaultActiveKey={Unseen}>
      <Nav.Item>
        <Nav.Link onClick={Unseen}>Unseen</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link onClick={Pendingr}>your pending reports</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link onClick={Solvedr} > your solved reports </Nav.Link>
      </Nav.Item>
    </Nav>
    <br/>
    <br/>
     <div class="text-end" >
     {Arr && Arr.map((el)  => (
   <Accordion   defaultActiveKey={['1']} alwaysClosed>
      <Accordion.Item  eventKey="0">
        <Accordion.Header  > {el.title} </Accordion.Header>
        <Accordion.Body>
        <div >
        <Card>
        {el.solved ===  'pending' ?
          <Card.Header id="card-header-color-p"> <div class="pull-left">{el.solved} </div></Card.Header>
          :
          <Card.Header id="card-header-color-r"> <div class="pull-left">{el.solved} </div></Card.Header>
     }
           
            <Card.Body>
                <Card.Title>  <div class="pull-left">{el.type} </div></Card.Title>
         <Card.Text > 
             <div >  <br/>   <p  align="left" > {el.body}  </p>   </div>
        </Card.Text>
       
          <Button variant="primary" onClick={() =>{ test(el._id)  ; window.location.href=`/solveR:${el._id}`}}> open </Button>
      </Card.Body>
   
    </Card>
    </div>
        </Accordion.Body>
      </Accordion.Item>
    
    </Accordion>
      ) )
}
      
     
   
    </div>
    </>
  )
}


export default VReports;
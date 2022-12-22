import React, { useState, useEffect , useMemo } from 'react';
import axios from "axios"

import { Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
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
    const [Show, setShow] = useState(false);
    const [Arr,setArr] =useState('')
    const params = useParams();
    var i = params.id.toString().substring(1);
   
    
    useEffect(() =>{
        let cancel
         axios({
        method:"POST",
        url : "Admin/getreports",
        params : {id : i},
         cancelToken: new axios.CancelToken (c => cancel = c)
     }).then (res => {
        setArr(res.data.r)
      
        console.log( Arr + "///////////")
    }).catch(e=>{
        if(axios.isCancel(e)) return 
    })

    return () => cancel ()
    }, [Show])
  
   ////////////////////////////////////
   const Solve = ((e, updatedAt) =>{
    let cancel
     axios({
    method:"Post",
    url : "Admin/solveR",
    params : { Rid : i  , Aid : "6384c26d9bed14d581bf628e" },
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
      
     
    }
    const handleClose = () => setShow(false);
  return (
     <>
     <div>
    {Arr && Arr.map((el)  => (
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
       {el.solved === 'pending' ?
          <Button variant="primary" onClick={() =>{ Solve() ; setShow(true)   }}> solve </Button>
          :
          <Button variant="primary" onClick={() =>{ Solve() ; setShow(true)   }}  disabled> solve </Button>
       }
       {'   '}
          <Button variant="primary" onClick={() =>{ window.location.href=`/AfollowUp:${el._id}`}}> followUp </Button>

          <Modal show={Show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>the  report has been solved succssifly </Modal.Body>
      <Modal.Footer>
      
       <Button variant="danger" onClick={handleClose}> Done </Button>
       </Modal.Footer>
      </Modal>
      </Card.Body>
     
    </Card>
    
     ) )
        }
         </div>
        
       </>
      ) 
}
      
     
   
 
 


export default VReports;
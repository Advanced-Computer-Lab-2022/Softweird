import React, { useState, useEffect , useMemo } from 'react';
import axios from "axios"

import { Link, renderMatches, useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import { useParams } from "react-router-dom";

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Alert from 'react-bootstrap/Alert';

var t =0 ;

const VReports = () => {
    const params = useParams();
    const [Solved, setSolved] = useState('');
    const [body, setBody] = useState('');
    const [title , setTitle] = useState();

    const [Arr,setArr] =useState('')
    var i = params.id.toString().substring(1);
   
    const handleClick=((e, updatedAt) =>{
        let cancel
         axios({
        method:"POST",
        url : "/IndividualTrainee/addFollowUp",
        params :{Rid : i , Uid :"6387cd0c3420cccd5c92f4c0", follow :body },
        cancelToken: new axios.CancelToken (c => cancel = c)
     }).then (res => {
       
        
    }).catch(e=>{
        if(axios.isCancel(e)) return 
    })
    return () => cancel ()
 //   setChange(false)
    })
    useEffect(() =>{
        let cancel
         axios({
        method:"POST",
        url : "IndividualTrainee/getfollow",
        params : {id : i},
         cancelToken: new axios.CancelToken (c => cancel = c)
     }).then (res => {
        setArr(res.data.r)
        setSolved(res.data.s)
        setBody('')
        console.log(Solved + "///////////")
    }).catch(e=>{
        if(axios.isCancel(e)) return 
    })

    return () => cancel ()
    }, [title])
  
        //   console.log(question)
       
       
        const getbody = (e, updatedAt) =>
        {
               setBody(e.target.value)
               console.log(body)
             
        }
        const check = (e, updatedAt) =>
        {
        if ( body !=''  )
        {
            handleClick() 
          t++ 
         setTitle(t)
       
        }
    }
    
  return (
     <>
   
     {Arr && Arr.map((el , A)  => (
        <div>
     { el.from === 'trainee'?
        <Alert key='success' variant='success'>
               <Alert.Heading> {el.from}</Alert.Heading>
               <div>
                <p>
                 {el.body}  
                </p>
                </div> 
             <hr />

         </Alert>
       :
       <Alert key='danger' variant='danger'>
       
        <Alert.Heading> {el.from}</Alert.Heading>
         <div >  <br/>   <p  > {el.body}  </p>   </div>
         <hr />
         </Alert>
     }
     </div>
        
     ))
}
<Form>
      <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
    
        <Col sm="7">
        
        <Form.Control
         aria-label="Text input with dropdown button"
         placeholder="Message"  
         style={{ height: '50px' ,width:'600px'}}
         onChange={getbody}
         value = {body}
           />
            
        </Col>
     
      </Form.Group>
      { Solved === "pending" ?
      <div class="pull-right"> <Button variant="danger" onClick={ ()=> { check() }}   >send</Button>{'   '} </div>
      :
      <div class="pull-right"> <Button variant="danger" onClick={ ()=> { check() }} disabled >send</Button>{'   '} </div>
}
      </Form>
    
    </>
  )
}


export default VReports;
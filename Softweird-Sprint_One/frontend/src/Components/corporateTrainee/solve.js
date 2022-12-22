import React, { useState, useEffect , useMemo } from 'react';
import axios from "axios"
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import $ from 'jquery';

var Ans = new Array()
var counter =0
const Solve = () => {
    const [Arr,setArr] =useState('')
    const [Answ,setAnsw] =useState('')
    const [count,setCount] =useState('')
    
    useEffect(() =>{
        let cancel
         axios({
        method:"GET",
        url : "corporateTrainee/getQusetions",
        params : {Subtitle:"titl43",courseId :"6384e316b82023e53230ade0" },
         cancelToken: new axios.CancelToken (c => cancel = c)
     }).then (res => {
        setArr(res.data.r)
        console.log(Arr)
    }).catch(e=>{
        if(axios.isCancel(e)) return 
    })
    return () => cancel ()
    }, [])
    
    useEffect(() =>{
        let cancel
         axios({
        method:"POST",
        url : "corporateTrainee/solve",
        params : {Answers : Answ , id :"6387cd0c3420cccd5c92f4c0" ,Subtitle:"titl43",courseId :"6384e316b82023e53230ade0" },
         cancelToken: new axios.CancelToken (c => cancel = c)
     }).then (res => {
        setArr(res.data.r)
        console.log(Arr)
    }).catch(e=>{
        if(axios.isCancel(e)) return 
    })
    return () => cancel ()

    }, [Answ,count])
    const supmit = () => {
       counter++
        for(var i =1 ; i <= Arr.length ; i++)
        {
    var filterDay = $(`#ansbutton${i} input:radio:checked`).val()
    Ans[i-1] = filterDay
        }
        setAnsw(Ans)
        setCount(counter)
    console.log(Ans + "\\\\\\\\\\\\\\\\\\")
    }

  return (
   
   <div class= 'row'>
    {Arr && Arr.map((el) => (
       
    <Card style={{ width: '80rem' }}>
    <Card.Body>
      <Card.Title>Question number {el.number}</Card.Title>
      <Card.Text>
       {el.question}
      </Card.Text>
    </Card.Body>
    <ListGroup className="list-group-flush">
      <ListGroup.Item> a)  {el.choices[0]}  </ListGroup.Item>
      <ListGroup.Item> b)  {el.choices[1]}  </ListGroup.Item>
      <ListGroup.Item> c)  {el.choices[2]}  </ListGroup.Item>
      <ListGroup.Item> d)  {el.choices[3]}  </ListGroup.Item>
    </ListGroup>
    <Card.Body>
    <Form>
      {['radio'].map((type) => (
        <div key={`inline-${type}`} className="mb-3" id= {`ansbutton${el.number}`}>
          <Form.Check
            inline
     //       onChange={getAns}
            value={'a'}
            label="choice a"
            name="group1"
            type={type}
            id="a"
          />
          <Form.Check
            inline
      //      onChange={getAns}
            value={'b'}
            label="choice b"
            name="group1"
            type={type}
            id={`inline-${type}-2`}
          />
          <Form.Check
            inline
      //      onChange={getAns}
            value={'c'}
            label="choice c"
            name="group1"
            type={type}
            id={`inline-${type}-3`}
          />
           <Form.Check
            inline
      //      onChange={getAns}
            value={'d'}
            label="choice d"
            name="group1"
            type={type}
            
            id={`inline-${type}-4`}
          />
        </div>
      ))}
    </Form>
   <br/>
    </Card.Body>
   
  </Card>
  
    ))
      }
     
      
      <div class="text-end" >
      <br />
    <Button variant="primary" onClick={supmit}>supmit Exam</Button>{'   '}
   
    </div>
        <br />  
  </div>

  )
}


export default Solve;
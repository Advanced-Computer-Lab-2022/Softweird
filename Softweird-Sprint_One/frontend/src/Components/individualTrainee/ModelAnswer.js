import React, { useState, useEffect , useMemo } from 'react';
import axios from "axios"
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import $ from 'jquery';


const Solve = () => {
    const [Arr,setArr] =useState('')
    const [Ans , setAns] = useState('')
    
    useEffect(() =>{
        let cancel
         axios({
        method:"GET",
        url : "IndividualTrainee/modelAns",
        params : {Subtitle:"titl43",id :"6384e316b82023e53230ade0" , Uid :"6387cd0c3420cccd5c92f4c0"  },
         cancelToken: new axios.CancelToken (c => cancel = c)
     }).then (res => {
        setArr(res.data.m)
        setAns(res.data.a)
        console.log(Arr + "///////////")
    }).catch(e=>{
        if(axios.isCancel(e)) return 
    })
    return () => cancel ()
    }, [])
    
   
    const supmit = () => {
        for(var i =1 ; i <= Arr.length ; i++)
        {
        }
        
  
    }

  return (
   
   <div class= 'row'>
    {Arr && Arr.map((el , A)  => (
       
    <Card style={{ width: '80rem' }}>
    <Card.Body>
      <Card.Title>Question number {el.number}</Card.Title>
      <Card.Text>
       {el.question}
      </Card.Text>
    </Card.Body>
    <ListGroup className="list-group-flush">
    {el.answer ===  'a' ?
<ListGroup.Item> a)  {el.choices[0]}        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-check-circle-fill" viewBox="0 0 16 16" color='green'>
  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
</svg></ListGroup.Item>
:
Ans[A] === 'a' ? 
<ListGroup.Item> a)  {el.choices[0]} <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16" color='red'>
<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
</svg> </ListGroup.Item>
: 
<ListGroup.Item> a)  {el.choices[0]}  </ListGroup.Item>
}    
      
 {el.answer ===  'b'?
<ListGroup.Item> b)  {el.choices[1]}          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-check-circle-fill" viewBox="0 0 16 16" color='green'>
  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
</svg></ListGroup.Item>
:
Ans[A] === 'b'?
<ListGroup.Item> b)  {el.choices[1]}<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16" color='red'>
<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
</svg> </ListGroup.Item>
:
<ListGroup.Item> b)  {el.choices[1]}  </ListGroup.Item>
}
{el.answer ===  'c'?
<ListGroup.Item> c)  {el.choices[2]}        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-check-circle-fill" viewBox="0 0 16 16" color='green'>
  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
</svg></ListGroup.Item>
:
Ans[A] === 'c'?
<ListGroup.Item> c)  {el.choices[2]}<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16" color='red'>
<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
</svg> </ListGroup.Item>
:
<ListGroup.Item> c)  {el.choices[2]}  </ListGroup.Item>}
{el.answer ===  'd'?
<ListGroup.Item> d)  {el.choices[3]}     <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-check-circle-fill" viewBox="0 0 16 16" color='green'>
  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
</svg></ListGroup.Item>
:
Ans[A] === 'd'?
<ListGroup.Item> d)  {el.choices[3]}<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16" color='red'>
<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
</svg> </ListGroup.Item>
:
<ListGroup.Item> d)  {el.choices[3]}  </ListGroup.Item> }
    </ListGroup>
    <Card.Body>
   
   <br/>
    </Card.Body>
   
  </Card>
  
    ))
      }
     
      
      <div class="text-end" >
      <br />
    <Button variant="primary" onClick={supmit}>back home</Button>{'   '}
   
    </div>
        <br />  
  </div>

  )
}


export default Solve;